'use strict';

var HTTP = require('http');
var URL = '';
var BODY = '';
var BODYLENGTH = 0;

if( 4 >= process.argv.length ) {
    URL = process.argv[2];
}

if ( '' !== URL) {
    HTTP.get(URL, function (response) {
        response.setEncoding('utf8');
        response.on('data', function(data) {
            BODY += data;
            BODYLENGTH += data.length;
        });
        response.on('end', function() {
            console.log(BODYLENGTH);
            console.log(BODY);
        });
        response.on('error', console.error);
    }).on('error', console.error);
}
