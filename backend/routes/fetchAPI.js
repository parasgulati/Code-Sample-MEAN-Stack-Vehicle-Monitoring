var express = require('express');
var router = express.Router();

var FetchController = require("../controllers/FetchController.js");

router.post('/all-vehicle',FetchController.all);
router.post('/vehicle-all-points',FetchController.all_points);

module.exports = router;