'use strict'

// constants used in this project file
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const apiaiApp = require('apiai')(process.env.APIAI_CLIENT_ACCESS_TOKEN);
const token = process.env.FB_PAGE_ACCESS_TOKEN

// setting the port to the heroku environment or 5000
app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route sendin the following message
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot hosted at www.m.me/aibotdeeplearning2020')
})

/* for Facebook verification
 * Setting up webhook
 * "token_verification" == verfication in webhook
 * Url of webhook => heroku server URL
*/
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'token_verification') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Listening to the server requests at the specified port
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

/* Post function on the webhook/
 * get the messages from the other user
 * reply back the same message with the Text received echo:
 * send server 200 code if passed
*/
/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});

/* Send Text Message method
 * Use of v6.0 updated facebook graph API
 * access_token is configured through heroku server
 * heroku config: set FB_PAGE_ACCESS_TOKEN = <>
 * use of small Talk from dialogflow to generate small talk
*/
function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  let apiai = apiaiApp.textRequest(text, {
    sessionId: 'tabby_cat' // use any arbitrary id
  });

  apiai.on('response', (response) => {
    // Got a response from api.ai. Let's POST to Facebook Messenger
  });

	apiai.on('response', (response) => {
	  let aiText = response.result.fulfillment.speech;

	    request({
	      url: 'https://graph.facebook.com/v2.6/me/messages',
	      qs: {access_token:token},
	      method: 'POST',
	      json: {
	        recipient: {id: sender},
	        message: {text: aiText}
	      }
	    }, (error, response) => {
	      if (error) {
	          console.log('Error sending message: ', error);
	      } else if (response.body.error) {
	          console.log('Error: ', response.body.error);
	      }
	    });
	 });

  apiai.end();
}
