const User = require('../models/user.js');

const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require('../constants');

async function checkJWT(req, res) {
  try {
    const result = await User.getUserByEmail(req.body);
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ result });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

module.exports = { checkJWT };
