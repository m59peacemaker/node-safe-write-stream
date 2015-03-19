var fs       = require('fs');
var path     = require('path');
var through2 = require('through2');
var mkdirp   = require('mkdirp');

module.exports = function(filepath) {
  var args = arguments;
  var promise = new Promise(function(resolve, reject) {
    mkdirp(path.dirname(filepath), resolve);
  });
  var stream = through2(function(chunk, enc, cb) {
    var self = this;
    promise.then(function() {
      self.push(chunk);
      cb();
    });
  });
  promise.then(function() {
    stream.pipe(fs.createWriteStream.apply(fs, args));
  });
  return stream;
};
