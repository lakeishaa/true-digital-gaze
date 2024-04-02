let myShader;
let video; // Variable to hold the webcam feed

function preload() {
  myShader = loadShader("shader/shader.vert", "shader/shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Create a video capture object and hide the DOM element
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  shader(myShader);

  // Set the shader uniform to the video feed
  myShader.setUniform("tex", video);
  noStroke();
}

function draw() {
  background(255, 0, 0);

  // Use mouse X position for frequency and mouse Y position for amplitude
  let freq = map(mouseX, 0, width, 0.0, 1000.0); // Adjusted maximum frequency to 20.0
  let amp = map(mouseY, 0, height, 0.0, 1.0);

  myShader.setUniform("frequency", freq);
  myShader.setUniform("amplitude", amp);
  myShader.setUniform("time", frameCount * 0.01);

  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
