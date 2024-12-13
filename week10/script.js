import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
scene.add(ambientLight);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.5;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff6347 }) 
);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ color: 0xfff370 }) 
);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x32cd32 }) 
);

const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
    new THREE.MeshStandardMaterial({ color: 0x9370db }) 
);

cube.position.set(-1, 0.1, -1);
sphere.position.set(1.5, 0.14, 0);
cylinder.position.set(0, 0.34, 1);
plane.position.set(0, -0.5, 0);
plane.rotation.x = -Math.PI * 0.5;


sphere.castShadow = true;
sphere.receiveShadow = true;
cube.castShadow = true;
cube.receiveShadow = true;
cylinder.castShadow = true;
cylinder.receiveShadow = true;
plane.receiveShadow = true;

scene.add(sphere);
scene.add(plane);
scene.add(cube);
scene.add(cylinder);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

const sizes = {
    width: 800,
    height: 600
};

const spotLight = new THREE.SpotLight(0xffffff, 3, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(-2, 3, 2);

scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(3, 3, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

scene.fog = new THREE.FogExp2(0x262837, 0.1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
