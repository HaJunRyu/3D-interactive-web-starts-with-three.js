import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Canvas Texture
  const texCanvas = document.createElement('canvas');
  const texContext = texCanvas.getContext('2d');
  texCanvas.width = 500;
  texCanvas.height = 500;
  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // light의 영향을 받지 않는 material이다. (성능이 좋다.)
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    material.map.needsUpdate = true;

    texContext.fillStyle = 'green';
    texContext.fillRect(0, 0, 500, 500);
    texContext.fillStyle = 'white';
    texContext.fillRect(time * 50, 100, 50, 50);
    texContext.font = 'bold 100px sans-serif';
    texContext.fillText('zzz', 200, 200);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
