module.exports = (req, res, next) => {
  if (!req.body.message) {
    return res.status(400).send('message is required');
  } 
  if (!req.body.timestamp) {
    return res.status(400).send('timestamp is required');
  }
  if (typeof req.body.timestamp !== 'number') {
    return res.status(400).send('timestamp is invalid');
  }
  req.body.timestamp *= 1000;
  if (req.body.timestamp < Date.now()) {
    return res.status(400).send('timestamp is to low');
  }
  if (req.body.timestamp > Number.MAX_SAFE_INTEGER) {
    return res.status(400).send('timestamp is to high');
  }
  next();
};
