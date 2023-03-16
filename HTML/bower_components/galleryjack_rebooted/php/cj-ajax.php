<?php
	
	$maindir = $_GET["path"];
	$skipped[] = '.';
	$skipped[] = '..';
	
	if(is_dir($maindir)) {
		
		if($directory = opendir($maindir)){
			
			while(($folder = readdir($directory)) !== false) {
				
				if(!(array_search($folder, $skipped) > -1)) {
				
					if(filetype($maindir . $folder) == "dir") {
							 
						$folders[$maindir . $folder]["name"] = $folder;
							   
					}
					
				}
				
	        }
			   
	    	closedir($directory);
	  		
			$names = array();
			$images = array();
			
			foreach($folders as $folder){
				
				array_push($names, $folder["name"]);
				
				$imageList = glob($maindir . $folder["name"] . "/" . "*.jpg");
				
				$img = array();
				
				foreach($imageList as $image) {
					
					array_push($img, $image);
					
				}
				
				array_push($images, $img);
				
	  		}
			
			$data = array($names, $images);
			
			echo json_encode($data);
			
		}
		
		
	}

// ***********
// END OF FILE
// ***********