package cj.video {
	
	import flash.display.Sprite;
	import flash.display.MovieClip;
	
	public class VideoControls extends Sprite {
		
		private var volWidth:int;
		
		public function VideoControls(vw:int, kicked:Function, theVolume:Number) {
			
			var vMinus:int = vw - 150;
			rightSide.x = totalLine.x + vMinus + 12;
			progressLine.inside.width = totalLine.width = vMinus;
			progressLine.scaleX = 0;
			
			rightSide.fullOff.visible = false;
			rightSide.volOff.visible = false;
			rightSide.volLevel.scaleX = theVolume;
			rightSide.volLevel.mouseEnabled = progressLine.mouseEnabled = progressLine.mouseChildren = this.mouseEnabled = false;
			
			playOff();
			
			kicked(progressLine, rightSide.volLevel, rightSide.volTotal.width);
			
		}
		
		internal function fsOff():void {
			
			rightSide.fullOn.visible = true;
			rightSide.fullOff.visible = false;
			
			bg.controlBg.mask = null;
			bg.controlBgMask.visible = false;
			
		}
		
		internal function fsOn():void {

			rightSide.fullOff.visible = true;
			rightSide.fullOn.visible = false;
			
			bg.controlBgMask.visible = true;
			bg.controlBg.mask = bg.controlBgMask;
			
		}
		
		internal function playOn():void {
			
			playBtn.visible = false;
			pauseBtn.visible = true;
			
		}
		
		internal function playOff():void {
			
			pauseBtn.visible = false;
			playBtn.visible = true;
			
		}
		
		internal function volumeOn():void {
			
			rightSide.volOff.visible = true;
			rightSide.volOn.visible = false;
			rightSide.volLevel.visible = false;
			
		}
		
		internal function volumeOff():void {
			
			rightSide.volOn.visible = true;
			rightSide.volOff.visible = false;
			rightSide.volLevel.visible = true;
			
		}
		
	}
	
}









