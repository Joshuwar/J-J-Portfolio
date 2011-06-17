$(document).ready(function() {
	
	createThumbnailGallery();
	
	$('h1, .menu li').click(function(e) {
		e.preventDefault();
		var href = $(this).find('a').attr('href'),
			category = href.substring(href.lastIndexOf('/')+1),
			clicked = this;
		moveRibbon(category);
		if(!$('#thumbnailGallery').is(':visible')) {
			$(document).one("itemToggled", function(e, item) {
				toggleTextPane();
				$(document).one("thumbsToggled", function() {
					/* hide the main text pane again if we've ended up on a category with only one thumbnail */
					if($('#thumbnailGallery ul li').filter(function() {
						return $(this).width()!==0;
					}).length===1) {
						toggleTextPane();
					}
				});
				toggleThumbs(category);
			});
			toggleItem();
			setThumbsToZeroWidth();
		} else {
			toggleTextPane(true);
			toggleThumbs(category);
		}
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
		return false;
	});

	$('a').click(function(e) {
		var host = window.location.host,
			href = $(this).attr('href'),
			postSlug = getSlug(href);
		if(href.indexOf(host)===-1) {
			return true;
		} else {
			e.preventDefault();
			$('#thumbnailGallery ul li').each(function() {
				if($(this).children('a').attr('href')===href) {
					if($(this).is(':visible')) {
						$(this).click();
					} else {
						// assume we are on a portfolio item
						toggleItem();
						toggleItem(postSlug);
					}
					return false;
				}
			});
			return true;
		}
	});

	$(document).bind("thumbOpened", function(e, thumb) {
		var postSlug = getSlug($(thumb).children('a').attr('href'));
		toggleItem(postSlug);
	});
	
	$('#portfolio').css('min-height',$('#portfolio').height());
});