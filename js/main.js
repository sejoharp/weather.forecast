function show_gallery(target, name) {
    var base = "#" + name;
    var gallery = base + "-gallery";
    var next = base + "-next";
    var previous = base + "-previous";
    var toggle = base + "-toggle";
    $.get(target, function(res) {
	var array = $(res.responseText).next().next().next().next().next()
		.last().find("a");
	add_links(gallery, array);
	init_galleria(gallery, next, previous, toggle);
    });
}

function add_links(gallery, array) {
    jQuery.each(array, function(index, value) {
	var link = "http://www.wetterzentrale.de"
		+ value.toString().split('.')[4] + ".gif";
	$(gallery).append(
		"<a href=\"" + link + "\"><img title=\"\" alt=\"\" src=\""
			+ link + "\"></a>");
    });
}
function init_galleria(gallery, next, previous, toggle) {
    Galleria.loadTheme('js/galleria.classic.js');
    $(gallery).galleria({
	width : 820,
	height : 740,
	maxScaleRatio : 1,
	minScaleRatio : 1,
	showCounter : false,
	showImagenav : false,
	transition : "fade",
	transitionSpeed : 1000,
	extend : function() {
	    var galleria = this;
	    $(next).click(function() {
		galleria.next();
	    });
	    $(previous).click(function() {
		galleria.prev();
	    });
	    $(toggle).click(function() {
		var button = $(toggle);
		if (button.text() == "play") {
		    galleria.play(2000);
		    button.text("stop");
		} else {
		    galleria.pause();
		    button.text("play");
		}
	    });
	}

    });
}

$(document)
	.ready(
		function() {
		    $("#rainfall").hide();
		    $("#temperature").hide();

		    $("#show_rainfall")
			    .click(
				    function() {
					$("#rainfall").toggle();
					if ($("#rainfall").css('display') == 'block') {
					    $(".galleria-container").remove();
					    show_gallery(
						    "http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=3&wann=00",
						    "rainfall");
					}
				    });
		    $("#show_temperature")
			    .click(
				    function() {
					$("#temperature").toggle();
					if ($("#temperature").css('display') == 'block') {
					    $(".galleria-container").remove();
					    show_gallery(
						    "http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=4&wann=00",
						    "temperature");
					}
				    });
		});
