const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { session } = req.cookies;

    const user = jwt.verify(session, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    err.status = 401;
    err.message = 'You must sign in to continue';
    next(err);
  }
};
