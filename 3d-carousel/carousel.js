// Get screen width
var screenWidth = window.innerWidth || document.documentElement.clientWidth;

// Set default variable values
var radius = 500,
    autoRotate = true,
    rotateSpeed = 60,
    imgWidth = 220,
    imgHeight = 270;

// Change variable values for mobile screens
if (screenWidth < 600) {
  radius = 200;
  autoRotate = true;
  rotateSpeed = 60;
  imgWidth = 100;
  imgHeight = 150;
}


setTimeout(init, 100);

var obox = document.getElementById("carousel-container"),

    ospin = document.getElementById("spin-container"),

    aImg = ospin.getElementsByTagName("img"),

    aEle = [...aImg];

ospin.style.width = imgWidth + "px", ospin.style.height = imgHeight + "px";

var ground = document.getElementById("ground");



function init(e) {
  for (var t = 0; t < aEle.length; t++) {
    aEle[t].style.transform = "rotateY(" + (aEle.length - t) * (360 / aEle.length) + "deg) translateZ(" + radius + "px)";
    aEle[t].style.transition = "transform 1s";
    aEle[t].style.transitionDelay = e || (aEle.length - t) / 4 + "s";
  }
}



/*function applyTranform(e) {

    tY > 180 && (tY = 180), tY < 0 && (tY = 0), e.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)"

}*/



function playSpin(e) {

    ospin.style.animationPlayState = e ? "running" : "paused"

}

ground.style.width = 3 * radius + "px", ground.style.height = 3 * radius + "px";

var sX, sY, nX, nY, desX = 0,

    desY = 0,

    tX = 0,

    tY = 10;

if (autoRotate) {
  var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}
