var capture;
var tracker;
var w = 640,
    h = 480;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    if (positions.length > 0) {
        // Define eye positions (example landmarks for left and right eyes)
        var leftEyeX = positions[32][0];
        var leftEyeY = positions[3][1];
        var rightEyeX = positions[27][0];
        var rightEyeY = positions[10][1];

        // Calculate the zoomed-in dimensions
        var zoomWidth = 120;
        var zoomHeight = 80;

        // Center the zoom on the midpoint between the eyes
        var zoomX = (leftEyeX + rightEyeX) / 2 - zoomWidth / 2;
        var zoomY = (leftEyeY + rightEyeY) / 2 - zoomHeight / 2;

        // Display the zoomed-in region
        image(capture, 0, 0, w, h, zoomX, zoomY, zoomWidth, zoomHeight);

      
        // filter(INVERT);
    }
}
