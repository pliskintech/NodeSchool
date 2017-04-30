"use strict";

var http = require('http');
var fs = require('fs');
var through2map = require('through2-map');

var port = Number(process.argv[2]);
var server = http.createServer();
server.on('error', function () { console.log('server error!'); });
server.on('request', function (request, response) {
    var method = request.method;
    var url = request.url;
    var page = url.substr(url.indexOf('/')+1);
    var body = '';

    /* Added handling of GET requests so I can self-test post data
        transmission and conversion to upper case from testdata/hello.html
        to world.html. */
    if ('GET' == method) {
        var getStream = fs.createReadStream(page);
        getStream.pipe(response);
    } else if ('POST' == method) {
        request.setEncoding('utf8');
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            console.log(body);
            response.statusCode = 200;
            response.setHeader('content-type', 'text/html');
            response.setHeader('content-length', body.length);
            response.write(body.toUpperCase());
            response.end();
        });
        request.on('error', function () {
            console.log('request error!');
        });
    }
});
server.listen(port);
