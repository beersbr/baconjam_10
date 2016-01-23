define([], function(){

	function Color(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	Color.prototype.rgb = function(){
		return "rgb("+parseInt(this.r*255)+", "+parseInt(this.g*255)+", "+parseInt(this.b*255)+")";
	};

	Color.prototype.rgba = function(){
		return "rgb("+parseInt(this.r*255)+", "+parseInt(this.g*255)+", "+parseInt(this.b*255)+", "+parseFloat(this.a)+")";
	};

	Color.rgb = function(r, g, b){
		return "rgba("+parseInt(r*255)+", "+parseInt(g*255)+", "+parseInt(b*255)+", 1.0)";
	}

	Color.rgba = function(r, g, b, a){
		return "rgba("+parseInt(r*255)+", "+parseInt(g*255)+", "+parseInt(b*255)+", "+parseFloat(a)+")";
	}

	return Color;
})