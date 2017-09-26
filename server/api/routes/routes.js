'use strict';

let express = require('express');

let routes = [];

routes.push({ url:'/statutes', route:require('./query/statutes.js') });
routes.push({ url:'/division', route:require('./query/statuteDivisions.js')});
routes.push({ url:'/title', route:require('./query/statuteTitles.js')});
routes.push({ url:'/chapter', route:require('./query/statuteChapters.js')});
routes.push({ url:'/id', route:require('./query/statuteGet.js')});
routes.push({ url:'/location', route:require('./query/statuteLocation.js')})

module.exports = routes;
