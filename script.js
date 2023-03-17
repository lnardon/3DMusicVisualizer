// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setClearColor(0x131313);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth - 17, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 15;

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
// controls.autoRotateSpeed = 3;

//LIGHTS
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 20, 25);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 70;
scene.add(spotLight);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(0, -10, -25);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 500;
spotLight2.shadow.camera.far = 4000;
spotLight2.shadow.camera.fov = 70;
scene.add(spotLight2);

//RENDER LOOP
requestAnimationFrame(render);
function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
