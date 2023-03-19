jQuery(document).ready(function() {
	
	"use strict";
	
	// ===== Pre loading ===== //
	$(window).load(function(){
		$('.preloader-wrapper').fadeOut(300);
		$('.transition').removeClass("transition-preload");
	});
	
	
	// ===== Custom Data Attribute ===== //
	var bgImage = ".overlay, .fullpage-img, .featured-area.fit-height"
	
	$("*").css('height', function () {
		var heightAttr = $(this).attr('data-height')+'px';
		return heightAttr;
	});
	
	$("*").css('color', function () {
		var colorAttr = $(this).data('color');
		return colorAttr;
	});
	
	$("*").css('opacity', function () {
		var opacityAttr = $(this).data('opacity');
		return opacityAttr;
	});
	
	$("*").css('background-color', function () {
		var bgcolorAttr = $(this).data('bg-color');
		return bgcolorAttr;
	});
	
	$(bgImage).css('background-image', function () {
		var bg = ('url(' + $(this).data("image-src") + ')');
		return bg;
	});
	
	
	// ===== Animated Sticky Header ===== //
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
			$('header').addClass("sticky");
			$('.content-wrapper').addClass("scroll");
		}
		else{
			$('header').removeClass("sticky");
			$('.content-wrapper').removeClass("scroll");
		}
	})
	
	
	// Enable scroll on html, body for scrolling page
	if ($('body').hasClass("pageScroll")){
		$('html, body').addClass("enableScroll");
	}
	else {
		$('html, body').removeClass("enableScroll");
	}
	
	
	// ===== Disable body scroll when navigation overlay showing ===== //
	$('#trigger-menu').on("click", function(){
		if ($('body').hasClass("pageScroll")){
			$('html, body').removeClass("enableScroll");
		}
	});
	
	$('.overlay-close').on("click", function(){
		if ($('body').hasClass("pageScroll")){
			$('html, body').addClass("enableScroll");
		}
	});
	
	
	// ===== Add vertical middle to navigation menu ===== //
	var windowHeight = $(window).height();
	var navHeight = $('.main-menu').height();
	
	if (navHeight < windowHeight){  
		$('.main-menu').addClass("vertical-middle");
	}
	else{
		$('.main-menu').removeClass("vertical-middle");
	}
	
	
	// ===== Fit Image to DIV ===== //
	$('.fit-img').each(function() {
		var $div = $(this),
			$img = $('img', $div),
			src = $img.attr('src');
			$div.css('backgroundImage', 'url(' + src + ')');
			$img.remove();
	});
	
	
	// ===== Blog List Standard Height Settings ===== //
	$(window).on("load resize", function() {
		var bdHeight = $('.blog-list-standard .blog-detail').height();
		var btHeight = $('.blog-list-standard .blog-thumbnail');
		
		if ($(window).width() >= 992) {
			btHeight.height(bdHeight + 108);
		} else if ($(window).width() >= 768) {
			btHeight.height(405);
		} else if ($(window).width() >= 480) {
			btHeight.height(254);
		} else {
			btHeight.height(170);
		}
	});
	
	
	// ===== Animation Settings ===== //
	var animateFadeIn = ".animate-fadeIn:in-viewport";
	var animateFadeInUp = ".animate-fadeInUp:in-viewport";
	var animateFadeInDown = ".animate-fadeInDown:in-viewport";
	var animateFadeInLeft = ".animate-fadeInLeft:in-viewport";
	var animateFadeInRight = ".animate-fadeInRight:in-viewport";
	
	$(animateFadeIn).each(function(){
		$(animateFadeIn).delay(300).animate({ opacity: 1 }, 2000, 'easeOutExpo');
	});
	$(animateFadeInUp).each(function(){
		$(animateFadeInUp).delay(300).animate({ top: '0', opacity: 1 }, 2000, 'easeOutExpo');
	});
	$(animateFadeInDown).each(function(){
		$(animateFadeInDown).delay(300).animate({ top: '0', opacity: 1 }, 2000, 'easeOutExpo');
	});
	$(animateFadeInLeft).each(function(){
		$(animateFadeInLeft).delay(300).animate({ left: '0', opacity: 1 }, 2000, 'easeOutExpo');
	});
	$(animateFadeInRight).each(function(){
		$(animateFadeInRight).delay(300).animate({ left: '0', opacity: 1 }, 2000, 'easeOutExpo');
	});
	
	$(window).on("scroll", function(){
		$(animateFadeIn).each(function(){
			$(animateFadeIn).delay(300).animate({ opacity: 1 }, 2000, 'easeOutExpo');
		});
		$(animateFadeInUp).each(function(){
			$(animateFadeInUp).delay(300).animate({ top: '0', opacity: 1 }, 2000, 'easeOutExpo');
		});
		$(animateFadeInDown).each(function(){
			$(animateFadeInDown).delay(300).animate({ top: '0', opacity: 1 }, 2000, 'easeOutExpo');
		});
		$(animateFadeInLeft).each(function(){
			$(animateFadeInLeft).delay(300).animate({ left: '0', opacity: 1 }, 2000, 'easeOutExpo');
		});
		$(animateFadeInRight).each(function(){
			$(animateFadeInRight).delay(300).animate({ left: '0', opacity: 1 }, 2000, 'easeOutExpo');
		});
	});
	
	
	// ===== Tabs Element Setting ===== //
	$( ".tabs-wrapper" ).tabs({
		show: { effect: "fade", duration: 400 },
	});
	
	
	// ===== Accordion Element Setting ===== //
	var icons = {
		header: "ui-icon-circle-arrow-e",
		activeHeader: "ui-icon-circle-arrow-s"
    };
    $( ".accordion-wrapper" ).accordion({
		icons: icons,
		heightStyle: "content"
    });
	
	
	// ===== jQuery OWL Carusel Setting ===== //
	// Team Panel Carousel
	var teamPanel = $(".owl-carousel.team-panel");
	teamPanel.owlCarousel({
		dots: false,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			640:{
				items:2
			},
			768:{
				items:3
			},
			960:{
				items:3
			},
			1024:{
				items:4
			}
		}
	});
	
	// Home Blog Panel Carousel
	var blogPanel = $(".owl-carousel.home-blog-item");
	blogPanel.owlCarousel({
		margin: 30,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			640:{
				items:2
			},
			768:{
				items:3
			},
			960:{
				items:3
			},
			1024:{
				items:4
			}
		}
	});
	
	// Custom Navigation
	$(".carouselArrow.next").on("click", function(){
		teamPanel.trigger('next.owl.carousel', [500]);
	})
	$(".carouselArrow.prev").on("click", function(){
		teamPanel.trigger('prev.owl.carousel', [500]);
	})
	
	
	// ===== jQuery Megafolio Settings ===== //
	// Homepage gallery items
	var api=jQuery('.home-gallery-item .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [7]
	});
	
	// Gallery page items
	var galleryPage=jQuery('.gallery-page-item .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [7]
	});
	
	// Gallery page items grid square
	var gallerySquare=jQuery('.gallery-grid-square .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [11]
	});
	
	// Gallery page items grid random
	var galleryRandom=jQuery('.gallery-grid-random .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [0]
	});
	
	// Gallery page items grid different height
	var galleryDifferentHeight=jQuery('.gallery-different-height .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [15]
	});
	
	// Gallery single page grid style 1
	var galleryPost1=jQuery('.gallery-post.post-item1 .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 24,
		paddingVertical: 24,
		layoutarray: [7, 5]
	});
	
	// Gallery single page grid style 2
	var galleryPost2=jQuery('.gallery-post.post-item2 .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 24,
		paddingVertical: 24,
		layoutarray: [14]
	});
	
	// Gallery single page grid square
	var galleryPostSquare=jQuery('.gallery-post.post-grid-square .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 24,
		paddingVertical: 24,
		layoutarray: [10]
	});
	
	// CALL FILTER FUNCTION IF ANY FILTER HAS BEEN CLICKED
    jQuery('.filter').on("click", function() {
		jQuery('.filter').each(function() {
			jQuery(this).removeClass("selected")
		});
		api.megafilter(jQuery(this).data('category'));
		galleryPage.megafilter(jQuery(this).data('category'));
		gallerySquare.megafilter(jQuery(this).data('category'));
		galleryRandom.megafilter(jQuery(this).data('category'));
		galleryDifferentHeight.megafilter(jQuery(this).data('category'));
		jQuery(this).addClass("selected");
    });
	
	
	// ===== FancyBox Settings ===== //
	$(".fancybox").fancybox();
	
	
	// ===== jQuery Isotope Settings ===== //
	var $isotopeGallery = $('.gallery-list-masonry');
	var $isotopeBlog = $('.blog-list-masonry');
	
	$isotopeGallery.imagesLoaded( function(){
		$isotopeGallery.isotope({
			itemSelector : '.masonry-item',
			transitionDuration: '0.8s'
		});
	});
	
	$isotopeBlog.imagesLoaded( function(){
		$isotopeBlog.isotope({
			itemSelector : '.masonry-item',
			transitionDuration: '0.8s'
		});
	});
	
	// filter items when filter link is clicked
	$('.category-filter ul li').on("click", function() {
		var filterValue = $(this).attr('data-filter');
		$isotopeGallery.isotope({
			filter: filterValue
		});
	});
	
	// Gallery random load more function
	$('.load-more.more-gallery .box span').on("click", function() {
		
		// create new item elements
		var elems = [];
		for ( var i = 0; i < 3; i++ ) {
			var $elem = $('<div class="masonry-item col-xs-12 col-sm-6 col-md-4 cat-one cat-two cat-three cat-four cat-five" />');
			var num = Math.floor((Math.random() * 9) + 1);
			$elem.append( '<div class="box"><div class="masonry-list-img"><a href="#"><div class="overlay-hover xcross-hover"><div class="text-hover">See gallery</div></div><figure class="post-image"><img src="images/upload/gallery-list-masonry0' + num + '.jpg" alt="gallery item" /></figure></a></div><div class="masonry-list-detail"><h4>Vestibulum tincidunt</h4><ul class="masonry-list-meta"><li>Category <a href="#">People</a></li><li>Photos <a href="#">15</a></li></ul></div><a href="#"><div class="masonry-link"></div></a></div>' );
			elems.push( $elem[0] );
		}
		
		// insert new elements
		$isotopeGallery.isotope( 'insert', elems );
	});
	
	// Blog random load more function
	$('.load-more.more-article .box span').on("click", function() {
		
		// create new item elements
		var elems = [];
		for ( var i = 0; i < 3; i++ ) {
			var $elem = $('<div class="masonry-item col-xs-12 col-sm-6 col-md-4" />');
			var num = Math.floor((Math.random() * 6) + 1);
			$elem.append( '<div class="box"><div class="masonry-list-img"><a href="#"><div class="overlay-hover"><div class="blog-masonry-date"><span>25</span>June<br>2015</div></div><figure class="post-image"><img src="images/upload/blog-list-masonry0' + num + '.jpg" alt="gallery item" /></figure></a></div><div class="masonry-list-detail"><h4>Vestibulum tincidunt</h4><p>Lorem ipsum dolor sit amet consectetur adipiscing elit mauris magna lacinia</p><div class="masonry-meta-category"><span>Category</span><a href="#">Pretium</a></div></div><a href="#"><div class="masonry-link"></div></a></div>' );
			elems.push( $elem[0] );
		}
		
		// insert new elements
		$isotopeBlog.isotope( 'insert', elems );
	});
	
	
	// ===== jQuery FlexSlider Settings ===== //
	$(window).on("load", function() {
		$('.flexslider').flexslider({
			controlNav: false,
			directionNav: false,
			slideshow: true,
			animationSpeed: 800,
			multipleKeyboard: true,
			pauseOnHover: true
		});
		
		// Homepage slider custom navigation
		$('.slide-wrapper .slide-prev, .slide-wrapper .slide-next').on('click', function(){
			var href = $(this).attr('href');
			$('.flexslider').flexslider(href)
			return false;
		});
	});
	
	
	// ===== jQuery Fullpage Settings ===== //
	$('#fullpage').fullpage({
		navigation: true,
		slidesNavigation: false,
		css3: false
	});
	
	// Add class to horizontal slide section
	$("#fullpage .section:has(div.slide)").each(function(){
		$(this).addClass("fp-horizontal-slide");
	});
	
	// Add move down mouse icon
	$('.fullpage-share').next(".section").find(".fullpage-title .container").prepend("<div class='fp-mouse-scroll'></div>");
	$('.fp-mouse-scroll').on("click", function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	});
	
	
	// ===== Tooltip Settings ===== //
	// Related Gallery Tooltip
	$('.gallery-tooltip').tooltipster({
		position: 'top',
		animation: 'grow',
		delay: 200,
		speed: 350,
		theme: 'custom-theme01',
		touchDevices: true,
		trigger: 'hover',
		maxWidth: 220,
		offsetX: 0,
		offsetY: -40
	});
	
	// Blog Author Tooltip
	$('.author-link').tooltipster({
		position: 'left',
		animation: 'grow',
		delay: 200,
		speed: 350,
		theme: 'custom-theme02',
		touchDevices: true,
		trigger: 'hover',
		maxWidth: 150,
		offsetX: 0,
		offsetY: 0
	});
	
	// Blog Comment Reply Tooltip
	$('.comment-reply').tooltipster({
		position: 'left',
		animation: 'grow',
		delay: 200,
		speed: 350,
		theme: 'custom-theme03',
		touchDevices: true,
		trigger: 'hover',
		maxWidth: 150,
		offsetX: 0,
		offsetY: 0
	});
	
	
	// ===== Placeholder ===== //
	$.fn.placeholder();
	
	
	// ===== Go to top setting ===== //
	$("a[href='#top']").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	
	
	// ===== Contact Form Submit Settings ===== //
	$("#submit_message").on("click", function() {
		$('#reply_message').removeClass();
		$('#reply_message').html('')
		var regEx = "";
				
		// validate Name
		var name = $("input#name").val();
		regEx=/^[A-Za-z .'-]+$/;
		if (name == "" || name == "Name"  || !regEx.test(name)) {
			$("input#name").val('');
			$("input#name").focus();
			return false;
		}
		
		// validate Email
		var email = $("input#email").val();
		regEx=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
		if (email == "" || email == "Email" || !regEx.test(email)) {
			$("input#email").val('');
			$("input#email").focus();
			return false;
		}
		
		// validate Subject
		var mysubject = $("input#mysubject").val();
		regEx=/^[A-Za-z0-9 .'-]+$/;
		if (mysubject == "" || mysubject == "Mysubject"  || !regEx.test(mysubject)) {
			$("input#mysubject").val('');
			$("input#mysubject").focus();
			return false;
		}
		
		// validate Message
		var mymessage = $("textarea#mymessage").val();
		if (mymessage == "" || mymessage == "Mymessage" || mymessage.length < 2) {
			$("textarea#mymessage").val('');
			$("textarea#mymessage").focus();
			return false;
		}
							
		var dataString = 'name='+ $("input#name").val() + '&email=' + $("input#email").val() + '&mysubject='+ $("input#mysubject").val() + '&mymessage=' + $("textarea#mymessage").val();
		
		$('.loading').fadeIn(500);
		
		// Send form data to mailer.php
		$.ajax({
			type: "POST",
			url: "mailer.php",
			data: dataString,
			success: function() {
				$('.loading').hide();
				$('#reply_message').addClass('list3');
				$('#reply_message').html("<span>Mail sent successfully</span>")
				.fadeIn(1500);
				$('#form_contact')[0].reset();
				}
			});
		return false;
	});
	
});


// ===== Social Media Share Pop-up ===== //
function facebookShare(url, winWidth, winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

function twitterShare(url, winWidth, winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open('https://twitter.com/home?status=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

function googleShare(url, winWidth, winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open('https://plus.google.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

function pinterestShare(url, winWidth, winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open('https://pinterest.com/pin/create/button/?url=&media=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

function linkedinShare(url, winWidth, winHeight) {
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}