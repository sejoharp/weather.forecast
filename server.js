var express = require("express");
var app = express.createServer();

app.use("/js", express.static(__dirname + '/web/js'));
app.use("/img", express.static(__dirname + '/web/img'));
app.use("/css", express.static(__dirname + '/web/css'));
app.get('/', function(req, res){
	res.sendfile('web/weather.forecast.html');
});
app.listen(process.env.PORT || 8001);
