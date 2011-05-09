$.fx.off = true; // JRL: note - testing that an animation took 'animationDuration' ms is hard - hence I am using $.fx.off = true;

$(document).ready(function() {
	
	var $thumbGal;
	
	module("createThumbnailGallery", {
		setup: function() {
			$thumbGal = $('#thumbnailGallery');
		}
	});
	
	test("given an element with id 'thumbnailGallery', it should replace the contents with a ul", function() {
		equals($thumbGal.length,1);
		equals($thumbGal.find('ul').length,0);
		createThumbnailGallery();
		equals($thumbGal.find('ul').length,1);
	});
	test("it should create the same number of li elements as there are .portfolioItem elements", function() {
		var $portfolioItems = $('.portfolioItem');
		createThumbnailGallery();
		equals($thumbGal.find('ul li').length,$portfolioItems.length);
	});
	test("each li should have a class of 'item'", function() {
		createThumbnailGallery();
		$thumbGal.find('li').each(function() {
			ok($(this).hasClass('item'));
		});
	});
	test("each li should contain one img element", function() {
		createThumbnailGallery();
		$thumbGal.find('li').each(function() {
			equals($(this).find('img').length,1);
		});
	});
	test("each img should get its src, alt and title from the .portfolioItem item's first img", function() {
		var $portfolioItems = $('.portfolioItem'),
			$thumb,
			$portImg;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			$thumb = $(this).find('img');
			$portImg = $portfolioItems.eq(i).find('img').eq(0);
			equals($thumb.attr('src'),$portImg.attr('src'));
			equals($thumb.attr('alt'),$portImg.attr('alt'));
			equals($thumb.attr('title'),$portImg.attr('title'));
		});
	});
	test("each img that has a top or left css property should have those saved as data attributes", function() {
		var $portfolioItems = $('.portfolioItem'),
			top,
			left;
		createThumbnailGallery();
		$thumbGal.find('.item img').each(function() {
			top = $(this).css('top');
			left = $(this).css('left');
			if(top!=='auto') {
				equals($(this).data('top'),top);
			}
			if(left!=='auto') {
				equals($(this).data('left'),left);
			}
		});
	});
	test("each li should contain any element with class 'topics' that is present in the .portfolioItem", function() {
		createThumbnailGallery();
		var $topics = $('.portfolioItem').find('.topics'),
			i,
			$items = $thumbGal.find('.item');
		$topics.each(function() {
			i = $topics.index(this);
			ok($items.eq(i).find('.topics'));
		});
		// check there are the correct number of created elements
		equals($topics.length,$thumbGal.find('.topics').length);
	});
	test("it should call the callback parameter at the end", function() {
		var callback = function() {
			called = true;
		},
		called = false;
		createThumbnailGallery(callback);
		ok(called);
	});
	

	/*
		fade out the main text pane
		move the thumbnail to 0,0
		narrow the rest to 0
		widen the clicked image
			fire itemSelected event
			increase height of item whilst fading out the gallery (at this point, all of the 'first item' should be invisible)
	*/
	module("addThumbnailClick", {
		setup: function() {
			$thumbGal = $('#thumbnailGallery');
			createThumbnailGallery(addThumbnailClick);
		},
		teardown: function() {
			$(document).unbind('itemSelected');
			$(document).unbind('itemFaded');
		}
	});

	asyncTest("after a click on a gallery thumb: given an element with id 'mainTextPane', it should make it invisible", function() {
		var $pane = $('#mainTextPane');
		ok($pane.length);
		$(document).bind('itemSelected', function() {	
			equals($pane.css('display'), 'none');
			start();
		});
		$thumbGal.find('.item').eq(1).find('img').click();
	});
	asyncTest("once the animations are complete, it should fire the 'itemSelected' event on the document", 1, function() {
		$(document).bind('itemSelected', function() {
			ok(1);
			start();
		});
		$thumbGal.find('.item').eq(1).find('img').click();
	});
	asyncTest("it should move the thumbnail to 0,0", function() {
		var $toClick = $thumbGal.find('.item').eq(1),
			$img = $toClick.find('img');
		equals($img.css('position'),'relative');
		$img.css({
			top: -50,
			left: -50
		});
		$(document).bind('itemSelected', function() {
			equals($img.css('top'),'0px');
			equals($img.css('left'),'0px');
			start();
		});
		$toClick.click();
	});
	asyncTest("it should make the width of all the other items 0", function() {
		var $toClick = $thumbGal.find('.item').eq(1);
		$(document).bind('itemSelected', function() {
			$toClick.siblings().each(function() {
				ok($(this).width()===0);
				start();
			});
		});
		$toClick.click();
	});
	asyncTest("it should make the width of the clicked item 100%", function() {
		var $toClick = $thumbGal.find('.item').eq(1);
		$(document).bind('itemSelected', function() {
			ok($toClick.css('width')==='100%');
			start();
		});		
		$toClick.click();
	});
	asyncTest("after the itemSelected event is fired, it should increase the clicked item's height to 600px and make the thumbnailGallery invisible at the same time, then fire the 'itemFaded' event", function() {
		var $toClick = $thumbGal.find('.item').eq(1);
		$(document).bind('itemSelected', function() {
			ok($thumbGal.css('display')!=='none');
			// JRL: choosing not to test the height increase, as I'm not sure at the moment what I want it to go to
		});
		$(document).bind('galFaded', function() {
			ok($thumbGal.css('display')==='none');
			start();
		});
		$toClick.click();
	});
	asyncTest("if there is only one item in the thumbnailGallery, it should increase that item's width to 100%", function() {
		var $toClick = $thumbGal.find('.item').eq(0);
		$thumbGal.find('.item').not(':eq(0)').remove();
		$(document).bind('itemSelected', function() {
			ok($toClick.css('width')==='100%',"width is 100%");
			start();
		});
		$toClick.click();
	});
	
	module("createImageNav");
	
	test("it should append an .imageNav div to each .portfolioItem element", function() {
		var $imageNav;
		createImageNav();
		$('.portfolioItem').each(function() {
			$imageNav = $(this).find('.imageNav');
			equals($imageNav.length,1);
		});
	});
	test("it should add an empty span as the first element of the .imageNav", function() {
		var $imageNav;
		createImageNav();
		$('.portfolioItem').each(function() {
			equals($(this).find('.imageNav span').length,1);
		});
	});
	test("it should add a ul to the .imageNav", function() {
		var $imageNav;
		createImageNav();
		$('.portfolioItem').each(function() {
			equals($(this).find('.imageNav ul').length,1);
		});
	});
	test("it should add an li to the ul for each image in the .portfolioItem", function() {
		var $imageNav;
		createImageNav();
		$('.portfolioItem').each(function() {
			equals($(this).find('img').length,$(this).find('.imageNav ul li').length);
		});
	});
	test("it should make the text content of each li the alt tag of the corresponding image", function() {
		var $imageNav,
			$imgs;
		createImageNav();
		$('.portfolioItem').each(function() {
			$imageNav = $(this).next();
			$imgs = $(this).find('img');
			$imageNav.find('ul li').each(function(i) {
				equals($(this).text(),$imgs.eq(i).attr('alt'));
			});
		});
	});
	test("it should call a provided callback", function() {
		var called = false,
			callback = function() {
			called = true;
		};
		createImageNav(callback);
		ok(called);
	});

	/*
		a click handler
		scroll the document to the position of the image that relates to the clicked link (via visibleness or something else?)
		scroll the menu's arrow down to the clicked link
	*/
	module("scrollPortfolioItem", {
		setup: function() {
			createImageNav(function() {
				$('.imageNav li').live('click', scrollPortfolioItem);
			});
			this.$imageNav = $('.portfolioItem:eq(0)').show().find('.imageNav');
		},
		teardown: function() {
			$('.imageNav li').die('click');
		}
	});
	
	test("it should scroll the document to the position of the visible portfolio item's image that corresponds to the clicked link", function() {
		var clickIndex = 1,
			$toClick = this.$imageNav.find('li:eq('+clickIndex+')'),
			$matchingImg = $('.portfolioItem:eq(0)').find('img').eq(clickIndex),
			toScrollTo = $matchingImg.offset().top;
		$toClick.click();
		equals($(window).scrollTop(),Math.round(toScrollTo));
		$.scrollTo(0);
	});
	test("it should scroll the visible nav menu's arrow to the clicked link", function() {
		var clickIndex = 1,
			$toClick = this.$imageNav.find('li:eq('+clickIndex+')'),
			$matchingSpan = this.$imageNav.find('span');
		$toClick.click();
		equals($matchingSpan.offset().top, $toClick.offset().top);
	});
	
	/*
		fade the portfolio item in
	*/
	module("itemSelected");
	
	test("it should fade the selected portfolio item in", function() {
		var selectIndex = 1;
		equals($('.portfolioItem:visible').length,0);
		itemSelected({}, selectIndex);
		ok($('.portfolioItem').eq(selectIndex).is(':visible'));
	});
	
	/*
		bind to click on 'back to grid' button:
			fade out portfolio item
			fire itemDeselected event
	*/
	module("backToGrid", {
		setup: function() {
			backToGrid();
			$thumbGal = $('#thumbnailGallery').hide();
			$('.portfolioItem:eq(0)').show();
		},
		teardown: function() {
			$(document).unbind('itemDeselected');
			$('.backToGrid').die('click');
		}
	});
	
	asyncTest("it should fade out the visible .portfolioItem", function() {
		var $portItem = $('.portfolioItem:visible');
		equals($portItem.length,1);
		$(document).bind('itemDeselected', function() {
			equals($portItem.css('display'),'none');
			start();
		});
		$toClick = $('.backToGrid:visible');
		equals($toClick.length,1);
		$toClick.click();
	});
	asyncTest("it should fire the itemDeselected event when the fade is complete", function() {
		$(document).bind('itemDeselected', function() {
			ok(1);
			start();
		});
		$('.backToGrid:visible').click();
	});
	
	module("backToGridClick", {
		setup: function() {
			$thumbGal = $('#thumbnailGallery').hide();
			$('.portfolioItem:eq(0)').show();
		},
		teardown: function() {
			$(document).unbind('itemDeselected');
		}
	});
	
	asyncTest("it should pass a provided topic paramter to the itemDeselected event", function() {
		var topic = "sampleTopic";
		$(document).bind('itemDeselected', function(e, data) {
			ok(data.topic);
			start();
		});
		backToGridClick(topic);
	});
	
	/*
		bind to itemDeselected:
			make thumbnailGallery visible
			animate height of gallery down to a thin strip
				animate width to normal
				animate width of other thumbnails to normal
				fade in main text pane
	*/
	
	module("itemDeselected", {
		setup: function() {
			createThumbnailGallery();
			$(document).bind('itemDeselected', itemDeselected);
			$thumbGal = $('#thumbnailGallery').hide();
			$thumbGal.find('.item:eq(0)')
				.css('width','100%')
				.addClass('selected')
				.siblings()
				.css('width', 0);baseItemWidth
		},
		teardown: function() {
			$(document).unbind('itemDeselected');
			$(document).unbind('galShown');
			$(document).unbind('galRestored');
		}
	});

	asyncTest("when itemDeselected is fired, thumbnailGallery should fade in", 1, function() {
		$(document).bind('galShown', function() {
			equals($thumbGal.css('display'),'block');
			start();
		});
		$(document).trigger('itemDeselected');
	});
	asyncTest("the height of the visible thumbnailGallery item should reduce to its default height at the same time as it fades in", function() {
		$(document).bind('galShown', function() {
			var standardHeight;
			$thumbGal.find('.item').each(function(i) {
				if(i===0) {
					standardHeight = $(this).css('height');
				} else {
					equals($(this).css('height'),standardHeight);
				}
			});
			start();
		});
		$(document).trigger('itemDeselected');
	});
	asyncTest("after the height animation, the 'galShown' event should be fired", function() {
		$(document).bind('galShown', function() {
			ok(1);
			start();
		});
		$(document).trigger('itemDeselected');
	});
	asyncTest("after the height animation, all thumbnails should return to their default width", function() {
		$(document).bind('galRestored', function() {
			$thumbGal.find('.item').each(function() {
				ok($(this).css('width')===baseItemWidth);
			});
			start();
		});
		$(document).trigger('itemDeselected');
	});
	test("it should not restore thumbnails that don't match a provided topic", function() {
		var topic = "sampleTopic",
			$toOmit = $thumbGal.find('.item').filter(function() {
				return $(this).find('.topics').text().indexOf(topic)===-1;
			});
		ok($toOmit.length,"there are items that shouldn't be restored");
		$(document).bind('galRestored', function() {
			$toOmit.each(function() {
				equals($(this).css('width'),'0px');
			});
		});
		$(document).trigger('itemDeselected', {
			topic: topic
		});
	});
	test("it should restore all thumbnails if no topic is provided", function() {
		var startingItemsCount = $thumbGal.find('.item').length;
		$(document).bind('galRestored', function() {
			equals($thumbGal.find('.item:visible').length,startingItemsCount);
		});
		$(document).trigger('itemDeselected');
	});
	asyncTest("if should not require a thumbnail to be selected to restore all thumbnails", function() {
		var startingItemsCount = $thumbGal.find('.item').length;
		$thumbGal.find('.item:eq(0)')
			.css('width',baseItemWidth)
			.removeClass('selected')
			.siblings()
			.css('width',baseItemWidth);
		$(document).bind('galRestored', function() {
			expect(1);
			equals($thumbGal.find('.item:visible').length,startingItemsCount);
			start();
		});
		$(document).trigger('itemDeselected');
		
	});
	asyncTest("after the height animation, the selected thumbnail should return to its default position", function() {
		var $img = $('.item.selected img');
		$img.css({
			top: 0,
			left: 0
		});
		$(document).bind('galRestored', function() {
			var top = $img.data('top'),
				left = $img.data('left');
			if(top) {
				equals($img.css('top'),top);
			}
			if(left) {
				equals($img.css('left'),left);
			}
			start();
		});
		$(document).trigger('itemDeselected');
	});
	asyncTest("after the height animation, the mainTextPane should fade in", function() {
		$(document).bind('galRestored', function() {
			ok($('#mainTextPane').is(':visible'));
			start();
		});
		$(document).trigger('itemDeselected');
	});
	asyncTest("after the above animations, the 'galRestored' event should be fired", function() {
		$(document).bind('galRestored', function() {
			ok(1);
			start();
		});
		$(document).trigger('itemDeselected');
	});
	
	module("minimiseItems", {
		setup: function() {
			$thumbGal = $('#thumbnailGallery');
			createThumbnailGallery();
		}
	});
	
	test("it should shrink all the items that don't have .topics elements containing a match for the provided topic to width 0", function() {
		var topic = "sampleTopic",
			toValidate = false;
		ok($thumbGal.find('.item .topics').length,'there are .topics elements');
		minimiseItems(topic);
		$thumbGal.find('.item').filter(function() {
			return $(this).find('.topics').text().indexOf(topic)===-1;
		}).each(function() {
			ok($(this).css('width')==='0px','shrunk');
		});
	});
	
	test("it should not shrink an item that has a .topics element containing a match for the provided topic", function() {
		var topic = "sampleTopic";
		minimiseItems(topic);
		$thumbGal.find('.item').filter(function() {
			return $(this).find('.topics').text().indexOf(topic)!==-1;
		}).each(function() {
			ok($(this).css('width')!=='0px','not shrunk');
		});
	});
	
	test("it should restore any matching items that are not at their default width", function() {
		var topic = "sampleTopic",
			$items = $thumbGal.find('.item').filter(function() {
				return $(this).find('.topics').text().indexOf(topic)!==-1;
			});
		$items.css('width','0px');
		minimiseItems(topic);
		$items.each(function() {
			ok($(this).css('width')!=='0px','not shrunk');
		});
	});

	module("restoreItems", {
		setup: function() {
			$thumbGal = $('#thumbnailGallery');
			createThumbnailGallery();
		}
	});
	
	test("it should animate all items back to their default width if they are not already that wide", function() {
		minimiseItems("sampleTopic");
		ok($thumbGal.find('.item').filter(function() {
			return $(this).css('width')==='0px';
		}).length, "there are items to restore");
		restoreItems();
		equals($thumbGal.find('.item').filter(function() {
			return $(this).css('width')==='0px';
		}).length,0);
	});

});