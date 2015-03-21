var fs       = require('fs');
var path     = require('path');
var mkdirp   = require('mkdirp');

module.exports = function(filepath) {
  var args = arguments;
  var dirPromise = new Promise(function(resolve, reject) {
    mkdirp(path.dirname(filepath), resolve);
  });
  var stream = //sigh;
  stream.pause();
  dirPromise.then(function() {
    stream.resume();
    stream.pipe(fs.createWriteStream.apply(fs, args))
  });
  return stream;
};
