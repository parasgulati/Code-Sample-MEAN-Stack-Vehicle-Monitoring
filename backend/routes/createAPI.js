var express = require('express');
var router = express.Router();

var CreateController = require("../controllers/CreateController.js");

router.post('/new-vehicle',CreateController.create);
router.post('/new-vehicle-point',CreateController.create_point);

module.exports = router;