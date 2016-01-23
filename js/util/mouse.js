define(['Class', 'ArrayExt'], function(Class, ArrayExt){
	var buttons,
		mouse,
		canavs;

	BUTTON_LEFT = 0;
	BUTTON_MIDDLE = 1;
	BUTTON_RIGHT = 2;

	var instance = null;

	var MouseManager = function(_display){
		if(instance == null){
			display = _display;
			mouse = [0, 0];
			buttons = [];
			canvas = display.getCanvas();
			document.body.addEventListener("mousedown", mouseDown, false);
			document.body.addEventListener("mouseup", mouseUp, null);
			document.body.addEventListener("mousemove", mouseMove, false);
			document.body.addEventListener("contextmenu", contextMenu, false);
			instance = this;

			this.eventDelegate = function(ev){};
		}
		else {
			return instance;
		}
	}

	MouseManager.prototype.setEventDelegate = function(fn){
		this.eventDelegate = fn;
	};

	MouseManager.prototype.update = function(_dt){
		this.left = buttons[BUTTON_LEFT];
		this.middle = buttons[BUTTON_MIDDLE];
		this.right = buttons[BUTTON_RIGHT];

	};

	MouseManager.prototype.getMousePosition = function(){
		return [mouse.x, mouse.y];
	};

	function contextMenu(_event) {
		_event.preventDefault();
	}

	function mouseUp(_event) {
		buttons[_event.button] = false;
		instance.eventDelegate({type: "mouseup", "event": _event, "button": _event.button});
	}

	function mouseMove(_event) {
		var x = _event.x || _event.offsetX;
		var y = _event.y || _event.offsetY;

		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		mouse.x = x;
		mouse.y = y;

		instance.eventDelegate({type: "mousemove", "event": _event, "button": _event.button});
	}

	var ButtonNames = ["left", "middle", "right"];
	function mouseDown(_event) {
		_event.preventDefault();
		buttons[_event.button] = true;
		
		instance.eventDelegate({type: "mousedown", "event": _event, "button": _event.button});
	}

	return MouseManager;
});