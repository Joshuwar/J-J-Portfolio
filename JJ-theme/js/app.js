/*
	v4
*/
var rootToCategory = function(dest) {
		var cat = dest.slug;
		moveRibbon(cat);
		toggleThumbs(cat);
	},
	categoryToCategory = function(dest) {
		var cat = dest.slug;
		moveRibbon(cat);
		toggleThumbs(cat);
	},
	categoryToItem = function(dest) {
		var item = dest.slug;
		// NOTE: we need to get the topic from the item, perhaps before entering this function
		/*	topics = $(this).children('.topics').text().split(","),
			menuTopics = getMenuTopics(),
			topic;
		$.each(menuTopics, function(i, menuTopic) {
			if($.inArray(menuTopic,topics)!==-1) {
				topic = menuTopic;
				return false;
			}
		});*/
		//moveRibbon(cat);
		toggleThumbs(item);
		// NOTE: we need to do toggleItem(id) after toggleThumbs has finished
		toggleTextPane();
	},
	transitions = {
		root: {
			root: null,
			category: rootToCategory,
			item: categoryToItem
		},
		category: {
			root: null,
			category: categoryToCategory,
			item: categoryToItem
		},
		item: null
	};

$(document).ready(function() {
	
	var location,
		destination,
		transition;
		
	window.location.hash = "";
	
	createThumbnailGallery();
		
	$('a').click(function(e) {
		e.preventDefault(); // NOTE: external links shouldn't do this
		location = parseUrl(window.location.href);
		destination = parseUrl($(this).attr('href'));
		transition = transitions[location.type][destination.type];
		window.location.hash = destination.path;
		transition(destination,location);
	});
	
	$('#portfolio').css('min-height',$('#portfolio').height());
});