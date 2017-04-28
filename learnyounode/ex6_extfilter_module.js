var fsModule = require('fs');
var pathModule = require('path');

module.exports = function(dirName, ext, cbFunc) {
  var rdHandler = function(err, files) {
    if (err) cbFunc(err);
    else {
      var filteredFiles = [];
      for(var i=0; i<files.length; i++) {
        if('.' + ext == pathModule.extname(files[i])) {
          filteredFiles.push(files[i]);
        }
      }
      cbFunc(null, filteredFiles);
    }
  }
  fsModule.readdir(dirName, rdHandler);
}
