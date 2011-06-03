function toggleMainItem(elem, callback, optionalSecondCallback) {
	//console.log('toggleMainItem');
	var $that = $(elem);
	if($that.data('width')) {
		$that.animate({
			'width': $that.data('width'),
			'height': $that.data('height')
		}, {
			duration: animationDuration,
			easing: animationEasing,
			complete: function() {
				$that.data({
					'width': '',
					'height': ''
				});
				callback(elem, optionalSecondCallback);	
			}
		});
	} else {
		$('#mainTextPane').fadeOut(); // JRL: TO-DO: this is fading out too late - make it fade on click, but that makes it hard to not fade it out just after it's been faded in when you go 'back to grid'. So that needs fixing.
		$that.data({
			'width': $that.width(),
			'height': $that.height()				
		})
		.animate({
			'width': '100%',
			'height': '400px'
		}, {
			duration: animationDuration,
			easing: animationEasing,
			complete: function() {
				callback(elem, optionalSecondCallback, true);
			}
		});
	}
}

function toggleSmallItems(elem, callback, optionalSecondCallback) {
	/* reset gallery position */
	$(elem).find('img').animate({
		top: 0
	},
	animationDuration,
	animationEasing
	);

	$('.'+itemClass)
		.not(elem)
		/*.find('img')
		.toggle()
		.end()*/
		.animate({
			'width': 'toggle'
		},
		animationDuration,
		animationEasing,
		function() {
			if(callback) {
				callback(elem, optionalSecondCallback);
				callback = null; // since this will likely happen for more than one element
			}
		});
}

function toggleItems(e) {
	if(!called) {
	
		$('.'+itemClass).die('click');
		if(e) {
			e.preventDefault();
		}
		
		called = true;
		//console.log('toggleItems',this);
		animationStarter(this, animationCallback, animationComplete);
	
	}
	return false;
}

function scrollListPointer(index) {

}

function scrollImagesToIndex(index, offset) {
	var top = $('.portfolioImage:visible').eq(index).offset().top;
	$.scrollTo(top-90-10, 500);
	var $imageNav = $('.imageNav:visible').eq(0);
	$imageNav.find('span').animate({
		'top': $imageNav.find('li').eq(index).position().top+3
	}, 300);
}

function backToGrid(e) {
	e.preventDefault();
	$('.portfolioItem:visible .textPane').fadeOut(function() {
		$('.portfolioItem:visible').hide();
		$('#firstItem').show();
		$('#mainTextPane').fadeIn();
		$('.'+itemClass+':visible').click();
	});	
}

var itemClass = 'item',
	animationDuration = "slow",
	animationEasing = "swing",
	animationStarter,
	animationCallback,
	animationComplete = function(elem, callback, showContent) {
		var tmp = animationStarter;
		animationStarter = animationCallback;
		animationCallback = tmp;
		called = false;

		if(showContent) {
			/* display the chosen portfolio item */		
			var portfolioIndex = $(elem).index(),
				$portfolioItem = $('#portfolio .portfolioItem:not(#firstItem)').eq(portfolioIndex),
				$gallery = $portfolioItem.find('.gallery');
			$portfolioItem.show()
				.find('.textPane').hide();
			$('#firstItem').hide();
			var $images = $gallery.find('.portfolioImage:visible'),
				$altContainer = $('.imageNav').hide(),
				$altList = $('<ul><span></span></ul>').appendTo($altContainer);
			
			/* set up content for item - superceded by method above */
			/*var portfolioIndex = $(elem).index(),
				$portfolioItem = $('#portfolio .portfolioItem:not(#firstItem)').eq(portfolioIndex),
				$newTextPane = $portfolioItem.find('.textPane').replaceAll('#mainTextPane').attr('id','mainTextPane').hide(),
				$newGallery = $portfolioItem.find('.gallery').replaceAll('#mainGallery').attr('id','mainGallery');
	
			// set up gallery image nav
			var $images = $newGallery.find('.portfolioImage'),
				$altContainer = $('#imageNav').hide(),
				$altList = $('<ul><span></span></ul>').appendTo($altContainer);
				//altTop = $images.eq(0).offset(); // TO-DO: you have to get this after the image has loaded, so bind to load
				//console.log(altTop);
				
			$newTextPane.fadeIn();
			*/
			
			$images.each(function(i, elem) {
				var alt = $(elem).attr('alt');
				$('<li></li>').appendTo($altList)
					.text(alt)
					.click(function(e) {
						scrollImagesToIndex(i);
						scrollListPointer(i);
						return false;
					});
			});
			$altContainer.fadeIn();
			$portfolioItem.find('.textPane').fadeIn();
		}
		
		$('.'+itemClass).live('click', toggleItems);
	},
	called = false;


$(document).ready(function() {
	/* set up the nav menu */	
	var $mockMenu = $('<ul class="mockMenu"><li><a href="#"></a></li></ul>')
		.insertAfter('ul.menu');
	$('ul.menu a').click(function(e) {
		e.preventDefault();
		$mockMenu.animate({
			left: parseInt($(this).offset().left,10)
		});
		$(this).css('color', 'inherit');
		$(this).closest('li').siblings().children('a').css('color','');
		return false;
	});
	$('h1').click(function(e) {
		e.preventDefault();
		$mockMenu.animate({
			left: 0
		});
		$(this).siblings('ul').find('a').css('color','');
		return false;
	});
	
	/* build the gallery */
	var galHtml = ['<ul>'];
	$('.portfolioItem')
		.not('#firstItem')
		.each(function() {
			var $img = $(this).find('.gallery img:eq(0)');
			galHtml.push('<li class="item"><span class="cover">Item Info Here</span><img class="portfolioImage" src="'+$img.attr('src')+'" alt="'+$img.attr('alt')+'" title="'+$img.attr('title')+'" /></li>');
		});
	galHtml.push('</ul>');
	$('#mainGallery').html(galHtml.join('\n'));
	
	$('img').hide().imagesLoaded(function() {
		// show tiles and make them toggle when clicked
		$(this).fadeIn();
		animationStarter = toggleSmallItems;
		animationCallback = toggleMainItem;
		$('.'+itemClass).live('click', toggleItems);
		
		// add 'back to grid' behaviour
		$('.itemNav a:first-child').live('click', backToGrid);
	});
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

/*$(window).load(function() {

	var _url = "image.jpg";
	
	// set up the node / element
	_im =$("<img>");
	
	// hide and bind to the load event
	_im.hide();
	_im.bind("load",function(){ $(this).fadeIn(); });
	
	
	// append to target node / element
	$('body div#target').append(_im);
	
	// set the src attribute now, after insertion to the DOM
	_im.attr('src',_url);

}); */
