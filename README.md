# Safe Write Stream

Like `fs.createWriteStream`, but it will create the needed directories before trying to create the file.

## Install
```
npm install safe-write-stream
```

## Usage

```javascript
var safeWriteStream = require('safe-write-stream');

fs.createReadStream('file.txt')
  .pipe(safeWriteStream(__dirname+'/these/will/be/created/file.txt'))
```

### Parameters

See the [fs.createWriteStream docs](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options).
