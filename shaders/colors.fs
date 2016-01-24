precision mediump float;

uniform vec4 multColor;

//NOTE(brett): input variables [from fragment shader]
varying float vertex_light;
varying vec4 vertex_color;

void main(){

	vec4 diffuse = vec4(vertex_color.rgb * multColor.rgb * vertex_light, 1.0);

	gl_FragColor = diffuse;
}