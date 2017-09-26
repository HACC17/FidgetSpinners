let express = require('express'),
    router  = express.Router(),
    childRouter = express.Router({mergeParams: true});

let hrsService = require('../../services/hrsService.js');

router.use('/:chapter/section', childRouter);

router.route('/:chapter')
	.get(hrsService.listByChapter);

childRouter.route('/')
	.get(hrsService.listByChapter);
	
childRouter.route('/:section')
	.get(hrsService.listByChapterSection)

module.exports = router;
