let video;
let gridSizeSlider;
let invertSlider;
let letters = ["&", "g", "a", "z", "e", "*", "#"];
// let letters = [ 'g', 'a', 'z', 'e'];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // gridSizeSlider = createSlider(20, 55, 3);
  gridSizeSlider.position(10, 10);

  invertSlider = createSlider(0, 1, 0);
  invertSlider.position(200, 10);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  background("#FFFFFF");

  let gridSize = gridSizeSlider.value();

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      // let dia = map(r, 0, 255/2, gridSize, 2);
      let dia = map(r, 0, 255, gridSize, 1);

      let letter = letters[Math.floor(Math.random() * letters.length)];
      fill("#000000");
      stroke("#000000");
      strokeWeight(1);
      textSize(dia);
      textAlign(CENTER, CENTER);
      text(letter, x, y);
      text(letter, x + gridSize / 2, y + gridSize / 2);
    }
  }

  if (invertSlider.value() > 0) {
    filter(INVERT);
  }
}
