const express = require('express');
const router = express.Router(); //Creat a local router
const controller = require('../controllers/analytic');

///http://localhost:5000/api/auth/overview
router.get('/overview', controller.overview);

///http://localhost:5000/api/auth/register
router.get('/analytics', controller.analytics);

module.exports = router;