let WINDOWS = {};

function openMultipleWindows(url, count) {
  // define the dimensions for the new windows
  let winW = 400;
  let winH = 400;

  for (let i = 0; i < count; i++) {
    // Ensure that the window is not bigger than the screen
    let screenWidth = window.screen.availWidth;
    let screenHeight = window.screen.availHeight;

    // Calculate random position within the bounds of the screen
    let left = Math.floor(Math.random() * (screenWidth - winW));
    let top = Math.floor(Math.random() * (screenHeight - winH));

    // Open a new window with the specified features at a random position
    let newWindow = window.open(
      url,
      "newWindow" + i,
      "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=" +
        winW +
        ",height=" +
        winH +
        ",top=" +
        top +
        ",left=" +
        left
    );

    // Add the new window to the WINDOWS object
    WINDOWS["newWindow" + i] = newWindow;

    // Try to focus the new window if possible
    if (newWindow) {
      newWindow.focus();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Select all 'a' tags inside the 'ul' of 'homePageWrapper' div
  let links = document.querySelectorAll("#homePageWrapper ul a");

  // Add a click event listener to each link
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior
      openMultipleWindows(this.href, 7); // Pass the href of the link and the number of windows to open
    });
  });
});
