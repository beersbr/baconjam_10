define(['jQuery'], function($){

	var FILES = {}

	var WORKING = [];

	var DoneWorkingCallback = function(){}

	var FileLoader = function(){

	};

	FileLoader.finishedWork = function(fn){
		DoneWorkingCallback = fn;
	}

	FileLoader.loadFile = function(_path, _key){

		FILES[_key] = "";

		var promise = $.get(_path).done(function(result){
			FILES[_key] = result;
			WORKING.splice(WORKING.indexOf(this), 1);

			if(WORKING.length == 0){
				DoneWorkingCallback();
			};
		});

		WORKING.push(promise);
		
		return FILES[_key];
	};

	FileLoader.getFile = function(_key){
		return FILES[_key];
	};

	return FileLoader;

});