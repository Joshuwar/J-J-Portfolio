var ANIMATION_DURATION = 500,
	portfolioImageOffset,
	navSpanTopOffset;

/* Set up functions */

function createThumbnailGallery() {
	var $thumbGalList,
		$itemHeading,
		href,
		itemTitle,
		$portImg,
		$categories,
		top,
		left,
		width,
		offset,
		colour;
	$thumbGal = $('#thumbnailGallery');
	if(!$thumbGal.length) {
		return;
	}
	$thumbGalList = $('<ul></ul>').appendTo($thumbGal);
	$('.portfolioItem').each(function() {
		$itemHeading = $(this).find('h1');
		href = $itemHeading.find('a').attr('href');
		itemTitle = $itemHeading.text();
		$portImg = $(this).find('img').eq(0);
		$categories = $(this).find('.categories').clone();
		$('<li></li>')
			.addClass('item')
			.each(function() {
				/*if($portImg.data('height')) {
					$(this).css('height',$portImg.data('height'));
				}*/
				colour = $portImg.data('colour');
				if(colour) {
					$(this).css('backgroundColor',colour);
				}
				width = $portImg.data('width');
				if(width) {
					$(this).css('width',width);
				}
				width = $(this).css('width');
				if(width!=='auto') {
					$(this).data('width',width);
				}
			}).appendTo($thumbGalList)
			.append('<div class="itemTitle">'+itemTitle+'</div>')
			.append($categories)
			.append('<a href="'+href+'"><img src="'+$portImg.attr('src')+'" alt="'+$portImg.attr('alt')+'" title="'+itemTitle+'" /></a>')
			.find('img')
			.each(function() {
				$(this).css('opacity',0);
				offset = $portImg.data('topoffset');
				if(offset) {
					$(this).css('top',offset);
				}
				offset = $portImg.data('leftoffset');
				if(offset) {
					$(this).css('left',offset);
				}
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
	portfolioImageOffset = $thumbGal.offset().top;
}

function addImageNav(spacingParameter) {
	$('.portfolioItem .imageNav a').click(function(e) {
		var $imageNav = $(this).closest('.imageNav'),
			$portfolioItem = $(this).closest('.portfolioItem'),
			$navSpan = $imageNav.find('span'),
			index = $imageNav.find('a').index(e.target),
			$targetImg = $portfolioItem.find('img').eq(index),
			toScrollTo = $targetImg.offset().top;
			if(index===0) {
				toScrollTo = 0;
			} else if(spacingParameter) {
				toScrollTo -= spacingParameter;
			}
		$.scrollTo(toScrollTo, ANIMATION_DURATION);
		
		// move the imageNav arrow to the selected link
		if(!navSpanTopOffset) {
			navSpanTopOffset = parseInt($navSpan.css('top'),10);
		}
		$navSpan.animate({
			top: $(e.target).position().top+navSpanTopOffset -5 // JB DEBUG - put the -5 on so that the arrow animates to the right place
		}, ANIMATION_DURATION);
	});
}

/* Behaviour functions */

function moveRibbon(category) {
	var $ribbon = $('.mockMenu'),
		$targetLi,
		startingLeft = $('.mockMenu').offset().left,
		toLeft,
		href,
		cat;
	if(!moveRibbon.home) {
		moveRibbon.home = $('#menu ul li').eq(0).offset().left;
	}
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
		$targetLi = $('.menu li:eq(0)');
		toLeft = moveRibbon.home - startingLeft;
	}
	$ribbon.stop().animate({
		left: '+='+toLeft+'px'
	}, ANIMATION_DURATION, function() {
		$targetLi.find('a').addClass('active');
	});
	$targetLi.siblings().children('a').removeClass('active');
}

function toggleThumbs(toMatch,callback) {
	var categories,
		matchType,
		$textPane = $('#mainTextPane'),
		$thumbs = $('#thumbnailGallery ul li'),
		$thumb,
		i = 0,
		thumbCount = $thumbs.length,
		$visibleThumbs,
		baseThumbWidth,
		baseThumbTop,
		baseThumbLeft;
	$('#thumbnailGallery').show();
	if(toMatch) {
		categories = getMenuCategories();
		if($.inArray(toMatch,categories)!==-1) {
			matchType = "category";
			toggleTextPane(toMatch);
		} else {
			matchType = "post";
			toggleTextPane();
		}
	} else {
		matchType = "all";
		toggleTextPane("root");
	}
	$thumbs.each(function(i, thumb) {
		var $img,
			width,
			top,
			left;
		$thumb = $(thumb);
		$img = $thumb.find('img');
		baseThumbWidth = $thumb.data('width');
		baseImgTop = $img.data('top');
		baseImgLeft = $img.data('left');
		top = baseImgTop;
		left = baseImgLeft;
		if(matchType==="category") {
			categories = $thumb.find('.categories').text().split(",");
			if($.inArray(toMatch,categories)!==-1) {
				width = baseThumbWidth;
			} else {
				width = 0;
			}
		} else if(matchType==="post") {
			href = $thumb.find('a').attr('href');
			href = getSlug(href);
			if(toMatch===href) {
				width = baseThumbWidth;
				top = 0;
				left = 0;
			} else {
				width = 0;
			}
		} else {
			width = baseThumbWidth;
		}
		$img.stop(false,true).animate({
			top: top,
			left: left
		}, ANIMATION_DURATION);
		$thumb.stop(false,true).animate({
			width: width
		}, ANIMATION_DURATION, function() {
			i++;
			if(i===thumbCount) {
				$visibleThumbs = $thumbs.filter(function() {
					if($(this).css('width')!=='0px') {
						return true;
					}
				});
				if(callback) {
					callback($visibleThumbs);
				} else {
					$(document).trigger("thumbsToggled", [$visibleThumbs]);
				}
			}
		});
	});
}

function openThumb($visibleThumb) {
	var $thumbGal = $('#thumbnailGallery'),
		slug;
	$visibleThumb.animate({ // weird bug where having .stop() here means the last thumb in the list doesn't run this animation
		'width': '100%'
	}, ANIMATION_DURATION, function() {
		$thumbGal.stop(false,true).fadeOut(ANIMATION_DURATION);
		slug = getSlug($visibleThumb.find('a').attr('href'));
		toggleTextPane();
		toggleItem(slug);
	});
}

function toggleTextPane(id) {
	$('#mainTextPane').children('div').stop(false,true).fadeOut(ANIMATION_DURATION);
	if(id) {
		$('#'+id).fadeIn(ANIMATION_DURATION);
	}
}

function toggleItem(postSlug) {
	var href;
	if(postSlug) {
		$('.portfolioItem').each(function(i, item) {
			href = $(this).find('h1 a').attr('href');
			href = getSlug(href);
			if(href===postSlug) {
				$(this).stop(false,true).fadeIn(ANIMATION_DURATION, function() {
					$(document).trigger("itemToggled", [item]);
				});
				return false;
			}
		});
	} else {
		$('.portfolioItem:visible').stop(false,true).fadeOut(ANIMATION_DURATION, function() {
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
		host,
		i,
		slug;
	if(window.hrefBase && url.indexOf(window.hrefBase)===0) {
		url = url.substring(window.hrefBase.length, url.length);
	}
	uri = parseUri(url);
	path = uri.path;
	host = uri.host;
	if(host && host!==window.location.host) {
		return {
			external: true,
			host: host
		};
	}
	i = url.indexOf('#');
	if(i!==-1) {
		url = url.substring(i+1, url.length);
		uri = parseUri(url);
		path = uri.path;
		host = uri.host;
	}
	if(path==="" || path==="/") {
		return {
			type: 'root',
			slug: '/',
			path: '/',
			host: host
		};
	} else {
		i = path.indexOf("/category/");
		if(i===0) {
			return {
				type: "category",
				slug: path.substring(i+10,path.length), // 10 being length of "/category/"
				path: path,
				host: host
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
				path: path,
				host: host
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

function getMenuCategories() {
	var categories = [];
	$('.categories').each(function() {
		$.each($(this).text().split(","),function(i, category) {
			pushUnique(category,categories);
		});
	});
	return categories;
}

function getSlug(href) {
	return href.substring(href.lastIndexOf('/')+1);
}

function getCategoriesFromItem(itemSlug) {
	var $item = $('div.portfolioItem').filter(function() {
			return getSlug($(this).find('h1 a').attr('href'))===itemSlug;
		}),
		itemCategories = $item.children('.categories').text().split(",");
	return itemCategories;
}

function getMenuItemFromSlug(itemSlug) {
	var cat,
		itemCategories = getCategoriesFromItem(itemSlug),
		menuCategories = getMenuCategories();
	$.each(menuCategories, function(i, menuCat) {
		if($.inArray(menuCat,itemCategories)!==-1) {
			cat = menuCat;
			return false;
		}
	});
	return cat;
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
