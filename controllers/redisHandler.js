const Redis = require('ioredis');

const config = require('./../config');

module.exports = class RedisHandler {
  constructor () {
    this.redis = null;
    this._initRedis();
  }

  _initRedis() {
    this.redis = new Redis({
      host: config.redisHost,
      port: config.redisPort,
    });
  }

  async addHashStored(key, field1, field2) {
    return this.redis.hset(key, field1, field2);
  }

  async getAllHashStored(key) {
    const messages = await this.redis.hgetall(key);
    for (let field in messages) {
      messages[field] = JSON.parse(messages[field]);
    }
    return messages;
  }

  async delHashStoredField(key, field) {
    return this.redis.hdel(key, field);
  }
};
