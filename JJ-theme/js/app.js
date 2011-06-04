$(document).ready(function() {
	
	createThumbnailGallery();
	
	$('h1, .menu li').click(function(e) {
		e.preventDefault();
		var href = $(this).find('a').attr('href'),
			category = href.substring(href.lastIndexOf('/')+1);
		moveRibbon(category);
		$(document).one("thumbsToggled", function(e, thumb) {
			var postSlug = getSlug($(thumb).children('a').attr('href'));
			toggleItem(postSlug);
		});
		toggleThumbs(category);
		return false;
	});
	
	$('#thumbnailGallery ul li').click(function(e) {
		e.preventDefault();
		var href = $(this).children('a').attr('href'),
			postSlug = getSlug(href),
			topics = $(this).children('.topics').text().split(","),
			menuTopics = getMenuTopics(),
			topic;
		$.each(menuTopics, function(i, menuTopic) {
			if($.inArray(menuTopic,topics)!==-1) {
				topic = menuTopic;
				return false;
			}
		});
		moveRibbon(topic);
		toggleThumbs(postSlug);
		toggleTextPane();
		$(document).one("thumbsToggled", function() {
			toggleItem(postSlug);
		});
		return false;
	});
	
	$('#portfolio').css('min-height',$('#portfolio').height());
});