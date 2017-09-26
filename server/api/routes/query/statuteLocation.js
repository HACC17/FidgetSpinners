'use strict';

let express = require('express'),
    router  = express.Router();

let hrsLocationService = require('../../services/hrsLocationService.js');

router.route('/')
	.get(hrsLocationService.listAllLocations)
	.post(hrsLocationService.postLocation);
	  
module.exports = router;
