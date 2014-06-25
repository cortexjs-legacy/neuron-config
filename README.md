# neuron-config [![NPM version](https://badge.fury.io/js/neuron-config.svg)](http://badge.fury.io/js/neuron-config) [![Build Status](https://travis-ci.org/cortexjs/neuron-config.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-config) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-config.svg)](https://gemnasium.com/cortexjs/neuron-config)

<!-- description -->

## Install

```bash
$ npm install neuron-config --save
```

## Usage

```js
var nconfig = require('neuron-config');

// pass package json and cache_root
nconfig({
  pkg: pkg,
  cache_root: cache_root,
  cwd: cwd // when cwd is passed, neuron-config will try to read 'cortex-shrinkwrap.json' in cwd
}, function(err, config) {
  var output ='neuron.config(' + JSON.stringify(config) + ')';

});

// or already has a shrinkwrap tree 
nconfig({
  
})


// pass shrinked object
nconfig({
  shrinked
})


```

## Licence

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->