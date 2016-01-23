define([], function(){

	Object.defineProperties(Array.prototype,
	{
		"x": {
			enumerable: false,
			get: function(){
				return this[0];
			},
			set: function(_v){
				this[0] = _v;
			}
		},
		"y": {
			enumerable: false,
			get: function(){
				return this[1];
			},
			set: function(_v){
				this[1] = _v;
			}
		},
		"z": {
			enumerable: false,
			get: function(){
				return this[2];
			},
			set: function(_v){
				this[2] = _v;
			}
		},
		"w": {
			enumerable: false,
			get: function(){
				return this[3];
			},
			set: function(_v){
				this[3] = _v;
			}
		},
		"r": {
			enumerable: false,
			get: function(){
				return this[0];
			},
			set: function(_v){
				this[0] = _v;
			}
		},
		"g": {
			enumerable: false,
			get: function(){
				return this[1];
			},
			set: function(_v){
				this[1] = _v;
			}
		},
		"b": {
			enumerable: false,
			get: function(){
				return this[2];
			},
			set: function(_v){
				this[2] = _v;
			}
		},
		"a": {
			enumerable: false,
			get: function(){
				return this[3];
			},
			set: function(_v){
				this[3] = _v;
			}
		},
		"width": {
			enumerable: false,
			get: function(){
				return this[0];
			},
			set: function(_v){
				this[0] = _v;
			}
		},
		"height": {
			enumerable: false,
			get: function(){
				return this[1];
			},
			set: function(_v){
				this[1] = _v;
			}
		}
	});

	Array.prototype.add3 = function(v3){
		return [this[0]+v3[0], this[1]+v3[1], this[2]+v3[2]];
	};

	Array.prototype.sub3 = function(v3){
		return [this[0]-v3[0], this[1]-v3[1], this[2]-v3[2]];
	};

	Array.prototype.div3 = function(v3){
		return [this[0]/v3[0], this[1]/v3[1], this[2]/v3[2]];
	};

	Array.prototype.mult3 = function(v3){
		return [this[0]*v3[0], this[1]*v3[1], this[2]*v3[2]];
	};

	Array.prototype.scale3 = function(s){
		return [this[0]*s, this[1]*s, this[2]*s];
	};

	Array.prototype.cross3 = function(v3){
		return [
			(this[1] * v3[2]) - (this[2] * v3[1]),
			(this[2] * v3[0]) - (this[0] * v3[2]),
			(this[0] * v3[1]) - (this[1] * v3[0]),
		];
	};

	Array.prototype.len3 = function(){
		return Math.sqrt(this[0]*this[0] + this[1]*this[1] + this[2]*this[2]);
	};

	Array.prototype.norm3 = function(){
		var l = this.len3();
		return [this[0]/l, this[1]/l, this[2]/l];
	};

	Array.prototype.rotateX3 = function(theta){
		var c = Math.cos(theta);
		var s = Math.sin(theta);
		return [1 * this[0],
				(this[1] * c) + (this[2] * -s),
				(this[1]* s) + this[2]* c];
	};

	Array.prototype.rotateY3 = function(theta){
		var c = Math.cos(theta);
		var s = Math.sin(theta);
		return [(this[0] * c) + this[2] * s,
				1 * this[1],
				(this[0] * -s) + this[2] * c];
	};

	Array.prototype.rotateZ3 = function(theta){
		var c = Math.cos(theta);
		var s = Math.sin(theta);
		return [(this[0] * c) + (this[1] * -s),
				(this[0] * s) + (this[1] * c),
				1 * this[2]];
	};


});