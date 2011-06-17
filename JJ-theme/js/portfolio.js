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
	$('#thumbnailGallery').show();
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
				$(document).trigger("thumbsToggled");
				if($visibleThumb.length===1 && !doNotOpen) {
					$visibleThumb.animate({
						'width': '100%'
					}, ANIMATION_DURATION, function() {
						$(document).trigger("thumbOpened", [this]);
						$('#thumbnailGallery').fadeOut(ANIMATION_DURATION);	
					});
				}
			}
		});
	});
}

function toggleTextPane(doNotFade) {
	var $textPane = $('#mainTextPane');
	if(!doNotFade || !$textPane.is(":visible")) {
		$textPane.fadeToggle(ANIMATION_DURATION);
	}
}

function toggleItem(postSlug) {
	var href;
	if(postSlug) {
		$('.portfolioItem').each(function(i, item) {
			href = $(this).find('h3 a').attr('href');
			href = getSlug(href);
			if(href===postSlug) {
				$(this).fadeIn(ANIMATION_DURATION, function() {
					$(document).trigger("itemToggled", [item]);
				});
				return false;
			}
		});
	} else {
		$('.portfolioItem:visible').fadeOut(ANIMATION_DURATION, function() {
			$(document).trigger("itemToggled", [postSlug]);
		});
	}
}

function setThumbsToZeroWidth() {
	$('#thumbnailGallery ul li').width(0);
}

function parseUrl(url) {
	var uri,
		path,
		i = url.indexOf('#'),
		slug;
	if(i!==-1) {
		url = url.substring(i+1, url.length);
	} else if(window.hrefBase && url.indexOf(window.hrefBase===0)) {
		url = url.substring(window.hrefBase.length, url.length);
	}
	uri = parseUri(url);
	path = uri.path;
	if(path==="" || path==="/") {
		return {
			type: 'root',
			slug: '/',
			path: '/'
		};
	} else {
		i = path.indexOf("/category/");
		if(i===0) {
			return {
				type: "category",
				slug: path.substring(i+10,path.length),
				path: path // 10 being length of "/category/"
			};
		} else {
			i = path.lastIndexOf('/');
			if(i!==path.length-1) {
				slug = path.substring(i+1,path.length);
			} else {
				i = path.lastIndexOf('/',path.length-1);
				slug = path.substring(i+1,path.length-1);
			}
			return {
				type: "item",
				slug: slug,
				path: path
			};
		}
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

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
