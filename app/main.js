var video = document.getElementById('video')
var startbutton = document.getElementById('startbutton')
var canvas = document.getElementById('canvas')
var photo = document.getElementsByClassName('photo')
var width = 480;
var height = 270;
var scale = 2;

startbutton.addEventListener('click', function (ev) {
    takepicture();
    ev.preventDefault();
}, false);

function takepicture() {
    var context = canvas.getContext('2d');
    canvas.width = width * scale;
    canvas.height = height * scale;
    context.drawImage(video, 0, 0, width * scale, height * scale);
    var data = canvas.toDataURL('image/png');
    for (var i = 0; i < photo.length; i++) {
        photo[i].src = data;
        photo[i].width = width/2;
        photo[i].height = height/2;
    }

}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: false, video: { width: width * scale, height: height * scale } },
        function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream;
            console.log(stream);
            video.onloadedmetadata = function (e) {
                video.play();
            };
        },
        function (err) {
            console.log("The following error occurred: " + err.name);
        }
    );
} else {
    console.log("getUserMedia not supported");

}