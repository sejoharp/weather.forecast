var sys = require('sys');
var http = require('http');
var jquery = require('jquery');
var express = require('express');


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
				var href = "<a class=\"highslide\" href=\"" + link
						+ "\"><img title=\"\" alt=\"\" src=\"" + link
						+ "\"></a>";
				links.push(href);
			});
	return links;
}

function returnLinks(options, response) {
	http.get(options, function(res) {
		var data = "";
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function(chunk) {
			var links = parseHtml(data);
			var linksJSON = JSON.stringify(links);
			response.contentType('application/json');
			response.send(linksJSON);
		});
		res.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
	});
}

var app = express.createServer();
app.get('/rain.json', function(request, response) {
	var options = {
		host : 'www.wetterzentrale.de',
		port : 80,
		path : '/topkarten/tkgfsmeur.htm?was=3&wann=00',
	};
	returnLinks(options, response);
});
app.get('/temperature.json', function(request, response) {
	var options = {
		host : 'www.wetterzentrale.de',
		port : 80,
		path : '/topkarten/tkgfsmeur.htm?was=4&wann=00',
	};
	returnLinks(options, response);
});
app.get('/low-air-pressure.json', function(request, response) {

	var options = {

		host : 'www.wetterzentrale.de',

		port : 80,

		path : '/topkarten/tkgfsmeur.htm?was=12&wann=00',

	};

	returnLinks(options, response);

});
app.get('/middle-air-pressure.json', function(request, response) {

	var options = {

		host : 'www.wetterzentrale.de',

		port : 80,

		path : '/topkarten/tkgfsmeur.htm?was=11&wann=00',

	};

	returnLinks(options, response);

});
app.get('/high-air-pressure.json', function(request, response) {

	var options = {

		host : 'www.wetterzentrale.de',

		port : 80,

		path : '/topkarten/tkgfsmeur.htm?was=10&wann=00',

	};

	returnLinks(options, response);
});
app.listen(3000);

