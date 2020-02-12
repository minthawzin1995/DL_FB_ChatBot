# Deep Learning Messenger ChatBot

The chatbot can be accessed from www.m.me/aibotdeeplearning2020. It is implemented using Node, Heroku server instance, Diagflow small talk agents and Python ML learning instances. 

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
Install dependices such as express and body-parser.
```
npm install express request body-parser --save
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

