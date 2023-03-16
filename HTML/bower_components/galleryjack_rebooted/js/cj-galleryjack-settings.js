/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */


// ********************************
// ENTER YOUR CUSTOM SETTINGS BELOW
// ********************************

function galleryJackSettings() {
			
	/* The Slideshow Settings */
	var slideshowSettings = {
			
		/* Choose to autoPlay the gallery, true/false */
		autoPlay: true,
					
		/* Choose to randomize the image order for each category, true/false */
		randomizeImages: false,
					
		/* The transition delay between images */
		transitionDelay: 6000,
		
		/* The amount of time the transition takes to complete */
		transitionTime: 500,
		
		/* Choose to hide the thumbnails when the gallery first loads */
		hideThumbnails: false,
		
		/* Choose to use a tooltip for thumbnails, true/false */
		useThumbToolTip: true,
		
		/* The thumbnail circle that animates between images (if autoPlay is turned on) */
		useCanvasAnimation: true,
					
		/* Enter 0 to always display maximum number of thumbs based on monitor/gallery size */
		maxThumbs: 0,
					
		/* The opacity level for the thumbnail hover effect, 0-1 */
		thumbHoverOpacity: 0.5,
		
		/* The opacity level for category text mouseover */
		categoryOpacity: 0.65,
		
		/* Left/Right Arrows will control slideshow, true/false */
		keyboardControls: true,
		
		/* Disable right click to help protect your images, true/false */
		disableRightClick: true,
		
		/* Choose to help Google index the image deep-links, true/false */
		seoCrawlable: false,
		
		/* If "fullScreen" is set to "false", choose a background color (applicable for "fit" scaling mode */
		backgroundColor: "#fff",
		
		/* If using the fullscreen version, this number will act as an offset for the width */
		offsetWidth: 0,
		
		/* If using the fullscreen version, this number will act as an offset for the height */
		offsetHeight: 0,
		
		/* If using the fullscreen version, this number will act as an offset left position */
		offsetX: 0,
		
		/* If using the fullscreen version, this number will act as an offset for the top position */
		offsetY: 0,
		
		
		/* ******************************************************************** */
		/* The values below are set in the JavaScript portion of the html files */
		/* ******************************************************************** */
		
		/* Choose to show the image info when the gallery loads, true/false */
		showInfoByDefault: cjShowInfoByDefault,
		bgClickLoadsNext: cjBgClickLoadsNext,
		fullScreen: cjFullScreenMode,
		customHeight: cjCustomHeight,
		useDeepLink: cjDeepLinkMode,
		customWidth: cjCustomWidth,
		useThumbs: cjUseThumbs
				
	},
	
	/* The Video Settings */
	videoSettings = {
	
		/* The video width if video is used */
		videoWidth: 640,
		
		/* The video height if video is used */
		videoHeight: 360,
		
		/* The default volume for video */
		videoVolume: 75,
		
		/* Choose to autoplay video, true/false */
		autoPlayVideo: true,
		
		/* The video Flash fallback swf url */
		videoFallbackSwf: "medias/flash/gallery_video.swf"
		
	},
	
	/* The Music Settings */
	musicSettings = {
				
		/* Music Default Volume, this should be in multiples of 5 or 10 */
		volume: 100,
					
		/* Choose to AutoPlay Slideshow */
		autoPlay: cjAutoPlayMusic,
					
		/* Choose to randomize the song list, true/false */
		randomizeSongs: false,
					
		/* The list of songs to play */
		songList: [
						
			/* title: The title of your song (delete param for no title), url: the url to the mp3 version of the song */
			{title: "Song title one", url: "medias/music/song1.mp3"},
			{title: "Song title two", url: "medias/music/song2.mp3"},
			
			/* Last item doesn't have a comma at the end */
			{title: "Song title three", url: "medias/music/song3.mp3"}
			
		]

	},
			
	/* Contact Form Settings */
	contactSettings = {
				
		/* The generic field error message */
		emptyTextMessage: "Please fill in your", 
				
		/* The email error message */
		emailErrorMessage: "Please enter a valid email",
				
		/* The form submit success message */
		successMessage: "Your message has been sent",
				
		/* The contact form's php file */
		contactPhpFile: "bower_components/galleryjack_rebooted/php/cj-contact.php" 
				
	},
			
	/* Social Settings */
	socialSettings = {
				
		/* Facebook Fanpage */
		facebookUser: "80655071208",
				
		/* Twitter Username */
		twitterUser: "envato",
		
		/* Google Plus Profile Link */
		googlePlusId: "107285294994146126204",
		
		/* ******************************************************************* */
		/* The social icons below are optional and can be reordered or deleted */
		/* ******************************************************************* */
		
		/* Set this to an empty string to not use */
		//facebookLike: "<div id='cj-facebook'><iframe src='http://www.facebook.com/plugins/like.php?locale=en_US&href=http://www.codingjack.com&layout=button_count&show_faces=false&width=500&action=like&font&colorscheme=light&height=23' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:85px; height:23px;' allowTransparency='true'></iframe></div>",
				
		/* Set this to an empty string to not use */
		//tweetThis: "<div id='cj-twitter'><a href='http://twitter.com/share' class='twitter-share-button' data-count='horizontal'>Tweet</a><script async defer type='text/javascript' src='http://platform.twitter.com/widgets.js'></scr" + "ipt></div>",
		
		/* Set this to an empty string to not use */
		//googlePlus: "<div id='cj-google-plus'><div class='g-plusone' data-size='medium' data-href='" + document.URL + "'></div></div><script async defer type='text/javascript'>(function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true; po.src = 'https://apis.google.com/js/plusone.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);})();</scr" + "ipt>",
		
		/* Set this to an empty string to not use */
		twitterIcon: "<div id='cj-twitter-icon'><a href='http://twitter.com/{twitterUser}' target='_blank'><i class='fa fa-twitter'></i></a></div>",
				
		/* Set this to an empty string to not use */
		facebookIcon: "<div id='cj-facebook-icon'><a href='http://www.facebook.com/{facebookUser}' target='_blank'><i class='fa fa-facebook'></i></a></div>",
		
		/* Set this to an empty string to not use */
		googlePlusIcon: "<div id='cj-google-icon'><a rel='author' href='https://plus.google.com/{googlePlusId}' target='_blank'><i class='fa fa-google'></i></a></div>",
		
		/* Set this to an empty string to not use */
		pinterestIcon: "<div id='cj-pinterest-icon'><a rel='author' href='#' target='_blank'><i class='fa fa-pinterest-p'></i></a></div>",
		
		/* Set this to an empty string to not use */
		linkedinIcon: "<div id='cj-linkedin-icon'><a rel='author' href='#' target='_blank'><i class='fa fa-linkedin'></i></a></div>",
		
		/* Set this to an empty string to not use */
		stumbleuponIcon: "<div id='cj-stumbleupon-icon'><a rel='author' href='#' target='_blank'><i class='fa fa-stumbleupon'></i></a></div>"
		
		
		/* You can add any icon or html to this section.  Just give it a unique name like the example below */
		
		/*
		
		, genericIconOne: "icon html here"
		
		*/
		
		
	},
	
	
	/* If cjAjaxVersion = true (declared in the html file), enter your ajax version settings here */
	ajaxSettings = {
		
		/* The path to your large images */
		imagePath: "images/fullscreen-galleries/",
		
		/* The thumbnail folder name (must be located directly inside the "imagePath" folder */
		thumbFolder: "thumbs",
		
		/* The gallery stretch mode and transition type (view the help documentation for options) */
		className: "cj-stretch cj-fade",
		
		/* The width and height of your thumbnails */
        thumbSize: "100x67",
		
		/* Choose to use the image names for the thumbnail tool-tips, true/false */
		imageNameTips: true,
		
		/* The ajax version's php url */
		ajaxPhpUrl: "bower_components/galleryjack_rebooted/php/cj-ajax.php"
		
	};
	
	
	
	// **************************************************
	// **************************************************
	// DEVELOPER SETTINGS, NO NEED TO EDIT ANYTHING BELOW
	// **************************************************
	// **************************************************
	
	// Setup jQuery ready function
	if(!cjAjaxVersion) {
		
		jQuery(document).ready(function() {
			
			startIt();
			
		});
		
	}
	else {
		
		jQuery(document).ready(function() {
                
			jQuery.address.init(addressReady);
                
        });
		
	}
	
	// Make the ajax call
	function addressReady() {
		
		jQuery.getJSON(ajaxSettings.ajaxPhpUrl + "?path=../" + ajaxSettings.imagePath, ajaxLoaded);
				
	}
	
	// Recieve the folder and image url data from php
	function ajaxLoaded(data, response) {
		
    	if(response.toLowerCase() === "success") {
			   
			var thumbFolder = ajaxSettings.thumbFolder,
			nameTips = ajaxSettings.imageNameTips,
			className = ajaxSettings.className,
			thumbSize = ajaxSettings.thumbSize,
			bgDiv = jQuery("#cj-bg-images"),
			images = data[1],
			names = data[0],
			leg = names.length,
			imageList,
			shaved,	
			large,
			thumb,
			jLeg,
			cat,
			img,
			li,
			ul,
            j;    
			
			if(bgDiv.length) {
			
				for(var i = 0; i < leg; i++) {
							
					cat = jQuery("<ul />").attr("title", names[i]).attr("class", className).attr("data-rel", thumbSize);
							
					imageList = images[i];
					jLeg = imageList.length;
					   
					for(j = 0; j < jLeg; j++) {
								
						li = jQuery("<li />").appendTo(cat);
						ul = jQuery("<ul />").appendTo(li);
								
						img = imageList[j].split("../").join("");
						shaved = img.substr(img.lastIndexOf("/"), img.length - 1);
						
						large = jQuery("<li />").attr("class", "cj-large").attr("title", img).appendTo(ul);
						thumb = jQuery("<li />").attr("class", "cj-thumb").attr("title", img.split(shaved).join("/" + thumbFolder + shaved)).appendTo(ul);
						
						if(nameTips) thumb.text(shaved.split(".jpg").join("").split("/").join(""));
								
					}
							
					bgDiv.append(cat);
							
				}
						
				startIt();
				
			}
                    
		}
		else {
                
			alert("Ajax Response: " + response);
                    
		}
                    
	}
	
	// Activate the GalleryJack scripts
	function startIt() {
			
		jQuery.cjBgSlideshow(slideshowSettings, videoSettings);
		
		if(typeof jQuery.address !== "undefined") jQuery.address.crawlable(slideshowSettings.seoCrawlable);
		if(typeof jQuery.cjTopRightButtons !== "undefined") jQuery.cjTopRightButtons(contactSettings, socialSettings);
		if(typeof jQuery.cjMusicPlayer !== "undefined") jQuery.cjMusicPlayer(musicSettings);
		if(typeof jQuery.cjVideoPlayer !== "undefined") jQuery.cjVideoPlayer(videoSettings);
				
	}
	
}

// kick it off
galleryJackSettings();

