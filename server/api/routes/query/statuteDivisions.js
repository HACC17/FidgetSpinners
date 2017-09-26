let express = require('express'),
    router  = express.Router(),
    childRouter = express.Router({mergeParams: true});

let hrsService = require('../../services/hrsService.js');

router.use('/:division/title', childRouter);

router.route('/:division')
	.get(hrsService.listByDivision);

childRouter.route('/')
	.get(hrsService.listByDivision)

childRouter.route('/:title')
	.get(hrsService.listByDivisionTitle)

module.exports = router;
