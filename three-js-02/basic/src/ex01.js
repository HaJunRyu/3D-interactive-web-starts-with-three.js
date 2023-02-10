import * as THREE from 'three';

// const renderer = new THREE.WebGLRenderer();
// document.body.appendChild(renderer.domElement);

export default function example() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const ASPECT = window.innerWidth / window.innerHeight;

  const camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 'red',
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.render(scene, camera);
}
