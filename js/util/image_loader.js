define([], function(){

	var IMAGES = {}

	var ImageLoader = function(){

	};

	ImageLoader.loadImage = function(_key, _path){
		IMAGES[_key] = new Image();
		IMAGES[_key].src = _path;

		return IMAGES[_key];
	};

	ImageLoader.getImage = function(_key){
		return IMAGES[_key];
	};

	return ImageLoader;

});