'use strict';
const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const app = dialogflow({debug: true});

const serviceAccount = require('./project3-notr-firebase-adminsdk-m8raf-1aff238a9c.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project3-notr.firebaseio.com"
});

app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Welcome to NotR. Do you want to edit a note or create a new one?');
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

app.intent('new', (conv) => {
  const date = new Date();
  const title = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const regex = /(?<=note).+/;
  const content = conv.query.match(regex)[0];
  admin.database().ref('Hz2HLcs9bVZhUaAxte7ccF2gJXB2').push({
        title: title,
        content: content,
        uid: 'Hz2HLcs9bVZhUaAxte7ccF2gJXB2'
      });
  conv.ask(`Ok, created a new note. Wrote down ${content}`);
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});


app.intent('quit', (conv) => {
  conv.close('Ok, have a nice day.');
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

exports.yourAction = functions.https.onRequest(app);
