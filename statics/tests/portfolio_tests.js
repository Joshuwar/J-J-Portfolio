var data = {};

$.fx.off = true;

$(document).ready(function() {

	module("moveRibbon", {
		setup: function() {
			data.testCategory = "sampleCategory2";
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
	test("given no category, it should scroll to sit at the left of the first li of the menu", function() {
		var expected = $('#menu ul li').eq(0).offset().left,
			actual;
		moveRibbon();
		actual = $('.mockMenu').offset().left;
		equals(actual,expected);
	});
	test("it should make the link in only the selected category have the class 'active'", function() {
		var category = data.testCategory,
			$lis = $('.menu li'),
			expected = $lis.filter(function() {
				return $(this).text()===category;
			}).index(),
			actual;
		moveRibbon(category);
		actual = $lis.filter(function() {
			return $(this).find('a').hasClass('active');
		}).index();
		equals(actual,expected);
		equals($lis.find('a.active').length,1);
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
	test("each li should contain a div with the text of the portfolio item title as the first element", function() {
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem');
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			equals($(this).children().eq(0).filter('div').text(),$portfolioItems.eq(i).find('h1').text());
		});		
	});
	test("each img should get its src and alt from the .portfolioItem item's first img", function() {
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
		});
	});
	test("each img should get its title from the .portfolioItem item's h1's text", function() {
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem'),
			$thumb,
			$portItem;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			$thumb = $(this).find('img');
			$portItem = $portfolioItems.eq(i);
			equals($thumb.attr('title'),$portItem.find('h1').text());
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
	test("each li should get its width (not height) properties from the respective data attributes on the .portfolioItem item's first img; for missing data attributes, don't set an inline style", function() {
		// NOTE: not testing the default case yet
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem'),
			$portImg,
			width;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			$portImg = $portfolioItems.eq(i).find('img').eq(0);
			/*if($portImg.data('height')) {
				equals($(this).css('height'),$portImg.data('height')+'px');
			}*/
			width = $portImg.data('width');
			if(width) {
				equals($(this).css('width'),width+'px');
			}
		});
	});
	test("each img should get its top and left properties from the respective data attributes on the .portfolioItem item's first img; for missing data attributes, don't set an inline style", function() {
		// NOTE: not testing the default case yet
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem'),
			$thumb,
			$portImg,
			offset;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			$thumb = $(this).find('img');
			$portImg = $portfolioItems.eq(i).find('img').eq(0);
			offset = $portImg.data('topoffset');
			if(offset) {
				equals($thumb.css('top'),offset+'px');
			}
			offset = $portImg.data('leftoffset');
			if(offset) {
				equals($thumb.css('left'),offset+'px');
			}
		});
	});
	test("each li should get its background colour from the 'colour' data attribute on the .portfolioItem item's first img; for missing data attributes, don't set an inline style", function() {
		// NOTE: not testing the default case yet
		var $thumbGal = data.thumbGal,
			$portfolioItems = $('.portfolioItem'),
			$portImg,
			colour;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			$portImg = $portfolioItems.eq(i).find('img').eq(0);
			colour = $portImg.data('colour');
			if(colour) {
				if(colour.length===4) { // e.g. #F00
					colour = colour.charAt(0)+colour.charAt(1)+colour.charAt(1)+colour.charAt(2)+colour.charAt(2)+colour.charAt(3)+colour.charAt(3);
				}
				colour = colour.toLowerCase();
				equals(rgb2hex($(this).css('backgroundColor')),colour);
			}
		});
	});
	test("each img should start off with opacity 0", function() {
		var $thumbGal = data.thumbGal;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			equals($(this).find('img').css('opacity'),0);
		});
	});
	test("each li should save its starting width as a data attribute", function() {
		var $thumbGal = data.thumbGal;
		createThumbnailGallery();
		$thumbGal.find('li').each(function(i) {
			equals($(this).css('width'),$(this).data('width'));
		});
	});
	test("each li should contain any element with class 'categories' that is present in the .portfolioItem", function() {
		var $thumbGal = data.thumbGal,
			$categories,
			i,
			$items = $thumbGal.find('.item');
		createThumbnailGallery();
		$categories = $('.portfolioItem').find('.categories');
		$categories.each(function() {
			i = $categories.index(this);
			ok($items.eq(i).find('.categories'));
		});
		// check there are the correct number of created elements
		equals($categories.length,$thumbGal.find('.categories').length);
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
	
	module("addImageNav", {
		setup: function() {
			this.spacingParameter = 10;
			addImageNav(this.spacingParameter);
			this.$imageNav = $('.portfolioItem:eq(0)').show().find('.imageNav');
		},
		teardown: function() {
			$.scrollTo(0);
		}
	});
	
	test("it should scroll the document to the position of the visible portfolio item's image that corresponds to the clicked link (minus any provided spacing parameter)", function() {
		var clickIndex = 1,
			$toClick = this.$imageNav.find('li a:eq('+clickIndex+')'),
			$matchingImg = $('.portfolioItem:eq(0)').find('img').eq(clickIndex),
			toScrollTo = $matchingImg.offset().top-this.spacingParameter;
		$toClick.click();
		equals($(window).scrollTop(),Math.round(toScrollTo));
	});
	
	test("it should scroll the document to 0 if it is the first link that is selected", function() {
		var clickIndex = 0,
			$toClick = this.$imageNav.find('li a:eq('+clickIndex+')'),
			$matchingImg = $('.portfolioItem:eq(0)').find('img').eq(clickIndex),
			toScrollTo = 0;
		$toClick.click();
		equals($(window).scrollTop(),Math.round(toScrollTo));
	});
	
	test("it should scroll the visible nav menu's arrow to the clicked link (taking into account any top offset the arrow already has)", function() {
		var clickIndex = 1,
			$toClick = this.$imageNav.find('li a:eq('+clickIndex+')'),
			$matchingSpan = this.$imageNav.find('span'),
			originalTopOffset = parseInt($matchingSpan.css('top'),10);
		$toClick.click();
		equals($matchingSpan.offset().top, $toClick.offset().top+originalTopOffset);
	});
	
	module("toggleThumbs", {
		setup: function() {
			createThumbnailGallery();
			data.category = "sampleCategory";
			data.postSlug = "woe-books";
			data.thumbGal = $('#thumbnailGallery'),
			data.thumbs = data.thumbGal.find('ul li');
		}
	});
	
	test("it should show the thumbnail gallery if it is not visible", function() {
		var $thumbGal = data.thumbGal.hide();
		toggleThumbs();
		ok($thumbGal.is(":visible"),"thumbnail gallery is visible");
	});
	
	test("given a category, it should reduce the widths of all the thumbs that are not in that category to zero, and change the widths of all the thumbs that do match the category to their width data attribute; all images should have offsets set to their top and left data attributes", function() {
		var category = data.category,
			$thumb,
			$img,
			categories;
		toggleThumbs(category);
		expect(data.thumbs.length*3);
		data.thumbs.each(function(i, thumb) {
			$thumb = $(thumb);
			$img = $thumb.find('img');
			categories = $thumb.find('.categories').text().split(",");
			if($.inArray(category,categories)!==-1) {
				equals($thumb.width()+'px',$thumb.data('width'));
			} else {
				equals($thumb.width(),0);
			}
			equals($img.css('top'),$img.data('top'));
			equals($img.css('left'),$img.data('left'));
		});
	});
	
	test("given a category, it should fade out the visible mainTextPane content and show the content for the category selected", function() {
		var category = data.category,
			$textPane = $('#mainTextPane');
		equals($textPane.find(".categoryContent:visible").length,0);
		toggleThumbs(category);
		equals($textPane.find(".categoryContent:visible").text(),$('#'+category).text());
		ok(!$textPane.find("div:eq(0)").is(":visible"),"root content is invisible");
	});
	
	test("given a post slug, it should reduce the widths of all but the matching thumb to zero and their image offsets to their top and left data attributes, and change the matching thumb's width to its width data attribute and its image offset to 0,0", function() {
		var postSlug = data.postSlug,
			$thumb,
			$img,
			href;
		toggleThumbs(postSlug);
		expect(data.thumbs.length*3);
		data.thumbs.each(function(i, thumb) {
			$thumb = $(thumb);
			$img = $thumb.find('img');
			href = $thumb.find('a').attr('href');
			href = href.substring(href.lastIndexOf('/')+1);
			if(href===postSlug) {
				equals($thumb.width()+'px',$thumb.data('width'));
				equals($img.css('top'),'0px');
				equals($img.css('left'),'0px');
			} else {
				equals($thumb.width(),0);
				equals($img.css('top'),$img.data('top'));
				equals($img.css('left'),$img.data('left'));
			}
		});
	});
	
	test("given no parameter, it should change the width of all the thumbs to their width data attribute and set their left and top offsets to match their respective data attributes", function() {
		var $thumb,
			$img;
		toggleThumbs();
		expect(data.thumbs.length*3);
		data.thumbs.each(function(i, thumb) {
			$thumb = $(thumb);
			$img = $thumb.find('img');
			equals($thumb.width()+'px',$thumb.data('width'));
			equals($img.css('top'),$img.data('top'));
			equals($img.css('left'),$img.data('left'));
		});
	});

	test("given no parameter, it should fade out the visible mainTextPane content and show the original content", function() {
		var $textPane = $('#mainTextPane');
		$textPane.children('div')
			.hide()
			.eq(1)
			.show();
		equals($textPane.find(".categoryContent:visible").length,1);
		toggleThumbs();
		equals($textPane.children("div:visible").text(),$textPane.children().eq(0).text());
	});

	/*test("if only one thumbnail is visible after toggling, increase it's width to 100% and fade it out", function() {
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
	});*/

	test("it should trigger the thumbsToggled event on the document after the animation to change their widths, with the visible thumbs jQuery object as the parameter to the event handler", function() {
		$(document).one("thumbsToggled", function(e, $thumbs) {
			ok(true,"thumbsToggled event triggered");
			equals($thumbs.length,2);
		});
		expect(2);
		toggleThumbs("sampleCategory2");
	});

	/*test("it should trigger the thumbOpened event on the document during the above animation that applies when only one thumb is left visible, at the point where the width is 100%", function() {
		var postSlug = data.postSlug,
			$thumbGal = data.thumbGal,
			parentWidth;
		$(document).one("thumbOpened", function(e, thumb) {
			var $thumb = $(thumb);
			parentWidth = $thumb.parent().width();
			ok($thumbGal.is(":visible"),"thumbnail gallery still visible");
			equals($(thumb).width(),parentWidth);
		});
		expect(2);
		toggleThumbs(postSlug);
	});*/

	test("it should call a provided callback with the visible thumbs, and not trigger the thumbsToggled event in that case", function() {
		var callback = function($thumbs) {
			equals($thumbs.length,2);
		};
		$(document).one("thumbsToggled", function() {
			ok(1);
		});
		expect(1);
		toggleThumbs("sampleCategory2",callback);
		$(document).unbind("thumbsToggled");
	});
	
	module("openThumb", {
		setup: function() {
			createThumbnailGallery();
			data.category = "sampleCategory";
			data.postSlug = "woe-books";
			data.thumbGal = $('#thumbnailGallery'),
			data.thumbs = data.thumbGal.find('ul li');
		}
	});
	
	test("it should stretch the given thumb to 100% width, fade out the thumbGal, toggle the textpane and call toggleItem with the slug for the thumb's item", function() {
		var postSlug = data.postSlug,
			$thumbGal = data.thumbGal,
			$thumbs = data.thumbs,
			$targetThumb,
			tmpToggleTextPane = toggleTextPane,
			tmpToggleItem = toggleItem;
		toggleTextPane = function() {
			ok(1,"toggleTextPane called");
			toggleTextPane = tmpToggleTextPane;
		};
		toggleItem = function() {
			ok(1, "toggleItem called");
			toggleItem = tmpToggleItem;
		};
		expect(5);
		$targetThumb = $thumbs.filter(function() {
			if($(this).find('a').attr('href').indexOf('woe-books')===-1) {
				$(this).hide();
			} else {
				return true;
			}
		});
		equals($targetThumb.length, 1);
		openThumb($targetThumb);
		equals($targetThumb.css('width'),'100%');
		equals($thumbGal.is(":visible"), false);
	});
	
	test("it should fade out all the mainTextPane content divs", function() {
		var $thumbs = data.thumbs,
			$targetThumb = $thumbs.filter(function() {
				if($(this).find('a').attr('href').indexOf('woe-books')===-1) {
					$(this).hide();
				} else {
					return true;
				}
			});
		openThumb($targetThumb);
		equals($('#mainTextPane').children("div:visible").length,0);
	});
	
	module("toggleTextPane", {
		setup: function() {
			data.textPane = $('#mainTextPane');
		}
	});
	
	test("given an ID parameter, it should hide all children div's in the mainTextPane and then show the matching div", function() {
		var $textPane = data.textPane,
			id = "sampleCategory",
			$rootPane = $textPane.children('div').eq(0);
		ok($rootPane.is(':visible'),"the root div starts out visible");
		toggleTextPane(id);
		ok(!$rootPane.is(':visible'),"the root div is invisible");
		ok($('#'+id).is(':visible'),"the matching div is visible");
		equals($('#'+id).css('opacity'),1);
	});
	
	test("given no parameter, it should hide all children div's in the mainTextPane", function() {
		var $textPane = data.textPane;
		toggleTextPane();
		equals($textPane.children('div:visible').length,0);
	});

	/*
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
	
	test("If a parameter is provided, never fade the textpane", function() {
		var $textPane = data.textPane;
		ok($textPane.is(":visible"),"textpane is visible");
		toggleTextPane(true);
		ok($textPane.is(":visible"),"textpane is visible");
	});
	*/
	
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

	test("it should trigger the itemToggled event on the document after the item has faded in or out", function() {
		var postSlug = data.postSlug;
		$(document).one("itemToggled", function(e, item) {
			equals($(item).css('opacity'),1);
		});
		expect(1);
		toggleItem(postSlug);
	});

	
	module("setThumbsToZeroWidth", {
		setup: function() {
			createThumbnailGallery();
			data.thumbs = $('#thumbnailGallery ul li');
		}
	});
	
	test("it should make the thumbs zero width", function() {
		var $thumbs = data.thumbs,
			$nonZeroWidthThumbs = $thumbs.filter(function() {
				return $(this).width()!==0;
			}),
			$zeroWidthThumbs;
		ok($nonZeroWidthThumbs.length);
		setThumbsToZeroWidth();
		$zeroWidthThumbs = $thumbs.filter(function() {
			return $(this).width()===0;
		});
		equals($zeroWidthThumbs.length, $thumbs.length);
	});
	
	module("parseUrl", function() {
	
	});
	
	test("given an external URL, it should understand this as external", function() {
		var actual = parseUrl('http://blahblah.com'),
			expected = {
				host: 'blahblah.com',
				external: true
			};
		equals(actual.host,expected.host);
		equals(actual.external,expected.external);
	});
	
	test("given a URL of '/', it should understand this as 'root'", function() {
		var actual = [
				parseUrl('/')
			],
			expected = {
				slug: '/',
				type: 'root',
				path: '/'
			};
		$.each(actual, function(i,a) {
			equals(a.type,expected.type);
			equals(a.slug,expected.slug);
			equals(a.path,expected.path);
		});
	});
	
	test("given a URL of '/category/<something>', it should understand this as 'category'", function() {
		window.hrefBase = "http://example.com";
		var actual = [
				parseUrl('/category/how-we-work'),
				parseUrl('http://example.com/category/how-we-work')
			],
			expected = {
				type: 'category',
				slug: 'how-we-work',
				path: '/category/how-we-work'
			};
		$.each(actual, function(i,a) {
			equals(a.type,expected.type);
			equals(a.slug,expected.slug);
			equals(a.path,expected.path);
		});
		delete window.hrefBase;
	});
	
	test("given a URL of '/<something-else>/<something>', it should understand this as 'item'", function() {
		var actual = parseUrl('/portfolio-item/biscuits'),
			expected = {
					type: 'item',
					slug: 'biscuits',
					path: '/portfolio-item/biscuits',
					host: ''
				};
		deepEqual(actual,expected);
		window.hrefBase = "http://example.com";
		actual = parseUrl('http://example.com/some-other-post-type/biscuits');
		expected.path = '/some-other-post-type/biscuits';
		expected.host = "";
		deepEqual(actual,expected);
		delete window.hrefBase;
	});
	
	test("given a URL of '/<anything-else>', it should understand this as 'item'", function() {
		window.hrefBase = "http://example.com";
		var actual = [
				parseUrl('/i-broke-the-photo-shoot'),
				parseUrl('http://example.com/i-broke-the-photo-shoot')
			],
			expected = {
				type: 'item',
				slug: 'i-broke-the-photo-shoot',
				path: '/i-broke-the-photo-shoot'
			};
		$.each(actual, function(i,a) {
			equals(a.type,expected.type);
			equals(a.slug,expected.slug);
			equals(a.path,expected.path);
		});
		delete window.hrefBase;
	});
	
	test("given a URL of 'http://localhost/portfolio/category/how-we-work' and a window.hrefBase of 'http://localhost/portfolio', it should understand this as 'category' with slug 'how-we-work'", function() {
		window.hrefBase = "http://localhost/portfolio";
		var actual = [
				parseUrl('http://localhost/portfolio/category/how-we-work')
			],
			expected = {
				type: 'category',
				slug: 'how-we-work',
				path: '/category/how-we-work',
				host: ''
			};
		$.each(actual, function(i,a) {
			deepEqual(a,expected);
		});
		delete window.hrefBase;
	});
	
	test("given a URL of 'http://localhost/portfolio/#/category/how-we-work', it should understand this as 'category' with slug 'how-we-work'", function() {
		window.hrefBase = "http://localhost/portfolio";
		var actual = parseUrl('http://localhost/portfolio/#/category/how-we-work'),
			expected = {
				type: 'category',
				slug: 'how-we-work',
				path: '/category/how-we-work',
				host: ''
			};
		deepEqual(actual, expected);
		delete window.hrefBase;
	});
	
	test("given a URL of 'http://google.com', the returned object should include a host property of 'google.com'", function() {
		var actual = parseUrl('http://google.com').host,
			expected = 'google.com';
		deepEqual(actual, expected);
	});

	module("getCategoriesFromItem");
	
	test("given an item's slug, it should return the categories an item is in", function() {
		var expected = ["sampleCategory2","sampleCategory3"];
			actual = getCategoriesFromItem('woe-books');
		deepEqual(actual, expected);
	});

	module("getMenuItemFromSlug");
	
	test("given an item's slug, it should return the first menu category it is in", function() {
		var expected = "sampleCategory2";
			actual = getMenuItemFromSlug('woe-books');
		equals(actual, expected);
	});

});

//Function to convert hex format to a rgb color
//http://wowmotty.blogspot.com/2009/06/convert-jquery-rgb-output-to-hex-color.html
function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}