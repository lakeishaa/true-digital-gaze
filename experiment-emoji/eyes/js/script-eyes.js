var capture;
var tracker;
var w = 640;
var h = 480;
var captures = [];
var frameRates = [1, 40, 5, 20]; // Set different frame rates for each capture

function setup() {
  createCanvas(w * 2, h * 2);
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      let xoffset = x * w;
      let yoffset = y * h;
      let newCapture = createCapture(
        {
          audio: false,
          video: {
            width: w,
            height: h,
          },
        },
        function () {
          console.log("capture ready.");
        }
      );
      newCapture.elt.setAttribute("playsinline", "");
      newCapture.size(w, h);
      newCapture.hide();
      captures.push(newCapture);
    }
  }

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();

  for (let i = 0; i < captures.length; i++) {
    tracker.start(captures[i].elt);
  }
}

function draw() {
  background(0);

  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      let captureIndex = x + y * 2;
      image(captures[captureIndex], x * w, y * h, w, h);
      var positions = tracker.getCurrentPosition(captures[captureIndex].elt);

      if (positions.length > 0) {
        var leftEyeX = positions[31][0];
        var leftEyeY = positions[32][1];

        var zoomWidth = w / 7;
        var zoomHeight = h / 7;
        var zoomX = leftEyeX - zoomWidth / 2;
        var zoomY = leftEyeY - zoomHeight / 2;

        image(
          captures[captureIndex],
          x * w,
          y * h,
          w,
          h,
          zoomX,
          zoomY,
          zoomWidth,
          zoomHeight
        );

        captures[captureIndex].elt.style.filter = "invert(1)";
      }
    }
  }
}
