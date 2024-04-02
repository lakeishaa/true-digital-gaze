document.addEventListener("DOMContentLoaded", function () {
  const numCursors = 35; // Number of custom cursors
  const cursors = [];
  const cursorEases = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
  ]; // Different levels of ease for cursors

  // Update cursor positions
  function updateCursorPosition(cursor, ease) {
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    function update() {
      const dx = mouseX - posX;
      const dy = mouseY - posY;

      posX += dx * ease;
      posY += dy * ease;

      cursor.style.left = posX + "px";
      cursor.style.top = posY + "px";

      requestAnimationFrame(update);
    }

    document.addEventListener("mousemove", function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    update();
  }

  // Create custom cursors and assign different ease levels to each cursor
  for (let i = 0; i < numCursors; i++) {
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);
    cursors.push(customCursor);

    const ease = cursorEases[i % cursorEases.length];
    updateCursorPosition(customCursor, ease);
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const characters = ["ⓧ", "🅇", "☒"]; // Characters to be randomly displayed
//   const numDivs = 10; // Number of div elements to be generated
//   const divs = [];

//   // Create div elements with random characters
//   for (let i = 0; i < numDivs; i++) {
//     const randomChar =
//       characters[Math.floor(Math.random() * characters.length)];
//     const div = document.createElement("div");
//     div.textContent = randomChar;
//     div.style.position = "absolute";
//     div.style.fontSize = "20px";
//     div.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
//     div.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
//     document.body.appendChild(div);
//     divs.push(div);
//   }
// });

let timerInterval;
let seconds = 0,
  minutes = 0,
  hours = 0;

// Function to start the stopwatch
function startStopwatch() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateTimerDisplay();
}

// Function to update the timer display
function updateTimerDisplay() {
  const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("timer").innerText = formattedTime;
}

// Function to pad numbers with leading zeros
function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

// Function to save the timer state in cookies
function saveTimerState() {
  document.cookie = `timer=${hours}:${minutes}:${seconds}`;
}

// Function to retrieve the timer state from cookies
function retrieveTimerState() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "timer") {
      const [h, m, s] = value.split(":").map(Number);
      hours = h;
      minutes = m;
      seconds = s;
      updateTimerDisplay();
      break;
    }
  }
}

// Start the stopwatch when the page loads
startStopwatch();

// Save timer state when window is closed or refreshed
window.addEventListener("beforeunload", saveTimerState);

// Retrieve timer state when the window is reopened
window.addEventListener("load", retrieveTimerState);

// add more stuff

// Get IP Address
// fetch("https://api.ipify.org?format=json")
//   .then((response) => response.json())
//   .then((data) => {
//     var ipAddress = data.ip;
//     console.log("IP Address:", ipAddress);
//   })
//   .catch((error) => console.error("Error getting IP address:", error));

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to track page views
setCookie("page_views", parseInt(getCookie("page_views") || 0) + 1, 365);
console.log("Page views:", getCookie("page_views"));

// Function to track navigation paths
var navigationPath = getCookie("navigation_path") || "";
navigationPath += window.location.href + " > ";
setCookie("navigation_path", navigationPath, 365);
console.log("Navigation path:", navigationPath);

// Function to track sequence of pages visited
var visitedPages = JSON.parse(getCookie("visited_pages")) || [];
visitedPages.push(window.location.href);
setCookie("visited_pages", JSON.stringify(visitedPages), 365);
console.log("Visited pages:", visitedPages);

// Function to track clicks
document.addEventListener("click", function (event) {
  var clickedElement = event.target;
  console.log("Clicked element:", clickedElement);

  // Increment click count
  var clickCount = parseInt(getCookie("click_count") || 0);
  clickCount++;
  setCookie("click_count", clickCount, 365);
  console.log("Click count:", clickCount);
});

// Function to store timestamp when website first opened
if (!getCookie("website_opened")) {
  var currentTime = new Date().toISOString();
  setCookie("website_opened", currentTime, 365);
  console.log("Website first opened at:", currentTime);
}

// Log User Agent
var userAgent = navigator.userAgent;
console.log("User Agent:", userAgent);

// // Check if geolocation is supported by the browser
// if ("geolocation" in navigator) {
//   // Get the user's current position
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       // Access latitude and longitude from the position object
//       var latitude = position.coords.latitude;
//       var longitude = position.coords.longitude;

//       console.log("Latitude:", latitude);
//       console.log("Longitude:", longitude);
//     },
//     function (error) {
//       // Handle errors if any occur
//       console.error("Error getting geolocation:", error.message);
//     }
//   );
// } else {
//   console.log("Geolocation is not supported by this browser.");
// }

// // Get timezone offset
// var timezoneOffset = new Date().getTimezoneOffset();
// console.log("Timezone Offset:", timezoneOffset);

// Simulated login status
var isLoggedIn = true; // Assume the user is logged in
console.log("Login Status:", isLoggedIn ? "Logged In" : "Not Logged In");

// Get device information
var deviceInformation = {
  userAgent: navigator.userAgent,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  viewportWidth: window.innerWidth,
  viewportHeight: window.innerHeight,
  language: navigator.language,
  platform: navigator.platform,
  deviceType:
    window.innerWidth < 768
      ? "Mobile"
      : window.innerWidth < 1024
      ? "Tablet"
      : "Desktop", // Example logic
};
console.log("Device Information:", deviceInformation);

// // Function to track and log timezone
// function trackAndLogTimezone() {
//   var timezoneOffset = new Date().getTimezoneOffset();
//   var hoursOffset = Math.abs(Math.floor(timezoneOffset / 60));
//   var minutesOffset = Math.abs(timezoneOffset % 60);
//   var sign = timezoneOffset > 0 ? "-" : "+"; // Determine the sign based on the offset

//   // Format the timezone offset
//   var formattedTimezoneOffset =
//     sign +
//     (hoursOffset < 10 ? "0" : "") +
//     hoursOffset +
//     ":" +
//     (minutesOffset < 10 ? "0" : "") +
//     minutesOffset;

//   console.log("Timezone Offset:", formattedTimezoneOffset);
// }

// Call the function to track and log timezone
trackAndLogTimezone();
