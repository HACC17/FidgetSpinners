'use strict';

let express = require('express'),
    router  = express.Router();

let hrsService = require('../../services/hrsService.js');

router.route('/')
    .get(hrsService.getById);


module.exports = router;
