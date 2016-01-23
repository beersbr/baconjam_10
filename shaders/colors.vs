precision mediump float;

attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;

// uniform vec3 lightPos;
uniform vec3 lightDir;

uniform mat4 projection;
uniform mat4 view;

uniform mat4 inverseView;

//NOTE(brett): output variables [to fragment shader]
varying float vertex_light;
varying vec4 vertex_color;

void main(){

	vec4 positionP = projection * view * vec4(position, 1.0);
	vec4 normalP = inverseView * vec4(normalize(normal), 1.0);

	vertex_light = max(dot(normalP.xyz, lightDir.xyz), 0.0);
	vertex_color = color;

	gl_Position = positionP;
}
