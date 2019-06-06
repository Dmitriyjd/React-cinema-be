const express = require('express');
const controller = require('../controllers/checkJWT');

const router = express.Router();

router.get('/checkJWT', controller.checkJWT);

module.exports = router;
