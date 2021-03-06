/*
	Note: all portfolio items need their first image to have a valid src, otherwise this will cause problems (at least in Chrome and Firefox) - the images won't fire their load event. In Chrome, this is a problem straight away; in Firefox, it happens when you refresh the page.
	
	Note: there are effectively two files mixed up here: the library for the portfolio, and the app.js that uses it; they need pulling apart
	
	Note: minimiseItems and backToGridClick (itemDeselected) do similar things - they shrink or grow gallery items

	Need testing:
	Next button should load next item in chosen category (means I need to handle links) - the PHP needs to put <a> tags inside the <h3>'s of portfolio items
	Hire us link should open hire us page (and move ribbon to hire us) - it will do if the PHP spits out the Hire Us permalink
	
	TO-DO:
	header should stop being position:fixed when there is 1px gap between it and the footer
	block hover state - a fast fade to black or dark grey with the excerpt in white?
	frag-id nav babies
	make the thumbnail gallery extend vertically whilst it fades?
	auto-open the most recent item if nothing happens on landing?
*/

var animationDuration = 500,
	$thumbGal,
	baseItemWidth,
	animating = false,
	portfolioImageOffset,
	navSpanTopOffset,
	hasTopic = function(item, topic) {
		var topics = $(item).find('.topics').text().split(',');
		return $.inArray(topic, topics)!==-1;
	},
	createThumbnailGallery = function(callback) {
		var $thumbGalList,
			$portImg,
			$topics,
			top,
			left;
		$thumbGal = $('#thumbnailGallery').css({
			position: 'absolute'
		});
		if(!$thumbGal.length) {
			return;
		}
		$thumbGalList = $('<ul></ul>').appendTo($thumbGal);
		$('.portfolioItem').each(function() {
			$portImg = $(this).find('img').eq(0);
			$topics = $(this).find('.topics').clone();
			$('<li></li>')
				.addClass('item')
				.appendTo($thumbGalList)
				.append($topics)
				.append('<img src="'+$portImg.attr('src')+'" alt="'+$portImg.attr('alt')+'" title="'+$portImg.attr('title')+'" />')
				.find('img')
				.each(function() {
					top = $(this).css('top');
					if(top!=='auto') {
						$(this).data('top',top);
					}
					left = $(this).css('left');
					if(left!=='auto') {
						$(this).data('left',left);
					}
				});
		});
		baseItemWidth = $thumbGalList.find('li').eq(0).css('width');
		portfolioImageOffset = $thumbGal.offset().top;
		if(callback) {
			callback();
		}
	},
	addThumbnailClick = function() {
		$('.item').click(function() {
			if(animating) {
				return false;
			}
			animating = true;
			var $item = $(this).addClass('selected'),
				$toAnimate = $item.find('img'),
				animateLimit,
				animationCallback = function() {
					$item.animate({
						width: '100%'
					}, animationDuration, function() {
						$(document).trigger('itemSelected', $('.item').index($item));
						$thumbGal.fadeOut(animationDuration, function() {
							animating = false;
							$(document).trigger('galFaded', {
								$item: $item
							});
						});				
					});
				};
			$('#mainTextPane').fadeOut(animationDuration);
			$toAnimate.animate({
				top: 0,
				left: 0
			}, animationDuration);
			$toAnimate = $item.siblings();
			animateLimit = $toAnimate.length;
			if($toAnimate.length) {
				$toAnimate.animate({
					width: 0
				}, animationDuration, function() {
					animateLimit--;
					if(animateLimit===0) {
						animationCallback();
					}
				});
			} else {
				animationCallback();
			}
		});
	},
	createImageNav = function(callback) {
		var $imageNav;
		$('.portfolioItem').each(function() {
			$imageNav = $('<div class="imageNav"><span></span><ul></ul></div>').appendTo(this).find('ul');
			$(this).find('img').each(function() {
				$('<li>'+$(this).attr('alt')+'</li>').appendTo($imageNav);
			});
		});
		if(callback) {
			callback();
		}
	},
	scrollPortfolioItem = function(e) {
		// move to the matching image
		var $imageNav = $('.imageNav:visible'),
			$navSpan = $imageNav.find('span'),
			index = $imageNav.find('li').index(e.target),
			$targetImg = $('.portfolioItem:visible img').eq(index),
			toScrollTo = $targetImg.offset().top-portfolioImageOffset;
		if(!navSpanTopOffset) {
			navSpanTopOffset = parseInt($navSpan.css('top'),10);
		}
		$.scrollTo(toScrollTo, animationDuration, function() {
			animating = false;
		});
		// move the imageNav arrow to the selected link
		$navSpan.animate({
			top: $(e.target).position().top+navSpanTopOffset
		});
	},
	itemSelected = function(e, index) {
		$('.portfolioItem').eq(index).fadeIn(animationDuration);
	},
	backToGrid = function() {
		$('.backToGrid').live('click', function() {
			if(animating) {
				return false;
			}
			animating = true;
			var eventData = {};
			$('.portfolioItem:visible').fadeOut(animationDuration);
			topic = $('ul.menu a.selected').text(); // JRL: oh-oh, I've introduced an element from the menu bar into the core portfolio functions! Bad!
			if(topic) {
				eventData.topic = topic;
			}
			$(document).trigger('itemDeselected', eventData); // I'm beginning to think this event is not useful
			return false;
		});
	},
	backToGridClick = function(topic) {
		var eventData = {};
		animating = true;
		if(topic) {
			eventData.topic = topic;
		}
		$('.portfolioItem:visible').fadeOut(animationDuration);
		$(document).trigger('itemDeselected', eventData);
	},
	itemDeselected = function(e, data) {
		var $item = $('#thumbnailGallery .item.selected'),
			$itemSiblings = $item.length ? $item.siblings() : $('#thumbnailGallery .item'),
			topic = data ? data.topic : "",
			secondAnimationCallback = function() {
				$('#mainTextPane').fadeIn(animationDuration, function() {
					animating = false;
					$(document).trigger('galRestored');
				});
			},
			firstAnimationCallback = function() {
				var animateProperties = {},
					$img = $item.find('img'),
					top = $img.data('top'),
					left = $img.data('left'),
					itemWidth;
				$(document).trigger('galShown');
				if(top) {
					animateProperties.top = parseInt(top,10);
				}
				if(left) {
					animateProperties.left = parseInt(left,10);
				}
				$img.animate(animateProperties, animationDuration);
				$itemSiblings.filter(function() {
					if(topic) {
						return hasTopic(this,topic);
					} else {
						return true;
					}
				}).animate({
					width: baseItemWidth
				}, animationDuration);
				if($item.length) {
					if(!topic || hasTopic($item,topic)) {
						itemWidth = baseItemWidth;
					} else {
						itemWidth = 0;
					}
					$item.animate({
						width: itemWidth
					}, animationDuration, secondAnimationCallback);
				} else {
					window.setTimeout(secondAnimationCallback,animationDuration);
				}
			};
		$('#thumbnailGallery').fadeIn(animationDuration);
		if($item.length) {
			$item
				.removeClass('selected')
				.animate({
					height: $itemSiblings.eq(0).css('height')
				}, animationDuration, firstAnimationCallback);
		} else {
			window.setTimeout(firstAnimationCallback,animationDuration);
		}
		
	},
	minimiseItems = function(topic) {
		var $thumbGal = $('#thumbnailGallery'),
			$toAnimate =  $thumbGal.find('.item'),
			$notMinimised,
			animateLimit = $toAnimate.length,
			animationCallback = function() {
				animateLimit--;
				if(animateLimit===0) {
					animating = false;
					$notMinimised = $thumbGal.find('.item').filter(function() {
						return parseInt($(this).css('width'),10)!==0;
					});
					if($notMinimised.length==1) {
						$notMinimised.click();
					}
				}
			};
		$toAnimate.each(function() {
			if(topic && !hasTopic(this,topic)) {
				$(this).animate({
					width: 0
				}, animationDuration, animationCallback);
			} else {
				if($(this).css('width')!==baseItemWidth) {
					$(this).animate({
						width: baseItemWidth
					}, animationDuration, animationCallback);
				} else {
					animateLimit--;
				}
			}
		});
	},
	restoreItems = function() {
		$('#thumbnailGallery').find('.item').filter(function() {
			return $(this).css('width')==='0px';
		}).animate({
			width: baseItemWidth
		}, animationDuration);
	}

$(document).ready(function() {

	/* set up the nav menu */
	if($('#header').length) {
		var $mockMenu = $('<ul class="mockMenu"><li><a href="#"></a></li></ul>')
			.insertAfter('ul.menu'),
			$visiblePortfolio,
			topic,
			moveRibbon = function(elem) {
				var $elem = $(elem);
				$mockMenu.animate({
					left: parseInt($elem.offset().left,10)
				}, animationDuration, function() {
					$elem.css('color', 'inherit')
						.addClass('selected')
						.closest('li')
						.siblings()
						.children('a')
						.removeClass('selected')
						.css('color','');
				});				
			};
		$('ul.menu a').click(function(e) {
			e.preventDefault();
			if(animating) {
				return false;
			}
			animating = true;
			moveRibbon(this);
			$visiblePortfolio = $('.portfolioItem:visible');
			topic = $(this).text();
			if($visiblePortfolio.length) {
				backToGridClick(topic);
				$(document).one('galRestored', function() {
					minimiseItems(topic);
				});
			} else {
				minimiseItems(topic);
			}
			return false;
		});
		$('h1').click(function(e) {
			e.preventDefault();
			if(animating) {
				return false;
			}
			animating = true;
			$mockMenu.animate({
				left: 0
			});
			$(this).siblings('ul').find('a').css('color','');
			$visiblePortfolio = $('.portfolioItem:visible');
			if($visiblePortfolio.length) {
				backToGridClick();
			} else {
				minimiseItems();
			}
			return false;
		});
		$('a').click(function(e) {
			var href = $(this).attr('href'),
				$matchingPortfolioItem,
				$matchingThumbnail;
			if(!href || href==='#') {
				return true;
			}
			$matchingPortfolioItem = $('.portfolioItem h3 a').filter(function() {
				return $(this).attr('href')===href;
			}).closest('.portfolioItem');
			$matchingThumbnail = $('.item').eq($('.portfolioItem').index($matchingPortfolioItem));
			if($matchingThumbnail.length) {
				e.preventDefault();
				if($('.portfolioItem:visible').length) {
					// hide the visible portfolio
					backToGridClick();
					$(document).one('galRestored', function() {
						$matchingThumbnail.click();
					});
				} else {
					$matchingThumbnail.click();
				}
			} else {
				// no match for this href
			}
		});
		$(document).bind('galFaded', function(e, data) {
			var $item = data.$item;
			$('ul.menu a').each(function() {
				topic = $(this).text();
				if(hasTopic($item,topic)) {
					moveRibbon(this);
					return false;
				}
			});
		});
	}
	
	/*	portfolio:

		note about positioning: the thumbnail gallery and accompanying text sit absolutely in the top-left - they just fades in and out, and animate
		note about visibility: the portfolio items only fade in and out in their entirety; the first item text pane and gallery fade in and out independently: when opening an item, the text pane fades away first; when closing an item, the gallery fades away first
	
		turn the list into the thumbnail gallery
		create the gallery nav menu for the portfolio items
			add the click behaviours:
				fade out the main text pane
				widen the clicked image
				narrow the rest to 0
					fire itemSelected event
					increase height of item whilst fading out the gallery (at this point, all of the 'first item' should be invisible)
		fade the images in when they are loaded
		bind to itemSelected:
			fade the portfolio item in
		bind to click on portfolio item nav (live):
			scroll to the position of the image that relates to the clicked link (via visibleness or something else?)
			scroll the menu's arrow down to the clicked link
		bind to click on 'back to grid' button:
			fade out portfolio item
			fire itemDeselected event
		bind to itemDeselected:
			make first item gallery visible
			animate height of gallery down to a thin strip
				animate width to normal
				animate width of other thumbnails to normal
				fade in main text pane
	*/
	if($('#portfolio').length) {
		createThumbnailGallery(function() {
			addThumbnailClick();
			backToGrid();
		});
		createImageNav(function() {
			$('.imageNav').find('li').live('click', function(e) {
				if(animating) {
					return false;
				}
				animating = true;
				scrollPortfolioItem.apply(this,arguments);
			});
		});
		$('img').hide().imagesLoaded(function() {
			$(this).fadeIn(animationDuration);
		});
		$(document).bind('itemSelected', itemSelected);
		$(document).bind('itemDeselected', itemDeselected);
	}
});

// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length;
      
  elems.bind('load',function(){
      if (--len <= 0){ callback.call(elems,this); }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        this.src = src;
     }  
  }); 

  return this;
};
