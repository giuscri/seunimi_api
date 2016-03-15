var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('{}');
});

module.exports = server;
