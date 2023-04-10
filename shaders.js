export const vertexShader = `
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;
  uniform float uTime;
  uniform float[64] uFreqArray;
  uniform float uAmp;

  void main() {
    vUv = position;
    x = abs(position.x);
    y = abs(position.y);
    float floor_x = round(x);
    float floor_y = round(y);
    z = sin(uFreqArray[int(floor_x)] / 35.0 + uFreqArray[int(floor_y)] / 40.0) * uAmp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z + sin((uFreqArray[int(z)] * sin(position.z * uAmp))), 1.0);
  }
`;

export const fragmentShader = `
  varying float x;
  varying float y;
  varying float z;
  varying vec3 vUv;
  uniform float uTime;

  void main() {
    gl_FragColor = vec4(exp(z),tan(z*acos(x)),z, 1.0);
  }
`;
