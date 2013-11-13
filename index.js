#!/usr/bin/env node

// index.js - Main export.
module.exports = (function(undefined) {

  var asesrt = require('assert')
    , reltime = require('reltime')
    , JSONStream = require('JSONStream')
    , optimist = require('optimist')
    , moment = require('moment')
    , stream = require('stream')
    , util = require('util');

  function TimeFilterStream(reference) {
    stream.Transform.call(this, { objectMode: true });
    this.reference = reference;
  }

  util.inherits(TimeFilterStream, stream.Transform);

  TimeFilterStream.prototype._transform = function(chunk, encoding, callback) {
    var time = moment(chunk.time);
    if (time.isAfter(this.reference))
      this.push(chunk);

    return callback(null);
  };

  return function filter(reference, relative) {
    if (typeof relative === 'undefined') {
      relative = reference;
      reference = undefined;
    }

    reference = reltime.parse(reference || new Date(), relative);
    reference = moment(reference);

    process.stdin
      .pipe(JSONStream.parse())
      .pipe(new TimeFilterStream(reference))
      .pipe(JSONStream.stringify(false))
      .pipe(process.stdout);
  };
})();

if (require.main === module) {
  var argv = Array.prototype.slice.call(process.argv);
  argv.shift(); // node
  argv.shift(); // index.js

  if (argv.length === 0) {
    console.error("bunyan-reltime [reference-time] relative-time");
    return process.exit(1);
  }

  module.exports.apply(this, argv);
}

