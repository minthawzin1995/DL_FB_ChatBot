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
	res.send('Hello world, I am a chat bot')
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
app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text

		    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
				/*
				// Small Talk ChatBot
				let apiai = apiaiApp.textRequest(text, {
					sessionId: 'chatbot'
				});

				apiai.on('response', (response) => {
					let aiText = response.result.fulfillment.speech;

						request({
							 url: 'https://graph.facebook.com/v2.6/me/messages',
							 qs: {access_token: token},
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
				});
				*/
	    }
    }
    res.sendStatus(200)
})

/* Send Text Message method
 * Use of v6.0 updated facebook graph API
 * access_token is configured through heroku server
 * heroku config: set FB_PAGE_ACCESS_TOKEN = <>
*/
function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
	}
