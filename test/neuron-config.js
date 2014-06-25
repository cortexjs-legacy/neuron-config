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
      "cookie": "~0.1.0"
    };

    nconfig({
      pkg: pkg,
      cache_root: path.join(__dirname, 'cache_root'),
      built_root: path.join(__dirname, 'cache_root'),
      cwd: dir
    }, function(err, config) {
      assert(config.tree);
      assert(config.tree.normal);
      assert(config.tree.normal["0.1.0"]);
      assert.equal(config.tree.normal["0.1.0"].length, 2);
      assert(config.tree.normal["0.1.0"][0].cookie);

      done(err);
    });
  });
});