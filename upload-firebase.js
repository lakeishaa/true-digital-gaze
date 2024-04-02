// ALL THE ACTUAL FIREBASE STUFF
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
// this is the id you get from the firebase site
// 1. go to your project in firebase
// 2. on the left, you should see project overview. click the settings icon next to that
// 3. under the general tab, scroll down until you see "Your Apps" > "SDK Setup and Configuration" > click "CDN" option
// 4. copy the "const firebaseConfig" stuff here

// only replace the const stuff ^^^^

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "the-digital-gaze.firebaseapp.com",
  projectId: "the-digital-gaze",
  storageBucket: "the-digital-gaze.appspot.com",
  messagingSenderId: "523916107442",
  appId: "1:523916107442:web:2b53cf035593c9d06273ab",
  measurementId: "G-VNEYBB35ME",
};

// COPY EVERYTHING BELOW BUT READ THE NOTES VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const imagesFolder = ref(storage, "images");

function getCanvasSnapshot() {
  const canvas = document.getElementById("defaultCanvas0");
  // Convert the canvas content to a Blob
  canvas.toBlob((blob) => {
    uploadCanvasBlob(blob);
  }, "image/png");
}

const customMetadata = {
  contentType: "image/png",
  specialPass: "lakeishaa",
};

function uploadCanvasBlob(blob) {
  // Create a unique filename for the image
  const imageName = "screencap-" + new Date().toISOString() + ".png";
  // Create a reference to 'images/imageName.png' in Firebase Storage
  const imageRef = ref(imagesFolder, imageName);
  // Upload the blob to Firebase Storage
  uploadBytes(imageRef, blob, customMetadata).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
}
document
  .getElementById("submitButton")
  .addEventListener("click", getCanvasSnapshot);
