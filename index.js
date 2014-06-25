var fs = require('fs');
var path = require('path');
var shrinkwrap = require('cortex-shrinkwrap');
var shrinked = require('shrinked');
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
    return fromShrinked(shrinked, callback);
  }

  // tree provided
  if (tree)
    return fromTree(tree, callback);
  else {
    // if cwd provided, look up for cortex-shrinkwrap.json
    if (cwd) {
      try {
        tree = require(path.resolve(cwd, 'crotex-shrinkwrap.json'));
      } catch (e) {
        tree = null;
      }

      // found
      if (tree) return fromTree(tree, callback);
    }

    // if no cwd provide, or cortex-shrinkwrap.json is not found
    if (pkg && cache_root) {
      // generate tree with shrinkwrap
      return shrinkwrap(pkg, cache_root, options.shrinkwrapOpts, function(err, tree) {
        if (err) return callback(err);
        tree.name = pkg.name;
        fromTree(tree, callback);
      });
    }
  }

  // no way to get the dependency tree
  callback(new Error("Can not get shrinkwrap tree from the options provided"));

};


function fromShrinked(shrinked, callback) {
  callback(null, {
    tree: ntree.parse(shrinked)
  });
}

function fromTree(tree, callback) {
  fromShrinked(shrinked.parse(tree), callback);
}