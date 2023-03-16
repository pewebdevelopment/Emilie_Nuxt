/* --------------------------------------------- */
/* Author: http://codecanyon.net/user/CodingJack */
/* --------------------------------------------- */

(function($) {
	
	$.cjContact = function(data) {
		
		if(!data) return;
		
		// *********************************
		// PREPARE CONTACT FORM
		// *********************************
		
		var emailErr = data.emailErrorMessage ? data.emailErrorMessage : "Please enter a valid email",
		err = data.emptyTextMessage ? data.emptyTextMessage + " " : "Please fill in your", 
		message = data.successMessage ? data.successMessage : "Your message has been sent",
		submitUrl = data.contactPhpFile ? data.contactPhpFile : "php/cj-contact.php";
		
		var contact = $("#cj-contact-form"),
		shown = false,
		successMes,
		typed;
		
		if(contact.length) {
			
			contact.find("input").each(function() {
				
				if($(this).attr("type")) {
					
					typed = $(this).attr("type");
					
					if(typed !== "hidden" && typed !== "image" && typed !== "submit") {
						
						if($(this).attr("value")) {
							
							$(this).data("original", $(this).attr("value")).focus(inFocus).blur(outFocus);
							
						}
							
					}
					
				}
				
			});
			
			contact.find("textarea").each(function() {
					
				$(this).data("original", $(this).text()).focus(inFocus).blur(outFocus);
					
			});
			
			contact.submit(submitForm);
			
		}
		
		data = null;
		typed = null;
		
		// *********************************
		// SUBMIT FORM EVENT
		// *********************************
		
		function submitForm(event) {
			
			event.preventDefault();
  			event.stopPropagation();
			
			if(successMes) successMes.stop(true, true).css("display", "none");
			
			var st, val, ids, amp, before, after, typed = "", checked, passed = true;
			
			contact.children("fieldset").children().each(function() {
				
				checked = false;
				
				if($(this).attr("name")) {
				
					if($(this).attr("type")) {
						
						if($(this).attr("type") === "text") checked = true;
						
					}
					
					if($(this).is("textarea")) checked = true;
					
				}
					
				if(checked) {
							
					st = $(this).attr("name");		
					val = this.value;
								
					if(st.search("required") !== -1) {
						
						if(val === "" || val === $(this).data("original")) {
							
							this.value = err + st.split("-required")[0];
							passed = false;
									
						}
						
						if(st === "email-required") {
									
							before = val.indexOf("@");
							after = val.lastIndexOf(".");
									
							if(before === 0 || after < before + 2 || after + 2 >= val.length) {
										
								this.value = emailErr;
								passed = false;
										
							}
								
						}
						
					}
					
				}
					
			});
			
			if(passed) {
				
				$.ajax({type: "POST", url: submitUrl, data: contact.serialize(), success: showSuccess});
				
				contact.unbind("submit", submitForm).children("fieldset").children().each(function() {
					
					if($(this).data("original")) this.value = $(this).data("original");
					
				});
				
				contact.submit(submitForm);
				
			}
				
		}
		
		// *********************************
		// IF FORM SUBMITS SUCCESSFULLY
		// *********************************
		
		function showSuccess() {
			
			shown = true;
			
			if(!successMes) {
				successMes = $("<p />").addClass("cj-success-message").text(message).insertBefore($("#cj-submit")).fadeIn();
			}
			else {
				successMes.stop(true, true).fadeIn();	
			}
			
		}
		
		// *********************************
		// FORM FIELD FOCUS IN EVENT
		// *********************************
		
		function inFocus() {
			
			if(successMes && shown) {
				
				successMes.stop(true, true).fadeOut();
				shown = false;
				
			}
			
			var st = this.value;
			
			if(st === $(this).data("original") || st === err + $(this).attr("name").split("-required")[0] || st === emailErr) {
			
				this.value = "";
				
			}
			
			$(this).addClass("cj-field-focus");
			
		}
		
		// *********************************
		// FORM FIELD FOCUS OUT EVENT
		// *********************************
		
		function outFocus() {
			
			if(this.value === "") this.value = $(this).data("original");
			
			$(this).removeClass("cj-field-focus");
			
		}
		
	}
	
})(jQuery);












