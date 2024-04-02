let myShader;
let capture;
let distSlider;

function preload() {
  myShader = loadShader("shader/shader.vert", "shader/shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide(); // Hide the video element

  shader(myShader);

  myShader.setUniform("tex", capture);
  noStroke();

  distSlider = createSlider(0.25, 10, 0.25);
  distSlider.position(10, 10);
  distSlider.size(300, 20);
  distSlider.addClass("mySliders");
}

function draw() {
  background(255, 0, 0);

  let freq = map(mouseX, 0, width, distSlider.value(), 3.0);
  let amp = map(mouseY, 0, height, 1, 2.9);

  myShader.setUniform("frequency", freq);
  myShader.setUniform("amplitude", amp);
  myShader.setUniform("time", frameCount * 0.01);

  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key == "s") {
    save("ECC.png");
  }
}
