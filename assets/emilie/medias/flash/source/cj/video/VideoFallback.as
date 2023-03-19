package cj.video {
	
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.display.MovieClip;
	import flash.display.StageDisplayState;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.FullScreenEvent;
	import flash.events.NetStatusEvent;
	import flash.media.Video;
	import flash.media.SoundTransform;
	import flash.net.URLRequest;
	import flash.net.NetConnection;
	import flash.net.NetStream;
	import flash.external.ExternalInterface;
	import flash.ui.ContextMenu;
	
	import cj.video.events.VideosEvent;
	
	public class VideoFallback extends Sprite {
		
		private var vHolder:Sprite;
		private var masker:Shape;
		private var controls:VideoControls;
		private var vidLine:MovieClip;
		private var volLine:MovieClip;
		
		private var vid:Video;
		private var meta:Object;
		private var st:SoundTransform;
		private var nc:NetConnection;
		private var ns:NetStream;
		
		private var isPlaying:Boolean;
		private var playAuto:Boolean;
		private var getOnce:Boolean;
		private var theVolume:Number;
		private var duration:Number;
		private var volLineW:int;
		private var vidLineW:int;
		private var vWidth:int;
		private var vHeight:int;
		
		public function VideoFallback() {
			
			(stage == null) ? addEventListener(Event.ADDED_TO_STAGE, added) : added();
			
		}
		
		private function added(event:Event = null):void {
			
			if(event != null) removeEventListener(Event.ADDED_TO_STAGE, added);
			
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			
			this.contextMenu = new ContextMenu();
			this.contextMenu.hideBuiltInItems();
			
			theVolume = int(root.loaderInfo.parameters["vol"]) || 0.75;
			playAuto = checkPound(root.loaderInfo.parameters["auto"]);
			vWidth = int(root.loaderInfo.parameters["width"]) || 640;
			vHeight = int(root.loaderInfo.parameters["height"]) || 360;
			vidLineW = vWidth - 150;
			getOnce = true;
			isPlaying = false;
			
			st = new SoundTransform(theVolume);
			
			nc = new NetConnection();
			nc.addEventListener(IOErrorEvent.IO_ERROR, catchError, false, 0, true);
			nc.connect(null);
			
			meta = new Object();
			meta.onMetaData = runMeta;
			
			ns = new NetStream(nc);
			ns.soundTransform = st;
			ns.client = meta;
			
			vid = new Video();
			vid.width = vWidth;
			vid.height = vHeight;
			vid.attachNetStream(ns);
			
			vHolder = new Sprite();
			vHolder.mouseEnabled = this.mouseEnabled = false;
			vHolder.addChild(vid);
			
			masker = new Shape();
			
			with(masker.graphics) {
				
				beginFill(0);
				drawRect(0, 0, vWidth, vHeight);
				endFill();
				
			}
			
			vHolder.mask = masker;
			
			ns.addEventListener(IOErrorEvent.IO_ERROR, catchError, false, 0, true);
			ns.addEventListener(NetStatusEvent.NET_STATUS, statusEvent, false, 0, true);
			ns.play("../" + (root.loaderInfo.parameters["url"] || "video/sample") + ".mp4");
			
			addChild(vHolder);
			addChild(masker);
		
		}
		
		private function runMeta(info:Object):void {
			
			if(getOnce) {
			
				duration = info.duration;
				
				controls = new VideoControls(vWidth, kicker, theVolume);
				controls.y = vHeight;
				addChild(controls);
				
				ns.seek(0);
				ns.pause();
				
				if(playAuto) playVid();
				
				addEventListener(VideosEvent.CLICKED, videoClick);
				
				getOnce = false;
				
			}
			
		}
		
		private function kicker(videoLine:MovieClip, volumeLine:MovieClip, volLineWid:int):void {
			
			vidLine = videoLine;
			volLine = volumeLine;
			
			volLineW = volLineWid;
			
		}
		
		private function videoClick(event:VideosEvent):void {
			
			switch(event.item) {
				
				case "playBtn":
				
					playVid();
				
				break;
				
				case "pauseBtn":
				
					pauseVid();
				
				break;
				
				case "volOn":
				
					updateV(0);
				
				break;
				
				case "volOff":
				
					updateV(theVolume);
				
				break;
				
				case "fullOn":
				
					goFull();
				
				break;
				
				case "fullOff":
				
					exitFull();
				
				break;
				
				case "volTotal":
				
					updateV(event.xx / volLineW);
				
				break;
				
				case "totalLine":
				
					moveLine(event.xx / vidLineW);
				
				break;
				
			}
			
		}
		
		private function playVid():void {
			
			ns.resume();
			controls.playOn();
			isPlaying = true;
			
			addEventListener(Event.ENTER_FRAME, updateStatus);
			
		}
		
		private function pauseVid():void {
			
			ns.pause();
			controls.playOff();
			
			removeEventListener(Event.ENTER_FRAME, updateStatus);
			
		}
		
		private function statusEvent(event:NetStatusEvent):void {
			
			switch(event.info.code) {
				
				case "NetStream.Play.Stop":
				
					controls.playOff();
					vidLine.scaleX = 0;
					isPlaying = false;
					
					removeEventListener(Event.ENTER_FRAME, updateStatus);
				
				break;
				
			}
			
		}
		
		private function updateStatus(event:Event):void {
			
			vidLine.scaleX = ns.time / duration;
			
		}
		
		private function moveLine(num:Number):void {
			
			if(!isPlaying) {
				
				isPlaying = true;
				controls.playOn();
				addEventListener(Event.ENTER_FRAME, updateStatus);
				
			}
			
			ns.seek((num * duration) | 0);
			
		}
		
		private function updateV(vol:Number):void {
			
			st.volume = vol;
			ns.soundTransform = st;
			
			volLine.scaleX = vol;
			
			if(vol > 0) {
				
				controls.volumeOff();
				
			}
			else {
				
				controls.volumeOn();
				
			}
			
		}
		
		private function goFull():void {
					
			stage.displayState = StageDisplayState.FULL_SCREEN;
			
			var sw:int = stage.stageWidth;
			var sh:int = stage.stageHeight;
			var theW:int = vWidth;
			var theH:int = vHeight;
			
			var scalerH:Number = sw / vWidth;
			var scalerW:Number = sh / vHeight;
			var scaleMe:Number;
			
			if(scalerH <= scalerW) {
				scaleMe = scalerH;
			}
			else {
				scaleMe = scalerW;
			}
			
			theW *= scaleMe;
			theH *= scaleMe;
			
			vHolder.width = theW;
			vHolder.height = theH;
			controls.fsOn();
			
			with(masker.graphics) {
				
				clear();
				beginFill(0);
				drawRect(0, 0, sw, sh);
				endFill();
				
			}
			
			var halfStage:int = sw >> 1;
			
			vHolder.x = halfStage - (theW >> 1);
			vHolder.y = (sh >> 1) - (theH >> 1);
			
			controls.x = halfStage - (vWidth >> 1);
			controls.y = sh - 28;
			
			stage.addEventListener(FullScreenEvent.FULL_SCREEN, exitFull);
					
		}
		
		
		// exits out of full-screen
		private function exitFull(event:Event = null):void {
			
			stage.removeEventListener(FullScreenEvent.FULL_SCREEN, exitFull);
			stage.displayState = StageDisplayState.NORMAL;
						
			vHolder.width = vWidth
			vHolder.height = vHeight;
			
			with(masker.graphics) {
						
				clear();
				beginFill(0);
				drawRect(0, 0, vWidth, vHeight);
				endFill();
						
			}
						
			vHolder.x = controls.x = 0;
			
			vHolder.y = 0;
			controls.y = vHeight;
			
			controls.fsOff();
			
		}
		
		private function checkPound(st:String):Boolean {
			
			if(st != "" && st != null) {
				
				if(st.toLowerCase() == "true") {
					return true;
				}
				else {
					return false;
				}
				
			}
			else {
				return false;
			}
			
		}
		
		private function catchError(event:IOErrorEvent):void {throw new Error("error caught")};
		
	}
	
}










