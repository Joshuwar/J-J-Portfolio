var ANIMATION_DURATION = 500,
	baseThumbWidth,
	portfolioImageOffset;

/* Set up functions */

function createThumbnailGallery() {
	var $thumbGalList,
		href,
		$portImg,
		$topics,
		top,
		left;
	$thumbGal = $('#thumbnailGallery');
	if(!$thumbGal.length) {
		return;
	}
	$thumbGalList = $('<ul></ul>').appendTo($thumbGal);
	$('.portfolioItem').each(function() {
		href = $(this).find('h3 a').attr('href');
		$portImg = $(this).find('img').eq(0);
		$topics = $(this).find('.topics').clone();
		$('<li></li>')
			.addClass('item')
			.appendTo($thumbGalList)
			.append($topics)
			.append('<a href="'+href+'"><img src="'+$portImg.attr('src')+'" alt="'+$portImg.attr('alt')+'" title="'+$portImg.attr('title')+'" /></a>')
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
	baseThumbWidth = parseInt($thumbGalList.find('li').eq(0).css('width'),10);
	portfolioImageOffset = $thumbGal.offset().top;
}

/* Behaviour functions */

function moveRibbon(category) {
	var $ribbon = $('.mockMenu'),
		$targetLi,
		startingLeft = $('.mockMenu').offset().left,
		toLeft,
		href,
		cat;
	if(category) {
		$targetLi = $('.menu li').filter(function() {
			href = $(this).find('a').attr('href');
			cat = getSlug(href);
			if(cat===category) {
				return true;
			}
		});
		toLeft = $targetLi.offset().left - startingLeft;
	} else {
		toLeft = $('h1').offset().left - startingLeft;
	}
	$ribbon.stop().animate({
		left: '+='+toLeft+'px'
	}, ANIMATION_DURATION);
}

function toggleThumbs(toMatch,doNotOpen) {
	var topics,
		matchType,
		$thumbs = $('#thumbnailGallery ul li'),
		$thumb,
		i = 0,
		thumbCount = $thumbs.length,
		width,
		$visibleThumb;
	if(toMatch) {
		topics = getMenuTopics();
		if($.inArray(toMatch,topics)!==-1) {
			matchType = "category";
		} else {
			matchType = "post";
		}
	} else {
		matchType = "all";
	}
	$thumbs.each(function(i, thumb) {
		$thumb = $(thumb);
		if(matchType==="category") {
			topics = $thumb.find('.topics').text().split(",");
			if($.inArray(toMatch,topics)!==-1) {
				width = baseThumbWidth;
			} else {
				width = 0;
			}
		} else if(matchType==="post") {
			href = $thumb.find('a').attr('href');
			href = getSlug(href);
			if(toMatch===href) {
				width = baseThumbWidth;
			} else {
				width = 0;
			}
		} else {
			width = baseThumbWidth;
		}
		$thumb.animate({
			width: width
		}, ANIMATION_DURATION, function() {
			i++;
			if(i===thumbCount) {
				$visibleThumb = $thumbs.filter(function() {
					if($(this).css('width')!=='0px') {
						return true;
					}
				});
				if($visibleThumb.length===1 && !doNotOpen) {
					$visibleThumb.animate({
						'width': '100%'
					}, ANIMATION_DURATION, function() {
						$(document).trigger("thumbsToggled", [this]);
						$('#thumbnailGallery').fadeOut(ANIMATION_DURATION);	
					});
				}
			}
		});
	});
}

function toggleTextPane() {
	$('#mainTextPane').fadeToggle(ANIMATION_DURATION);
}

function toggleItem(postSlug) {
	var href;
	if(postSlug) {
		$('.portfolioItem').each(function(i, item) {
			href = $(this).find('h3 a').attr('href');
			href = getSlug(href);
			if(href===postSlug) {
				$(this).fadeIn();
				return false;
			}
		});
	} else {
		$('.portfolioItem:visible').fadeOut();
	}
}

/* Utility functions */

function pushUnique(item, arr) {
	if($.inArray(item,arr)===-1) {
		return arr.push(item);
	}
}

function getMenuTopics() {
	var topics = [];
	$('.topics').each(function() {
		$.each($(this).text().split(","),function(i, topic) {
			pushUnique(topic,topics);
		});
	});
	return topics;
}

function getSlug(href) {
	return href.substring(href.lastIndexOf('/')+1);
}