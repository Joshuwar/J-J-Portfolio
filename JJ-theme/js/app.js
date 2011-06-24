/*
	v4
*/
var categoryToCategory = function(dest) {
		var cat = dest.slug;
		if(cat==="/") {
			cat = "";
		}
		moveRibbon(cat);
		toggleThumbs(cat);
	},
	rootToCategory = categoryToCategory,
	categoryToItem = function(dest) {
		var item = dest.slug,
			cat = getMenuItemFromSlug(item);
		moveRibbon(cat);
		toggleThumbs(item); // toggleItem happens if there is only one item showing after this has completed - see 'thumbOpened' event binding below
		//toggleTextPane();
	},
	categoryToRoot = categoryToCategory,
	itemToCategory = function(dest) {
		var cat = dest.slug;
		if(cat==="/") {
			cat = "";
		}
		$(document).one('itemToggled', function(e) {
			toggleTextPane();
			toggleThumbs(cat);
		});
		moveRibbon(cat);
		toggleItem();
	},
	itemToRoot = itemToCategory,
	itemToItem = function(dest) {
		var item = dest.slug,
			cat = getMenuItemFromSlug(item);
		moveRibbon(cat);
		$(document).one('itemToggled', function(e) {
			toggleItem(item);		
		});
		toggleItem();
	},
	transitions = {
		root: {
			root: null,
			category: rootToCategory,
			item: categoryToItem
		},
		category: {
			root: categoryToRoot,
			category: categoryToCategory,
			item: categoryToItem
		},
		item: {
			root: itemToRoot,
			category: itemToCategory,
			item: itemToItem
		}
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
		return false;
	});
	
	$('#thumbnailGallery ul li').hover(function() {
		$(this)
			.find('img')
			.stop()
			.animate({
				opacity: 0
			}, 0);
	}, function() {
		$(this)
			.find('img')
			.stop()
			.animate({
				opacity: 1
			}, ANIMATION_DURATION);
	});
	
	$(document).bind('thumbOpened', function(e, thumb) {
		var href = $(thumb).find('a').attr('href'),
			slug = getSlug(href),
			destination = parseUrl(href);
		window.location.hash = destination.path;
		toggleTextPane();
		toggleItem(slug);
	});
	
	$('#portfolio').css('min-height',$('#portfolio').height());
	$('#mainTextPane').css('position','absolute');
});