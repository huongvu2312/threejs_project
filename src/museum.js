import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import modelInfo from "/assets/info.json" assert { type: "json" };

let scene, renderer, camera;

init();
render();

function init() {
  const container = document.getElementById("container");

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(1, 1, 15);

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true });

  // Set default background color
  renderer.setClearColor(0xffffff, 1.0);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.useLegacyLights = false;

  const loader = new GLTFLoader();

  // Model
  // modelInfo.forEach((model) => {
  // Create container for model
  const modelContainer = document.createElement("div");
  container.appendChild(modelContainer);

  // Load model
  loader.load(
    // "/assets/models/" + model.path + "/scene.gltf",
    "/assets/models/perseus_fighting_medusa/scene.gltf",
    function (gltf) {
      scene.add(gltf.scene);
      render();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  modelContainer.appendChild(renderer.domElement);
  // create a cube and add to scene
  // var cubeGeometry = new THREE.BoxGeometry(
  //   10 * Math.random(),
  //   10 * Math.random(),
  //   10 * Math.random()
  // );

  // var cubeMaterial = new THREE.MeshNormalMaterial();

  // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // scene.add(cube);

  // Add rendered model to container

  render();

  // });

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}
