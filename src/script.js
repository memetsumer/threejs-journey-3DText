import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const material = new THREE.MeshNormalMaterial();

// Fonts
const fontLoader = new FontLoader();
fontLoader.load("/fonts/koulen_regular.json", (font) => {
  const textGeometry = new TextGeometry(
    "Learning three.js",
    {
      font: font,
      size: 0.7,
      height: 0.2,
      curveSegments: 20,
      bevelEnabled: 6,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }
  );

  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// });
const donutGeometry = new THREE.TorusBufferGeometry(1, 0.3, 16, 100);
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

let count = 600;

for (let i = 0; i < count; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);

  donut.position.x = (Math.random() - 0.5) * 100;
  donut.position.y = (Math.random() - 0.5) * 100;
  donut.position.z = (Math.random() - 0.5) * 100;

  donut.rotation.x = Math.random() * 2 * Math.PI;
  donut.rotation.y = Math.random() * 2 * Math.PI;
  donut.rotation.z = Math.random() * 2 * Math.PI;

  const randomScale = Math.random();

  donut.scale.set(randomScale, randomScale, randomScale);

  scene.add(donut);
}

for (let i = 0; i < count; i++) {
  const box = new THREE.Mesh(boxGeometry, material);

  box.position.x = (Math.random() - 0.5) * 100;
  box.position.y = (Math.random() - 0.5) * 100;
  box.position.z = (Math.random() - 0.5) * 100;

  box.rotation.x = Math.random() * 2 * Math.PI;
  box.rotation.y = Math.random() * 2 * Math.PI;
  box.rotation.z = Math.random() * 2 * Math.PI;

  const randomScale = Math.random();

  box.scale.set(randomScale, randomScale, randomScale);

  scene.add(box);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
// a good blue color
renderer.setClearColor(0x858ae3, 1);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
