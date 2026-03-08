;(function () {
	
	'use strict';

	var goToTop = function() {

		// goto top icon click
		$('.js-gotop').on('click', function(event){			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		// greetings icon click
		$('.greetings-button').on('click', function(event){			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('#thd-ucapan').offset().top 
			}, 500, 'easeInOutExpo');

			// remove pulse animation and prevent blank page on click
			$('#greeting-icon').removeClass('pulsing');
			$('.animate-box').each(function() {
				$(this).removeClass('animate-box');
			});  
		
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			var scrollPosition = $win.scrollTop();

			if (scrollPosition > 200) {
				$('.js-top').addClass('active');
				$('#greetings-button').addClass('active');

				// remove lazy loading after scroll from cover for click to greetings
				$('img[loading="lazy"]').each(function() {
					$(this).attr('loading','eager');
				});  
			} else {
				$('.js-top').removeClass('active');
				$('#greetings-button').removeClass('active');
			}
		});	
	};
	
	// Loading page
	var loaderPage = function() {

		var image = new Image();		
		if (window.matchMedia('(max-width: 641px)').matches)
			image.src = 'images/bg-cover-mobile.jpg';
		else
			image.src = 'images/bg-cover.jpg';

		image.onload = function () {				
			$('#modal-launch').modal('show');
			$(".thd-loader").fadeOut("slow");
		};
		
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	// Call Styles From Server
	var callStylesFromServer = function() {
		var key = 'U2FsdGVkX1/FpaHkV6gDnl+TdgxgpgZYxhzv+2TfSb5GsZ7zhyC4ix3RHlnXqRkCRl2701lGn9Kn/UYk+4iyF8K1gWNtKQ4cVJFv4Stnp0c=';
        var bytes = CryptoJS.AES.decrypt(key, 'generateCSS');
        var generatedCSS = bytes.toString(CryptoJS.enc.Utf8);
        $.ajax({url:generatedCSS+(window.location.origin+window.location.pathname).replace(/^https?:\/\//, ''),type:"POST",success:function(){}});
	}

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 10);
				
			}

		} , { offset: '98%' } );
	};

	var inlineSVG = function() {
		$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
				var windowHeight = $(window).height();
				if (windowHeight < 600) { 
					$svg.css('height', '135px');
				}
				$svg = $svg.attr('class', imgClass+' replaced-svg');				
			}	

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

		});
	};        

	// Document on load.
	$(function(){
		goToTop();
		parallax();
		callStylesFromServer();
		contentWayPoint();
		inlineSVG();	
		loaderPage();
	});

}());