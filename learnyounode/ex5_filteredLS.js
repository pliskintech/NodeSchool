var fsModule = require('fs');
var pathModule = require('path');
var dirName = '';
var extFilter = '';
var readDirCallback = function(err, files) {
    for (var i=0; i<files.length; i++)
    {
        if ('.'+extFilter == pathModule.extname(files[i]))
        {
            console.log(files[i]);
        }
    }
};

if (process.argv.length >=  4)
{
    dirName = process.argv[2];
    extFilter = process.argv[3];
    fsModule.readdir(dirName, readDirCallback);
}
