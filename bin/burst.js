#!/usr/bin/env node

var argv = require('optimist').argv._;
var burst = require('../lib/burst');
var config = require('../lib/config');

if (!module.parent) {
  config.get(function (err, options) {
    if (err) throw new Error(err);
    var command = argv[0];
    switch (command) {

      case 'as':
        burst.as(options.redis, argv[1]);
        break;

      case 'to':
        burst.to(options.redis, argv[1], argv[2]);
        break;

      case 'into':
        if (typeof(argv[1]) === 'number') {
          options.redis = {host: '127.0.0.1', port: argv[1]};
        } else {
          var pieces = argv[1].split(':');
          options.redis = {host: pieces[0], port: pieces[1]||6379};
        }
        config.save(options, function () {});
        break;

    }      
  });
}

