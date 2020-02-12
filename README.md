[![Build Status](https://travis-ci.org/minthawzin1995/DL_FB_ChatBot.svg?branch=master)](https://travis-ci.org/minthawzin1995/DL_FB_ChatBot)
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
# Deep Learning Messenger ChatBot
[![CircleCI](https://circleci.com/gh/minthawzin1995/DL_FB_ChatBot/tree/master.svg?style=svg)](https://circleci.com/gh/minthawzin1995/DL_FB_ChatBot/tree/master)

The chatbot can be accessed from www.m.me/aibotdeeplearning2020. It is implemented using Node, Heroku server instance, Dialogflow small talk agents and Python ML learning instances. 

## Installation

### Heroku Server
1. The chatbot is deployed using the heroku instance so it is necessary to create an instance at the www.heroku.com
2. Install node from the command line using the following code:
```
sudo npm install npm -g
```
3. Create a project folder and initialise npm inside it to make it a node project. Install its dependencies as well.
```
npm init
```
Install dependices such as express,yarn and body-parser. 
```
npm install express request body-parser --save
```
```
npm install -g yarn
```
4. Make a Procfile for the Heroku instance
5. Commit the code and run it on Heroku instance.
```
git init
git add .
git commit --message "I am a chatbot!"
heroku create
git push heroku master 
```

## Connecting the heroku server and the Facebook Messenger 

### Set up the Chatbot at Facebook
1. Sign up for an account at https://developers.facebook.com/

2. Create an application and set up Webhook in the created application. Webhook first field should be the URL of the created Heroku server before and the token field should be equal to the arbitrary token string that you have in your code.
```
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'token_verification') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})
```
In this case, the string "token_verification" should be in the token part of the webhook setup.

3. Get the Page access token through the set up for the page that you are creating the chatbot for.

4. Run the following code to save the Page Access Token to the Heroku server Instance for privacy.
```
heroku config:set FB_PAGE_ACCESS_TOKEN=your_page_access_token
```
5. To access the token in your code, add this line in your index.js
```
const token = process.env.FB_PAGE_ACCESS_TOKEN
```

## Connect the ChatBot to the Dialogflow API for Predefined Agents 

### Small Talk Agent API implementation
1. Create an account at the https://dialogflow.com/ and then create an agent.
2. Get the agent ClientAccessToken in the settings page of the client.
3. Add another config instance to the heroku server using the same way as the facebook page access token.
4. Use predefined agents to simplify the testing process or redefine the way you want the chatbot to reply.

## Travis Integration
1. Add .travis.yml file to the project folder to allow automated testing using Travis.
2. Specify the language that is being tested in this case node_js in the file 
```
language: node_js
```
