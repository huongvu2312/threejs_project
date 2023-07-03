import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import modelInfo from "/assets/info.json" assert { type: "json" };

let scene;

init();

function init() {
  // Scene
  scene = new THREE.Scene();

  // Model
  const loader = new GLTFLoader();
  modelInfo.forEach((model) => {
    loader.load(
      "/assets/models/" + model.path + "/scene.gltf",
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  });
}
