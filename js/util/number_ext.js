define([], function(){

	Number.prototype.toDegrees = function(){
		return (this * 180/Math.PI);
	};

	Number.prototype.toRadians = function(){
		return (this * Math.PI/180);
	};

});