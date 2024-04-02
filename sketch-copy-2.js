let embeddedSite;

var capture;
var tracker;
var w = 640,
  h = 480;
var canvasX, canvasY;

function setup() {
  createCanvas(800, 800); // Double the size of the canvas

  embeddedSite = createDiv(); // Create a div to hold the embedded website
  embeddedSite.size(200, 200); // Set the size of the div
  embeddedSite.position(0, 0); // Position the div at the top-left corner

  // Load the embedded website
  embeddedSite.elt.innerHTML = `<iframe id="embeddedFrame" src="experiment-fisheye.html" width="400" height="400"></iframe>`;

  canvasX = (windowWidth - width) / 2; // Calculate canvas X position
  canvasY = (windowHeight - height) / 2; // Calculate canvas Y position

  createCanvas(800, 800).position(canvasX, canvasY); // Set canvas position

  capture = createCapture(
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
  capture.elt.setAttribute("playsinline", "");
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  var positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    // Get the position of the iris
    let xc = map(positions[62][0], 0, w, 0, width); // Map the x-coordinate
    let ys = map(positions[62][1], 0, h, 0, height); // Map the y-coordinate

    // Adjust the position of the embedded website to be on top of the iris
    embeddedSite.position(
      xc - embeddedSite.width / 2,
      ys - embeddedSite.height
    );

    background(255); // Set the background color to grey

    // Drop shadow for the white circle
    noStroke();
    fill(0, 50); // Set the shadow color and transparency
    ellipse(width / 2 + 10, height / 2 + 10, 400); // Draw the shadow with an offset

    // Whites of the eye
    strokeWeight(1);
    stroke(0);
    fill(255);
    ellipse(width / 2, height / 2, 400); // Draw the white circle

    // Iris
    fill(0, 0, 10, 1);
    circle(xc, ys, 200); // Double the size

    // Draw webcam frame at the position of the iris
    blendMode(OVERLAY);
    tint(255, 100); // Set the transparency (100 = semi-transparent)

    let frameSize = 200; // Size of the webcam frame
    let frameX = xc - frameSize / 2; // X position of the frame
    let frameY = ys - frameSize / 2; // Y position of the frame
    image(capture, frameX, frameY, frameSize, frameSize);

    // Reset blend mode for subsequent drawings
    blendMode(BLEND);

    // Glare
    fill(255);
    noStroke();
    ellipse(xc + 40, ys - 40, 40); // Draw the glare circle

    // Calculate angle between mouse and center of the canvas
    let centerX = width / 2;
    let centerY = height / 2;
    let angle = atan2(mouseY - centerY, mouseX - centerX);
    angle = degrees(angle); // Convert radians to degrees
    angle = (angle + 360) % 360; // Ensure angle is within 0 to 360 degrees
    console.log("Angle:", angle);

    // Display the embedded website when angle is between 270 and 300 degrees
    if (angle >= 270 && angle <= 300) {
      embeddedSite.show(); // Show the embedded website
    } else {
      embeddedSite.hide(); // Hide the embedded website
    }
  }
}
