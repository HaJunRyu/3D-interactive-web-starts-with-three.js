import * as THREE from 'three';
import { Scene } from 'three';

// const renderer = new THREE.WebGLRenderer();
// document.body.appendChild(renderer.domElement);

export default function example4() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // canvas를 고해상도 디바이스에 대응 (image 고해상도 대응과 같은 맥락)
  // 하지만 2배율을 초과하게 대응하면 성능상 손해가 크기 때문에 2배율로 많이쓴다고 함
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();

  const ASPECT = window.innerWidth / window.innerHeight;

  const camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red',
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', setSize);
}
