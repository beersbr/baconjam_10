define([], function(){
	var keyboard = null;

	var Keyboard = function(){
		if(!keyboard){
			this.keys = {};
			window.addEventListener("keydown", keydown, false);
			window.addEventListener("keyup", keyup, false);

			this.mapping = {
				up: 87,
				left: 65,
				down: 83,
				right: 68,
				action0: 13,
				action1: 74,
				action2: 75,
				action3: 76,
			};

			keyboard = this;

		}

		return keyboard;
	};

	Keyboard.prototype.action0 = function(){
		return this.keys[this.mapping.action0];
	};

	Keyboard.prototype.action1 = function(){
		return this.keys[this.mapping.action1];
	};

	Keyboard.prototype.action2 = function(){
		return this.keys[this.mapping.action2];
	};

	Keyboard.prototype.action3 = function(){
		return this.keys[this.mapping.action3];
	};


	Keyboard.prototype.down = function(){
		return this.keys[this.mapping.down];
	};

	Keyboard.prototype.up = function(){
		return this.keys[this.mapping.up];
	};

	Keyboard.prototype.left = function(){
		return this.keys[this.mapping.left];
	};

	Keyboard.prototype.right = function(){
		return this.keys[this.mapping.right];
	};

	Keyboard.prototype.getKey = function(_keyCode){
		return this.keys[_keyCode];
	};


	function keyup(_event){
		if(keyboard) keyboard.keys[_event.keyCode] = false;
	}

	function keydown(_event){
		if(keyboard) keyboard.keys[_event.keyCode] = true;
	}


	return Keyboard;

});