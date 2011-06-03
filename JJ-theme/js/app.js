$(document).ready(function() {
	
	createThumbnailGallery();
	
	$('h1, .menu li').click(function(e) {
		e.preventDefault();
		var href = $(this).find('a').attr('href'),
			category = href.substring(href.lastIndexOf('/')+1);
		moveRibbon(category);
		toggleThumbs(category);
		return false;
	});
	
});