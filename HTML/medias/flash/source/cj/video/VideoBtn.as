package cj.video {
	
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	
	import cj.video.events.VideosEvent;
	
	public class VideoBtn extends Sprite {
		
		private var namer:String;
		
		public function VideoBtn(st:String) {
			
			namer = st;
			
			this.buttonMode = true;
			this.addEventListener(MouseEvent.CLICK, clicked);
			
		}
		
		private function clicked(event:MouseEvent):void {
			
			var xx:int = namer != "totalLine" ? this.mouseX : this.parent.mouseX - this.x + 15;
			
			dispatchEvent(new VideosEvent(VideosEvent.CLICKED, namer, xx));
			
		}

	}
	
}
