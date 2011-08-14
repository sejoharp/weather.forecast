hs.graphicsDir = '../img/';
hs.transitions = [ 'expand', 'crossfade' ];
hs.restoreCursor = null;
hs.lang.restoreTitle = 'Click for next image';

// Add the slideshow providing the controlbar and the thumbstrip
hs.addSlideshow({
	// slideshowGroup: 'group1',
	interval : 2000,
	repeat : true,
	useControls : true,
	overlayOptions : {
		position : 'bottom right',
		offsetY : 50
	},
	thumbstrip : {
		position : 'above',
		mode : 'horizontal',
		relativeTo : 'expander'
	}
});

// Options for the in-page items
var inPageOptions = {
	// slideshowGroup: 'group1',
	outlineType : null,
	allowSizeReduction : false,
	wrapperClassName : 'in-page controls-in-heading',
	thumbnailId : 'gallery-area',
	useBox : true,
	width : 600,
	height : 400,
	targetX : 'gallery-area 10px',
	targetY : 'gallery-area 10px',
	captionEval : 'this.a.title',
	numberPosition : 'caption'
}

// Open the first thumb on page load
hs.addEventListener(window, 'load', function() {
	document.getElementById('thumb1').onclick();
});

// Cancel the default action for image click and do next instead
hs.Expander.prototype.onImageClick = function() {
	if (/in-page/.test(this.wrapper.className))
		return hs.next();
}

// Under no circumstances should the static popup be closed
hs.Expander.prototype.onBeforeClose = function() {
	if (/in-page/.test(this.wrapper.className))
		return false;
}
// ... nor dragged
hs.Expander.prototype.onDrag = function() {
	if (/in-page/.test(this.wrapper.className))
		return false;
}

// Keep the position after window resize
hs.addEventListener(window, 'resize', function() {
	var i, exp;
	hs.getPageSize();

	for (i = 0; i < hs.expanders.length; i++) {
		exp = hs.expanders[i];
		if (exp) {
			var x = exp.x, y = exp.y;

			// get new thumb positions
			exp.tpos = hs.getPosition(exp.el);
			x.calcThumb();
			y.calcThumb();

			// calculate new popup position
			x.pos = x.tpos - x.cb + x.tb;
			x.scroll = hs.page.scrollLeft;
			x.clientSize = hs.page.width;
			y.pos = y.tpos - y.cb + y.tb;
			y.scroll = hs.page.scrollTop;
			y.clientSize = hs.page.height;
			exp.justify(x, true);
			exp.justify(y, true);

			// set new left and top to wrapper and outline
			exp.moveTo(x.pos, y.pos);
		}
	}
});