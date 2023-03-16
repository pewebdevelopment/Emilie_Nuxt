package cj.music {
	
	// import events
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.external.ExternalInterface;
	import flash.net.URLRequest;
	
	// Document Class for the Music Player
	public final class MusicPlayer extends Sprite {
		
		private var song:Sound;
		private var channel:SoundChannel;
		private var soundTrans:SoundTransform;
		private var position:Number;
		private var songList:Array;
		private var isOn:int;
		private var iLeg:int;
		
		// class constructor
		public function MusicPlayer() {
			
			addEventListener(Event.UNLOAD, removed);
			(stage == null) ? addEventListener(Event.ADDED_TO_STAGE, added) : added();
			
		}
		
		// fires when the stage becomes available
		private function added(event:Event = null):void {
			
			if(event != null) removeEventListener(Event.ADDED_TO_STAGE, added);
			
			position = isOn = 0;
			
			song = new Sound();
			song.addEventListener(IOErrorEvent.IO_ERROR, catchError);
			
			if(ExternalInterface.available) {
				ExternalInterface.addCallback("storeVars", storeVars);
				ExternalInterface.addCallback("togglePlayPause", togglePlayPause);
				ExternalInterface.addCallback("changeSong", changeSong);
			}
					  
			addEventListener(Event.REMOVED_FROM_STAGE, removed);
		
		}
		
		// data passed from JavaScript
		private function storeVars(vol:Number, urls:Array, auto:Boolean):void {
			
			soundTrans = new SoundTransform(vol);
			songList = urls;
			
			iLeg = songList.length - 1;
			song.load(new URLRequest(songList[0]));
			
			if(auto) playSong();
		
		}
		
		// toggles play/pause
		private function togglePlayPause(toPlay:Boolean):void {
			
			if(!toPlay) {
				position = channel.position;
				channel.stop()
			}
			else {
				playSong();
			}
			
		}
		
		private function songEnded(event:Event):void {
			
			if(ExternalInterface.available) ExternalInterface.call("cjFromFlash");
			
		}
		
		// change the song
		private function changeSong(goingRight:Boolean):void {
			
			channel.removeEventListener(Event.SOUND_COMPLETE, songEnded);
			channel.stop();
			
			song.removeEventListener(IOErrorEvent.IO_ERROR, catchError);
			
			try {
				song.close();
			}
			catch(event:*){};
			
			channel = null;
			song = null;
			
			if(goingRight) {
				(isOn < iLeg) ? isOn++ : isOn = 0;
			}
			else {
				(isOn > 0) ? isOn-- : isOn = iLeg;
			}
			
			song = new Sound();
			song.addEventListener(IOErrorEvent.IO_ERROR, catchError);
			song.load(new URLRequest(songList[isOn]));
			
			position = 0;
			channel = song.play(position);
			channel.soundTransform = soundTrans;
			channel.addEventListener(Event.SOUND_COMPLETE, songEnded);
			
		}
		
		// catches loading errors
		private function catchError(event:IOErrorEvent):void {};
		
		// plays the song
		private function playSong():void {
			
			channel = song.play(position);
			channel.soundTransform = soundTrans;
			channel.addEventListener(Event.SOUND_COMPLETE, songEnded);
			
		}
		
		// string to boolean conversion
		private function convert(st:String):Boolean {
			
			if(st.toLowerCase().toString() == "true") {
				return true;
			}
			else {
				return false;
			}
			
		}
		
		// garbage collection
		private function removed(event:Event):void {
			
			removeEventListener(Event.UNLOAD, removed);
			removeEventListener(Event.REMOVED_FROM_STAGE, removed);
			removeEventListener(Event.ADDED_TO_STAGE, added);
			
			if(song != null) {
				
				if(channel != null) {
					
					channel.removeEventListener(Event.SOUND_COMPLETE, songEnded);
					channel.stop();
					channel = null;
					
				}
				
				try {
					song.close();
				}
				catch(event:*){};
				
				song.removeEventListener(IOErrorEvent.IO_ERROR, catchError);
				
				song = null;
				soundTrans = null;
				songList = null;
				
			}
			
		}

	}
	
}






















