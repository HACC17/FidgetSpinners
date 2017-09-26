let express = require('express'),
    router  = express.Router(),
    childRouter = express.Router({mergeParams: true});

let hrsService = require('../../services/hrsService.js');

router.use('/:title/chapter', childRouter);

router.route('/:title')
	.get(hrsService.listByTitle);

childRouter.route('/')
	.get(hrsService.listByTitle);

childRouter.route('/:chapter')
	.get(hrsService.listByTitleChapter)

module.exports = router;
