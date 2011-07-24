$(document).ready(
	function() {
	    $.get("http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=3&wann=00", function(res) {
		var array = $(res.responseText).next().next().next().next()
			.next().last().find("a");
		jQuery.each(array, function(index, value) {
		    var link = "http://www.wetterzentrale.de"
			    + value.toString().split('.')[4] + ".gif";
		    $("#images").append(
			    "<li><a href=\"" + link
				    + "\"><img title=\"\" alt=\"\" src=\""
				    + link + "\"></a></li>");
		});
		$(".gallery").tn3({
		    autoplay : false,
		    delay: 2000,
		    thumbnailer:{
			overMove: false
		    },
		    image:{
			transitions:[{
			    type:"fade",
			    duration:250
			    },]
			}
		});
	    });
	});
