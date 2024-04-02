var capture;
var tracker;
var w = 640,
  h = 480;
var canvasX, canvasY;
let numCircles = 6; // Number of circles in the ring
let radius = 250; // Radius of the ring
let centerX, centerY; // Center of the canvas

let lastHoveredIndex = -1; // Variable to store the index of the last hovered circle

let modalVisible = false; // Variable to track modal visibility

// Define an array to hold website URLs for each circle
let websiteFiles = [
  "experiment-fisheye.html",
  "experiment-scan.html",
  "experiment-distort/index.html",
  "experiment-screen/index.html",
  "https://editor.p5js.org/lakeishaa/full/TkAX6AHmQ",
  "https://lakeishaa.github.io/thesis/experiment-2/version-2/",
];

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

  // Initialize the modal
  initializeModal();
}

// Draw function
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
    fill(0, 0, 10, 1);
    circle(xc, xs, 200); // Double the size

    // Draw webcam frame at the position of the iris
    blendMode(OVERLAY);
    tint(255, 100); // Set the transparency (100 = semi-transparent)

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

      // Calculate the position of the circle
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;

      // Draw the circle
      ellipse(x, y, 20, 20);

      // Check if mouse is hovering over this circle
      if (dist(mouseX, mouseY, x, y) < 10) {
        // Determine which website to embed based on the circle index
        let websiteFile = websiteFiles[i];
        // Show modal with embedded website at the position of the hovered circle
        showModal(x, y, websiteFile);
      }
    }
  }
}

// Function to initialize the modal
function initializeModal() {
  let modalDiv = createDiv("");
  modalDiv.id("modal");
  modalDiv.class("modal");
  modalDiv.hide();

  let modalContent = createDiv("");
  modalContent.class("modal-content");
  modalContent.parent(modalDiv);

  let iframe = createElement("iframe");
  iframe.attribute("src", "experiment-fisheye.html"); // Default to the first file
  iframe.class("iframe-content");
  iframe.parent(modalContent);

  // Change the close button to an 'x'
  let closeButton = createButton("×"); // '×' represents the close symbol
  closeButton.class("close-btn");
  closeButton.mousePressed(hideModal);
  closeButton.parent(modalDiv); // Change the parent element to modalDiv
}

// Function to show the modal with embedded website
function showModal(x, y, fileName) {
  let modal = select("#modal");
  modal.style("display", "block");

  // Calculate the center of the window
  let windowCenterX = windowWidth / 2;
  let windowCenterY = windowHeight / 2;

  // Set modal position relative to the center of the window
  modal.style("top", windowCenterY + "px");
  modal.style("left", windowCenterX + "px");

  modalVisible = true;

  let fullURL = fileName; // File name directly used as URL
  let iframe = select(".iframe-content");
  iframe.attribute("src", fullURL);
}

// Function to hide the modal
function hideModal() {
  let modal = select("#modal");
  modal.style("display", "none");
  modalVisible = false;
}

// Function to handle mouse pressed event
function mousePressed() {
  // Close modal if clicked outside of it
  if (
    modalVisible &&
    (mouseX < canvasX ||
      mouseX > canvasX + width ||
      mouseY < canvasY ||
      mouseY > canvasY + height)
  ) {
    hideModal();
  }
}
