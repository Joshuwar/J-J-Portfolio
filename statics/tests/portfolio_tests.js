var data = {};

$.fx.off = true;

$(document).ready(function() {

	module("moveRibbon", {
		setup: function() {
			data.testCategory = "sampleTopic2";
		}
	});
	
	test("given a category, it should scroll the ribbon to the category's place in the nav", function() {
		var category = data.testCategory,
			expected = $('.menu li:eq(1)').offset().left,
			actual;
		moveRibbon(category);
		actual = $('.mockMenu').offset().left;
		equals(actual,expected);
	});
	
	test("given no category, it should scroll to sit over the H1", function() {
		var expected = $('h1').offset().left,
			actual;
		moveRibbon();
		actual = $('.mockMenu').offset().left;
		equals(actual,expected);
	});
	
	module("createThumbnailGallery", {
		setup: function() {
			data.thumbGal = $('#thumbnailGallery');
		}
	});
	
	test("given an element with id 'thumbnailGallery', it should replace the contents with a ul", function() {
		var $thumbGal = data.thumbGal;
		equals($thumbGal.length,1);
		equals($thumbGal.find('ul').length,0);
		createThumbnailGallery();
		equals($thumbGal.find('ul').length,1);
	});
	test("it should create the same number of li elements as there are .portfolioItem elements", function() {
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem');
		createThumbnailGallery();
		equals($thumbGal.find('ul li').length,$portfolioItems.length);
	});
	test("each li should have a class of 'item'", function() {
		var $thumbGal = data.thumbGal;
		createThumbnailGallery();
		$thumbGal.find('li').each(function() {
			ok($(this).hasClass('item'));
		});
	});
	test("each li should contain one img element", function() {
		var $thumbGal = data.thumbGal;
		createThumbnailGallery();
		$thumbGal.find('li').each(function() {
			equals($(this).find('img').length,1);
		});
	});
	test("each img should get its src, alt and title from the .portfolioItem item's first img", function() {
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem'),
			$thumb,
			$portImg;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			$thumb = $(this).find('img');
			$portImg = $portfolioItems.eq(i).find('img').eq(0);
			equals($thumb.attr('src'),$portImg.attr('src'));
			equals($thumb.attr('alt'),$portImg.attr('alt'));
			//equals($thumb.attr('title'),$portImg.attr('title'));
		});
	});
	test("each img that has a top or left css property should have those saved as data attributes", function() {
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem'),
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
		var $thumbGal = data.thumbGal,
			$topics,
			i,
			$items = $thumbGal.find('.item');
		createThumbnailGallery();
		$topics = $('.portfolioItem').find('.topics');
		$topics.each(function() {
			i = $topics.index(this);
			ok($items.eq(i).find('.topics'));
		});
		// check there are the correct number of created elements
		equals($topics.length,$thumbGal.find('.topics').length);
	});
	test("each img should be wrapped in an 'a' tag with the href of the item's page", function() {
		var $thumbGal = data.thumbGal,
			$items = $('.portfolioItem'),
			$imgs,
			$links;
		createThumbnailGallery();
		$imgs = $thumbGal.find('img');
		$links = $imgs.parent('a');
		equals($links.length,$items.length);
	});
	/*test("it should call the callback parameter at the end", function() {
		var callback = function() {
			called = true;
		},
		called = false;
		createThumbnailGallery(callback);
		ok(called);
	});*/
	
	module("toggleThumbs", {
		setup: function() {
			createThumbnailGallery();
			data.category = "sampleTopic";
			data.postSlug = "woe-books";
			data.thumbGal = $('#thumbnailGallery'),
			data.thumbs = data.thumbGal.find('ul li');
		}
	});
	
	test("given a category, it should reduce the widths of all the thumbs that are not in that category to zero, and change the widths of all the thumbs that do match the category to the baseThumbWidth", function() {
		var category = data.category,
			$thumb,
			topics;
		toggleThumbs(category,true);
		expect(data.thumbs.length);
		data.thumbs.each(function(i, thumb) {
			$thumb = $(thumb);
			topics = $thumb.find('.topics').text().split(",");
			if($.inArray(category,topics)!==-1) {
				equals($thumb.width(),baseThumbWidth);
			} else {
				equals($thumb.width(),0);
			}
		});
	});
	
	test("given a post slug, it should reduce the widths of all but the matching thumb to zero, and change the matching thumb to the baseThumbWidth", function() {
		var postSlug = data.postSlug,
			$thumb,
			href;
		toggleThumbs(postSlug,true);
		expect(data.thumbs.length);
		data.thumbs.each(function(i, thumb) {
			$thumb = $(thumb);
			href = $thumb.find('a').attr('href');
			href = href.substring(href.lastIndexOf('/')+1);
			if(href===postSlug) {
				equals($thumb.width(),baseThumbWidth);
			} else {
				equals($thumb.width(),0);
			}
		});
	});
	
	test("given no parameter, it should change the width of all the thumbs to the baseThumbWidth", function() {
		toggleThumbs();
		expect(data.thumbs.length);
		data.thumbs.each(function(i, thumb) {
			equals($(thumb).width(),baseThumbWidth);
		});		
	});

	test("if only one thumbnail is visible after toggling, increase it's width to 100% and fade it out", function() {
		var postSlug = data.postSlug,
			$thumbs = data.thumbs,
			$openedThumbs,
			$thumb,
			width,
			parentWidth;
		toggleThumbs(postSlug);
		$openedThumbs = $thumbs.filter(function() {
			$thumb = $(this);
			width = $thumb.css('width'); // what's weird is that here, the parent (ul) has 0 width, whereas in the next test, the parent's width is reported as a px width; also, the thumb width is reported here as 100%, whereas in the following test, it is reported as the same px width as the parent
			if(width==='100%' && !$thumb.is(":visible")) {
				return true;
			}
		});
		equals($openedThumbs.length,1);
	});

	test("it should trigger the thumbsToggled event on the document during the above animation that applies when only one thumb is left visible, at the point where the width is 100%", function() {
		var postSlug = data.postSlug,
			$thumbGal = data.thumbGal,
			parentWidth;
		$(document).one("thumbsToggled", function(e, thumb) {
			var $thumb = $(thumb);
			parentWidth = $thumb.parent().width();
			console.log($thumb.css('width'));
			ok($thumbGal.is(":visible"),"thumbnail gallery still visible");
			equals($(thumb).width(),parentWidth);
		});
		expect(2);
		toggleThumbs(postSlug);
	});
	
	module("togglePane", {
		setup: function() {
			data.textPane = $('#mainTextPane');
		}
	});
	
	test("If the textpane is visible, make it invisible", function() {
		var $textPane = data.textPane;
		ok($textPane.is(":visible"),"the textpane starts out visible");
		toggleTextPane();
		ok(!$textPane.is(":visible"),"the textpane is no longer visible");
	});
	
	test("If the textpane is invisible, make it visible", function() {
		var $textPane = data.textPane.hide();
		ok(!$textPane.is(":visible"),"the textpane starts out invisible");
		toggleTextPane();
		ok($textPane.is(":visible"),"the textpane is now visible");
	});
	
	
	module("toggleItem", {
		setup: function() {
			data.portfolioItem = $('.portfolioItem:eq(1)');
			data.postSlug = "woe-books";
		}
	});
	test("if there is a slug, make the appropriate portfolio item visible", function() {
		var $portfolioItem = data.portfolioItem,
			postSlug = data.postSlug;
		ok(!$portfolioItem.is(":visible"),"the portfolio item starts out invisible");
		toggleItem(postSlug);
		ok($portfolioItem.is(":visible"),"the portfolio item is now visible");
	});
	
	test("if there is no slug, make the visible portfolio item invisible", function() {
		var $portfolioItem = data.portfolioItem.show();
		ok($portfolioItem.is(":visible"),"the portfolio item starts out visible");
		toggleItem();
		ok(!$portfolioItem.is(":visible"),"the portfolio item is now invisible");
	});
	
	
});