/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {

	$.cjMusicPlayer = function(settings) {
		
		// *********************************
		// BEGIN MUSIC PLAYER SETUP
		// *********************************
		
		// begin plugin global vars
		var musicButton = $("#cj-music-button");
		if(!musicButton.length || !settings) return;
		
		var vol, 
		leg,
		audio,
		music,
		phaser,
		numbers,
		isOn = 0,
		isPlaying,
		usingText,
		wasPlaying,
		numberText,
		currentVol,
		songPlayed,
		usingArrows,
		usingNumbers,
		usingPlayPause,
		doc = $(document), 
		list = settings.songList, 
		leg = list.length,
		iLeg = leg - 1,
		titles = [],
		urls = [],
		
		left,
		right,
		play,
		pause,
		currentSong,
		
		agent = navigator.userAgent.toLowerCase(),
		mozilla = agent.search("firefox") !== -1,
		ie = agent.search("msie") !== -1,
		
		multiple = leg > 1 ? true : false,
		auto = settings.autoPlay ? true : false,
		html5 = Modernizr.audio ? true : false;
		// end plugin global bars
		
		if(list) {
			
			if(list.length) {
				
				init(settings);
				
			}
			else if(musicButton.length) {
				
				musicButton.hide();
				
			}
			
		}
		
		settings = null;
		
		// *********************************
		// AVAILABLE API METHODS
		// *********************************
		
		// toggle play/pause
		$.cjMusicPlayer.toggleMusic = function(pauseIt) {
			
			if(typeof pauseIt !== "undefined") {
			
				if(pauseIt) {
				
					if(isPlaying) {
					
						wasPlaying = true;
						handleMusic();
						
					}
					else {
					
						wasPlaying = false;
						
					}
					
				}
				else if(wasPlaying) {
				
					wasPlaying = false;
					handleMusic();
					
				}
				
			}
			
		}
		
		// change the song to a specific index
		$.cjMusicPlayer.changeSong = function(index) {
			
			if(typeof index !== "undefined") {
				
				if(index > -1 && index < leg) {
					
					isOn = index;
					handleArrow(true);
					
				}
				
			}
			
		}
		
		// play the next song
		$.cjMusicPlayer.nextSong = function() {
		
			handleArrow(null);
			
		}
		
		// used by the cj-top-right-buttons.js file
		$.cjMusicPlayer.hasMultiple = function() {
			
			if(!multiple) handleMusic();
			
			return multiple;
			
		}
		
		// used by the cj-top-right-buttons.js file
		$.cjMusicPlayer.checkMultiple = function() {
			
			return multiple;
			
		}
		
		// *********************************
		// INIT FUNCTION
		// *********************************
		
		function init(data) {
			
			if(data.randomizeSongs) {
				
				var shuf = [], placer, i
							   
				for(i = 0; i < leg; i++) shuf[i] = list[i];
				list = [];
				
				while(shuf.length > 0) { 
									
					placer = (Math.random() * shuf.length) | 0;
					list[list.length] = shuf[placer];
					shuf.splice(placer, 1);
									
				}
								
			}
			
			for(i = 0; i < leg; i++) {
				
				urls[i] = list[i].url;
				titles[i] = list[i].title ? list[i].title : "";
				
			}
			
			var tb = $.cjBgSlideshow.getTablet();
			
			if(tb) {
			
				var cmc = $("#cj-music-controls");
				if(cmc.length) cmc.addClass("cj-music-fix");
				
				cmc = $("#cj-music-meta");
				if(cmc.length) cmc.addClass("cj-music-meta-fix");
				
			}
			
			if(tb || $.cjBgSlideshow.getPhone()) auto = false;
			audio = $("#cj-music").css({position: "fixed", top: -50});
			
			$("<source />").attr("src", urls[0]).attr("type", "audio/mpeg").prependTo(audio);
			$("<source />").attr("src", urls[0].split("mp3").join("ogg")).attr("type", "audio/ogg").prependTo(audio);
			
			if(auto) {
				
				audio.attr("autoplay", "autoplay");
				songPlayed = true;
				
			}
			else {
			
				songPlayed = false;
				
			}
			
			if(!multiple) audio.attr("loop", "loop");
			
			music = audio[0];
			vol = (data.hasOwnProperty("volume")) ? data.volume * .01 : 0.75;
			
			if(html5) {
				music.volume = vol;
				music.addEventListener("ended", audioEnded, false);
			}
			else {
				try {
					thisMovie("cj-fallback").storeVars(vol, urls, auto);
				}
				catch(event){};
			}
						
			(auto) ? isPlaying = true : isPlaying = false;
			
			if(!multiple && musicButton.length) {
				
				if(auto) musicButton.addClass("cj-button-hover").mouseover(musicOver).mouseout(musicOut);
				
			}
			
			play = $(".cj-music-play");
			pause = $(".cj-music-pause");
			numbers = $(".cj-music-numbers");
			currentSong = $(".cj-current-song");
			left = $(".cj-music-left").data("isArrow", true);
			right = $(".cj-music-right").data({isArrow: true, isRight: true});
			
			usingArrows = left.length && right.length ? true : false;
			usingPlayPause = play.length && pause.length ? true : false;
			usingText = currentSong.length ? true : false;
			
			if(numbers.length) {
				usingNumbers = true;
				numberText = numbers.html();	
			}
			else {
				usingtNumbers = false;
			}
			
			if(!usingText && !usingNumbers) {
			
				var mc = $("#cj-music-controls");
				if(mc.length) mc.addClass("cj-music-controls-no-meta");
				mc = null;
				
			}
			
			if(leg === 0) {
			
				if(usingArrows) {
				
					left.css("display", "none");
					right.css("display", "none");
					usingArrows = false;
					
				}
				
			}
			
			if(usingPlayPause && !auto) {
				
				pause.css("display", "none");
				play.css("display", "inline-block");
				
			}
			
			if(usingArrows) {
				left.click(handleArrow);
				right.click(handleArrow);
			}
			
			if(usingPlayPause) {
				play.click(handleMusic);
				pause.click(handleMusic);
			}
			
			if(usingText) currentSong.html(titles[isOn]);
			if(usingNumbers) numbers.html((isOn + 1).toString() + numberText + leg.toString());
			
			doc = null;
			data = null;
			list = null;
								
		}
		
		// *********************************
		// MUSIC CONTROLS MOUSE EVENTS
		// *********************************
		
		// mouse over event
		function musicOver(event) {
			
			event.stopPropagation();
			
			$(this).addClass("cj-button-hover");
			
		}
		
		// mouse out event
		function musicOut(event) {
			
			event.stopPropagation();
			
			$(this).removeClass("cj-button-hover");
			
		}

		// *********************************
		// SONG END EVENT
		// *********************************
		
		function audioEnded(event) {
			
			event.stopPropagation();
			
			isPlaying = false;
			
			handleArrow(null);
			
		}
		
		// *********************************
		// ARROW CLICK / NEXT SONG EVENT
		// *********************************
		
		function handleArrow(event) {
			
			if(typeof phaser !== "undefined") clearInterval(phaser);
			
			var goingRight;
			
			if(event !== null) {
				
				if($(this).data("isArrow")) {

					goingRight = $(this).data("isRight") ? true : false;
					
					if(goingRight) {
					
						(isOn < iLeg) ? isOn++ : isOn = 0;
						
					}
					else {
					
						(isOn > 0) ? isOn-- : isOn = iLeg;	
						
					}
					
				}
				else {
				
					goingRight = true;
					
				}
				
			}
			else {
				
				(isOn < iLeg) ? isOn++ : isOn = 0;
				
				goingRight = true;
				
			}
			
			if(html5) {
				
				music.pause();
				music.currentTime = 0;
				
				if(!ie) {
					
					music.src = Modernizr.audio.mp3 ? urls[isOn] : urls[isOn].split("mp3").join("ogg");
					
				}
				else {
					
					audio.children("source").each(function() {
				
						$(this).attr("src", urls[isOn]);
						
					});
					
				}
				
				music.volume = vol;
				music.load();
				music.play();
				
				songPlayed = true;
				
			}
			else {
			
				try {
					thisMovie("cj-fallback").changeSong(goingRight);
				}
				catch(event){};
				
			}
			
			if(usingText) currentSong.html(titles[isOn]); 
			if(usingNumbers) numbers.html((isOn + 1).toString() + numberText + leg.toString());
			
			play.css("display", "none");
			pause.css("display", "inline-block");
			
			isPlaying = true;
			
		}
		
		// *********************************
		// PLAY/PAUSE EVENT
		// *********************************
		
		function handleMusic(event) {
			
			if(event) event.stopPropagation();
			if(typeof phaser !== "undefined") clearInterval(phaser);
			
			if(isPlaying) {
				
				if(multiple) {
				
					pause.css("display", "none");
					play.css("display", "inline-block");
					
				}
				
				else if(musicButton.length) {
					
					musicButton.unbind("mouseover", musicOver).unbind("mouseout", musicOut);
					musicButton.addClass("cj-button-hover");
					
				}
				
				if(html5) {
					
					// mozilla and IE9 have poor support for volume tweening (not smooth)
					if(!mozilla && !ie) {
						
						currentVol = vol;
						
						phaseDown();
						
						phaser = setInterval(phaseDown, 80);
						
					}
					else {
					
						music.pause();
						
					}
					
				}
				else {
					
					try {
						thisMovie("cj-fallback").togglePlayPause(false);
					}
					catch(evt){};
					
				}
				
				isPlaying = false;
						
			}
			else {
						
				if(multiple) {
					
					play.css("display", "none");
					pause.css("display", "inline-block");
					
				}
				else if(musicButton.length) {
					
					musicButton.removeClass("cj-button-hover");
					musicButton.mouseover(musicOver).mouseout(musicOut);
					
				}
				
				if(html5) {
						
					music.play();
					
					// Firefox and IE9 have poor support for volume tweening (not smooth)
					if(songPlayed && !mozilla && !ie) phaser = setInterval(phaseUp, 80);
					
				}
				else {
					
					try {
						thisMovie("cj-fallback").togglePlayPause(true);
					}
					catch(evt){};
					
				}
				
				isPlaying = true;
				songPlayed = true;
						
			}
					
		}
		
		// *********************************
		// ANIMATE VOLUME LEVELS
		// *********************************
		
		function phaseDown() {
		
			if(currentVol > 0) {
			
				currentVol -= .05;
				if(currentVol < 0) currentVol = 0;

			}
			else {
			
				clearInterval(phaser);
				music.pause();
				
			}
			
			music.volume = currentVol;
			
		}
		
		function phaseUp() {
		
			if(currentVol < vol) {
			
				currentVol += .05;
				if(currentVol > 1) currentVol = 1;
				
			}
			else {
				
				clearInterval(phaser);
				
			}
			
			music.volume = currentVol;
			
		}
		
		// *********************************
		// HELPER FOR COMMUNICATING W/ FLASH
		// *********************************
		
		function thisMovie(swf) {
			
			return (navigator.appName.indexOf("Microsoft") != -1) ? window[swf] : document[swf];
			
		}
		
		$.cjMusicPlayer.flashChange = function() {
		
			isPlaying = false;
			
			handleArrow(null);
			
		}
		
	}
	
})(jQuery);

function cjFromFlash() {
	
	jQuery.cjMusicPlayer.flashChange();
	
}



