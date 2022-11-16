const jwt = require('jsonwebtoken')
const User = require('../models/user')
const tokenExtractor = async (request, response, next) => {
  const authorization = await request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  tokenExtractor(request, response, next);
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(decodedToken.id);
    console.log(request.user); // Works
    next();
  } else {
    response.status(403).json({ error: 'no token received' });
  }
};

module.exports = {tokenExtractor, userExtractor}