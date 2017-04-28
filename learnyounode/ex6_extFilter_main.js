var extFilterModule = require('./node_extFilter_module');
var extFilterHandler = function(err, files) {
  if (err) throw err;
  else {
    for(var i=0; i<files.length; i++) {
      console.log(files[i]);
    }
  }
}

if(process.argv.length >= 4) {
    extFilterModule(process.argv[2], process.argv[3], extFilterHandler);
}
