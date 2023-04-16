export const vertexShader = `
precision mediump float;
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;
  uniform float uTime;
  uniform float[64] uFreqArray;

  const float amplitude = 2.7;
  const float frequency = 0.189;
  const float PI = 3.14159;

  void main() {
    mat4 projectViewModel = projectionMatrix * viewMatrix * modelMatrix;
    float distance = length(position);
    float z = amplitude*cos(-PI*distance*frequency+(uTime/1230.0));
    gl_Position = projectViewModel * vec4(position.x+(cos(z)), position.y, z,0.350);
  }
`;

export const fragmentShader = `
precision mediump float;
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;
  uniform float uTime;
  uniform float[64] uFreqArray;

  void main() {
    gl_FragColor = vec4(uFreqArray[int(x)]/259.0 ,uFreqArray[int(y)]/125.0,uFreqArray[int(z)]/97.0, 1.0);
  }
`;
