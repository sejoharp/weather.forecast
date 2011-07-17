$(document).ready(function() {
	var target = "http://www.wetterzentrale.de/topkarten/tkgfsmeur.htm?was=3&wann=00";
	$.get(target, function(res) { //get the html source of this website
		var array = $(res.responseText).next().next().next().next().next().last().find("a");
		jQuery.each(array, function(index, value){
			var link = "http://www.wetterzentrale.de" + value.toString().split('.')[4] + ".gif";
		      $('#photos').append("<li><a>href=\"" + link + "\"</a></li>");
		});

	
		var _h = [], _w = [];
		_h[0] =  300;//only for test
        _w[0] =  800;//only for test
        _h[1] =  300;//only for test
        _w[1] =  800;//only for test
        
        var _o = {fullscreen: false, menu : "slider", style : "centered"}; 
        var obj = jQuery(".jbgallery");
              
        function _init(opt){
//			obj.eq(0).jbgallery("destroy");//NO CHINABILITY + API
//			obj.eq(1).jbgallery("destroy");//NO CHINABILITY + API
//            obj.eq(0).resizable("destroy");//NO CHINABILITY + API
//            obj.eq(1).resizable("destroy");//NO CHINABILITY + API
            
			$('.jbgallery')
			.each(function(i){
				var self = this;
				$(this).css({
                    width: _w[i],
                    height : _h[i]
                })
                .jbgallery(opt);
			});
        }
        _init(_o);
       
	});
  });
