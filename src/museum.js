import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import modelInfo from "/assets/info.json" assert { type: "json" };

let scene, renderer, camera, loader, currentModel, controls;

init();

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
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1; // the near clipping plane
  const far = 10000; // the far clipping plane

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // every object is initially created at ( 0, 0, 0 )
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

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
  loader = new GLTFLoader();

  // Load model
  loader.load(
    "/assets/models/perseus_fighting_medusa/scene.gltf",
    function (gltf) {
      // gltf.scene.scale.set(0.001, 0.001, 0.001);
      gltf.side = THREE.DoubleSide;

      // Calculate the bounding box of the model
      const Bounding_Box = new THREE.Box3().setFromObject(gltf.scene);
      const center = Bounding_Box.getCenter(new THREE.Vector3());

    // Offset the model's position to center it
    gltf.scene.position.sub(center);

    // Add model to the scene
    scene.add(gltf.scene);

    // Adjust the camera position to view the entire model
    const maxDimension = Math.max(Bounding_Box.max.x - Bounding_Box.min.x, Bounding_Box.max.y - Bounding_Box.min.y, Bounding_Box.max.z - Bounding_Box.min.z);
    const distance = maxDimension / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.z = distance;

    render();
    },
    
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );

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

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.update();

  render();

  window.addEventListener("resize", onWindowResize);
  document.getElementById("prev").addEventListener("click", function () {
    onClick(true);
  });
  document.getElementById("next").addEventListener("click", function () {
    onClick(false);
  });
}

/**
 * Render, or 'create a still image', of the scene
 */
function render() {
  renderer.render(scene, camera);
}

/**
 * Render when changing window size
 */
function onWindowResize() {
  camera.aspect = 600 / 500;
  camera.updateProjectionMatrix();
  controls.update();

  renderer.setSize(600 / 500);

  render();
}

/**
 * Render a new image onclick
 */
function onClick(isPrev) {
  // Get current modelID
  const modelIDInput = document.getElementById("model-id");
  let modelID = modelIDInput.value;

  // Get required modelID
  if (isPrev) {
    modelID = parseInt(modelID) - 1;
  } else modelID = parseInt(modelID) + 1;

  // If modelID goes outside the range of modelInfo => update it accordingly
  const lastModelID = modelInfo.length - 1;
  if (modelID < 0) modelID = lastModelID;
  if (modelID > lastModelID) modelID = 0;

  // Load canvas
  const modelPath = "/assets/models/" + modelInfo[modelID].path + "/scene.gltf";
  scene.remove(currentModel);
  loader.load(
    modelPath,
    function (gltf) {
      // Add model to the scene
      currentModel = gltf.scene;
      scene.add(gltf.scene);

      // Add info
      document.getElementById("model-content").innerHTML =
        modelInfo[modelID].info;

      camera.updateProjectionMatrix();
      controls.update();
      render();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );

  // Update modelID in input
  modelIDInput.value = modelID;
}
