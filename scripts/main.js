import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//setting up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const axesHelper = new THREE.AxesHelper(10);

const gridHelper = new THREE.GridHelper(20,100);

const orbit = new OrbitControls(camera, renderer.domElement);

const gui = new dat.GUI();

const option = {
  SphereColor: '#ff0faf',
  BoxColor: '#ff0000',
  SphereWireframe: true,
  BoxWireframe: true,
  PlaneColor: "#ffffff",
}

camera.position.set(3, 1, 10);
orbit.update();
// making a box object
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial =new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: false,
})
const box = new THREE.Mesh(boxGeometry, boxMaterial);

//making a sphere object
const sphereGeomatery = new THREE.SphereGeometry(2,45,45);
const sphereMaterial =new THREE.MeshBasicMaterial({
  color: 0xff0100,
  wireframe: true,
  // position: new THREE.Vector3(5,1,3)
})
const sphere = new THREE.Mesh(sphereGeomatery, sphereMaterial);

//Making a plane object
const planeGeometry = new THREE.PlaneGeometry(20,20);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(-1.5708)

//Adding gui to the page
gui.addColor(option, 'BoxColor').onChange((e) => {
  box.material.color.set(e);
})
gui.addColor(option, 'SphereColor').onChange((e) => {
  sphere.material.color.set(e);
})
gui.addColor(option, 'PlaneColor').onChange((e) => {
  plane.material.color.set(e);
})
gui.add(option, 'SphereWireframe').onChange((e) => {
  sphere.material.wireframe = e;
})
gui.add(option, 'BoxWireframe').onChange((e) => {
  box.material.wireframe = e;
})

//Adding objects to the scene
scene.add(box);
scene.add(sphere);
scene.add(plane);
scene.add(axesHelper);
scene.add(gridHelper);

const animate = () => {
  box.rotation.x += 0.008;
  box.rotation.y += 0.008;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});