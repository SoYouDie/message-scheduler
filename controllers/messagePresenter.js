const RedisHandler = require('./redisHandler');

class MessagePresenter extends RedisHandler {
  constructor (startTimestamp) {
    super();
    this.startTimestamp = startTimestamp;
    this._checkMessageQueue();
  }

  async _checkMessageQueue() {
    const messages = await this.getAllHashStored('messages');
    for (let field in messages) {
      if (messages[field].timestamp < Date.now()) {
        console.log(messages[field].message);
        this.delHashStoredField('messages', field);
        continue;
      }
      this.addMessageToQueue(messages[field].message, messages[field].timestamp);
    }
  }

  addMessageToQueue(message, timestamp) {
    setTimeout(() => {
      console.log(message);
      this.delHashStoredField('messages', message + '&&' + timestamp);
    }, timestamp - Date.now());
  }
}

module.exports = new MessagePresenter(Date.now());
