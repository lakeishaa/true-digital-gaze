var capture;
var tracker;
var w = 640,
  h = 480;
var canvasX, canvasY;
let numCircles = 6; // Number of circles in the ring
let radius = 250; // Radius of the ring
let centerX, centerY; // Center of the canvas

// let urls = [
//   "https://www.google.com",
//   "https://www.yahoo.com",
//   "https://www.youtube.com",
//   "https://www.wikipedia.com",
//   "https://www.example.com",
// ];

let urls = [
  "experiment-fisheye.html",
  "experiment-scan.html",
  "experiment-distort/index.html",
  "experiment-screen/index.html",
  // "https://editor.p5js.org/lakeishaa/full/TkAX6AHmQ",
  // "https://lakeishaa.github.io/thesis/expxeriment-2/version-2/",
  "experiment-emoji/index.html",
  "experiment-letters/index.html",
];

function openModal(url) {
  var modal = document.getElementById("myModal");
  var modalFrame = document.getElementById("modalFrame");

  modal.style.display = "block"; // Display the modal

  // Set the iframe source to the URL
  modalFrame.src = url;

  console.log("Opening modal with URL:", url);
}

function setup() {
  createCanvas(800, 800); // Double the size of the canvas

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

  centerX = width / 2;
  centerY = height / 2;
}

let hoveredCircle = -1; // Index of the circle being hovered, initialized to -1

function draw() {
  var positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
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
    let xc = constrain(map(positions[62][0], 0, w, width, 0), 340, 460); // Adjust the mapping and constrain
    let xs = constrain(map(positions[62][1], 0, h, 0, height), 340, 460); // Adjust the mapping and constrain
    fill(0, 0, 10, 0.95); // Adjust the alpha value (0.5 = 50% transparency)
    circle(xc, xs, 200); // Double the size

    // Draw webcam frame at the position of the iris
    blendMode(OVERLAY);
    // tint(255, 55); // Set the transparency (100 = semi-transparent)

    let frameSize = 200; // Size of the webcam frame
    let frameX = xc - frameSize / 2; // X position of the frame
    let frameY = xs - frameSize / 2; // Y position of the frame
    image(capture, frameX, frameY, frameSize, frameSize);

    // Reset blend mode for subsequent drawings
    blendMode(BLEND);

    // Glare
    fill(255);
    noStroke();
    ellipse(xc + 40, xs - 40, 40); // Draw the glare circle

    // Draw circles in a loop
    for (let i = 0; i < numCircles; i++) {
      // Calculate the angle for this circle
      let angle = i * (TWO_PI / numCircles);
      strokeWeight(1);
      stroke(000000);
      if (hoveredCircle === i) {
        fill("black"); // Change color to red when hovered
      } else {
        fill("white"); // Otherwise, keep it black
      }

      // Calculate the position of the circle
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;

      // Draw the circle
      ellipse(x, y, 20, 20);
    }
  }
}

function mouseMoved() {
  // Check if mouse is inside any circle
  hoveredCircle = -1; // Reset the hovered circle index
  for (let i = 0; i < numCircles; i++) {
    // Calculate the angle for this circle
    let angle = i * (TWO_PI / numCircles);
    // Calculate the position of the circle
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    // Check if mouse is inside this circle
    let d = dist(mouseX, mouseY, x, y);
    if (d < 10) {
      // Radius of the circle is 10 (diameter 20)
      // Log which circle is being hovered
      hoveredCircle = i;
      return false; // Prevent default action of the mouseMoved event
    }
  }
}

function mousePressed() {
  // Check if mouse is inside any circle
  for (let i = 0; i < numCircles; i++) {
    // Calculate the angle for this circle
    let angle = i * (TWO_PI / numCircles);
    // Calculate the position of the circle
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    // Check if mouse is inside this circle
    let d = dist(mouseX, mouseY, x, y);
    if (d < 10) {
      // Radius of the circle is 10 (diameter 20)
      // Log which circle is being clicked
      console.log("Circle " + (i + 1) + " clicked");
      // Open the corresponding URL in a modal
      openModal(urls[i]);
      return false; // Prevent default action of the click event
    }
  }
}

var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to open URL in a modal
function openModal(url) {
  var modal = document.getElementById("myModal");
  var modalFrame = document.getElementById("modalFrame");

  modal.style.display = "block"; // Display the modal

  // Set the iframe source to the URL
  modalFrame.src = url;

  console.log("Opening modal with URL:", url);
}
