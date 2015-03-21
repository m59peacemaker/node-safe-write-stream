var fs       = require('fs');
var path     = require('path');
var mkdirp   = require('mkdirp');
var PT       = require('stream').PassThrough;

module.exports = function(filepath) {
  var args = arguments;
  var stream = new PT();
  stream.pause();
  var fsDone = new Promise(function(resolve, reject) {
    mkdirp(path.dirname(filepath), function() {
      stream.pipe(fs.createWriteStream.apply(fs, args)).on('finish', resolve);
      stream.resume();
    });
  });
  hijackEmit(stream, fsDone);
  return stream;
};

function hijackEmit(stream, fsDone) {
  var oldEmit = stream.emit;
  stream.emit = function(type) {
    var args = arguments;
    if (type === 'finish') {
      fsDone.then(function() {
        oldEmit.apply(stream, args);
      });
    } else {
      oldEmit.apply(stream, args);
    }
  };
}
