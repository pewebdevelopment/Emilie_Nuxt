/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {
	
	$.cjBgSlideshow = function(data, vData) {
		
		var mainGallery = $("#cj-gallery");
		if(!mainGallery.length) return;
		
		// begin plugin global vars
		var thumbOpacity = data.thumbHoverOpacity,
		videoFallback = vData.videoFallbackSwf,
		transDelay = data.transitionDelay,
		catOpacity = data.categoryOpacity, 
		showInfo = data.showInfoByDefault,
		clickNext = data.bgClickLoadsNext,
		hideThumbs = data.hideThumbnails,
		randomImg = data.randomizeImages,
		useKeys = data.keyboardControls,
		videoHeight = vData.videoHeight,
		useDeepLink = data.useDeepLink,
		videoWidth = vData.videoWidth,
		maxThumbs = data.maxThumbs,
		time = data.transitionTime,
		useThumbs = data.useThumbs,
		autoPlay = data.autoPlay,
		isFull = data.fullScreen,
		offH = data.offsetHeight,
		offW = data.offsetWidth,
		offsetX = data.offsetX,
		offsetY = data.offsetY,
		apiCategoryChange,
		galleryControlW,
		apiImageChange,
		apiImageLoaded,
		currentTargets,
		containerWide,
		currentVideos,
		previousPlay,
		currentLinks,
		usePlayPause,
		thumbStretch,
		arrowHeights,
		arrowWidths,
		currentInfo,
		totalThumbW,
		arrowHeight,
		canvasTimer,
		thumbMargin,
		thumbMarDub,
		thumbHeight,
		thumbImages,
		thumbHovers,
		thumbMinus,
		thumbCount,		
		thumbExtra,
		thumbItems,
		thumbWidth,
		thumbHighs,
		clickThumb,
		goingRight,
		thumbUrls,
		thumbHigh,
		tipHeight,
		fromClick,
		stretched,
		numThumbs,
		centered,
		tipWidth,
		vHeight,
		winWide,
		winHalf,
		winTall,
		runTime,
		oHeight,
		context,
		tipList,
		tipLeft,
		bgClick,
		vButton,
		tipTop,
		canvas,
		oWidth,
		imgOne,
		imgTwo,
		fading,
		wasOn,
		timer,
		cPerc,
		list,
		hash,
		winH,
		iLeg, 
		isOn,
		cEnd,
		leg, 
		pre,
		
		bgOn = 0,
		catOn = 0,
		prevCat = 0,
		thumbOn = 0,
		minWidth = 320,
		arrowInactive = 0.75,
		cBegin = 1.5 * Math.PI,
		cTime = transDelay / 100,
		html5 = Modernizr.canvas,
		
		iframe = null,
		thumbList = null,
		theCanvas = null,
		checkFull = null,
		htmlVideo = null,
		destroyVideo = null,
		
		containerMoved = false,
		vButtonActive = false,
		thumbsRipped = false,
		infoHasClick = false,
		arrowsActive = false,
		readyToFire = false,
		thumbsReady = false,
		videoActive = false,
		firstToggle = true,
		isLoading = false,
		fromThumb = false,
		firstFade = true,
		firstTime = true,
		running = false, 
		firstRun = true,
		listed = false,
		runOn = false,
		
		cats = [],
		links = [],
		infos = [],
		sizes = [],
		fades = [],
		thumbs = [],
		titles = [],
		videos = [],
		targets = [],
		tipDatas = [],
		titleText = [],
		
		win = $(window),
		doc = $(document),
		bodies = $("body"),
		bgOne = $("<div />"),
		bgTwo = $("<div />"),
		upper = $(".cj-up-icon"),
		bgs = $("#cj-bg-images"), 
		bgUL = bgs.children("ul"),
		play = $(".cj-play-icon"),
		prev = $(".cj-left-icon"),
		infoB = $(".cj-info-icon"),
		next = $(".cj-right-icon"),
		pause = $(".cj-pause-icon"),
		closer = $(".cj-close-icon"),
		catalog = $("#cj-categories"), 
		imageInfo = $("#cj-image-info"),
		closeInfo = $(".cj-close-info"),
		toolTip = $("#cj-thumb-tooltip"),
		footerContainer = $("#cj-footer"),
		thumbHolder = $("#cj-thumbnails"),
		vControls = $("#cj-vid-controls"),
		infoText = $("#cj-image-info-text"),
		videoPlayer = $("#cj-video-player"),
		galleryControls = $("#cj-gallery-controls"),
		videoClose = $("<div />").addClass("cj-video-close"),
		cover = $("<div />").addClass("cj-video-lightbox").css({top: offsetY, left: offsetX}),
		vButton = $("<div />").addClass("cj-video-button").appendTo(mainGallery),
		thumbRight = $("<div />").addClass("cj-thumb-right").data("right", true),
		thumbLeft = $("<div />").addClass("cj-thumb-left").data("right", false),
		vTall = parseInt(vButton.css("height"), 10) >> 1,
		vWide = parseInt(vButton.css("width"), 10) >> 1,
		autoPlayVideo = vData.autoPlayVideo ? "1" : "0",
		thePosition = isFull ? "fixed" : "absolute",
		
		playOn = autoPlay,
		catCount = bgUL.length,
		agent = navigator.userAgent.toLowerCase(),
		cacheBust = agent.search("webkit") !== -1,
		useCategory = catalog.length,
		isMobile = "ontouchend" in document,
		curWinWid = win.width() < 600,
		isTablet = isMobile && !curWinWid,
		isPhone = isMobile && curWinWid,
		useFooter = footerContainer.length,
		useArrows = next.length && prev.length,
		usePlayPause = play.length && pause.length,
		usingClose = closer.length && upper.length,
		useGalleryControls = galleryControls.length,
		usingTip = data.useThumbToolTip && toolTip.length,
		useInfo = imageInfo.length && infoText.length,
		vimeoMarkup = "http://player.vimeo.com/video{url}?title=0&byline=0&portrait=0&autoplay=" + autoPlayVideo,
		youTubeMarkup = "http://www.youtube.com/embed/{url}?autoplay=" + autoPlayVideo + "&autohide=1&hd=1&iv_load_policy=3&showinfo=0&showsearch=0&wmode=transparent";
		// end plugin global vars
		
		$.cjBgSlideshow.getPhone = function() {return isPhone;}
		$.cjBgSlideshow.getTablet = function() {return isTablet;}
		
		if(catCount !== 0) init();
		
		// *********************************
		// INIT FUNCTION
		// *********************************
		
		function init() {
			
			if(isTablet) $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />');
			if(data.disableRightClick) doc.bind("contextmenu", function(event) {event.preventDefault()});	
			if(doc.find("#cj-preloader").length) pre = $("#cj-preloader");	
			if(!useThumbs || !data.useCanvasAnimation) html5 = false;
			if(!thumbHolder.length) useThumbs = false;
			if(maxThumbs === 0) maxThumbs = 999;
			
			var items, 
			tipData, 
			linkers, 
			cjLarge, 
			cjThumb, 
			cjVideo, 
			cjInfo, 
			cjLink, 
			thmbs, 
			centr, 
			infs, 
			tars, 
			vids, 
			fade,
			size,  
			str, 
			txt, 
			st,
			seven = false;
			
			if(agent.search("msie") !== -1) {
				
				var vrs = agent.substr(agent.indexOf("msie") + 4);
				
				if(isFull && vrs === 7) seven = true;
				if(galleryControls.length && vrs > 8) galleryControls.addClass("cj-gc-fix");
				if(vrs === 8) cacheBust = true;
					
			}
			
			if(catCount === 1 && useCategory) {
					
				catalog.css("display", "none");
				useCategory = false;
					
			}
			
			// sort through all categories
			bgUL.each(function(i) {
				
				tipData = [];
				linkers = [];
				items = [];
				thmbs = [];
				vids = [];
				infs = [];
				tars = [];
				
				// sort through all images in each category
				$(this).children("li").each(function(j) {
				
					cjLarge = $(this).find(".cj-large");
					cjThumb = $(this).find(".cj-thumb");
					cjVideo = $(this).find(".cj-video");
					cjInfo = $(this).find(".cj-info");
					cjLink = $(this).find(".cj-link");
					
					if(cjLarge.length) {
					
						if(cjLarge.attr("title")) items[j] = cjLarge.attr("title");
						
					}
					else {
					
						items[j] = "";
	
					}
					
					if(cjThumb.length) {
					
						if(cjThumb.attr("title")) {
										
							thmbs[j] = cjThumb.attr("title");
										
							($.trim(cjThumb.text()) !== "") ? tipData[j] = cjThumb.html() : tipData[j] = "";
										
						}
						
					}
					else {
					
						thumbs[j] = "";
						tipData[j] = "";
						
					}
					
					if(cjInfo.length) {
					
						($.trim(cjInfo.text()) !== "") ? infs[j] = cjInfo.html() : infs[j] = "";
						
					}
					else {
					
						infs[j] = "";
						
					}
					
					 if(cjVideo.length) {
						
						(cjVideo.attr("title")) ? vids[j] = cjVideo.attr("title") : vids[j] = "";
						
					}
					else {
					
						vids[j] = "";
						
					}
					
					if(cjLink.length) {
					
						if(cjLink.attr("title")) {
						
							linkers[j] = cjLink.attr("title");
							
							(cjLink.attr("data-rel")) ? tars[j] = cjLink.attr("data-rel") : tars[j] = "_parent";
							
						}
						else {
						
							linkers[j] = "";
							tars[j] = "";
							
						}
						
					}
					else {
					
						linkers[j] = "";
						tars[j] = "";
						
					}
					
				});
					
				if($(this).attr("class")) {
						
					st = $(this).attr("class");
						
					if(st.search("fit") === -1) {
							
						str = true;
						centr = st.search("center") === -1 ? false : true;
							
					}
					else {
						
						str = false;
						centr = true;
							
					}
					
					if(st.search("fade") !== -1 || seven) {
					
						fade = 0;
						
					}
					else if(st.search("slide") !== -1) {
						
						(st.search("over") === -1) ? fade = 1 : fade = 2;
						
					}
					else {
					
						fade = 3;
						
					}
						
				}
				else {
						
					str = true;
					fade = true;
					centr = false;
	
				}
					
				txt = $(this).attr("title");
				$(this).removeAttr("title");
				titleText[i] = txt.toLowerCase().split(' ').join('_');
				
				if(useCategory) titles[i] = $("<div />").addClass("cj-category").html(txt).data({"id": i, "stretch": str, "center": centr}).appendTo(catalog);
				
				if($(this).attr("data-rel")) {
					
					size = $(this).attr("data-rel").split("x");
					sizes[i] = {width: parseInt(size[0], 10), height: parseInt(size[1], 10)};
					
				}
				
				cats[i] = items;
				infos[i] = infs;
				fades[i] = fade;
				videos[i] = vids;
				thumbs[i] = thmbs;
				targets[i] = tars;
				links[i] = linkers;
				tipDatas[i] = tipData;
					
			});
			
			if(!useCategory) {
				stretched = str;
				centered = centr;
			}
			
			if(useInfo) {
				closeInfo.click(toggleInfo);
			}
			else if(infoB.length) {
				infoB.hide();
			}
			
			if(!useCategory && useThumbs) {
				
				thumbHolder.addClass("cj-no-categories");
				
			}
			else if(!useCategory && !useThumbs && useGalleryControls) {
				
				galleryControls.css("height", galleryControls.height() + parseInt(galleryControls.css("padding-top"), 10));
				
				$("#cj-footer-container").addClass("cj-footer-controls-only");
				
				if(closer.length) closer.hide();
				
			}
			
			if(useFooter && useGalleryControls) {
				
				containerWide = footerContainer.outerWidth(true) >> 1;
				
				if(usingClose) {
					
					closer.data("isOpen", true).click(toggleFooter);
					upper.hide().data("isOpen", false).click(toggleFooter);
					
				}
				else {
					
					if(closer.length) closer.hide();
					if(upper.length) upper.hide();
						
				}
				
			}
						
			if(usePlayPause) {
								
				play.click(handlePlay);
				pause.click(handlePlay);
				
				if(autoPlay) {
					play.hide();
					pause.show();
				}
				else {
					pause.hide();
					play.show();
				}
									
			}
			else {
				
				if(pause.length) pause.hide();
				if(play.length) play.hide();
					
			}
			
			if(!useArrows) {
			
				if(next.length) next.hide();
				if(prev.length) prev.hide();
				
			}
			
			galleryControlW = useGalleryControls ? (galleryControls.outerWidth(true) >> 1) : null;
			vButton.css({display: "none", visibility: "visible"});
			catLeg = cats.length - 1;
			
			bgOne.css({position: thePosition, overflow: "hidden", zIndex: -10000});
			bgTwo.css({position: thePosition, overflow: "hidden", zIndex: -10000});
			
			if(isFull) {
				
				winWide = win.width() - offW;
				winWide = Math.max(winWide, minWidth);
				winTall = win.height() - offH;
				
				bgOne.css({top: offsetY, left: offsetX});
				bgTwo.css({top: offsetY, left: offsetX});
				mainGallery.css({top: offsetY, left: offsetX});
				
				bodies.prepend(bgOne).prepend(bgTwo).append(thumbLeft).append(thumbRight);

			}
			else {
				
				winWide = data.customWidth;
				winTall = data.customHeight;
				mainGallery.append(thumbLeft).append(thumbRight);
				
				mainGallery.css({width: winWide, height: winTall, position: "relative"}).prepend(bgOne).prepend(bgTwo);
				$("<div />").css({width: winWide, height: winTall, position: "absolute", backgroundColor: data.backgroundColor ? data.backgroundColor : "#000", zIndex: -10001}).prependTo(mainGallery);
				
			}
			
			bgClick = $("<div />").css({width: winWide, height: winTall, position: "fixed"}).addClass("cj-bg-click").prependTo(mainGallery);
			winHalf = winWide >> 1;
			winH = winTall >> 1;
			
			arrowHeights = parseInt(thumbLeft.css("height"), 10) >> 1;
			arrowWidths = parseInt(thumbLeft.css("width"), 10);
			
			if(useDeepLink) {
			
				$.address.internalChange(insideChange);
				$.address.externalChange(browserChange);
				if(cjAjaxVersion) $.address.update();
				
			}
			else {
				
				isOn = 0;
				browserChange();
				
			}
			
			if(isFull) win.resize(sizer);
			
			data = null;
			bgUL = null;
			
		}

		
		// *********************************
		// AVAILABLE API CALLS
		// *********************************
		
		// get the current category index
		$.cjBgSlideshow.getCatOn = function() {return catOn;}
		
		// get the current image index within the selected category
		$.cjBgSlideshow.getIsOn = function() {return isOn;}
		
		// get the current jQuery Address hash string
		$.cjBgSlideshow.getHash = function() {return hash;}
		
		// set the current image through jQuery Address
		$.cjBgSlideshow.setURL = function(url) {
			
			if(useDeepLink && typeof url !== "undefined") $.address.value(url);
			
		}
		
		// set the current category by passing an index number
		$.cjBgSlideshow.setCategory = function(cat, id) {
			
			if(typeof cat !== "undefined") {
			
				if(cat > -1 && cat < catCount) {
				
					if(useDeepLink) {
						
						if(!isNaN(id)) {
						
							if(id > -1 && id < leg) {
							
								$.address.value(titleText[cat] + "/" + id);
								
							}
							
						}
						else {
						
							$.address.value(titleText[cat]);
							
						}
						
					}
					else {
					
						catOn = cat;
						
						if(typeof id === Number) isOn = id;
						
						insideChange();
						
					}
					
				}
				
			}
			
		}
		
		// set the current image by passing an index number
		$.cjBgSlideshow.setImage = function(id) {
			
			if(typeof id !== "undefined") {
			
				if(id > -1 && id < leg) {
				
					if(useDeepLink) {
					
						$.address.value(hash.split("/").join("") + "/" + (id + 1).toString());
						
					}
					else {
					
						isOn = id;
						insideChange();
						
					}
					
				}
				
			}
			
		}
		
		// activate available callbacks
		$.cjBgSlideshow.addCallback = function(type, func) {
			
			if(typeof type !== "undefined" && typeof func !== "undefined") {
			
				switch(type.toLowerCase()) {
					
					// get notified when a category is about to change
					case "categorychange":
					
						apiCategoryChange = func;
					
					break;
					
					// get notified when an image is about to change
					case "imagechange":
					
						apiImageChange = func;
					
					break;
					
					// get notified when an image is finished loading
					case "imageloaded":
					
						apiImageLoaded = func;
					
					break;
	
				}
				
			}
			
		}
		
		// activate available callbacks
		$.cjBgSlideshow.removeCallback = function(type) {
			
			if(typeof type !== "undefined") {
			
				switch(type.toLowerCase()) {
					
					// get notified when a category is about to change
					case "categorychange":
					
						apiCategoryChange = null;
					
					break;
					
					// get notified when an image is about to change
					case "imagechange":
					
						apiImageChange = null;
					
					break;
					
					// get notified when an image is finished loading
					case "imageloaded":
					
						apiImageLoaded = null;
					
					break;
	
				}
				
			}
			
		}
		
		// *********************************
		// JQUERY ADDRESS FUNCTIONS
		// *********************************
		
		// fires when the url changes from a browser event
		function browserChange(event) {
			
			if(typeof runTime !== "undefined") clearTimeout(runTime);
			
			killTiming();
			
			if(isLoading) {
				
				if(bgOn === 0) {
					
					if(imgOne) {
						
						imgOne.unbind("load", loaded).attr("src", "").remove();
						imgOne = null;
						
					}
				
				}
				else {
					
					if(imgTwo) {
						
						imgTwo.unbind("load", loaded).attr("src", "").remove();
						imgTwo = null;
						
					}
					
				}
				
				isLoading = false;
					
			}
			
			fromClick = false;
			clickThumb = false;
			
			(useDeepLink) ? getHash(event.value) : getHash();
			
			if(!firstTime) {
				
				disableClicks();
				runTime = setTimeout(changeHash, 750);
				
			}
			else {
				
				changeHash();
				firstTime = false;	
				
			}
			
		}
		
		// fires when an image changes from a user click
		function insideChange(event) {
			
			if(typeof runTime !== "undefined") clearTimeout(runTime);
			
			killTiming();
			disableClicks();
			
			(useDeepLink) ? getHash(event.value) : getHash();
			
			changeHash();
			
		}
		
		// sorts through the browser url and finds the image index
		function getHash(val) {
			
			if(useDeepLink) {
			
				val = val.split("//").join("/");
				
				if(val !== "/") {
					
					var ars = val.split("/"), lgs = ars.length;
					
					if(ars.length === 3) {
						
						isOn = parseInt(ars[2], 10) - 1;
						hash = ars[1];
						
					}
					else {
						
						if(isNaN(ars[1])) {
							isOn = 0;
							hash = ars[1];
						}
						else {
							isOn = parseInt(ars[1], 10) - 1;
							hash = "";
						}
						
					}
					
				}
				else {
				
					hash = "/";
					isOn = 0;
					
				}
				
			}
			
			(!fromThumb && useThumbs) ? switchThumbs(isOn) : fromThumb = false;
			
		}
		
		// sorts through the browser url and checks if the category has changed
		function changeHash() {
			
			var i;
			
			if(useDeepLink) {
				
				prevCat = catOn;
				
				if(hash !== "/" && hash !== "") {
					
					i = catCount;
					
					while(i--) {
					
						if(titleText[i] === hash) {
						
							catOn = i;
							break;
							
						}
						
					}
					
				}
				else {
					catOn = 0;
				}
				
			}
			
			if(useCategory) {
			
				i = catCount;
				
				while(i--) {
					
					if(i !== catOn) {
						titles[i].css({"opacity": catOpacity, "cursor": "pointer"});
					}
					else {
						titles[catOn].css({"opacity": 1, "cursor": "default"})	
					}
					
				}
				
			}
			
			if(pre) pre.fadeIn(300);
			
			if(prevCat !== catOn || !listed) {
				
				getList();
				
				if(thumbList !== null) killThumbs();
				if(thumbsRipped) ripThumbs();
				
			}
			else if(arrowsActive) {
			
				checkThumbs(true, false);
				
			}
			
			if(!cacheBust) {
				loadBG(list[isOn]);
			}
			else {
				// Chrome has a bug which causes the image to sometimes not register a width and height when the image is in already cache
				// IE8 has a memory leak that a cache buster fixes
				loadBG(list[isOn] + "?img=" + new Date().getTime().toString());
			}
			
			if(useInfo) {
				
				if(infoB.length) infoB.unbind("click", toggleInfo);
					
				if($.data(bodies, "cjInfoOn")) {
						
					imageInfo.stop(true, true).fadeOut(300);
						
				}
				
			}
			
		}
		
		
		// *********************************
		// GRAB NEW IMAGE CATEGORY
		// *********************************
		
		function getList() {
			
			fading = fades[catOn];
			listed = true;
			
			list = cats[catOn];
			tipList = tipDatas[catOn];
			thumbUrls = thumbs[catOn];
			currentInfo = infos[catOn];
			currentLinks = links[catOn];
			currentVideos = videos[catOn];
			currentTargets = targets[catOn];
			
			leg = list.length;
			iLeg = leg - 1;
					
			if(randomImg) {
				
				var shuf1 = [], 
				shuf2 = [], 
				shuf3 = [], 
				shuf4 = [],
				shuf5 = [],
				shuf6 = [],
				shuf7 = [],
				placer, 
				len,
				i;
				
				for(i = 0; i < leg; i++) {
				
					shuf1[i] = list[i];
					shuf2[i] = tipList[i];
					shuf3[i] = thumbUrls[i];
					shuf4[i] = currentInfo[i];
					shuf5[i] = currentLinks[i];
					shuf6[i] = currentVideos[i];
					shuf7[i] = currentTargets[i];
					
				}
				
				list = [];
				tipList = [];
				thumbUrls = [];
				currentInfo = [];
				currentLinks = [];
				currentVideos = [];
				currentTargets = [];
								
				while(shuf1.length > 0) { 
								
					placer = (Math.random() * shuf1.length) | 0;
					
					len = list.length;
					
					list[len] = shuf1[placer];
					tipList[len] = shuf2[placer];
					thumbUrls[len] = shuf3[placer];
					currentInfo[len] = shuf4[placer]; 
					currentLinks[len] = shuf5[placer];
					currentVideos[len] = shuf6[placer];
					currentTargets[len] = shuf7[placer];
					
					shuf1.splice(placer, 1);
					shuf2.splice(placer, 1);
					shuf3.splice(placer, 1);
					shuf4.splice(placer, 1);
					shuf5.splice(placer, 1);
					shuf6.splice(placer, 1);
					shuf7.splice(placer, 1);
								
				}
				
			}
			
			if(isOn > iLeg) isOn = 0;
			
			if(useCategory) {
				stretched = titles[catOn].data("stretch");
				centered = titles[catOn].data("center");
			}
			
			if(useThumbs) {
				thumbWidth = sizes[catOn].width;
				thumbHigh = sizes[catOn].height;
			}
			
			bgOne.css("left", offsetX);
			bgTwo.css("left", offsetX);
			
			if(apiCategoryChange) apiCategoryChange();
			
		}

		
		// *********************************
		// BG IMAGE LOAD FUNCTIONS
		// *********************************
		
		// load a new image
		function loadBG(url) {
			
			isLoading = true;
			
			if(bgOn === 0) {
					
				bgOne.css("z-index", parseInt(bgTwo.css("z-index"), 10) + 1);
				
				imgOne = $("<img />").attr("id", "cj-img-one").css({display: "none", position: thePosition}).addClass("cj-no-select").one("load", loaded).appendTo(bgOne);
				imgOne.attr("src", url);
	
			}
			else {

				bgTwo.css("z-index", parseInt(bgOne.css("z-index"), 10) + 1);
			
				imgTwo = $("<img />").attr("id", "cj-img-two").css({display: "none", position: thePosition}).addClass("cj-no-select").one("load", loaded).appendTo(bgTwo);
				imgTwo.attr("src", url);
				
			}
			
			if(apiImageChange) apiImageChange();
					
		}
		
		// fires when the image has loaded
		function loaded(event) {                                          
			
			event.stopPropagation();
			
			isLoading = false;
			
			if(bgOn === 0) {
				
				oWidth = imgOne.width() || imgOne[0].width;
				oHeight = imgOne.height() || imgOne[0].height;
				bgOn = 1;
				
			}
			else {
				
				oWidth = imgTwo.width() || imgTwo[0].width;
				oHeight = imgTwo.height() || imgTwo[0].height;
				bgOn = 0;
				
			}
			
			if(pre) pre.fadeOut(300);
			
			sizer();
			fadeImage();
						
		}
		
		// animates the new image in
		function fadeImage() {
			
			running = true;
			
			if(!firstFade) {
				
				// fade transition
				if(fading === 0) {
					
					if(!stretched) detach();
					
					(bgOn === 1) ? imgOne.fadeIn(time, afterTrans) : imgTwo.fadeIn(time, afterTrans);	
				
				}
				
				else {
						
					if(!fromClick) { 
							
						goingRight = true;
							
					}
					else if(clickThumb) {
						
						if(wasOn === iLeg && isOn === 0) {
							goingRight = true;	
						}
						else if(wasOn === 0 && isOn === iLeg) {
							goingRight = false;	
						}
						else if(isOn > wasOn) {
							goingRight = true;	
						}
						else {
							goingRight = false;	
						}
							
					}
					
					// slide transition
					if(fading !== 3) {
						
						var wideOne, wideTwo;
						
						if(goingRight) {
						
							wideOne = 1;
							wideTwo = -1;
							
						}
						else {
						
							wideOne = -1;
							wideTwo = 1;
							
						}
						
						if(bgOn === 1) {
						
							bgOne.css("left", (winWide * wideOne) + offsetX);
							imgOne.css("display", "block");
									
							if(fading === 1) bgTwo.animate({left: (winWide * wideTwo) + offsetX}, time);
							bgOne.animate({left: offsetX}, time, afterTrans);
									
						}
						else {
													
							bgTwo.css("left", (winWide * wideOne) + offsetX);
							imgTwo.css("display", "block");
									
							if(fading === 1) bgOne.animate({left: (winWide * wideTwo) + offsetX}, time);
							bgTwo.animate({left: offsetX}, time, afterTrans);
									
						}
						
					}
					
					// wipe transition
					else {
						
						var winPush = winWide + offsetX, theImg = bgOn === 1 ? imgOne : imgTwo;
						
						if(goingRight) {
							
							theImg.css({fontSize: 0, clip: "rect(0px, " + winPush + "px, " + winTall + "px, " + winPush + "px)", display: "block"}).animate(
								
								{fontSize: 100}, {
									
									duration: time, 
									complete: afterTrans,
									
									step: function(now) {
										
										theImg.css({"clip": "rect(0px, " + winPush + "px, " + winTall + "px, " + (winPush * (1 - (now * .01))) + "px)"}); 
										
									}
									
								}
								
							);
							
						}
						else {
							
							theImg.css({fontSize: 0, clip: "rect(0px, 0px, " + winTall + "px, 0px)", display: "block"}).animate(
								
								{fontSize: 100}, {
									
									duration: time, 
									complete: afterTrans,
									
									step: function(now) {
										
										theImg.css({"clip": "rect(0px, " + (winPush * (now * .01)) + "px, " + winTall + "px, 0px)"}); 
										
									}
									
								}
								
							);
							
						}
						
					}
						
				}
				
			}
			else {
				
				firstFade = false;
				imgOne.fadeIn(time, afterTrans);
				
			}
			
			wasOn = isOn;
				
		}
		
		// kill running timers
		function killTiming() {
		
			if(html5) killCanvas() 
			if(timer) clearTimeout(timer);
			
		}
		
		// disposes of the previous image after the new one animates in
		function detach() {
		
			if(bgOn === 1) {
			
				if(imgTwo) {
					
					imgTwo.unbind("load", loaded).attr("src", "").stop(true, true).remove();
					imgTwo = null;
					
				}
				
			}
			else {
			
				if(imgOne) {
					
					imgOne.unbind("load", loaded).attr("src", "").stop(true, true).remove();
					imgOne = null;
					
				}
				
			}
			
		}
		
		// sets the new image info
		function afterTrans() {
				
			running = false;
			
			if(fading === 0 && !stretched){} else {detach();}	
								  
			bgFired();
			
			if(useInfo) {
				
				if($.trim(currentInfo[isOn]) !== "") {
					
					infoText.html(currentInfo[isOn]);
					
					if($.data(bodies, "cjInfoOn")) imageInfo.stop(true, true).css("display", "none").fadeIn(300);
					if(infoB.length) infoB.css("cursor", "pointer").removeClass("cj-no-info-hover").click(toggleInfo);
					
				}
				else {
				
					if(infoB.length) infoB.addClass("cj-no-info-hover").css("cursor", "auto");
					
				}
				
			}
													  
		}
		
		// prepares for a new image load
		function changeBG() {
					
			fromClick = false;
			clickThumb = false;
			
			changeNext();
					
		}
		
		// events that fire after an image has loaded (thumbs, image info, video button)
		function bgFired() {
			
			if(thumbList === null && !containerMoved) {

				if(useFooter && useThumbs) {
				
					if(!thumbsRipped) {
						
						ripThumbs();
						thumbsRipped = true;
						
					}
					
				}
				else if(useFooter) {
					
					posContainer();
			
					firstToggle = false;
					
					if(useCategory) catalog.addClass("cj-no-thumbnails");
					
					footerContainer.css({display: "none", visibility: "visible"}).fadeIn(300);
					
				}
				
				containerMoved = true;
				
			}
			
			activateControls(checkVideo());
			
			if(showInfo) {
				
				if(useInfo) {
					
					$.data(bodies, "cjInfoOn", false);
					toggleInfo();
					
				}
				
				showInfo = false;
				
			}
			
			if(apiImageLoaded) apiImageLoaded();
					
		}
		
		// checks to see if a video popup is present
		function checkVideo() {
			
			if(currentVideos[isOn] === "") {
			
				return false;
				
			}
			else {
			
				vButton.stop(true, true).css({
					
					cursor: "pointer",
					top: winH - vTall + offsetY, 
					left: winHalf - vWide + offsetX
					
				}).click(activateCover).fadeIn(300);
				
				vButtonActive = true;
				
				return true;
				
			}
			
		}
		
		// *********************************
		// ACTIVATE/DEACTIVATE CONTROLS
		// *********************************
		
		// activates all user controls after an image change
		function activateControls(vActive) {
		
			killTiming();
			
			var i, passed = true, clickFunction;
			
			if(useCategory) {
				
				i = catCount;
					
				while(i--) {
				
					if(i !== catOn) titles[i].mouseover(overCat).mouseout(outCat).click(categoryClick);
					
				}
				
			}
			
			if(leg > 1) {		
				
				if(thumbList !== null) {
							
					i = leg;
							
					while(i--) {
						
						if(i !== isOn) thumbList[i].click(thumbClick);
						
					}
							
				}
				
				if(useArrows) {
					
					prev.click(handleLeft);
					next.click(handleRight);	
					
				}
				
				if(playOn) {
					
					if(html5 && useThumbs) {
					
						if(theCanvas === null) theCanvas = $("<canvas />");
						theCanvas.css({marginLeft: (thumbWidth >> 1) - 26, marginTop: (thumbHeight >> 1) - 26}).appendTo(thumbHovers[isOn]);
						startCanvas();
						
					}
					else {
						timer = setTimeout(changeBG, transDelay);
					}
					
				}
				
			}
			
			if(vActive) {
			
				clickFunction = activateCover;
				
			}
			else if(currentLinks[isOn] !== "") {
				
				clickFunction = gotoURL;
				
			}
			else if(clickNext) {
			
				clickFunction = handleRight;
				
			}
			else {
			
				passed = false;
				
			}
			
			if(passed) bgClick.css("cursor", "pointer").click(clickFunction);
			if(useKeys) doc.keydown(keyClick);
			
			runOn = false;
			readyToFire = true;
			
		}
		
		// temporarily disable mouse events while the bg is changing
		function disableClicks() {
		
			runOn = true;
			readyToFire = false;
			
			var i;
			
			if(useCategory) {
				
				i = catCount;
				while(i--) titles[i].unbind("click", categoryClick).unbind("mouseover", overCat).unbind("mouseout", outCat);
				
			}
				
			if(thumbList !== null) {
					
				i = leg;
				while(i--) thumbList[i].unbind("click", thumbClick);
				
			}
			
			if(useArrows) {
				prev.unbind("click", handleLeft);
				next.unbind("click", handleRight);
			}
			
			if(useKeys) doc.unbind("keydown", keyClick);
			
			bgClick.unbind("click", handleRight).unbind("click", activateCover).unbind("click", gotoURL).css("cursor", "auto");
			killCover();
			
		}
		
		// navigate to a url for a bg with a link attached to it
		function gotoURL() {
			
			(currentTargets[isOn] === "_parent") ? window.location = currentLinks[isOn] : window.open(currentLinks[isOn]);
			
			// pause slideshow when navigating to an external link
			if(usePlayPause) {
				
				playOn = true;
				handlePlay();
				
			}
			else {
			
				killTiming();
				
				playOn = false;
						
				if(!runOn) readyToFire = true;
				
			}
			
			// pause music when navigating to an external link
			if(typeof $.cjMusicPlayer !== "undefined") $.cjMusicPlayer.toggleMusic(true);
				
		}
		
		
		// *********************************
		// VIDEO FUNCTIONS
		// *********************************
		
		// activate the lightbox
		function activateCover(event) {
			
			event.stopPropagation();
			
			vButton.unbind("click", activateCover).css("cursor", "auto");
			
			previousPlay = playOn;
			
			if(usePlayPause) {
				
				playOn = true;
				handlePlay();
				
			}
			else {
			
				killTiming();
				
				playOn = false;
						
				if(!runOn) readyToFire = true;
				
			}
			
			cover.css({width: winWide, height: winTall}).appendTo(mainGallery).fadeIn(500, activateVideo);
			videoActive = true;
			
		}
		
		// activate the lightbox content
		function activateVideo() {
			
			if(typeof $.cjMusicPlayer !== "undefined") $.cjMusicPlayer.toggleMusic(true);
			
			var vUrl = currentVideos[isOn], st, isHtmlVideo = false;
			
			vHeight = videoHeight;
			
			if(vUrl.search("youtube.com") !== -1) {
				
				st = youTubeMarkup.split("{url}").join(vUrl.split("watch?v=")[1]);
				
			}
			else if(vUrl.search("vimeo.com") !== -1) {
				
				st = vimeoMarkup.split("{url}").join(vUrl.substring(vUrl.lastIndexOf("/")));
				
			}
			else if(vUrl.search(".mp4") !== -1) {
				
				isHtmlVideo = true;
				st = currentVideos[isOn].split(".mp4")[0];
				
				if(vControls.length) {
					
					vControls.show();
					vHeight += parseInt(vControls.css("height"), 10);
					
				}
				
			}
			else {
			
				st = currentVideos[isOn];
				
			}
			
			// YouTube, Vimeo and generic iFrame
			if(!isHtmlVideo) {
				
				var iLeft = winHalf - (videoWidth >> 1) + offsetX, iTop = winH - (vHeight >> 1) + offsetY;
				
				iframe = $("<iframe />").attr("type", "text/html").attr("width", videoWidth.toString()).attr("height", videoHeight.toString()).attr("frameborder", 0).attr("src", st).addClass("cj-video-iframe").css({
					
					position: isFull ? "fixed" : "absolute",
					left: iLeft,
					top: iTop
						
				}).appendTo(cover);
				
				videoClose.css({top: iTop + vHeight, left: iLeft + videoWidth}).appendTo(mainGallery).show();
				
			}
			
			// HTML5 Video w/ Flash Fallback
			else if(videoPlayer.length && typeof $.cjVideoPlayer !== "undefined") {
					
				videoPlayer.appendTo(bodies);
				htmlVideo = $("<video />").attr("id", "cj-html-video").attr("width", videoWidth).attr("height", videoHeight);
				
				var ar = $.cjVideoPlayer.getValues();
				var videoAdjusted = videoHeight + 28;
				
				// Flash fallback emned
				htmlVideo.html(
				
					'<object type="application/x-shockwave-flash" data="' + videoFallback + '" width="' + videoWidth + '" height="' + videoAdjusted + '">' + 
                    	'<param name="movie" value="' + videoFallback + '" />' + 
						'<param name="allowScriptAccess" value="always" />' + 
						'<param name="bgcolor" value="#000000" />' + 
						'<param name="allowfullscreen" value="true" />' +  
						'<param name="wmode" value="gpu" />' + 
						'<param name="flashvars" value="url=' + st + '&vol=' + ar[0] + '&auto=' + ar[1] + '&width=' + videoWidth + '&height=' + videoHeight + '" />' +
					'</object>'
					
				);
				
				// HTML5 video sources
				$("<source />").attr("type", "video/webm").attr("src", st + ".webm").prependTo(htmlVideo);
				$("<source />").attr("type", "video/ogg").attr("src", st + ".ogv").prependTo(htmlVideo);
				$("<source />").attr("type", "video/mp4").attr("src", st + ".mp4").prependTo(htmlVideo);
				
				htmlVideo.prependTo(videoPlayer);	
				videoClose.appendTo(bodies).fadeIn(300);
				
				// if HTML5 supported, fire up the video controls
				if(Modernizr.video) {
				
					ar = $.cjVideoPlayer.instance(posVideo);
					destroyVideo = ar[0];
					checkFull = ar[1];
					
				}
				else {
				
					if(vControls.length) vControls.hide();
					
				}
				
				posVideo();
				win.resize(posVideo);
				videoPlayer.fadeIn(300);
				
			}
			
			videoClose.click(killCover);
			cover.click(killCover);
			
		}
		
		// positions the video (the video is floated over the gallery to allow for seamless fullscreen)
		function posVideo(event) {
			
			var off = mainGallery.offset(),
			x = off.left + winHalf - (videoWidth >> 1),
			y = off.top + (winTall >> 1) - (vHeight >> 1);
			
			if(checkFull !== null) {
			
				if(!checkFull()) videoPlayer.css({left: x, top: y});
				
			}
			else {
			
				videoPlayer.css({left: x, top: y});
				
			}
			
			videoClose.css({left: x + videoWidth, top: y + vHeight});
			
		}
		
		// kill the lightbox
		function killCover(event) {
			
			var anim;
			
			if(event) {
				
				event.stopPropagation();
				anim = true;
				
			}
			else {
			
				anim = false;
				
			}
			
			cover.unbind("click", killCover);
			videoClose.unbind("click", killCover).stop(true, true);
			
			// if the lightbox play button is present
			if(vButtonActive) {
				
				if(anim) {
				
					vButton.css("cursor", "pointer").click(activateCover);
					
				}
				else {
				
					vButton.unbind("click", activateCover).css("cursor", "auto").fadeOut(250, hideV);
					vButtonActive = false;
					
				}
				
			}
			
			// if the lightbox is active
			if(videoActive) {
			
				if(anim) {
					
					if(iframe !== null) iframe.empty().remove();
					cover.stop(true, true).fadeOut(500, removeCover);
					
				}
				else {
					
					cover.stop(true, true).css("display", "none").empty().detach();
					if(typeof $.cjMusicPlayer !== "undefined") $.cjMusicPlayer.toggleMusic(false);
					
				}
				
				// if the lightbox content is active
				if(htmlVideo !== null) {
					
					if(destroyVideo !== null) destroyVideo();
				
					htmlVideo.empty().remove();
					win.unbind("resize", posVideo);
					videoPlayer.css("display", "none");
					
					htmlVideo = null;
					checkFull = null;
					destroyVideo = null;
					
				}
				
				iframe = null;
				videoClose.hide();
				videoActive = false;
				
				if(previousPlay) {
			
					if(usePlayPause) {
					
						playOn = false;
						handlePlay();
						
					}
					else {
						
						playOn = true;
						setCanvas();
						
					}
					
				}
				
			}

		}
		
		// hide the lightbox play button
		function hideV() {
		
			vButton.hide();
			
		}
		
		// hide the lightbox bg
		function removeCover() {
		
			cover.empty().detach();
			
			if(typeof $.cjMusicPlayer !== "undefined") $.cjMusicPlayer.toggleMusic(false);
			
		}
		
		
		// *********************************
		// FOOTER/INFO FUNCTIONS
		// *********************************
		
		// toggles the footer up and down
		function toggleFooter(event, goingDown) {
			
			if(event !== null) {
				
				event.stopPropagation();
				
				goingDown = $(this).data("isOpen");
				
			}
			
			if(!firstToggle) {
				
				if(goingDown) {
					
					var gHeights = useGalleryControls ? galleryControls.outerHeight(true) : 0,
					posY = -footerContainer.outerHeight(true) + gHeights;
					
					footerContainer.stop(true, true).data("hidden", true).animate({bottom: posY}, 200);
					
					if(arrowsActive) {
						
						var yy = thumbLeft.data("top") - posY;
						
						thumbLeft.animate({top: yy}, 200);
						thumbRight.animate({top: yy}, 200);
						
					}
					
					closer.hide();
					upper.show();
					
				}
				else {
					
					footerContainer.stop(true, true).data("hidden", false).animate({bottom: 0}, 200);
					
					if(arrowsActive) {
					
						var yyy = thumbLeft.data("top");
					
						thumbLeft.animate({top: yyy}, 200);
						thumbRight.animate({top: yyy}, 200);
						
					}
					
					upper.hide();
					closer.show();
					
				}
				
			}
			else {
				
				var gHeight = useGalleryControls ? galleryControls.outerHeight(true) : 0,
				posYY = -footerContainer.outerHeight(true) + gHeight,
				tPos = parseInt(thumbLeft.css("top"), 10);
					
				footerContainer.css("bottom", posYY).data("hidden", true); 
				thumbLeft.data("top", tPos);
					
				tPos -= posYY;
					
				thumbLeft.css("top", tPos);
				thumbRight.css("top", tPos);
				
				if(usingClose) {	
					
					closer.hide();
					upper.show();
					
				}
				
				if(useGalleryControls) galleryControls.css("display", "none").fadeIn(300);

			}
			
		}
		
		// toggles the image info in and out
		function toggleInfo() {
			
			if(!$.data(bodies, "cjInfoOn")) {
				
				$.data(bodies, "cjInfoOn", true);
				imageInfo.stop(true, true).css("display", "none").fadeIn(300);
				
			}
			else {
				
				$.data(bodies, "cjInfoOn", false);
				imageInfo.stop(true, true).fadeOut(300);
				
			}
			
		}
		
		// *********************************
		// CATEGORY MOUSE EVENTS
		// *********************************
		
		// category link mouse over event
		function overCat() {
		
			$(this).css("opacity", 1);
			
		}
		
		// category link mouse out event
		function outCat() {
		
			$(this).css("opacity", catOpacity);
			
		}
		
		// category link click event
		function categoryClick(event) {
			
			event.stopPropagation();
			
			fromClick = true;
			clickThumb = false;
			goingRight = true;
			
			if(!runOn) {
				
				if(useDeepLink) {	
					
					$.address.value(titleText[$(this).data("id")]);
					
				}
				else {
					
					catOn = $(this).data("id");
					isOn = 0;
					
					insideChange();
					prevCat = catOn;
					
				}
				
			}
			
		}
		
		// *********************************
		// NEXT/PREV/PLAY/PAUSE MOUSE EVENTS
		// *********************************
		
		// keyboard control events
		function keyClick(event) {
			
			switch(event.keyCode) {
			
				case 39:
				
					handleRight();
				
				break;
				
				case 37:
				
					handleLeft();
				
				break;
				
				case 40:
				
					toggleFooter(null, true);
				
				break;
				
				case 38:
				
					toggleFooter(null, false);
				
				break;
				
			}
			
		}
		
		// go to the previous image
		function handleLeft(event) {
			
			if(event) event.stopPropagation();
			
			fromClick = true;
			clickThumb = false;
			goingRight = false;
			
			if(isOn > 0) {
				
				isOn--;
				
				if(useDeepLink) {
			
					$.address.value(hash.split("/").join("") + "/" + (isOn + 1).toString());
					
				}
				else {
					
					insideChange();
					
				}
				
			}
			else {
				
				var tempCat = catOn > 0 ? catOn - 1 : catLeg;
				
				isOn = cats[tempCat].length - 1;
				
				if(useDeepLink) {
			
					$.address.value(titleText[tempCat] + "/" + (isOn + 1).toString());
					
				}
				else {
					
					catOn = tempCat;
					insideChange();
					prevCat = catOn;
					
				}
				
			}
			
		}
		
		// go to the next image
		function handleRight(event) {
			
			if(event) event.stopPropagation();
			
			fromClick = true;
			goingRight = true;
			clickThumb = false;
			
			changeNext();
			
		}
		
		// loads the next image
		function changeNext() {
		
			if(isOn < iLeg) {
				
				isOn++;
				
				if(useDeepLink) {
				
					$.address.value(hash.split("/").join("") + "/" + (isOn + 1).toString());
				
				}
				else {
					
					insideChange();
					
				}
				
			}
			else {
				
				isOn = 0;
				
				if(useDeepLink) {
				
					$.address.value(titleText[(catOn < catLeg) ? catOn + 1 : 0]);
				
				}
				else {
					
					(catOn < catLeg) ? catOn++ : catOn = 0;
					
					insideChange();
					prevCat = catOn;
					
				}
				
			}
			
		}
		
		// toggle slideshow play/pause
		function handlePlay(event) {
			
			if(event) event.stopPropagation();
			
			if(playOn) {
						
				killTiming();
				pause.hide();
				play.show();
						
				playOn = false;
						
				if(!runOn) readyToFire = true;	
						
			}
					
			else {
						
				play.hide();
				pause.show();
						
				playOn = true;
				
				if(readyToFire) setCanvas();
						
			}
					
		}
		
		// *********************************
		// THUMBNAIL FUNCTIONS
		// *********************************
		
		// create and load a new set of thumbnails
		function ripThumbs() {
			
			thumbImages = [];
			thumbHovers = [];
			thumbList = [];
			thumbCount = 0;
			
			var thumbDiv;
			
			for(var i = 0; i < leg; i++) {
				
				thumbDiv = $("<div />").data("id", i).addClass("cj-thumb-div").width(thumbWidth).height(thumbHigh).appendTo(thumbHolder);
				thumbImages[i] = $("<img />").addClass("cj-thumb-image").one("load", thumbLoaded).appendTo(thumbDiv);
				thumbHovers[i] = $("<div />").addClass("cj-thumb-hover").css({width: thumbWidth, height: thumbHigh, opacity: i !== isOn ? 0 : thumbOpacity}).appendTo(thumbDiv);
				thumbList[i] = thumbDiv;
				
			}
			
			thumbHeight = thumbDiv.outerHeight(true);
			thumbMargin = thumbDiv.outerWidth(true) - thumbWidth;
			thumbStretch = thumbWidth + thumbMargin;
			thumbMargin -= parseInt(thumbDiv.css("borderLeftWidth"), 10) << 1;
			thumbMarDub = thumbMargin << 1;
			
			totalThumbW = thumbStretch * leg;
			thumbHighs = thumbHigh >> 1;
			arrowHeight = (thumbHigh >> 1) - arrowHeights;
			thumbOn = 0;
			
			if(posThumbs()) {
				
				checkArrows();
				thumbLeft.fadeIn(300);
				thumbRight.fadeIn(300);
					
			}
			
			footerContainer.css("visibility", "visible");	
			thumbsReady = true;
			
			thumbList[0].addClass("cj-thumb-div-first");
			thumbImages[0].attr("src", thumbUrls[0]);
			
			if(footerContainer.data("hidden")) {
				
				var gHeight = useGalleryControls ? galleryControls.outerHeight(true) : 0,
				posY = -footerContainer.outerHeight(true) + gHeight,
				yy = thumbLeft.data("top") - posY;
				
				footerContainer.stop(true, true).css("bottom", posY);
				
				thumbLeft.css("top", yy);
				thumbRight.css("top", yy);
				
			}
			
			if(firstToggle) {
			
				if(hideThumbs && useGalleryControls && usingClose) toggleFooter(null);
				firstToggle = false;
				
			}
			
		}
		
		function checkArrows() {
		
			thumbLeft.stop(true, true).css("display", "block").unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut);
			thumbRight.stop(true, true).css("display", "block").unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut);
			
			if(thumbOn < leg - numThumbs) {
				thumbRight.css({cursor: "pointer", opacity: 1}).mouseover(thumbArrowOver).mouseout(thumbArrowOut).click(thumbArrowClick);
			}
			else {
				thumbRight.css({cursor: "auto", opacity: arrowInactive}).removeClass("cj-thumb-arrow-hover");
			}
			
			if(thumbOn > 0) {
				thumbLeft.css({cursor: "pointer", opacity: 1}).mouseover(thumbArrowOver).mouseout(thumbArrowOut).click(thumbArrowClick);
			}
			else {
				thumbLeft.css({cursor: "auto", opacity: arrowInactive}).removeClass("cj-thumb-arrow-hover");
			}
			
		}
		
		// fires after each thumbnail has loaded
		function thumbLoaded(event) {
			
			event.stopPropagation();

			if(thumbCount < iLeg) {
				
				thumbCount++;
				thumbImages[thumbCount].attr("src", thumbUrls[thumbCount]);
				
			}
			
			var who = $(this).parent().data("id");
			
			if(who !== isOn) {
				
				thumbList[who].css("cursor", "pointer").mouseover(thumbOver).mouseout(thumbOut).click(thumbClick);
				
			}
			
			$(this).fadeIn(300);
			
		}
		
		// position the thumbnails
		function posThumbs(resize) {
			
			// the number "80" below acts as a left and right margin buffer for the thumbnails
			numThumbs = ((winWide - 80) / thumbStretch) | 0;	
			numThumbs = Math.min(numThumbs, maxThumbs);
			numThumbs = Math.min(numThumbs, leg);
			thumbMinus = numThumbs - 1;
			
			var fitThumbs = (numThumbs * thumbStretch) + thumbMargin,
			fitHalf = fitThumbs >> 1;
			
			thumbHolder.parent().css("width", fitThumbs - thumbMarDub);
			thumbHolder.css({width: totalThumbW, height: thumbHeight});
			footerContainer.css({left: winHalf - fitHalf + offsetX, width: fitThumbs});
			
			if(useGalleryControls) galleryControls.css({marginLeft: fitHalf - galleryControlW});
			
			checkThumbs(false, resize);
			
			if(numThumbs < leg) {
					
				if(resize) checkArrows();
				
				var bClosed = footerContainer.data("hidden");
				
				if(bClosed) {
					
					var gHeight = useGalleryControls ? galleryControls.outerHeight(true) : 0;
					footerContainer.stop(true, true).css("bottom", -footerContainer.outerHeight(true) + gHeight);
					
				}
				
				var gPos = mainGallery.offset(),
				offCon = footerContainer.offset(),
				tPos = thumbHolder.offset().top - gPos.top + arrowHeight + offsetY;
				
				thumbLeft.css({top: tPos, left: offCon.left - gPos.left - arrowWidths + offsetX});
				thumbRight.css({top: tPos, left: offCon.left - gPos.left + fitThumbs + offsetX});
				arrowsActive = true;
				
				if(!bClosed) {
					
					thumbLeft.data("top", tPos);
					
				}
				else {
					
					var gHeights = useGalleryControls ? galleryControls.outerHeight(true) : 0;
					thumbLeft.data("top", tPos + (-footerContainer.outerHeight(true) + gHeights));
					
				}
					
			}
			else {
				
				thumbLeft.stop(true, true).unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut).removeClass("cj-thumb-arrow-hover").css("display", "none");
				thumbRight.stop(true, true).unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut).removeClass("cj-thumb-arrow-hover").css("display", "none");
				arrowsActive = false;

			}
			
			return arrowsActive;
			
		}
		
		// checks the thumbnail strip position when a resize or image change occurs
		function checkThumbs(tween, resize) {
			
			if(resize) {
				
				thumbOn = isOn;
				
				if(isOn !== 0 && isOn + numThumbs > leg) thumbOn = leg - numThumbs;
			
				thumbHolder.stop(true, true).css("marginLeft", thumbOn * -thumbStretch);
				
			}
			
			else {
				
				if(isOn === 0) {
					
					thumbOn = 0;	

				}
				else if(isOn > thumbOn + thumbMinus) {
				
					while(isOn > thumbOn + thumbMinus) thumbOn++;
					
				}
				
				if(tween) {
				
					thumbHolder.stop(true).animate({marginLeft: thumbOn * -thumbStretch}, 500);
					
				}
				else {
	
					thumbHolder.stop(true, true).css("marginLeft", thumbOn * -thumbStretch);
					
				}
				
			}
			
			checkArrows();
			
		}
		
		// thumbnail mouse over event
		function thumbOver(event) {
			
			event.stopPropagation();
			
			$(this).children("div").stop(true).fadeTo(300, thumbOpacity);
			
			var toGo = $(this).data("id");
			
			if(usingTip && tipList[toGo] !== "") {
				
				if(isFull) {
				
					tipTop = 0;
					tipLeft = 0;
					
				}
				else {
				
					var offer = mainGallery.offset();
					tipTop = offer.top;
					tipLeft = offer.left;
					
				}
				
				toolTip.stop(true, true).html(tipList[toGo]);
					
				tipHeight = toolTip.outerHeight(true) + 10;
				tipWidth = toolTip.outerWidth(true) >> 1;	
				
				toolTip.css({
					
					display: "none",
					top: event.pageY - tipTop - tipHeight, 
					left: event.pageX - tipLeft - tipWidth
						
				}).fadeIn(300);
					
				$(this).mousemove(moveTip);
					
			}
			
		}
		
		// thumbnail mouse out event
		function thumbOut(event) {
			
			event.stopPropagation();
			
			$(this).children("div").stop(true).fadeTo(300, 0);
			
			if(usingTip) {
			
				$(this).unbind("mousemove", moveTip);
				toolTip.stop(true, true).fadeOut(200);
				
			}
			
		}
		
		// thumbnail tool-tip mouse move event
		function moveTip(event) {
			
			event.stopPropagation();
			
			toolTip.css({
				
				top: event.pageY - tipTop - tipHeight, 
				left: event.pageX - tipLeft - tipWidth
				
			});
			
		}
		
		// thumbnail click event
		function thumbClick(event) {
			
			event.stopPropagation();
			
			if(!runOn) {
				
				fromClick = true;
				clickThumb = true;
				
				var toGo = $(this).data("id");
				switchThumbs(toGo);
				
				if(usingTip) {
			
					$(this).unbind("mousemove", moveTip);	
					toolTip.stop(true, true).fadeOut(200);
						
				}
				
				fromThumb = true;
				
				if(useDeepLink) {
				
					$.address.value(hash.split("/").join("") + "/" + (toGo + 1).toString());
					
				}
				else {
				
					isOn = toGo;
					insideChange();
					
				}
						
			}
						
		}
		
		// thumbnail strip left/right arrow click events
		function thumbArrowClick(event) {
			
			event.stopPropagation();
			
			if($(this).data("right")) {
				
				if(thumbOn < leg - numThumbs) {
					
					thumbOn++;
					
					if(thumbOn === leg - numThumbs) thumbRight.unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut).removeClass("cj-thumb-arrow-hover").css({cursor: "auto", opacity: arrowInactive});
					thumbLeft.unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut).css({cursor: "pointer", opacity: 1}).mouseover(thumbArrowOver).mouseout(thumbArrowOut).click(thumbArrowClick);
					
				}
				else {
					return;
				}
					
			}
			else {
					
				if(thumbOn > 0) {
					
					thumbOn--;
					
					if(thumbOn === 0) thumbLeft.unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut).removeClass("cj-thumb-arrow-hover").css({cursor: "auto", opacity: arrowInactive});
					thumbRight.unbind("click", thumbArrowClick).unbind("mouseover", thumbArrowOver).unbind("mouseout", thumbArrowOut).css({cursor: "pointer", opacity: 1}).mouseover(thumbArrowOver).mouseout(thumbArrowOut).click(thumbArrowClick);
					
				}
				else {
					return;	
				}
				
			}
			
			thumbHolder.stop(true).animate({marginLeft: thumbOn * -thumbStretch}, 300);
			
		}
		
		// thumb strip arrow mouse over
		function thumbArrowOver(event) {
			
			event.stopPropagation();
			
			$(this).addClass("cj-thumb-arrow-hover");
			
		}
		
		// thumb strip arrow mouse out
		function thumbArrowOut(event) {
		
			event.stopPropagation();
		
			$(this).removeClass("cj-thumb-arrow-hover");
			
		}
		
		// change active thumbnail 
		function switchThumbs(itemOn) {
		
			var i = leg;
				
			while(i--) {
					
				if(i !== itemOn) {
						
					thumbHovers[i].stop(true, true).css("opacity", 0)
					thumbList[i].stop(true, true).css("cursor", "pointer").mouseover(thumbOver).mouseout(thumbOut);
						
				}
				else {
						
					thumbHovers[i].stop(true, true).css("opacity", thumbOpacity);
					thumbList[i].unbind("mouseover", thumbOver).unbind("mouseout", thumbOut).css("cursor", "auto");
					
					if(!clickThumb && usingTip) {
			
						thumbList[i].unbind("mousemove", moveTip);
						toolTip.stop(true, true).fadeOut(200);
						
					}
						
				}
					
			}
			
		}
		
		// dispose of the current set of thumbnails when a category changes
		function killThumbs() {
		
			while(thumbList.length) {
				
				thumbImages[0].unbind("load", thumbLoaded).attr("src", "").unbind("mousemove", moveTip);
				
				thumbHovers[0].stop(true, true).empty();
				
				thumbList[0].unbind("mouseover", thumbOver).unbind("mouseout", thumbOut).removeData("id").empty();
				
				thumbList.shift();
				thumbImages.shift();
				thumbHovers.shift();
					
			}
				
			thumbHolder.stop(true, true).empty();
			thumbsReady = false;
			
			if(usingTip) toolTip.stop(true, true).css("display", "none");
			
			thumbList = null;
			thumbImages = null;
			thumbHovers = null;
			
		}
		
		// *********************************
		// CANVAS PRELOADER FUNCTIONS
		// *********************************
		
		// prepare the thumb preloader animation
		function setCanvas() {
		
			if(html5 && useThumbs) {
					
				if(theCanvas === null) theCanvas = $("<canvas />");	
				theCanvas.css({marginLeft: (thumbWidth >> 1) - 26, marginTop: (thumbHeight >> 1) - 26}).appendTo(thumbHovers[isOn]);
				startCanvas();
						
			}
			else {
				timer = setTimeout(changeBG, transDelay);
			}
			
		}
		
		// start the thumb preloader animation
		function startCanvas() {
		
            cPerc = 1;
                
            canvas = theCanvas[0];
			context = canvas.getContext('2d');
                    
            canvas.width = 51;
            canvas.height = 51;
				
			context.lineWidth = 10;
            context.strokeStyle = "#000";
                    
            canvasTimer = setInterval(runCanvas, cTime);
			
		}
		
		// animate the thumb preloader
		function runCanvas() {
		
			cEnd = cBegin + (cPerc * .02 * Math.PI);
                  
            context.clearRect(0, 0, 51, 51);
            context.beginPath();
                
            context.arc(26, 26, 13, cBegin, cEnd, false);
            context.stroke();
            context.save();
            
            if(cPerc < 100) {
					
				cPerc += 1;
					
			}
			else {
					
				clearInterval(canvasTimer);
				context.closePath();
				
				context = null;
				canvas = null;
				
				changeBG();
					
			}
			
		}
		
		// stop and dispose the thumb preloader
		function killCanvas() {
			
			if(typeof canvasTimer !== "undefined") clearInterval(canvasTimer);
			
			if(context) {
				
				context.closePath();
				context.clearRect(0, 0, 51, 51);
				context = null;
				
			}
			
			if(theCanvas !== null) {
				
				theCanvas.remove();
				theCanvas = null;
				
			}
			
			canvas = null;
			
		}
		
		
		// *********************************
		// BROWSER RESIZE FUNCTIONS
		// *********************************
		
		// reposition the footer
		function posContainer() {
			
			footerContainer.css({left: winHalf - containerWide});
			if(useGalleryControls) galleryControls.css({marginLeft: containerWide - galleryControlW});
			
		}
		
		// browser resize event, also called when an image loads
		function sizer(event) {
			
			if(isFull) {
				
				winWide = win.width() - offW;
				winWide = Math.max(winWide, minWidth);
				winHalf = winWide >> 1;
				
				winTall = win.height() - offH;
				winH = winTall >> 1;
				
			}
			
			if(typeof imgOne === "undefined") return;
			
			var isResize = typeof event === "object" ? true : false,
			wide = winWide / oWidth,
			tall = winTall / oHeight, 
			perc, w, h, x, y;
			
			if(isResize && running) {
				
				running = false;
				
				if(imgOne) imgOne.stop(true, true);
				if(imgTwo) imgTwo.stop(true, true);
				
				bgOne.stop(true, true);
				bgTwo.stop(true, true);
					
			}
			
			if(stretched) {
				
				perc = (wide > tall) ? wide : tall;
				w = Math.ceil(oWidth * perc);
				h = Math.ceil(oHeight * perc);
				
				if(centered) {
					
					(w > winWide) ? x = (w - winWide) >> 1 : x = 0;
					(h > winTall) ? y = (h - winTall) >> 1 : y = 0;
						
				}
				else {
					
					x = 0;
					y = 0;
						
				}
				
			}
			else {
				
				perc = (wide > tall) ? tall : wide;
				w = Math.ceil(oWidth * perc);
				h = Math.ceil(oHeight * perc);
				
				(winWide > w) ? x = -((winWide - w) >> 1) : x = 0;
				(winTall > h) ? y = -((winTall - h) >> 1) : y = 0;
				
			}
			
			if(bgOn === 1) {
				
				bgOne.css({width: winWide, height: winTall});
				if(imgOne) imgOne.width(w).height(h).css({marginTop: -y, marginLeft: -x});
				
			}
			else {
				
				bgTwo.css({width: winWide, height: winTall});
				if(imgTwo) imgTwo.width(w).height(h).css({marginTop: -y, marginLeft: -x});
				
			}
			
			if(isResize) {
				
				if(imgOne) imgOne.css("clip", "auto");
				if(imgTwo) imgTwo.css("clip", "auto");
				
				if(thumbsReady) {
				
					posThumbs(true);
					
				}
				else if(useFooter) {
				
					posContainer();
					
				}
				
				if(videoActive) {
					
					cover.css({width: winWide, height: winTall});
					
					if(iframe !== null) {
						
						var theX = winHalf - (videoWidth >> 1) + offsetX, theY = winH - (vHeight >> 1) + offsetY;
						
						iframe.css({left: theX, top: theY});
						
						videoClose.css({left: theX + videoWidth, top: theY + vHeight});
						
					}
					
				}
				
				if(vButtonActive) vButton.css({top: winH - vTall + offsetY, left: winHalf - vWide + offsetX});
				if(bgClick) bgClick.css({width: winWide, height: winTall});
				
			}
			
		}
		
	}
	
})(jQuery);













