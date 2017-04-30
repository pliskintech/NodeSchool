var http = require('http');
var url = require('url');

var port = Number(process.argv[2]);
var jsonServer = http.createServer();

var parseTime = function (isoFormatDate) {
  if ('' === isoFormatDate) {
    return '';
  }
  var date = new Date(isoFormatDate);
  var jsonTime = {
    "hour": date.getHours(),
    "minute": date.getMinutes(),
    "second": date.getSeconds()
  };
  return JSON.stringify(jsonTime);
};

var unixTime = function (isoFormatDate) {
  if ('' === isoFormatDate) {
    return '';
  }
  var date = new Date(isoFormatDate);
  var jsonTime = {
    "unixtime": date.getTime()
  };
  return JSON.stringify(jsonTime);
};

jsonServer.on('request', function (request, response) {
  var method = request.method;

  if ('GET' === method) {
    var urlObj = url.parse(request.url, true);
    var responseBody = '';
    var contentType = 'application/json';
    var statusCode = 200;
    var isoString = urlObj.query['iso'] || '';

    if ('/api/parsetime' == urlObj.pathname) {
      responseBody = parseTime(isoString);
    } else if ('/api/unixtime' === urlObj.pathname) {
      responseBody = unixTime(isoString);
    } else {
        // do nothing
    }

    if ('' === responseBody) {
      responseBody = 'You messed up!';
      statusCode = 404;
      contentType = 'text/html';
    }

    response.statusCode = statusCode;
    response.setHeader('content-type', contentType);
    response.setHeader('content-length', responseBody.length);
    response.end(responseBody);
  }

  request.on('error', function (err) {
    console.log('request error');
  });
});
jsonServer.on('error', function (err) {
  console.log('server error!');
});
jsonServer.listen(port);
