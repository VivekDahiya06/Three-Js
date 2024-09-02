import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/*Setting up renderer */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const axisHelper = new THREE.AxesHelper(50);
const gridHelper =new THREE.GridHelper(1000,50)
const hemLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500,1);
const hemLight_Helper = new THREE.HemisphereLightHelper(hemLight, 1);
hemLight.position.set(8, 0, 8);
camera.position.set(25, 15, 25);
controls.update();

const cubeGeo = new THREE.IcosahedronGeometry(2,3);
const cubeMat = new THREE.MeshStandardMaterial({
  wireframe: false,
  flatShading: true
});
const cube = new THREE.Mesh(cubeGeo, cubeMat);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
})
const wire_mesh = new THREE.Mesh(cubeGeo, wireMat);
wire_mesh.scale.setScalar(1.001);
cube.add(wire_mesh);

scene.add(cube);
scene.add(axisHelper);
scene.add(hemLight);
scene.add(hemLight_Helper);
scene.add(gridHelper);
const animate = () => {
  // cube.rotateX((Math.PI / 180) * 0.5);
  cube.rotateY((Math.PI / 180) * 0.5);
  // cube.rotateZ((Math.PI / 180) * 0.5);
  cube.position.set(0,10 * Math.sin(Date.now()/1000),0);
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});