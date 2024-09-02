import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import starTexture from '/images/stars.jpg';
import sunTexture from '/images/sun.jpg';
import mercuryTexture from '/images/mercury.jpg';
import venusTexture from '/images/venus.webp';
import earthTexture from '/images/earth.jpg';
import marsTexture from '/images/mars.jpg';
import jupiterTexture from '/images/jupiter.jpg';
import saturnTexture from '/images/saturn.jpg';
import saturn_rings from '/images/saturn ring.png';
import uranusTexture from '/images/uranus.jpg';
import neptuneTexture from '/images/neptune.jpg';
//Adding renderer and setting up its width and height
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Setting up Scene, Camera and Orbit-Controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const axisHelper = new THREE.AxesHelper(10);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(400, 0, -50);
controls.update();

//Setting up Background
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture
]);
scene.background = texture;

const txtLoader = new THREE.TextureLoader();

//function to create Planets 
function createPlanet(size, texture, x, y, z, rings) {
    const txt = txtLoader.load(texture);
    const Geo = new THREE.SphereGeometry(size, 45, 45,);
    const Mat = new THREE.MeshBasicMaterial({
        map: txt,
    });
    const Mesh = new THREE.Mesh(Geo, Mat);
    const Obj = new THREE.Object3D();
    Obj.add(Mesh);
    if (rings) {
        const ringTxt = new txtLoader.load(rings);
        const ringGeo = new THREE.RingGeometry(18, 29, 45);
        const ringMat = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: ringTxt
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        Obj.add(ring);
        ring.position.set(x, y, z);
    }
    Mesh.position.set(x, y, z);
    return { Mesh, Obj };
}
//Making Sun
const sunText = txtLoader.load(sunTexture);
const sunGeo = new THREE.SphereGeometry(100, 45, 45);
const sunMat = new THREE.MeshBasicMaterial({
    // color: 0xffff00,
    map: sunText,
});
const sun =new THREE.Mesh(sunGeo, sunMat);

//Making Mercury
const mercury = createPlanet(3, mercuryTexture, 150, 0, 0); 

//Making Venus
const venus = createPlanet(9, venusTexture, 200, 0, 0);

//Making Earth
const earth = createPlanet(10, earthTexture, 250, 0, 0);

//Making Mars
const mars = createPlanet(8, marsTexture, 300, 0, 0);

//Making Jupiter
const jupiter = createPlanet(16, jupiterTexture, 350, 0, 0);

//Making Saturn
// const saturn = createPlanet(14, saturnTexture, 400, 0, 0, saturn_rings);

// //Making Uranus
const uranus = createPlanet(13, uranusTexture, 450, 0, 0);

// //Making Neptune
const neptune = createPlanet(12, neptuneTexture, 500, 0, 0);

//Adding components to scene
scene.add(sun);
scene.add(mercury.Obj);
scene.add(venus.Obj);
scene.add(earth.Obj);
scene.add(mars.Obj);
scene.add(jupiter.Obj);
scene.add(axisHelper);
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});














