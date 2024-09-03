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

/**
 * вращение модели
 */
let imgsLen = 19,
  imgsPath = "img/",
  el = document.querySelector("#rotate-model"),
  imgs = false,
  imgsCur = 0,
  step = 0.3;

function CreatImages() {
  for (let i = 0; i < imgsLen; i++) {
    el.insertAdjacentHTML("beforeend", `<img src="${imgsPath}${i + 1}.png"/>`);
  }
  imgs = el.querySelectorAll("img");
  RotateScroll();
}
// CreatImages();

function RotateScroll() {
  imgs[imgsCur].style.display = "block";
  window.addEventListener("scroll", function (e) {
    let a = Math.floor((window.scrollY / imgsLen) * step),
      i = a >= imgsLen ? a - imgsLen * Math.floor(a / imgsLen) : a;
    if (imgsCur !== i) {
      imgs[imgsCur].style.display = "";
      imgs[i].style.display = "block";
      imgsCur = i;
    }
  });
}
/**----------------------------------------------------------------------------- */

/**
 * play и stop видео при скролле
 */

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const video = entry.target;
        let videoStatus = "paused";
        const playPauseControl = video.nextElementSibling;
        const playPauseImg = playPauseControl.querySelector("img");

        if (entry.isIntersecting) {
          video.play();
          playPauseImg.src = "img/pause.svg";
          videoStatus = "playing";
        } else {
          video.pause();
          // video.currentTime = 0;
          playPauseImg.src = "img/play.svg";
          videoStatus = "paused";
        }
        playPauseControl.addEventListener("click", () => {
          if (videoStatus === "playing") {
            video.pause();
            playPauseImg.src = "img/play.svg";
            videoStatus = "paused";
          } else {
            video.play();
            playPauseImg.src = "img/pause.svg";
            videoStatus = "playing";
          }
        });
        setupVideoProgressCircle(video);
      });
    },
    {
      threshold: 0.3, // Trigger when 50% of the video is visible
    }
  );

  videos.forEach((video) => {
    observer.observe(video);
  });
});

function setupVideoProgressCircle(video) {
  const circle = video.nextElementSibling.querySelector(".progress-circle");
  const circumference = 2 * Math.PI * 45; // Радиус круга 45

  // video.addEventListener("timeupdate", function () {
  //   const percent = video.currentTime / video.duration;
  //   const offset = circumference - percent * circumference;
  //   circle.style.strokeDashoffset = offset;
  // });

  let lastPercent = 0;
  let isInitialLoad = true;

  video.addEventListener("timeupdate", function () {
    const percent = video.currentTime / video.duration;

    if (isInitialLoad) {
      isInitialLoad = false;
      circle.style.transition = "none";
    } else if (percent >= lastPercent) {
      circle.style.transition = "stroke-dashoffset 0.3s ease";
    } else {
      circle.style.transition = "none";
    }

    const offset = (1 - percent) * circumference;
    circle.style.strokeDashoffset = offset;

    lastPercent = percent;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('myVideo');
  const scrollStep = 0.4; 

  window.addEventListener('wheel', function(event) {
      if (event.deltaY > 0) {
          // Скролл вниз - перемотка вперед
          video.currentTime += scrollStep;
      } else {
          // Скролл вверх - перемотка назад
          video.currentTime -= scrollStep;
      }
  }, { passive: false });
});


// document.addEventListener('DOMContentLoaded', function() {
//   const video = document.getElementById('myVideo');
//   const scrollStep = 0.4; 
//   let isDragging = false;

//   // Обработчик для колесика мыши
//   window.addEventListener('wheel', function(event) {
//     if (event.deltaY > 0) {
//       // Скролл вниз - перемотка вперед
//       video.currentTime += scrollStep;
//     } else {
//       // Скролл вверх - перемотка назад
//       video.currentTime -= scrollStep;
//     }
//   }, { passive: false });

//   // Обработчики для перетаскивания бегунка
//   window.addEventListener('mousedown', function() {
//     isDragging = true;
//   });

//   window.addEventListener('mousemove', function() {
//     if (isDragging) {
//       console.log(111);
//       const scrollTop = window.scrollY || document.documentElement.scrollTop;
//       const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
//       const scrollFraction = scrollTop / maxScrollTop;
//       const videoDuration = video.duration;

//       video.currentTime = videoDuration * scrollFraction;
//     }
//   });

//   window.addEventListener('mouseup', function() {
//     isDragging = false;
//   });
// });



// document.addEventListener('DOMContentLoaded', function() {
//   const video = document.getElementById('myVideo');
//   const scrollStep = 0.5; // Шаг перемотки

//   window.addEventListener('wheel', function(event) {
//     // event.preventDefault();
//     if (event.deltaY > 0) {
//       // Скролл вниз - перемотка вперед
//       video.currentTime = Math.min(video.currentTime + scrollStep, video.duration);
//     } else {
//       // Скролл вверх - перемотка назад
//       video.currentTime = Math.max(video.currentTime - scrollStep, 0);
//     }
//   }, { passive: false });

//   // window.addEventListener('scroll', function() {
//   //   const scrollPosition = window.scrollY;
//   //   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//   //   const videoPosition = (scrollPosition / maxScroll) * video.duration;
//   //   video.currentTime = videoPosition;
//   // });
// });