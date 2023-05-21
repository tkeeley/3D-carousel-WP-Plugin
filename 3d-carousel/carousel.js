// Get screen width
var screenWidth = window.innerWidth || document.documentElement.clientWidth;

// Set default variable values
var radius = 500,
    autoRotate = true,
    rotateSpeed = -60,
    imgWidth = 220,
    imgHeight = 270;

// Change variable values for mobile screens
if (screenWidth < 600) {
  radius = 200;
  autoRotate = true;
  rotateSpeed = -60;
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

    for (var t = 0; t < aEle.length; t++) aEle[t].style.transform = "rotateY(" + t * (360 / aEle.length) + "deg) translateZ(" + radius + "px)", aEle[t].style.transition = "transform 1s", aEle[t].style.transitionDelay = e || (aEle.length - t) / 4 + "s"

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

    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`

}



function mobilecheck() {

    var e, t = !1;

    return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t

}
mobilecheck() ? document.ontouchstart = function(e) {

    clearInterval(obox.timer);

    var t = (e = e || window.event).touches[0].clientX,

        o = e.touches[0].clientY;

    this.ontouchmove = function(e) {

        var i = (e = e || window.event).touches[0].clientX,

            n = e.touches[0].clientY;

        tX += .1 * (desX = i - t), tY += .1 * (desY = n - o), applyTranform(obox), t = i, o = n

    }, this.ontouchend = function(e) {

        this.ontouchmove = this.ontouchend = null, obox.timer = setInterval(function() {

            tX += .1 * (desX *= .95), tY += .1 * (desY *= .95), applyTranform(obox), playSpin(!1), Math.abs(desX) < .5 && Math.abs(desY) < .5 && (clearInterval(obox.timer), playSpin(!0))

        }, 17)

    }

} : (document.onmousedown = function(e) {

    clearInterval(obox.timer);

    var t = (e = e || window.event).clientX,

        o = e.clientY;

    return this.onmousemove = function(e) {

        var i = (e = e || window.event).clientX,

            n = e.clientY;

        tX += .1 * (desX = i - t), tY += .1 * (desY = n - o), applyTranform(obox), t = i, o = n

    }, this.onmouseup = function(e) {

        this.onmousemove = this.onmouseup = null, obox.timer = setInterval(function() {

            tX += .1 * (desX *= .95), tY += .1 * (desY *= .95), applyTranform(obox), playSpin(!1), Math.abs(desX) < .5 && Math.abs(desY) < .5 && (clearInterval(obox.timer), playSpin(!0))

        }, 13)

    }, !1

}, document.onmousewheel = function(e) {

    var t = (e = e || window.event).wheelDelta / 20 || -e.detail;

    radius += t, init(1)

});