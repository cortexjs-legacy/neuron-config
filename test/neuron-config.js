'use strict';

var assert = require('chai').assert;
var path = require('path');
var nconfig = require('../');

var playground = require('cortex-playground');
var packages = playground.packages;
var resources = playground.resources;

it('normal package', function(done) {

  var normal = packages('normal');
  // copy test fixtures into a temp directory.
  normal.copy(function(err, dir) {
    var pkg = require(normal.resolve('cortex.json'));
    pkg.dependencies = {
      "dep-test": "~1.0.0"
    };

    nconfig({
      pkg: pkg,
      cache_root: path.join(__dirname, 'cache_root'),
      cwd: dir
    }, function(err, config) {
      console.log(JSON.stringify(config, null, 4));
      done(err);
    });
  });
});