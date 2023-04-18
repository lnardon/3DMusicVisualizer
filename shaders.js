export const vertexShader = `
precision mediump float;
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;
  uniform float uTime;
  uniform float[512] uFreqArray;

  const float amplitude = 0.437;
  const float frequency = 0.40;
  const float PI = 3.14159;

  void main() {
    mat4 projectViewModel = projectionMatrix * viewMatrix * modelMatrix;
    float distance = length(position);
    float z = (uFreqArray[0]/72.0)*cos(-PI*distance*frequency+(uTime/256.0));
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
  uniform float[512] uFreqArray;

  void main() {
    gl_FragColor = vec4(tan(uFreqArray[4]/255.0)+ z/7.0 ,tan(uFreqArray[64]/255.0) + z/13.0,tan(uFreqArray[128]/255.0), 1.0);
  }
`;
