import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera POsition
camera.position.set(0, 30, 30); 
camera.lookAt(0, 0, 0); 

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 

// Ground
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Forest green color
const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Roads
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Road color

// Horizontal Road
const road1 = new THREE.Mesh(new THREE.PlaneGeometry(30, 2), roadMaterial);
road1.rotation.x = -Math.PI / 2;
scene.add(road1);

// Vertical Road
const road2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 30), roadMaterial);
road2.rotation.x = -Math.PI / 2;
scene.add(road2);

// Buildings
const buildingMaterial1 = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const buildingMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const building1 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), buildingMaterial1);
building1.position.set(-7, 1.5, -5);
scene.add(building1);

const building2 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), buildingMaterial1);
building2.position.set(7, 1.5, -5);
scene.add(building2);

const building3 = new THREE.Mesh(new THREE.BoxGeometry(6, 2, 2), buildingMaterial2);
building3.position.set(-6, 1, 11);
scene.add(building3);

// 
const building4 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 6), buildingMaterial2);
building4.position.set(3, 1, 8); 
scene.add(building4);

//  (Sphere)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), sphereMaterial);
sphere.position.set(-15, 0.5, 0);
scene.add(sphere);

// Animation with GSAP
gsap.to(sphere.position, {
  x: 15,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

// Resize Handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); 
  renderer.render(scene, camera);
}
animate();
