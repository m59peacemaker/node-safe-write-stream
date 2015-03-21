var fs       = require('fs');
var path     = require('path');
var mkdirp   = require('mkdirp');
var PT       = require('stream').PassThrough;

module.exports = function(filepath) {
  var args = arguments;
  var dirsCreated = new Promise(function(resolve, reject) {
    mkdirp(path.dirname(filepath), resolve);
  });
  var fsDoneResolve;
  var fsDone = new Promise(function(resolve, reject) {
    fsDoneResolve = resolve;
  });
  var stream = new PT();
  stream.pause();
  hijackEmit(stream, fsDone);
  dirsCreated.then(function() {
    stream.pipe(fs.createWriteStream.apply(fs, args)).on('finish', fsDoneResolve);
    stream.resume();
  });
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
