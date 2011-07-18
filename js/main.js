$(document)
		.ready(
				function() {
					var target = "http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=3&wann=00";
					$.get(target, function(res) {
						var array = $(res.responseText).next().next().next()
								.next().next().last().find("a");

						jQuery.each(array, function(index, value) {
							var link = "http://www.wetterzentrale.de"
									+ value.toString().split('.')[4] + ".gif";
							$('#gallery').append("<a href=\""+ link +"\"><img title=\"\" alt=\"\" src=\""+ link + "\"></a>");
						});

						Galleria.loadTheme('js/galleria.classic.js');
						$("#gallery").galleria({
							width : 820,
							height : 740,
							maxScaleRatio: 1,
							minScaleRatio: 1,
							showCounter: false,
							showImagenav: true,
							extend: function() {
						        var gallery = this;
								$('#next').click(function() {
									gallery.next();
									console.log("klick on next");
									});
								$('#previous').click(function() {
									gallery.prev();
									});
								$('#toggle').click(function() {
									var button = $("#toggle");
									if (button.text() == "play"){
										gallery.play(1000);
										button.text("stop");
									}else{
										gallery.pause();
										button.text("play");
									}
									});
						    }

						});
						

					});
				});


