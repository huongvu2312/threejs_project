import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import modelInfo from "/assets/info.json" assert { type: "json" };

let scene, renderer, camera;

init();
render();

function init() {
  /**
   * CONTAINER
   */
  const container = document.getElementById("threejs");
  const modelContainer = document.createElement("div");
  modelContainer.style.width = window.innerWidth / 2;
  modelContainer.style.height = window.innerHeight / 2;
  container.appendChild(modelContainer);

  /**
   * SCENE
   */
  scene = new THREE.Scene();

  // Set the background color
  scene.background = new THREE.Color("#F3E6D8");

  /**
   * CAMERA
   */
  // Create a camera
  const fov = 35; // AKA Field of View
  const aspect = modelContainer.clientWidth / modelContainer.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 10000; // the far clipping plane

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // every object is initially created at ( 0, 0, 0 )
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  /**
   * LIGHT
   */
  const mainLight = new THREE.DirectionalLight("white", 4);
  mainLight.position.set(10, 10, 10);
  scene.add(mainLight);

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  /**
   * MODEL
   */
  const loader = new GLTFLoader();

  // Load model
  loader.load(
    // "/assets/models/" + model.path + "/scene.gltf",
    "/assets/models/perseus_fighting_medusa/scene.gltf",
    function (gltf) {
      // gltf.scene.scale.set(0.001, 0.001, 0.001);
      gltf.side = THREE.DoubleSide;

      // Add model to the scene
      scene.add(gltf.scene);

      render();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );

  // Test for something other than model
  /**const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  */

  /**
   * RENDER
   */
  renderer = new THREE.WebGLRenderer();

  // Set the renderer to the same size as our container element
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  // Set the pixel ratio so that our scene will look good on HiDPI displays
  renderer.setPixelRatio(window.devicePixelRatio);

  // Turn on the physically correct lighting model
  renderer.useLegacyLights = true;

  // Add the automatically created <canvas> element to the page
  modelContainer.appendChild(renderer.domElement);

  // render();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  render();
}

// Render, or 'create a still image', of the scene
function render() {
  renderer.render(scene, camera);
}
