const express = require("express");
const router = express.Router();
const authController = require('./controllers/auth/AuthController');

/**
 * Returns 'API Successfully Running.' if the API is successfully running.
 * @route get /api/test
 * @group GENERIC - Generic endpoints.
 * @returns {string} API Successfully Running.
 */
router.route('/test').get(authController.test);

module.exports = router;
