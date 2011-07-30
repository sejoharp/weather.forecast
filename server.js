var sys = require('sys'), http = require('http');

/*
 * var connection = http.createClient(80, 'www.wetterzentrale.de'), request =
 * connection.request("GET",'/topkarten/tkgfsmeur.htm?was=3&wann=00');
 * 
 * connection.addListener('error', function(connectionException){
 * sys.log(connectionException); });
 * 
 * request.addListener('response', function(response){ var data = '';
 * 
 * response.addListener('data', function(chunk){ data += chunk; });
 * response.addListener('end', function(){ console.log(data); }); });
 * 
 * request.end();
 */
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');

var options = {
	host : 'www.wetterzentrale.de',
	port : 80,
	path : '/topkarten/tkgfsmeur.htm?was=3&wann=00',
};
var data = "";

var req = http.get(options, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		data += chunk;
	});
	res.on('end', function(chunk) {
		console.log("fertig geladen");
		console.log(data);
	});
	res.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
});