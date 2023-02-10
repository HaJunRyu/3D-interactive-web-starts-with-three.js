import * as THREE from 'three';
import { Scene } from 'three';

// const renderer = new THREE.WebGLRenderer();
// document.body.appendChild(renderer.domElement);

export default function example6() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // canvas를 고해상도 디바이스에 대응 (image 고해상도 대응과 같은 맥락)
  // 하지만 2배율을 초과하게 대응하면 성능상 손해가 크기 때문에 2배율로 많이쓴다고 함
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();

  const ASPECT = window.innerWidth / window.innerHeight;

  const camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
  // camera.position.x = 2;
  // camera.position.y = 2;
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

  const clock = new THREE.Clock();

  function draw() {
    // const time = clock.getElapsedTime();
    // delta값은 animationRequestFrame에 전달한 함수의 호출 간격 시간값이다.
    // elapsedTime과 같이 쓸 경우 값이 꼬여 예외케이스가 발생하니 둘 중 하나만 사용하도록 하자.
    const delta = clock.getDelta();
    // rotation에서 사용하는 각도는 Radian을 사용
    // Radian은 2파이를 360도 사용, 즉 6.28의 값이 360deg
    // mesh.rotation.y += 0.1;

    // css에서 사용하는 deg값을 Radian으로 변환해주는 함수를 제공
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y += delta * 2;
    mesh.position.y += delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    // window객체를 사용할 수 없을때 requestAnimationFrame함수와 같은 기능을 제공
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', setSize);

  draw();
}
