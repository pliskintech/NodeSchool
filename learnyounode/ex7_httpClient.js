'use strict';

var HTTP = require('http');
var URL = '';

if( 4 >= process.argv.length ) {
    URL = process.argv[2];
}

if ( '' !== URL) {
    HTTP.get(URL, function (response) {
        response.setEncoding('utf8');
        response.on('data', function(data) {
            console.log(data);
        });
        response.on('error', function(err) {
          console.log(err.message);
        });
    }).on('error', function(err){
        console.log(err.message);
    });
}
