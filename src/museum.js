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
  const container = document.getElementById("container");
  const modelContainer = document.createElement("div");
  modelContainer.style.width = "600px";
  modelContainer.style.height = "500px";
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
  const fov = 50; // AKA Field of View
  const aspect = window.innerWidth / window.innerHeight;
  const near = 1; // the near clipping plane
  const far = 1000; // the far clipping plane

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
  renderer.setSize(600, 500);

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
  camera.aspect = 600 / 500;
  camera.updateProjectionMatrix();

  renderer.setSize(600, 500);

  render();
}

// Render, or 'create a still image', of the scene
function render() {
  renderer.render(scene, camera);
}
