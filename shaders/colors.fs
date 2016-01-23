precision mediump float;

//NOTE(brett): input variables [from fragment shader]
varying float vertex_light;
varying vec4 vertex_color;

void main(){

	vec4 lit_color = vec4(vertex_color.rgb * vertex_light, 1.0);

	gl_FragColor = lit_color;
}