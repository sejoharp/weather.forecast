var sys = require('sys');
var http = require('http');
var jquery = require('jquery');

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

function parseHtml(html) {
	var links = [];
	var window = require('jsdom').jsdom(html, null, {
		FetchExternalResources : false,
		ProcessExternalResources : false,
		MutationEvents : false,
		QuerySelector : false
	}).createWindow();
	var $ = jquery.create(window);

	$("table").filter(":odd").find("a").each(
			function(el) {
				var value = $(this).attr('href');
				var link = "http://www.wetterzentrale.de"
						+ value.toString().split('.')[4] + ".gif";
				console.log(link);
				links.push("<li><a href=\"" + link
						+ "\"><img title=\"\" alt=\"\" src=\"" + link
						+ "\"></a></li>");
			});
	return links;
}

var options = {
	host : 'www.wetterzentrale.de',
	port : 80,
	path : '/topkarten/tkgfsmeur.htm?was=3&wann=00',
};

var req = http.get(options, function(res) {
	var data = "";
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		data += chunk;
	});
	res.on('end', function(chunk) {
		parseHtml(data);
	});
	res.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
});