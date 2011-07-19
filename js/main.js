$(document)
		.ready(
				function() {
					var target = "http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=3&wann=00";
					show_gallery(target, "#rainfall-gallery", "#rainfall-next", "#rainfall-previous", "#rainfall-toggle");
				});

function show_gallery(target, gallery, next, previous, toggle){
	$.get(target, function(res) {
		var array = $(res.responseText).next().next().next()
				.next().next().last().find("a");
		add_links(gallery, array);
		init_galleria(gallery, next, previous, toggle);
	});
}

function add_links(gallery, array){
	jQuery.each(array, function(index, value) {
		var link = "http://www.wetterzentrale.de"
				+ value.toString().split('.')[4] + ".gif";
		$(gallery).append("<a href=\""+ link +"\"><img title=\"\" alt=\"\" src=\""+ link + "\"></a>");
	});	
}
function init_galleria(gallery, next, previous, toggle){
	Galleria.loadTheme('js/galleria.classic.js');
	$(gallery).galleria({
		width : 820,
		height : 740,
		maxScaleRatio: 1,
		minScaleRatio: 1,
		showCounter: false,
		showImagenav: false,
		transition: "fade",
		transitionSpeed: 1000,
		extend: function() {
	        var galleria = this;
			$(next).click(function() {
				galleria.next();
			});
			$(previous).click(function() {
				galleria.prev();
			});
			$(toggle).click(function() {
				var button = $(toggle);
				if (button.text() == "play"){
					galleria.play(2000);
					button.text("stop");
				}else{
					galleria.pause();
					button.text("play");
				}
			});
	    }

	});
}
