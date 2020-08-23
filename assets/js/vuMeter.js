var max_level_L = 0;
var old_level_L = 0;
var cnvs = document.getElementById("test");
var cnvs_cntxt = cnvs.getContext("2d");

var constraints = { audio: true, video: false };

navigator.mediaDevices.getUserMedia(constraints).then(


	function(stream){
	
		
	var audioContext = new AudioContext();
		var microphone = audioContext.createMediaStreamSource(stream);
		var javascriptNode = audioContext.createScriptProcessor(1024, 1, 1);
		
		microphone.connect(javascriptNode);
		javascriptNode.connect(audioContext.destination);
		javascriptNode.onaudioprocess = function(event){

			var inpt_L = event.inputBuffer.getChannelData(0);
			var instant_L = 0.0;

			var sum_L = 0.0;
			for(var i = 0; i < inpt_L.length; ++i) {
				sum_L += inpt_L[i] * inpt_L[i];
			}
			instant_L = Math.sqrt(sum_L / inpt_L.length);
			max_level_L = Math.max(max_level_L, instant_L);				
			instant_L = Math.max( instant_L, old_level_L -0.008 );
			old_level_L = instant_L;
			
			cnvs_cntxt.clearRect(0, 0, cnvs.width, cnvs.height);
			cnvs_cntxt.fillStyle = '#00ff00';
			cnvs_cntxt.fillRect(5,5,(cnvs.width-10)*(instant_L/max_level_L),(cnvs.height-10)); // x,y,w,h
			
		}
	}).catch(function(err) {
	   console.log(err); 
});