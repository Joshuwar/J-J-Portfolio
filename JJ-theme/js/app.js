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
		toggleThumbs(item,openThumb);
	},
	categoryToRoot = categoryToCategory,
	itemToCategory = function(dest) {
		var cat = dest.slug;
		if(cat==="/") {
			cat = "";
		}
		$(document).one('itemToggled', function(e) {
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
		transition,
		getFragID = function getFragID() {
			return window.location.hash.replace(/^#/,"");
		};
	
	$('#menu li').eq(0).children('a').addClass('active');
	
	createThumbnailGallery();
	addImageNav(10);
	
	startWatchingHash(function(currentHash, newHash) {
		var location = parseUrl(currentHash),
			destination = parseUrl(newHash),
			transition = transitions[location.type][destination.type];
		if(transition) {
			$.scrollTo(0, ANIMATION_DURATION);
			transition(destination,location);
		}
	});

	$('a').click(function(e) {
		var rel = $(this).attr('rel'),
			href = $(this).attr('href'),
			parsed = parseUrl(href);
		if(parsed.external) {
			return true;
		}
		e.preventDefault();
		if(rel && rel==="self") { // accommodate imageNav links
			return true;
		}
		setFragID(parsed.path);
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
				opacity: 1 // opacity of image on mouseover
			}, 100);
	}, function() {
		$(this)
			.find('img')
			.animate({
				opacity: 0 // opacity of image on mouseout
			}, ANIMATION_DURATION);
	});
	
	$(document).bind("thumbsToggled", function(e, $thumbs) {
		var href,
			parsed;
		if($thumbs.length===1) {
			href = $thumbs.find('a').attr('href');
			parsed = parseUrl(href);
			setFragID(parsed.path);
		}
	});
	
	//$('#portfolio').css('min-height',$('#portfolio').height()); // JRL: setting this in CSS for now
	$('#mainTextPane').css('position','absolute');
});