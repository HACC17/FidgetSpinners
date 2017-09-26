'use strict';

let mongoose = require('mongoose'),
	Location = mongoose.model('Location'),
	cache = require('memory-cache');

exports.listAllLocations = function(req, res) {
	Location.find({}, function(err, location) {
		if (err)
			res.send(err);
		res.json(location);
	});
};

exports.postLocation = function(req, res) {
	let newLocation = new Location({
		x: req.body.x,
		y: req.body.y,
		statute: {
	  	  url: req.body.statute.url,
		  division: req.body.statute.division,
		  division_text: req.body.statute.division_text,
		  title: req.body.statute.title,
		  title_text: req.body.statute.title_text,
		  chapter: req.body.statute.chapter,
		  chapter_text: req.body.statute.chapter_text,
		  section: req.body.statute.section,
		  section_text: req.body.statute.section_text,
		  text: req.body.statute.text,
	  }
	});

	newLocation.save(function(err) {
		if(err) 
			res.send(err);
	});

	res.send(newLocation)
};
