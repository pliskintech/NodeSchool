"use strict";

var netModule = require('net');
var port = process.argv[2];
var message = '';
var onlyClient = null;
var pad0 = function(value) {
    if(value < 10) {
        return '0' + value.toString();
    } else {
        return '' + value.toString();
    }
};
var getDateNow = function () {
    var timeSeparator = ':';
    var dateSeparator = '-';
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dateString = '';

    dateString += year;
    dateString += dateSeparator;
    dateString += pad0(month);
    dateString += dateSeparator;
    dateString += pad0(day);
    dateString += ' ';
    dateString += pad0(hour);
    dateString += timeSeparator;
    dateString += pad0(min);

    return dateString;
};
var tcpTimeServer = netModule.createServer();
tcpTimeServer.on('connection', function(socket) {
    socket.setEncoding('utf8');
    onlyClient = socket;
    /*
    socket.on('data', function (data) {
        //console.log('Socket data transmission');
    });
    socket.on('end', function () {
        socket.end();
    });
    socket.on('close', function (had_error) {
        if(had_error) {
            //console.log('Socket closed due to error!');
        } else {
            //console.log('Socket closed without errors.');
        }
    });
    */
    socket.on('error', function () {
        console.log('Error on socket!');
    });

    var dateNow = getDateNow();
    socket.write(dateNow);

    /* Added this to pass the second value matching test.
        I don't know why the newline in the output is
        important. I just found out from here:

        https://github.com/nodeschool/discussions/issues/171
        > read jazmatician's comment on 2-Feb-2014. */
    socket.write('\n');

    socket.end();
});
tcpTimeServer.on('error', function () {
    console.log('Error on server!');
});
tcpTimeServer.listen(port, function() {
    //console.log('Listening on port ' + port + '...');
});
