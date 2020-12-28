var express = require('express');
var router = express.Router();

var LoginController = require("../controllers/LoginController.js");


router.post('/login',LoginController.login);

module.exports = router;