// ALL THE ACTUAL FIREBASE STUFF
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
// this is the id you get from the firebase site
// 1. go to your project in firebase
// 2. on the left, you should see project overview. click the settings icon next to that
// 3. under the general tab, scroll down until you see "Your Apps" > "SDK Setup and Configuration" > click "CDN" option
// 4. copy the "const firebaseConfig" stuff here

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "the-digital-gaze.firebaseapp.com",
  projectId: "the-digital-gaze",
  storageBucket: "the-digital-gaze.appspot.com",
  messagingSenderId: "523916107442",
  appId: "1:523916107442:web:2b53cf035593c9d06273ab",
  measurementId: "G-VNEYBB35ME",
};

// only replace the const stuff ^^^^

// COPY EVERYTHING BELOW BUT READ THE NOTES VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const imagesFolder = ref(storage, "images");

listAll(imagesFolder)
  .then((result) => {
    console.log(result);
    result.items.forEach((imageRef) => {
      // For each image reference, get the download URL
      getDownloadURL(imageRef)
        .then((url) => {
          // Create an img element and set its src to the URL
          const img = document.createElement("img");
          img.src = url;
          img.style.width = "100px"; // Set the size of the image
          img.style.height = "100px";
          img.style.margin = "10px";
          // Add the img element to the page
          document.getElementById("imagesContainer").appendChild(img);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  .catch((error) => {
    console.log(error);
  });
