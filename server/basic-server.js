var http = require('http');
var fs = require('fs');
var server = http.createServer();

server.listen(8000);
console.log('file runs');
server.on('request', function(request, response) {
  if (request.method === 'GET') {
    if (request.url === '/') {
      fs.readFile('/Users/student/Desktop/hrsf50-mvp/index.html', 'utf8', function(err,data){
        if (err) {
          throw err;
        }
        // console.log(data);
        console.log('data is: ', data);
        response.writeHead(200);
        console.log('hits after writeHead');
        response.end(data, 'utf-8');
        console.log('hits after response.end');
      });
    }
  } else {
    response.end();
  }
});