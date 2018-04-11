const express = require('express');
const provider = require('../../../middlewares/provider');
const bearerBase64 = require('../../../middlewares/bearerBase64');
const router = express.Router();

// middlewares

router.use(provider('spotify'));
router.use(bearerBase64);

// routes

router.get('/authorise', require('./authorise'));
router.get('/callback', require('./callback'));
router.get('/token', require('./token'));

module.exports = router;
