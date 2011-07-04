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
		var href = $(this).href;
		if(href)
		e.preventDefault(); // NOTE: external links shouldn't do this
		$.scrollTo(0, ANIMATION_DURATION);
		location = parseUrl(window.location.href);
		destination = parseUrl(href);
		transition = transitions[location.type][destination.type];
		window.location.hash = destination.path;
		transition(destination,location);
		return false;
	});
	
	$('#thumbnailGallery a').click(function() {
		$(this).find('img').css({
			opacity: 1
		});
	});
	
	$('#thumbnailGallery ul li').hover(function() {
		if($(this).is(":animated")) {
			return false;
		}
		$(this)
			.find('img')
			.stop(false, true)
			.animate({
				opacity: 0
			}, 0);
	}, function() {
		$(this)
			.find('img')
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