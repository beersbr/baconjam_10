define(["Vec2"], function(vec2){
	function Rect(_x, _y, _w, _h){
		this.origin = new vec2(_x, _y);
		this.size = new vec2(_w, _h);
	};

	Rect.prototype.containsPoint = function(x, y){
		throw "NOT DONE";
	};

	return Rect;
});