import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

// Load textures
const cubeTexture = textureLoader.load('textures/Stylized_Wood_Floor_001_basecolor.png');
const sphereTexture = textureLoader.load('textures/Stylized_Wood_Floor_001_height.png');

// Cube
const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
cube.position.x = -1.5; // Position the cube to the left
scene.add(cube);

// Sphere
const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), sphereMaterial);
sphere.position.x = 1.5; // Position the sphere to the right
scene.add(sphere);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    sphere.rotation.y += 0.01; // Rotate the sphere for consistency
    renderer.render(scene, camera);
}
animate();
