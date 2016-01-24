requirejs.config({
	"baseUrl": "js",
	"paths": {
		"jQuery": "thirdparty/jQuery",
		"perlin": "thirdparty/perlin",
		"glm": "thirdparty/gl-matrix",
		"Class": "thirdparty/class",

		"ArrayExt": "util/array_ext",
		"NumberExt": "util/number_ext",

		"Display": "display",

		"Camera": "util/camera",
		"Mouse": "util/mouse",
		"Keyboard": "util/keyboard",
		"Color": "util/color",
		"Rect": "util/rect",
		"Controller": "util/controller",
		"ImageLoader": "util/image_loader",
		"FileLoader": "util/file_loader",


		// "KeyManager": "app/classes/key_manager",
		// "MouseManager": "app/classes/mouse_manager",
	}
});

require(["main"]);