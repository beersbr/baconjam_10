define(['Class'], function(Class){

	var canvas, title, width, height, graphics;

	var audioElement, audioContext, analyzer;

	var Display = Class.extend({
		ctor: function(_title, _width, _height){
			title = _title,
			width = _width,
			height = _height;

			createDisplay();
		}
	});

	Display.prototype.getWidth = function(){
		return width;
	};

	Display.prototype.getHeight = function(){
		return height;
	};

	Display.prototype.getGraphics = function(){
		return graphics;
	};

	Display.prototype.getCanvas = function(){
		return canvas;
	};

	Display.prototype.getaudioElement = function(){
		return audioElement;
	};

	Display.prototype.getAudioContext = function(){
		return audioContext;
	};

	Display.prototype.getAnalyser = function(){
		return analyser;
	};

	Display.prototype.getAspectRatio = function(){
		return (this.getWidth()/this.getHeight());
	}

	/***************************************************************
	Private
	***************************************************************/

	function createDisplay(){
		document.title = title;
		var body = document.body;

		canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.id = "canvas";
		body.appendChild(canvas);


		// canvas.style.width = "100%";
		// canvas.style.cursor = "none";

		// graphics = canvas.getContext('2d');
		graphics = canvas.getContext('webgl');
	}


	return Display;
})