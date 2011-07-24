function startGallery(target, imageDiv, galleryDiv) {
	$.get(target, function(res) {
		var array = $(res.responseText).next().next().next().next().next()
				.last().find("a");
		jQuery.each(array, function(index, value) {
			var link = "http://www.wetterzentrale.de"
					+ value.toString().split('.')[4] + ".gif";
			$(imageDiv).append(
					"<li><a href=\"" + link
							+ "\"><img title=\"\" alt=\"\" src=\"" + link
							+ "\"></a></li>");
		});
		$(galleryDiv).tn3({
			autoplay : false,
			delay : 2000,
			thumbnailer : {
				overMove : false
			},
			image : {
				transitions : [ {
					type : "fade",
					duration : 250
				}, ]
			},
			skinDir : "img",
		});
	});
}

$(document)
		.ready(
				function() {
					$("#rain-gallery").hide();
					$("#temp-gallery").hide();
					$("#showRain")
							.click(
									function() {
										if ($("#rain-gallery").css('display') == 'none'
												&& $("#rain-images").size() < 2) {
											startGallery(
													"http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=3&wann=00",
													"#rain-images",
													"#rain-gallery");
										}
										$("#rain-gallery").toggle();
									});
					$("#showTemp")
							.click(
									function() {
										if ($("#temp-gallery").css('display') == 'none'
												&& $("#temp-images").size() < 2) {
											startGallery(
													"http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=4&wann=00",
													"#temp-images",
													"#temp-gallery");
										}
										$("#temp-gallery").toggle();
									});
				});
