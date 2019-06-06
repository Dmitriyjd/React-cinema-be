const User = require('../models/user.js');
const { createJWToken } = require('../security/auth');
const encryptPassword = require('../security/encryptPassword');
const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require('../constants');

async function logIn(req, res) {
  if (!req.body.email) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: ERROR_MESSAGES.EMPTY_EMAIL });
    return;
  }

  if (!req.body.password) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: ERROR_MESSAGES.EMPTY_PASSWORD });
    return;
  }
  try {
    const userData = await User.getUserByEmail(req.body.email);
    const token = createJWToken({ data: { id: userData._id, email: userData.email } });
    const encryptedExternalPassword = encryptPassword(req.body.password);

    if (userData.password === encryptedExternalPassword) {
      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ token });
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    console.log(error);
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS });
  }
}

async function createUser(req, res) {
  if (!req.body.email) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: ERROR_MESSAGES.EMPTY_EMAIL });
    return;
  }

  if (!req.body.password) {
    res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: ERROR_MESSAGES.EMPTY_PASSWORD });
    return;
  }

  try {
    const existingUserData = await User.getUserByEmail(req.body.email);
    console.log(existingUserData);
    const encryptedPassword = encryptPassword(req.body.password);
    const userData = await User.createUser({
      ...req.body,
      password: encryptedPassword,
    });
    const token = createJWToken({ data: { id: userData._id, email: userData.email } });
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ token, message: 'Account created' }); // @token
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.REGISTRATION_ERROR });
  }
}

module.exports = { logIn, createUser };
