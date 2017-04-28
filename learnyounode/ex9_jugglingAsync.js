"use strict";

var HTTP = require('http');
var URLS = [];
var RESULTS = [];
var BODY = '';
var INDEX = 0;

var printResults = function(resultList) {
  for (var i=0; i<resultList.length; i++) {
      console.log(resultList[i]);
  }
};
var sendGetRequests = function() {
    if (INDEX === URLS.length) {
        printResults(RESULTS);
        return;
    }
    BODY = '';
    HTTP.get(URLS[INDEX], function (response) {
      response.setEncoding('utf8');
      response.on('data', function(data){
          BODY += data;
      });
      response.on('end', function() {
          RESULTS.push(BODY);
          INDEX++;
          sendGetRequests();
      });
      response.on('error', console.error);
    }).on('error', console.error);
};

for (var i=2; i<process.argv.length; i++) {
    URLS.push(process.argv[i]);
}
sendGetRequests();
