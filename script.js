// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);

// scene.background = null;

// const renderer = new THREE.WebGLRenderer({alpha: true});
// renderer.setSize(300,300);
// document.querySelector('#rotate-model').appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({color: 'blueviolet'});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 2;

// function ScrollCubeRotate() {
//   let scrollY = window.scrollY;
//   cube.rotation.y = scrollY / 360;
// }
// ScrollCubeRotate();

// function animate() {
//     requestAnimationFrame(animate);
//   ScrollCubeRotate();
//   renderer.render(scene, camera);
// }
// animate();

let imgsLen = 19,
    imgsPath = 'img/',
    el = document.querySelector('#rotate-model'),
    imgs = false, imgsCur = 0, step =0.3;

function CreatImages() {
  for(let i = 0; i < imgsLen; i++) {
    el.insertAdjacentHTML('beforeend', `<img src="${imgsPath}${i+1}.png"/>`);
  }
  imgs = el.querySelectorAll('img');
  RotateScroll();
};
CreatImages();

function RotateScroll() {
  imgs[imgsCur].style.display = 'block';
  window.addEventListener('scroll', function(e) {
    let a = Math.floor((window.scrollY / imgsLen) * step),
        i = a >= imgsLen ? a - (imgsLen * Math.floor(a / imgsLen)) : a;
    if(imgsCur !== i) {
      imgs[imgsCur].style.display = '';
      imgs[i].style.display = 'block';
      imgsCur = i;
    }
  });
}