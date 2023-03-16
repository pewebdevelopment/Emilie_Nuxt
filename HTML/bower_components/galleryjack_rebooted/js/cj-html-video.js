/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {
	
	// HTML5 Video Plugin
	$.cjVideoPlayer = function(sets) {
		
		var storedVolume, storedAuto, forceEvent = false;
		
		if(sets) {
			
			(sets.hasOwnProperty("autoPlay")) ? storedAuto = sets.autoPlay : storedAuto = true;
			(sets.hasOwnProperty("volume")) ? storedVolume = sets.volume * .01 : storedVolume = 0.75;
			
		}
		else {
		
			storedAuto = true;
			storedVolume = 0.75;
			
		}
		
		if($.cjBgSlideshow.getTablet() || $.cjBgSlideshow.getPhone()) {
			
			storedAuto = false;
			forceEvent = true;
			
		}
		
		sets = null;
		
		// Returns global values to core plugin class
		$.cjVideoPlayer.getValues = function() {
		
			return [storedVolume, storedAuto];
			
		}
		
		// Starts a video player instance
		$.cjVideoPlayer.instance = function(cb) {
			
			var vidPlayer = $("#cj-video-player");
			
			if(vidPlayer.length) {
			
				var video,
				vidOffset,
				volOffset,
				storedWid,
				storedVol,
				playPause,
				vidHeight,
				vidWidth,
				volWidth,
				fullNorm,
				controls,
				vidLines,
				volLines,
				progress,
				storedX,
				storedY,
				volPlay,
				volMute,
				vidHalf,
				winWide,
				vMinus,
				volume,
				volBtn,
				normal,
				pause,
				video,
				full,
				play,
				win,
				doc,
				
				usePP,
				useFull,
				useLines,
				useVolBtn,
				useVolLines,
				callBack = cb,
				bodies = $("body"),
				player = $("#cj-html-video"),
				closer = $(".cj-video-close"),
				storedFlow = bodies.css("overflow");
				
				if(player.length) {
					init();
				}
				else {
					return false;
				}
				
			}
			else {
			
				return false;
				
			}
			
			// init function kicks it off
			function init() {
				
				video = player[0];
				
				if(!forceEvent) {
					video.addEventListener("canplay", onMetaData, false);
				}
				else {
					onMetaData();
				}
				
			}
			
			// fires when video data is available
			function onMetaData(event) {
				
				if(event) event.stopPropagation();
				if(!forceEvent) video.removeEventListener("canplay", onMetaData, false);
				
				video.volume = storedVolume;
				controls = $("#cj-vid-controls");

				if(controls.length) {
					
					win = $(window);
					doc = $(document);
					full = $(".cj-vid-full");
					play = $(".cj-vid-play");
					pause = $(".cj-vid-pause");
					volMute = $(".cj-vid-mute");
					normal = $(".cj-vid-normal");
					volPlay = $(".cj-vid-volume");
					vidLines = $(".cj-vid-lines");
					progress = $(".cj-vid-progress");
					volume = $(".cj-vid-vol-current");
					volBtn = $(".cj-vid-vol-buttons");
					volLines = $(".cj-vid-vol-lines");
					fullNorm = $(".cj-vid-fullscreen");
					playPause = $(".cj-vid-play-pause");
					
					vidHeight = parseInt(player.attr("height"), 10);
					vidWidth = parseInt(player.attr("width"), 10);
					controls.css("width", vidWidth);
					vidHalf = vidWidth >> 1;
					vMinus = vidWidth - 150;
					
					var vTotal = $(".cj-vid-total"), 
					volTotal = $(".cj-vid-vol-total");
					
					if(playPause.length && play.length && pause.length) {
					
						usePP = true;
						
						if(storedAuto) {
						
							play.hide();
							pause.show();
						
						}
						else {
						
							pause.hide();
							play.show();
							
						}
						
						playPause.click(togglePlayPause);
						
					}
					else {
					
						usePP = false;
						
						if(playPause.length) {
							
							playPause.hide();
							
						}
						else {
						
							if(play.length) play.hide();
							if(pause.length) pause.hide();
							
						}
						
					}
					
					if(volBtn.length && volPlay.length && volMute.length) {
						
						useVolBtn = true;
						
						checkVolume(storedVolume);
						volBtn.click(toggleVolume);
						
					}
					else {
					
						useVolBtn = false;
						
						if(volBtn.length) {
						
							volBtn.hide();
							
						}
						else {
						
							if(volPlay.length) volPlay.hide();
							if(volMute.length) volMute.hide();
							
						}
						
					}
					
					if(volLines.length && volume.length && volTotal.length) {
					
						useVolLines = true;
						
						volOffset = parseInt(volLines.css("padding-left"), 10);
						volume.css("width", volWidth * storedVolume);
						volWidth = parseInt(volTotal.css("width"), 10);
						
						volLines.click(changeVolume);
						
					}
					else {
					
						useVolLines = false;
						
						if(volLines.length) {
						
							volLines.hide();
							
						}
						else {
							
							if(volume.length) volume.hide();
							if(volTotal.length) volTotal.hide();
							
						}
						
					}
					
					if(fullNorm.length && full.length && normal.length) {
						
						useFull = true;
						
						fullNorm.data("isFull", false).click(toggleFull);
						
					}
					else {
						
						useFull = false;
						
						if(fullNorm.length) {
						
							fullNorm.hide();
							
						}
						else {
						
							if(full.length) full.hide();
							if(normal.length) normal.hide();
							
						}
						
					}
					
					if(vidLines.length && progress.length && vTotal.length) {
						
						useLines = true;
						
						vidOffset = parseInt(vidLines.css("padding-left"), 10);
						vidLines.css("width", vMinus);
						vTotal.css("width", vMinus);
						progress.css("width", 0);
						
						duration = video.duration;
						vidLines.click(moveLine);
						
						if(storedAuto) timer = setInterval(videoTime, 250);
						
					}
					else {
						
						useLines = false;	
						
						if(vidLines.length) {
							
							vidLines.hide();
							
						}
						else {
						
							if(progress.length) progress.hide();
							if(vTotal.length) vTotal.hide();
							
						}
						
					}
					
					if(useLines || usePP) video.addEventListener("ended", videoEnded, false);
					(storedAuto) ? video.play() : video.pause();
					
					player.click(togglePlayPause);
					
				}
				else {
				
					video.play();
					
				}
				
			}
			
			// fires when the video has ended
			function videoEnded(event) {
			
				event.stopPropagation();
				
				if(typeof timer !== "undefined") clearInterval(timer);
				if(useLines) progress.css("width", 0);
				
				video.pause();
				
				if(usePP) {
				
					pause.hide();
					play.show();
					
				}
				
			}
			
			// toggles video play and pause
			function togglePlayPause(event) {
				
				event.stopPropagation();
				
				if(video.paused) {
					
					video.play();
					
					if(usePP) {
						
						play.hide();
						pause.show();
					
					}
					
					if(useLines) timer = setInterval(videoTime, 250);
					
				} 
				else {
					
					video.pause();
					
					if(usePP) {
					
						pause.hide();
						play.show();
						
					}
					
					if(typeof timer !== "undefined") clearInterval(timer);
					
				}
				
			}
			
			// scrubs the volums
			function changeVolume(event) {
			
				event.stopPropagation();
				
				var dif = event.pageX - volLines.offset().left - volOffset;
				var vol = dif / volWidth;
				
				volume.css("width", dif);
				video.volume = vol;
				
				if(useVolBtn) checkVolume(vol);
				
			}
			
			// toggles volume on and off
			function toggleVolume() {
			
				if(volBtn.data("isOn")) {
					
					if(useVolLines) {
					
						storedWid = parseInt(volume.css("width"), 0);
						volume.css("width", 0);
						
					}
					
					storedVol = video.volume;
					video.volume = 0;
					checkVolume(0);
					
				}
				else {
				
					if(useVolLines) volume.css("width", storedWid);
					
					video.volume = storedVol;
					checkVolume(1);
					
				}
				
			}
			
			// checks to see if the volume is on or off
			function checkVolume(vol) {
			
				if(vol !== 0) {
				
					volMute.hide();
					volPlay.show();
					volBtn.data("isOn", true);
					
				}
				else {
				
					volPlay.hide();
					volMute.show();
					volBtn.data("isOn", false);
					
					if(useVolLines) volume.css("width", 0);
					
				}
				
			}
			
			// scrubs the video
			function moveLine(event) {
				
				event.stopPropagation();
				
				video.currentTime = video.duration * ((event.pageX - vidLines.offset().left - vidOffset) / vMinus);
				video.play();
				videoTime();
				
			}
			
			// video progress line
			function videoTime() {	
					
				progress.css("width", (vMinus * (video.currentTime / video.duration)) | 0);
					
			}
			
			// checks if the video is in fullscreen mode
			function checkFull() {
			
				if(useFull) {
				
					return fullNorm.data("isFull");
					
				}
				else {
				
					return false;
					
				}
				
			}
			
			// toggle fullscreen
			function toggleFull() {
				
				if(!fullNorm.data("isFull")) {
					
					bodies.css("overflow", "hidden");
					
					var hig = win.height();
					winWide = win.width();
					
					storedX = parseInt(vidPlayer.css("left"), 10);
					storedY = parseInt(vidPlayer.css("top"), 10);
					
					vidPlayer.addClass("cj-video-full").css({top: win.scrollTop() - 1, left: win.scrollLeft() - 1});
					controls.addClass("cj-vid-controls-full").css("margin-left", (winWide >> 1) - vidHalf);
					player.attr("width", winWide + 1).attr("height", hig + 1);
					fullNorm.data("isFull", true);
					
					if(closer.length) closer.hide();
					
					full.hide();
					normal.show();
					win.resize(sizeIt);
					doc.keydown(checkKey);
					
					
				}
				else {
					
					exitFull();
					
				}
				
			}
			
			// exit fullscreen
			function exitFull() {
			
				win.unbind("resize", sizeIt);
				doc.unbind("keydown", checkKey);
					
				bodies.css("overflow", storedFlow);
				vidPlayer.removeClass("cj-video-full");
				player.attr("width", vidWidth).attr("height", vidHeight);
				controls.removeClass("cj-vid-controls-full").css("margin-left", 0);
				fullNorm.data("isFull", false);
				
				callBack();
				full.show();
				normal.hide();
				
				if(closer.length) closer.show();
				
			}
			
			// activates the esc key to exit fullscreen
			function checkKey(event) {
			
				if(event.keyCode === 27) toggleFull();
				
			}
			
			// browser resize event
			function sizeIt(event) {
				
				winWide = win.width();
				
				vidPlayer.css({top: win.scrollTop() - 1, left: win.scrollLeft() - 1});
				player.attr("width", winWide).attr("height", win.height());
				controls.css("margin-left", (winWide >> 1) - vidHalf);
				
			}
			
			// destroys the current video instance
			function destroy() {
				
				if(useFull) {
					
					fullNorm.unbind("click", toggleFull);
					if(fullNorm.data("isFull")) exitFull();
					
				}
				
				if(video) {
					
					video.removeEventListener("canplay", onMetaData, false);
					video.removeEventListener("ended", videoEnded, false);
					video.pause();
					video.src = "";
					
					storedVolume = video.volume;
					player.unbind("click", togglePlayPause);
					
				}
				
				if(typeof timer !== "undefined") clearInterval(timer);
				if(useVolBtn) volBtn.unbind("click", toggleVolume);
				if(usePP) playPause.unbind("click", togglePlayPause);
				if(useVolLines) volLines.unbind("click", changeVolume);
				
				if(useLines) {
					
					vidLines.unbind("click", moveLine);
					progress.css("width", 0);
					
				}
				
				storedFlow = null;
				playPause = null;
				vidPlayer = null;
				fullNorm = null;
				controls = null;
				vidLines = null;
				volLines = null;
				progress = null;
				callBack = null;
				volPlay = null;
				volMute = null;
				player = null;
				volume = null;
				volBtn = null;
				normal = null;
				bodies = null;
				closer = null;
				video = null;
				pause = null;
				video = null;
				full = null;
				play = null;
				win = null;
				doc = null;

			}
			
			return [destroy, checkFull];
			
		}
		
	}
	
})(jQuery);









