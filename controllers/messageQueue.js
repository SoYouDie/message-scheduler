const RedisHandler = require('./redisHandler');

module.exports = class MessageQueue extends RedisHandler {
  constructor () {
    super();
  }

  async saveMessage(message, timestamp) {
    try {
      const messageParams = JSON.stringify({
        message,
        timestamp,
      });
      await this.addHashStored('messages', message + '&&' + timestamp, messageParams);
    } catch (error) {
      return {
        'status': 400,
        'resMessage': error.message,
      };
    }

    return {
      'status': 200,
      'resMessage': "Message '" + message + "' successfully scheduled at " + timestamp,
    };
  }
};
