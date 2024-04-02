/*
Hand Tracking + KNN Classifier

The example lets you train a knn algorithm to classify handposes

Built with handPose model from tf.js, knn-classifier from ml5js and p5js

Created by Yining Shi & Andreas Refsgaard 2020
*/

let model,
  video,
  keypoints,
  predictions = [];
// Create a KNN classifier

let song1, song2, song3, song4, song5;
let song1Played = false; // Flag for song1
let song2Played = false; // Flag for song2
let song3Played = false; // Flag for song1
let song4Played = false; // Flag for song2
let song5Played = false; // Flag for song1

function preload() {
  video = createCapture(VIDEO, () => {
    loadHandTrackingModel();
  });
  video.hide();
  song1 = loadSound("song1.wav");
  song2 = loadSound("song2.wav");
  song3 = loadSound("song3.wav");
  song4 = loadSound("song4.wav");
  song5 = loadSound("song5.wav");
}

function setup() {
  const canvas = createCanvas(600, 480);
  canvas.parent("canvasContainer");
}

async function loadHandTrackingModel() {
  // Load the MediaPipe handpose model.
  model = await handpose.load();
  select("#status").html("Hand Tracking Model Loaded");
  predictHand();
}

function draw() {
  background(255);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    drawKeypoints();
    drawSkeleton();

    const xCoordinate = predictions[0].landmarks[0][0];

    if (xCoordinate >= 100 && xCoordinate <= 200) {
      playSong1();
    } else if (xCoordinate >= 0 && xCoordinate <= 200) {
      playSong2();
    } else if (xCoordinate >= 200 && xCoordinate <= 300) {
      playSong3();
    } else if (xCoordinate >= 300 && xCoordinate <= 400) {
      playSong4();
    } else if (xCoordinate >= 500 && xCoordinate <= 600) {
      playSong5();
    } else {
      // Reset flags if the hand is not in any specified region
      song1Played = false;
      song2Played = false;
      song3Played = false;
      song4Played = false;
      song5Played = false;
    }
  }
}

function playSong1() {
  if (!song1Played && !song1.isPlaying()) {
    song1.play();
    background(0, 255, 0);
    console.log(
      "Song 1 is playing because x-coordinate is between 100 and 200 pixels!"
    );
    song1Played = true;
  }
}

function playSong2() {
  if (!song2Played && !song2.isPlaying()) {
    song2.play();
    background(0, 0, 255);
    console.log(
      "Song 2 is playing because x-coordinate is between 450 and 500 pixels!"
    );
    song2Played = true;
  }
}

function playSong3() {
  if (!song3Played && !song3.isPlaying()) {
    song3.play();
    background(0, 255, 0);
    console.log(
      "Song 1 is playing because x-coordinate is between 100 and 200 pixels!"
    );
    song3Played = true;
  }
}

function playSong4() {
  if (!song4Played && !song4.isPlaying()) {
    song4.play();
    background(0, 255, 0);
    console.log(
      "Song 1 is playing because x-coordinate is between 100 and 200 pixels!"
    );
    song4Played = true;
  }
}

function playSong5() {
  if (!song5Played && !song5.isPlaying()) {
    song5.play();
    background(0, 255, 0);
    console.log(
      "Song 1 is playing because x-coordinate is between 100 and 200 pixels!"
    );
    song5Played = true;
  }
}

async function predictHand() {
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a hand prediction from the MediaPipe graph.
  predictions = await model.estimateHands(video.elt);

  setTimeout(() => predictHand(), 100);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  console.log(predictions[0].landmarks[0][0]);
  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[j];
    fill(255, 0, 0);
    noStroke();
    ellipse(keypoint[0], keypoint[1], 10, 10);
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  let annotations = predictions[0].annotations;
  stroke(255, 0, 0);
  for (let j = 0; j < annotations.thumb.length - 1; j++) {
    line(
      annotations.thumb[j][0],
      annotations.thumb[j][1],
      annotations.thumb[j + 1][0],
      annotations.thumb[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    line(
      annotations.indexFinger[j][0],
      annotations.indexFinger[j][1],
      annotations.indexFinger[j + 1][0],
      annotations.indexFinger[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
    line(
      annotations.middleFinger[j][0],
      annotations.middleFinger[j][1],
      annotations.middleFinger[j + 1][0],
      annotations.middleFinger[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
    line(
      annotations.ringFinger[j][0],
      annotations.ringFinger[j][1],
      annotations.ringFinger[j + 1][0],
      annotations.ringFinger[j + 1][1]
    );
  }
  for (let j = 0; j < annotations.pinky.length - 1; j++) {
    line(
      annotations.pinky[j][0],
      annotations.pinky[j][1],
      annotations.pinky[j + 1][0],
      annotations.pinky[j + 1][1]
    );
  }

  line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.thumb[0][0],
    annotations.thumb[0][1]
  );
  line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.indexFinger[0][0],
    annotations.indexFinger[0][1]
  );
  line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.middleFinger[0][0],
    annotations.middleFinger[0][1]
  );
  line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.ringFinger[0][0],
    annotations.ringFinger[0][1]
  );
  line(
    annotations.palmBase[0][0],
    annotations.palmBase[0][1],
    annotations.pinky[0][0],
    annotations.pinky[0][1]
  );
}
