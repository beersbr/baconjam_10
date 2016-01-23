define(['glm'], function(glm){

	var Camera = function(){
		this.eye = [];
		this.center = [];
		this.up = [];
	}

	Camera.prototype.getViewMatrix = function(){
		var matrix = glm.mat4.create();
		matrix = glm.mat4.lookAt(matrix, this.eye, this.center, this.up);
		return matrix;
	};

	return Camera;

});