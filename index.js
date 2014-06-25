var fs = require('fs');
var path = require('path');
var shrinkwrap = require('cortex-shrinkwrap');

var ntree = require('neuron-tree');

module.exports = function(options, callback) {
  if (!options) {
    return callback(new Error("'options' can not be empty"));
  }

  var tree = options.tree;
  var shrinked = options.shrinked;

  var pkg = options.pkg;
  var cache_root = options.cache_root;
  var cwd = options.cwd;

  // shrinked provided
  if (shrinked) {
    return fromShrinked(shrinked);
  }

  // tree provided
  if (tree)
    return fromTree(tree);
  else {
    // if cwd provided, look up for cortex-shrinkwrap.json
    if (cwd) {
      try {
        tree = require(path.resolve(cwd, 'cortex-shrinkwrap.json'));
      } catch (e) {
        tree = null;
      }

      // found
      if (tree) return fromTree(tree);
    }

    // if no cwd provide, or cortex-shrinkwrap.json is not found
    if (pkg && cache_root) {
      // generate tree with shrinkwrap
      return shrinkwrap(pkg, cache_root, options.shrinkwrapOpts, function(err, tree) {
        if (err) return callback(err);
        fromTree(tree);
      });
    }
  }

  // no way to get the dependency tree
  callback(new Error("Can not get shrinkwrap tree from the options provided"));

  function fromShrinked(shrinked) {
    var config = {
      tree: ntree.parse(shrinked)
    };

    callback(null, config);
  }

  function fromTree(tree) {
    fromShrinked(require('shrinked').parse(tree));
  }

};