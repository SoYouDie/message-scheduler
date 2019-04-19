const bodyParser = require('body-parser');
const config = require('./config');
const express = require('express');

const app = express();

const validateParams = require('./middleware/paramValidator');
const messagePresenter = require('./controllers/messagePresenter');
const MessageQueue = require('./controllers/messageQueue');

//middleware
app.use(bodyParser.json());

const messageQueue = new MessageQueue();
//routes
app.post('/echoattime', validateParams, async (req, res, next) => {
  const {status, resMessage} = await messageQueue.saveMessage(req.body.message, req.body.timestamp);
  messagePresenter.addMessageToQueue(req.body.message, req.body.timestamp);
  res.status(status).send({message: resMessage});
});

//Server starting
app.listen(config.applicationPort, () => {
  console.log('Application started at port: ', config.applicationPort);
});
