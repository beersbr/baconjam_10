define(["Vec2"], function(vec2){

	var Controller = function(){
		this.mouseButtons = [false, false, false];

		this.mousePosition = {};
	}

	Controller.prototype.setLeftMouseState = function(_value){
		this.mouseButtons[0] = _value;
	};

	Controller.prototype.setMiddleMouseState = function(_value){
		this.mouseButtons[1] = _value;
	};

	Controller.prototype.setRightMouseState = function(_value){
		this.mouseButtons[2] = _value;
	};

	Controller.prototype.setMousePosition = function(_x, _y){
		this.mousePosition = new vec2(_x, _y);
	};

	Controller.prototype.setMouseButtonState = function(_button, _state){
		this.mouseButtons[_button] = !!_state;
	};

	Controller.prototype.getMousePosition = function(){
		return this.mousePosition;
	};

	Controller.prototype.mouseButtons = function(){
		return this.mouseButtons.slice();
	};

	Controller.prototype.mouseLeft = function(){
		return this.mouseButtons[0];
	};

	Controller.prototype.mouseMiddle = function(){
		return this.mouseButtons[1];
	};

	Controller.prototype.mouseRight = function(){
		return this.mouseButtons[2];
	};


	return Controller;
});