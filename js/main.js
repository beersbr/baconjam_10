require(['FileLoader', 'ImageLoader', 'Mouse', 'Display', 'glm', 'ArrayExt', 'NumberExt', 'Camera', 'Color', 'perlin'], 
        function(FileLoader, ImageLoader, Mouse, Display, glm, ArrayExt, NumberExt, Camera, color, perlin){


	var display = new Display("Bacon Jam 10", 1200, 800);
	var mouse = new Mouse(display);

	var ProjectionMatrix = null;
	var ViewMatrix = null;
	var ViewCamera = null;

	var ColorsShader = null;

	var TrackGeometryBuffer = null;

	function CreateQuad(_topleft, _bottomleft, _bottomright, _topright, _color){

		var quad = [];

		var p0 = _topleft.slice();
		var p1 = _bottomleft.slice();
		var p2 = _topright.slice();

		var n0 = p2.sub3(p0).cross3(p1.sub3(p0)).norm3();

		var p3 = _topright.slice();
		var p4 = _bottomleft.slice();
		var p5 = _bottomright.slice();

		var n1 = p5.sub3(p3).cross3(p4.sub3(p3)).norm3();

		var color = _color.slice();

		// p0
		Array.prototype.push.apply(quad, p0);
		Array.prototype.push.apply(quad, n0);
		Array.prototype.push.apply(quad, color);

		// p1
		Array.prototype.push.apply(quad, p1);
		Array.prototype.push.apply(quad, n0);
		Array.prototype.push.apply(quad, color);

		// p2
		Array.prototype.push.apply(quad, p2);
		Array.prototype.push.apply(quad, n0);
		Array.prototype.push.apply(quad, color);

		// p3
		Array.prototype.push.apply(quad, p3);
		Array.prototype.push.apply(quad, n1);
		Array.prototype.push.apply(quad, color);

		// p4
		Array.prototype.push.apply(quad, p4);
		Array.prototype.push.apply(quad, n1);
		Array.prototype.push.apply(quad, color);

		// p5
		Array.prototype.push.apply(quad, p5);
		Array.prototype.push.apply(quad, n1);
		Array.prototype.push.apply(quad, color);

		return quad;
	}


	function CreateShaderProgram(_context, _vertex_code, _fragment_code){
		var gl = _context;

		var program = gl.createProgram();

		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, _vertex_code);
		gl.compileShader(vertexShader);

		var vertexCompileResult = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
		if(!vertexCompileResult){
			console.error(gl.getShaderInfoLog(vertexShader))
		}

		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, _fragment_code);
		gl.compileShader(fragmentShader);

		var vertexCompileResult = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
		if(!vertexCompileResult){
			console.error(gl.getShaderInfoLog(fragmentShader))
		}

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);

		gl.linkProgram(program);

		var linkResult = gl.getProgramParameter(program, gl.LINK_STATUS);
		if(!linkResult){
			console.error(gl.getShaderInfoLog(program))
		}

		return program;
	}


	function load_data(_context){
		FileLoader.loadFile("shaders/colors.vs", "colors-vertex-shader");
		FileLoader.loadFile("shaders/colors.fs", "colors-fragment-shader");

		FileLoader.finishedWork(function(){
			setup(_context);
		});
	}

	function setup(_context){
		var gl = _context;

		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);

		ColorsShader = CreateShaderProgram(gl,
		                                   FileLoader.getFile("colors-vertex-shader"),
			                               FileLoader.getFile("colors-fragment-shader"));

		ProjectionMatrix = glm.mat4.create();
		glm.mat4.perspective(ProjectionMatrix, (60).toRadians(), display.getAspectRatio(), 0.1, 100);

		ViewCamera = new Camera();
		ViewCamera.eye = [0, 3, 7];
		ViewCamera.center = [0, 0, 0];
		ViewCamera.up = [0, 1, 0];

		ViewMatrix = ViewCamera.getViewMatrix();


		TrackGeometryBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, TrackGeometryBuffer);

		//NOTE(brett): Using quads, a quad will be 2 triangles of vertices
		// vertex: (float is 4 bytes)
		// 12 bytes for x, y, z
		// 12 bytes for normals nx, ny, nz
		// 16 bytes for color r, g, b, a
		// 40 bytes per vertex (for 6 points per quad)
		// 240 bytes per quad

		GLOBAL_vertexTypeSize = 40;
		GLOBAL_quadTypeSize = 240; 
		//NOTE(brett): probably only need about 100, but i'll keep it at a circular 200
		GLOBAL_maxTrackQuadCount = 40;
		GLOBAL_trackQuadCount = 0;

		GLOBAL_cameraAngle = 0.0;
		GLOBAL_cameraTurnSpeed = 2;
		GLOBAL_cameraMaxTurnSpeed = 25;

		//NOTE(brett): change direction every trackChangeTimer seconds
		GLOBAL_trackChangeTimer = 2;
		GLOBAL_trackChangeTimerCounter = 0;

		GLOBAL_trackVelocity = [0, 0, -1];
		GLOBAL_trackAcceleration = 2.0;

		GLOBAL_trackAngle = 0;
		GLOBAL_trackTurnAngle = 0;
		GLOBAL_trackCenter = [0.0, 0.0, 0.0];

		GLOBAL_trackWidth = 1.6;

		GLOBAL_bottomLeft = [GLOBAL_trackWidth/2.0, 0, 0];
		GLOBAL_bottomRight = [-GLOBAL_trackWidth/2.0, 0, 0];

		GLOBAL_currentTrackDistance = 0;

		var trackBufferSize = GLOBAL_quadTypeSize * GLOBAL_maxTrackQuadCount;
		gl.bufferData(gl.ARRAY_BUFFER,
		              trackBufferSize,
		              gl.DYNAMIC_DRAW);

		run();
	}

	function run(){
		var graphics = display.getGraphics();

		// var targetFPS = 59.999999,
		var targetFPS = 30,
			timePerTick = 1000/targetFPS,
			deltaTime = 0,
			currentTime = 0,
			lastTime = +new Date(),
			timer = 0;

		function loop(){
			currentTime = +new Date();
			deltaTime = currentTime - lastTime;
			timer += deltaTime;
			lastTime = currentTime;

			if(timer >= timePerTick){
				var lv = timer - timePerTick;

				var dt = timer/1000;
				updateAndRender(graphics, dt);
				timer = lv;
			}

			window.requestAnimationFrame(loop);
		}

		loop();
	}

	function updateAndRender(_context, _dt){
		var gl = _context;

		gl.clearColor(0.0, 0.5, 1.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		//NOTE(brett): change track direction -25 - 25
		GLOBAL_trackChangeTimerCounter += _dt;
		if(GLOBAL_trackChangeTimerCounter > GLOBAL_trackChangeTimer){
			//NOTE(brett): degrees per second
			GLOBAL_trackAngle = -25 + Math.random()*50;
			GLOBAL_trackChangeTimerCounter = 0.0
		}

		var currentTrackVelocity = GLOBAL_trackVelocity.scale3(GLOBAL_trackAcceleration * _dt);

		// var frameAngle = GLOBAL_trackAngle * _dt;
		GLOBAL_trackTurnAngle = GLOBAL_trackAngle * _dt;

		currentTrackVelocity = currentTrackVelocity.norm3()
			.rotateY3(GLOBAL_trackTurnAngle.toRadians())
			.scale3(currentTrackVelocity.len3());

		var newTrackCenter = GLOBAL_trackCenter.add3(currentTrackVelocity);

		var normalAxis = newTrackCenter.norm3();

		var topLeft = currentTrackVelocity.norm3().rotateY3((-90).toRadians()).scale3(GLOBAL_trackWidth/2);
		topLeft = newTrackCenter.add3(topLeft);
		var topRight = currentTrackVelocity.norm3().rotateY3((90).toRadians()).scale3(GLOBAL_trackWidth/2);
		topRight = newTrackCenter.add3(topRight);

		GLOBAL_trackCenter = newTrackCenter;
		GLOBAL_trackVelocity = currentTrackVelocity.norm3();

		//NOTE(brett): generate quad on the x/z plane
		//CreateQuad(_topleft, _bottomleft, _bottomright, _topright, color)
		var quad = CreateQuad(topLeft,
		                      GLOBAL_bottomLeft,
		                      GLOBAL_bottomRight,
		                      topRight,
		                      [0.5, 0.0, 1.0, 1.0]);


		GLOBAL_bottomLeft = topLeft;
		GLOBAL_bottomRight = topRight;

		//NOTE(brett): move camera with the track
		var cameraLookat = ViewCamera.eye.sub3(ViewCamera.center);

		//TODO(brett): move the camera with respect to the mouse position on the screen
		//TODO(brett): Need to start the mouse off in the center of the canvas
		
		var width = display.getWidth();
		var height = display.getHeight();

		var mousePosition = mouse.getMousePosition();
		var rx = mousePosition.x / width;
		var ry = mousePosition.y / height;

		//NOTE(brett): map the mouse position to -1<->1
		var mouseOffset = [-1 + rx*2, -1 + ry*2];

		ViewCamera.center.z = GLOBAL_trackCenter.z;
		ViewCamera.center.x = GLOBAL_trackCenter.x;

		var turnDelta = GLOBAL_cameraAngle + (_dt * (mouseOffset.x * GLOBAL_cameraTurnSpeed));
		GLOBAL_cameraAngle = turnDelta;

		GLOBAL_cameraAngle = Math.min(GLOBAL_cameraAngle, GLOBAL_cameraMaxTurnSpeed);

		cameraLookat = cameraLookat.rotateY3((GLOBAL_cameraAngle).toRadians());

		ViewCamera.eye = ViewCamera.center.add3(cameraLookat);
		ViewMatrix = ViewCamera.getViewMatrix();

		gl.useProgram(ColorsShader);

		gl.bindBuffer(gl.ARRAY_BUFFER,
		              TrackGeometryBuffer);

		var trackBufferIndex = (GLOBAL_trackQuadCount % GLOBAL_maxTrackQuadCount) * GLOBAL_quadTypeSize;
		gl.bufferSubData(gl.ARRAY_BUFFER,
		                 trackBufferIndex,
		                 new Float32Array(quad));

		//NOTE(brett): prepare buffer for rendering
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		gl.enableVertexAttribArray(2);

		var positionLocation = gl.getAttribLocation(ColorsShader, "position");
		var normalLocation = gl.getAttribLocation(ColorsShader, "normal");
		var colorLocation = gl.getAttribLocation(ColorsShader, "color");


		//NOTE(brett): Prepare the position 
		//NOTE(brett): gl.vertexAttribPoint(position, element count, type, normalized?, stride, offset)
		gl.vertexAttribPointer(positionLocation,
		                       3, 
		                       gl.FLOAT,
		                       false,
		                       GLOBAL_vertexTypeSize,
		                       0);

		//NOTE(brett): prepare the normal
		gl.vertexAttribPointer(normalLocation,
		                       3,
		                       gl.FLOAT,
		                       false,
		                       GLOBAL_vertexTypeSize,
		                       12);

		//NOTE(brett): prepare the color
		gl.vertexAttribPointer(colorLocation,
		                       4, 
		                       gl.FLOAT,
		                       false,
		                       GLOBAL_vertexTypeSize,
		                       24);


		//NOTE(brett): setup uniforms for rendering
		var projectionUniformLocation = gl.getUniformLocation(ColorsShader, "projection");
		var viewUniformLocation = gl.getUniformLocation(ColorsShader, "view");
		var lightDirUniformLocation = gl.getUniformLocation(ColorsShader, "lightDir");
		var inverseViewUniformLocation = gl.getUniformLocation(ColorsShader, "inverseView");

		gl.uniformMatrix4fv(projectionUniformLocation,
		                    false,
		                    ProjectionMatrix);

		gl.uniformMatrix4fv(viewUniformLocation,
		                    false,
		                    ViewMatrix);

		gl.uniform3fv(lightDirUniformLocation,
		              ViewCamera.eye.sub3(ViewCamera.center).norm3());


		var inverseView = glm.mat4.create();
		glm.mat4.invert(inverseView, ViewMatrix);
		glm.mat4.transpose(inverseView, inverseView);

		gl.uniformMatrix4fv(inverseViewUniformLocation,
		                    false,
		                    inverseView);


		//NOTE(brett): increase the track size counter
		GLOBAL_trackQuadCount += 1;
		var indexDrawCount = Math.min(GLOBAL_trackQuadCount, GLOBAL_maxTrackQuadCount);

		gl.drawArrays(gl.TRIANGLES, 0, indexDrawCount*6);
	}

	load_data(display.getGraphics());
});