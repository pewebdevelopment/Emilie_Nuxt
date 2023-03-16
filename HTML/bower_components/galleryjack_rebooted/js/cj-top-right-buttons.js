/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {
	
	$.cjTopRightButtons = function(cSet, sSet) {
		
		var btnLeg,
		buttons = [],
		holders = [],
		gallery = $("#cj-gallery");
		
		if(gallery.length) init(cSet, sSet);
		
		cSet =  null;
		sSet = null;
		
		// *****************************************
		// INIT FUNCTION
		// *****************************************
		
		function init(cSets, sSets) {
			
			var ids,
			tUser,
			fUser,
			gUser,
			stringer,
			container,  
			pusher = 0,
			sociables = "",
			author = $("#cj-author-info");
			
			if(sSets) {
				
				tUser = sSets.hasOwnProperty("twitterUser") ? sSets.twitterUser : "";
				fUser = sSets.hasOwnProperty("facebookUser") ? sSets.facebookUser : "";
				gUser = sSets.hasOwnProperty("googlePlusId") ? sSets.googlePlusId : "";
				
				for(var key in sSets) {
				
					if(sSets.hasOwnProperty(key)) {
						
						if(key !== "facebookUser" && key !== "twitterUser" && key !== "googlePlusId") {
							
							sociables += sSets[key].split("{twitterUser}").join(tUser).split("{facebookUser}").join(fUser).split("{googlePlusId}").join(gUser);
							
						}
						
					}
					
				}
				
			}
			
			author.children("div").each(function() {
				
				if($(this).attr("id")) {
				
					ids = $(this).attr("id");
					
					if(ids !== "cj-preloader") {
						
						container = $("<div />").addClass("cj-top-right-content");
						
						switch(ids) {
							
							case "cj-music-button":
								
								if($("#cj-music").length) {
								
									container.html($(this).html());
									$(this).data("isMusic", true).mouseover(musicOver).mouseout(musicOut).click(checkMusic);
									
								}
								else {
								
									$(this).hide();
									
								}
							
							break;
							
							case "cj-share-button":
								
								if(sociables !== "") {
									
									container.html(sociables);
									$(this).data("isMusic", false).mouseover(over).mouseout(out).click(showContainer);
								
								}
								else {
									
									$(this).hide();	
									
								}
							
							break;
							
							default:
								
								if($.trim($(this).text()) !== "") {
									
									container.html($(this).html());
									$(this).data("isMusic", false).mouseover(over).mouseout(out).click(showContainer);
									
								}
								else {
									
									$(this).hide();	
									
								}
								
							// end default
							
						}
						
						if(ids !== "cj-email-button") container.addClass("cj-no-select");
	
						gallery.append(container);
						$(this).empty().css("visibility", "visible").data({active: false, id: pusher, holder: container});
					
						buttons[pusher] = $(this);
						holders[pusher] = container;
						
						pusher++;
						
					}
					
				}
				
			});
			
			if(navigator.appVersion.indexOf("Mac") !== -1) {
				
				var fb = $("#cj-facebook"), i = holders.length;
				
				if(fb.length) fb.addClass("facebook-fix");
				
				while(i--) {
				
					holders[i].children("div").each(function() {
				
						$(this).addClass("social-fix");
					
					});
					
				}
				
			}
			
			if($.cjBgSlideshow.getTablet() || $.cjBgSlideshow.getPhone()) {
									
				var gp = $("#cj-google-plus");
				
				if(gp.length) gp.addClass("cj-fix-gplus");
										
			}
			
			if($("#cj-email-button").length && cSets && typeof $.cjContact !== "undefined") $.cjContact(cSets);
			
			btnLeg = buttons.length;
			
			author.css("visibility", "visible");
			
			cSets = sSets = st = null;
			
		}
		
		// *****************************************
		// MUSIC BUTTON MOUSE EVENTS
		// *****************************************
		
		function musicOver(event) {
			
			event.stopPropagation();
			
			if($(this).data("active") || !$.cjMusicPlayer.checkMultiple()) return;
			
			$(this).addClass("cj-button-hover");
			
		}
		
		function musicOut(event) {
			
			event.stopPropagation();
			
			if($(this).data("active") || !$.cjMusicPlayer.checkMultiple()) return;
			
			$(this).removeClass("cj-button-hover");
			
		}
		
		// *****************************************
		// DEFAULT BUTTON MOUSE EVENTS
		// *****************************************
		
		function over(event) {
			
			event.stopPropagation();
			
			if($(this).data("active")) return;
			
			$(this).addClass("cj-button-hover");
			
		}
		
		function out(event) {
			
			event.stopPropagation();
			
			if($(this).data("active")) return;
			
			$(this).removeClass("cj-button-hover");
			
		}
		
		// *****************************************
		// CHECKS IF MUSIC PLAYER HAS MULTIPLE SONGS
		// *****************************************
		
		function checkMusic(event) {
		
			event.stopPropagation();
			
			if($.cjMusicPlayer.hasMultiple()) showContainer($(this));
			
		}
		
		// *****************************************
		// ACTIVATES THE TOP RIGHT BUTTON CONTENT
		// *****************************************
		
		function showContainer(event) {
			
			var target;
			
			if(typeof event.target !== "undefined") {
			
				event.stopPropagation();	
				target = $(this);
				
			}
			else {
			
				target = event;
				
			}

			if(!target.data("active")) {
				
				var i = btnLeg, id = target.data("id");
				
				while(i--) {
					
					holders[i].stop(true, true).css("display", "none");
					
					if(i !== id) {
						
						buttons[i].data("active", false).removeClass("cj-button-hover");
						
					}
					else {
						
						buttons[i].data("active", true).addClass("cj-button-hover");
						holders[i].fadeIn(300);
						
					}
					
				}
				
			}
			else {
			
				target.data("active", false).removeClass("cj-button-hover").data("holder").stop(true, true).fadeOut(300);
				
			}
			
		}
			
	}
	
})(jQuery);






