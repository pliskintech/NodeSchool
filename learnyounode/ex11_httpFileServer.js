var httpModule = require('http');
var fsModule = require('fs');
var pathModule = require('path');
var port = Number(process.argv[2]);
var fileRequest = process.argv[3] || '';
var fileServer = httpModule.createServer();

fileServer.on('request', function(req, res) {
    var readStream = null;
    var fileStat = fsModule.statSync(fileRequest);
    if (fileStat) {
        readStream = new fsModule.createReadStream(fileRequest);
        readStream.pipe(res);

        res.statusCode = 200;
        res.setHeader('content-type', 'text/html');
        res.setHeader('content-length', fileStat.size);
    } else {
        res.statusCode = 404;
        res.end();
    }

    /* Note: This "res.end;" part was what caused my program
       fail initially. When I finally gave up debugging, I found
       this: https://github.com/nodeschool/discussions/issues/1250

       According to davecocoa (26-Jun-2015), this is no longer
       necessary because the writestream automatically ends itself
       when it is piped from a readstream.

       I then just placed it inside the else block above. */
    //res.end();
});
fileServer.on('error', function() {
    console.log('Server error!');
});

fileServer.listen(port);
