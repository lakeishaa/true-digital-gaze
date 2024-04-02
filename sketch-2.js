let embeddedSite;
let embeddedSite2;
let embeddedSite3; // New embedded site

var capture;
var tracker;
var w = 640,
  h = 480;
var canvasX, canvasY;

function setup() {
  createCanvas(800, 800); // Double the size of the canvas

  embeddedSite = createDiv(); // Create a div to hold the first embedded website
  embeddedSite.size(200, 200); // Set the size of the div to match the webcam frame
  embeddedSite.position(0, 0); // Position the div at the top-left corner

  // Load the first embedded website with the new size and circular frame
  embeddedSite.elt.innerHTML = `<iframe id="embeddedFrame" src="experiment-fisheye.html" width="200" height="200" style="border-radius: 50%; border: none;"></iframe>`;

  embeddedSite2 = createDiv(); // Create a div to hold the second embedded website
  embeddedSite2.size(200, 200); // Set the size of the second div to match the webcam frame
  embeddedSite2.position(0, 0); // Position the second div at the top-left corner

  // Load the second embedded website with the same styling, position, and size as the first one
  embeddedSite2.elt.innerHTML = `<iframe id="embeddedFrame2" src="https://lakeishaa.github.io/thesis/experiment-2/version-2/" width="200" height="200" style="border-radius: 50%; border: none;"></iframe>`;

  embeddedSite3 = createDiv(); // Create a div to hold the third embedded website
  embeddedSite3.size(200, 200); // Set the size of the div to match the webcam frame

  // Load the third embedded website with the same styling, position, and size as the first one
  embeddedSite3.elt.innerHTML = `<iframe id="embeddedFrame3" src="experiment-distort" width="200" height="200" style="border-radius: 50%; border: none;"></iframe>`;

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

    // Ensure mapped coordinates are within canvas boundaries
    xc = constrain(xc, 340, 460); // Same boundaries as Script 1
    ys = constrain(ys, 340, 460); // Same boundaries as Script 1

    // Adjust the position of the first embedded website to be on top of the iris
    embeddedSite.position(xc + 220, ys - 110); // Adjust position based on the half size of the embedded site

    // Adjust the position of the second embedded website to be on top of the iris
    embeddedSite2.position(xc + 220, ys - 116); // Adjust position based on the half size of the embedded site

    // Adjust the position of the third embedded website to be centered on the iris
    embeddedSite3.position(xc + 220, ys - 116); // Center the third embedded site on the iris

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

    // Display the first embedded website when angle is between 270 and 300 degrees
    if (angle >= 270 && angle <= 300) {
      embeddedSite.show(); // Show the first embedded website
      embeddedSite2.hide(); // Hide the second embedded website
      embeddedSite3.hide(); // Hide the third embedded website
    } else if (angle >= 100 && angle <= 140) {
      embeddedSite.hide(); // Hide the first embedded website
      embeddedSite2.show(); // Show the second embedded website
      embeddedSite3.hide(); // Hide the third embedded website
    } else if (angle >= 190 && angle <= 240) {
      embeddedSite.hide(); // Hide the first embedded website
      embeddedSite2.hide(); // Hide the second embedded website
      embeddedSite3.show(); // Show the third embedded website
    } else {
      embeddedSite.hide(); // Hide the first embedded website
      embeddedSite2.hide(); // Hide the second embedded website
      embeddedSite3.hide(); // Hide the third embedded website
    }
  }
}
