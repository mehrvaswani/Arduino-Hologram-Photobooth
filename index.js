let serial;
let portName = '/dev/tty.usbmodem11301';
let inData;
var capture;
var now;
var before;
var output;
var threshold = 0.0001;
var img;
var count = 0;
var imgcount = 0;

// var video = document.querySelector('video');
// navigator.mediaDevices.getUserMedia({ video: true }).then(function (mediaStream) {
//     window.stream = mediaStream;
//     video.src = URL.createObjectURL(mediaStream);
//     video.play();
// });

function preload() {
    img = loadImage('layer.png');
}

function setup() {
    serial = new p5.SerialPort('192.168.1.21');
    serial.on('data', serialEvent);
    serial.open(portName);

    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    // capture.elt.setAttribute('playsinline', '');
    capture.loadPixels();
    capture.hide();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function serialEvent() {
    inData = serial.read();

    if (inData === 66) {
        count++;
        console.log(inData);
    } else if (inData === 65) {
        saveImage();
        console.log(inData);
    }
}

function draw() {
    now = createImage(capture.width / 2, capture.height / 2);
    now.copy(capture, 0, 0, capture.width, capture.height,
        0, 0, capture.width / 2, capture.height / 2);
    now.filter('invert', [2]);
    output = createImage(now.width, now.height);
    if (typeof before !== 'undefined') {
        now.loadPixels();
        before.loadPixels();
        output.loadPixels();

        for (var x = 0; x < now.width; x += 1) {
            for (var y = 0; y < now.height; y += 1) {
                var index = (x + (y * now.width)) * 4;
                var r_now = now.pixels[index + 0];
                var r_before = before.pixels[index + 0];
                var r_dist = Math.abs(r_now - r_before);
                var r = random(2, -2)
                if (count === 1 || count === 2) {
                    if (inData <= 100) {
                        output.pixels[index + 0] = 4.4 * r_dist;
                        output.pixels[index + 1] = 6 * r_dist;
                        output.pixels[index + 2] = r_now;
                    } else if (inData > 100) {
                        output.pixels[index + 0] = r_now - 50;
                        output.pixels[index + 1] = 12 * r_dist;
                        output.pixels[index + 2] = 6 * r_dist;
                    }
                } else if (count === 3 || count === 4) {
                    if (inData <= 100) {
                        output.pixels[index + 0] = 4.4 * r_dist;
                        output.pixels[index + 1] = r_now;
                        output.pixels[index + 2] = 6 * r_now;
                    } else if (inData > 100) {
                        output.pixels[index + 0] = 12 * r_dist;
                        output.pixels[index + 1] = r_now - 50;
                        output.pixels[index + 2] = 6 * r_dist;
                    }
                } else if (count === 5 || count === 6) {
                    if (inData <= 100) {
                        output.pixels[index + 0] = 6 * r_dist;
                        output.pixels[index + 1] = 4.4 * r_dist; //2
                        output.pixels[index + 2] = r_now;
                    } else if (inData > 100) {
                        output.pixels[index + 0] = 12 * r_dist;
                        output.pixels[index + 1] = 6 * r_dist;
                        output.pixels[index + 2] = r_now - 50;
                    }
                } else {
                    if (r >= 0) {
                        output.pixels[index + 0] = 6 * r_dist;
                        output.pixels[index + 1] = 4.4 * r_dist;
                        output.pixels[index + 2] = r_now;
                    } else {
                        output.pixels[index + 0] = r_now;
                        output.pixels[index + 1] = 6 * r_dist;
                        output.pixels[index + 2] = 3 * r_dist;
                    }
                    count = 0;
                }

                output.pixels[index + 3] = 255;
            }
        }
        output.updatePixels();
    }

    output.filter(POSTERIZE, 2);

    push();

    var center_area = 300;
    var center_dist = center_area / 2 + now.height / 2;

    imageMode(CENTER);
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(PI / 2);

    push();

    before = createImage(now.width, now.height);
    before.copy(now, 0, 0, now.width, now.height,
        0, 0, capture.width / 2, capture.height / 2); ///width = 256

    image(output, 0, -center_dist);
    image(img, 0, -center_dist, now.width + 250, now.height); //mask

    push();
    rotate(-PI / 2);
    image(output, 0, -center_dist);
    image(img, 0, -center_dist, now.width + 250, now.height); //mask
    pop();

    push();
    rotate(PI);
    image(output, 0, -center_dist);
    image(img, 0, -center_dist, now.width + 250, now.height); //mask
    pop();

    push();
    rotate(PI / 2);
    image(output, 0, -center_dist);
    image(img, 0, -center_dist, now.width + 250, now.height); //mask
    pop();
}

function saveImage() {
    save(output, `${imgcount}.jpeg`);
    imgcount++;
    uploadImage();
}

function uploadImage() {
    var link = document.createElement("a");
    var linkText = document.createTextNode(`image${imgcount}`);
    link.appendChild(linkText);
    link.href = `https://storage.googleapis.com/cs5041-9dcef.appspot.com/${imgcount}.jpeg`;
    document.getElementById("href").appendChild(link);
}