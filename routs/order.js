const express = require('express');
const router = express.Router(); //Creat a local router
const controller = require('../controllers/order');

router.get('/', controller.getAll);

router.post('/', controller.create);

module.exports = router;