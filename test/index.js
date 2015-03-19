var fs   = require('fs');
var test = require('tape');
var rimraf = require('rimraf');
var safeWriteStream = require('../');

var tmp = __dirname+'/tmp';

test('creates directories for file and writes it', function(t) {
  t.plan(1);
  var file = __dirname+'/test.txt';
  var dest = tmp+'/foo/bar/baz.txt';
  fs.createReadStream(file)
    .pipe(safeWriteStream(dest))
    .on('finish', function() {
      fs.stat(dest, function(err, stats) {
        rimraf(tmp, function() {
          t.true(true);
        });
      });
    });
  ;
});
