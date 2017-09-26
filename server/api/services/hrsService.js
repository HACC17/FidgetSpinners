'use strict';

let mongoose = require('mongoose'),
	Statute = mongoose.model('Statute'),
	cache = require('memory-cache');

exports.listAllStatutes = function(req, res) {
	Statute.find({}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.listByDivision = function(req, res) {
	Statute.find({division: req.params.division}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.listByDivisionTitle = function(req, res) {
	Statute.find({division: req.params.division,
		title: req.params.title}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.listByTitle = function(req, res) {
	Statute.find({title: req.params.title}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.listByTitleChapter = function(req, res) {
	Statute.find({title: req.params.title, 
		chapter: req.params.chapter}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.listByChapter = function(req, res) {
	Statute.find({chapter: req.params.chapter}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.listByChapterSection = function(req, res) {
	Statute.find({chapter: req.params.chapter, 
		section: req.params.section}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};

exports.getById = function(req, res) {
	Statute.find({_id: req.query.val}, function(err, statute) {
		if (err)
			res.send(err);
		res.json(statute);
	});
};
