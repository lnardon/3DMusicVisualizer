// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { vertexShader, fragmentShader } from "./shaders.js";

function letThereBelight() {
  //SCENE SETUP
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
  });
  renderer.setClearColor(0x131313);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth - 17, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );
  camera.position.x = 44.226079410571;
  camera.position.y = 27.20578561040463;
  camera.position.z = 33.62588955110668;
  camera.rotation.x = -0.31714734750479134;
  camera.rotation.y = 0.25743054924724107;
  camera.rotation.z = 0.0833716392913605;
  camera.zoom = 1;

  //LIGHTS
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 20, 25);
  scene.add(spotLight);
  const spotLight2 = new THREE.SpotLight(0xffffff);
  spotLight2.position.set(0, -10, -25);
  scene.add(spotLight2);

  // SETUP ANALYZER
  let audioContext, audioElement, dataArray, analyser, source;
  const uniforms = {
    uTime: {
      type: "f",
      value: 1.0,
    },
    uFreqArray: {
      type: "float[64]",
      value: dataArray,
    },
    uAmp: {
      type: "f",
      value: 7.0,
    },
  };
  const geometry = new THREE.PlaneGeometry(64, 64, 256, 256);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function setupAudioContext() {
    audioContext = new window.AudioContext();
    audioElement = document.getElementById("audio");
    source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = Math.pow(2, 10);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  function play() {
    if (audioContext === undefined) {
      setupAudioContext();
    }
    render();
  }
  play();

  //RENDER LOOP
  function render(time) {
    analyser.getByteFrequencyData(dataArray);
    uniforms.uFreqArray.value = dataArray;
    uniforms.uTime.value = time;
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
}

function handleFile(e) {
  let files = e.target.files;
  document
    .getElementById("audio")
    .setAttribute("src", URL.createObjectURL(files[0]));
  document.getElementById("audio").load();
  document.getElementById("audio").play();
}

document
  .getElementsByClassName("repoContainer")[0]
  .addEventListener("click", () => {
    window.open(
      "https://github.com/lnardon/3DMusicVisualizer",
      "target=_blank"
    );
  });

// EVENT LISTENERS
document.getElementsByClassName("startBtn")[0].addEventListener("click", () => {
  document.getElementById("audio").play();
  letThereBelight();
  document.getElementsByClassName("startBtn")[0].style.display = "none";
  document.getElementsByClassName("controls")[0].style.display = "flex";
});

document.getElementsByClassName("playBtn")[0].addEventListener("click", () => {
  if (document.getElementById("audio").paused) {
    document.getElementById("audio").play();
    document.getElementsByClassName("playBtn")[0].children[0].src =
      "./pause.svg";
    document.getElementsByClassName("playBtn")[0].children[1].innerText =
      "Pause";
  } else {
    document.getElementById("audio").pause();
    document.getElementsByClassName("playBtn")[0].children[0].src =
      "./play.svg";
    document.getElementsByClassName("playBtn")[0].children[1].innerText =
      "Play";
  }
});

document
  .getElementsByClassName("uploadBtn")[0]
  .addEventListener("click", () => {
    document.getElementById("fileUpload").click();
  });

document
  .getElementById("fileUpload")
  .addEventListener("change", handleFile, false);
