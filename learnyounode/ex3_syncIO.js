var fileName = process.argv[2];
var fileSystemModule = require('fs');
var fileContents = fileSystemModule.readFileSync(fileName, 'utf8');
var lineCount = fileContents.split('\n').length - 1;
console.log(lineCount);
