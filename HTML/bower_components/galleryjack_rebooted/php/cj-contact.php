<?php
	
	// *******************
	// BEGIN USER SETTINGS
	//********************
	
	$sendTo = "you@yourwebsite.com";
	$subject = "Website Email";
	$greeting = "New Website Email";
	
	// *****************
	// END USER SETTINGS
	// *****************
	
	$details = "";
	$passed = true;
		
	foreach($_POST as $nam => $val) {
		
		$nam = str_replace("-required", "", $nam);
		$val = str_replace(array("\r", "\n", "%0a", "%0d"), '', stripslashes($val));
		
		if(strpos($val, "MIME-Version") !== false || strpos($val, "Content-Type") !== false) {
				
			$passed = false;
			break;
				
		}
		
		switch($nam) {
				
			case "name":
				
				$fromName = str_replace("@", "AT", $val);
				$details .= $nam . ": " . $fromName . "\n";
				
			break;
				
			case "email":
				
				$emailFrom = $val;
				$details .= $nam . ": " . $emailFrom . "\n"; 
				
			break;
				
			default:
				
				$details .= $nam . ": " . str_replace("@", "AT", $val) . "\n"; 
				
			// end default
				
		}
		
	}
	
	if($passed) {
		
		$details = $greeting . "\n\n" . $details;
				
		$headers = "MIME-Version: 1.0\n";
		$headers .= "Content-type: text/plain; charset=UTF-8\n";
		$headers .= "From: " . $emailFrom . " <" . $fromName . ">\n";
		$headers .= "Reply-To: " . $emailFrom . "\n";
			
		mail($sendTo, $subject, $details, $headers);
			
	}

// ***********
// END OF FILE
// ***********