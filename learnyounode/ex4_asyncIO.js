var fileName = process.argv[2];
var fsModule = require('fs');
var fileReadOptions = { encoding: 'utf8', flag: 'r' };
var fileReadHandler = function(err, contents) {
   if(err) throw err;
   else console.log(contents.split('\n').length - 1);
}
fsModule.readFile(fileName, fileReadOptions, fileReadHandler);
