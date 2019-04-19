module.exports = {
  applicationPort: process.env.APPLICATION_PORT || 3000,
  redisHost: process.env.REDIS_HOST || 'redis',
  redisPort: process.env.REDIS_PORT || 6379,
};
