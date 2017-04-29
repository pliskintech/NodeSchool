"use strict";

var netModule = require('net');
var port = process.argv[2];
var tcpTimeClientSocket = new netModule.Socket();
tcpTimeClientSocket.on('connect', function () {
    //console.log('Socket connection success');
});
tcpTimeClientSocket.on('data', function (data) {
    //console.log('Socket data transmission');
});
tcpTimeClientSocket.on('end', function () {
    //console.log('Socket data transmission finished');
});
tcpTimeClientSocket.on('close', function (had_error) {
    if(had_error) {
        //console.log('Socket closed due to error!');
    } else {
        //console.log('Socket closed without errors!');
    }
});
tcpTimeClientSocket.on('error', function () {
    console.log('Error on socket!');
});
tcpTimeClientSocket.connect(port, function() {
    console.log('Connecting thru port ' + port + '...');
    tcpTimeClientSocket.end();
});
