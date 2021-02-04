const body = document.querySelector("body");

const IMG_CNT = 8;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `images/img${imgNumber+1}.jpg`;
  image.classList.add("bgImage");   // 크기 조절 등의 디자인 변경을 위해 bgImage라는 class에 넣어줌
  body.appendChild(image);
}

function genRandom(){
  const number = Math.floor(Math.random()*IMG_CNT);
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
