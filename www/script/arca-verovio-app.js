// Web app to display MEI via Verovio Toolkit and play MIDI
// Andrew Cashner, 2022/09/01
document.addEventListener("DOMContentLoaded", (event) => {
    Module.onRuntimeInitialized = async _ => {
        // Load Verovio toolkit
        let tk = new verovio.toolkit();
        window.toolkit = tk;
        console.log("Verovio has loaded");

        // Set Verovio scale, width, other options
        tk.verovioScaleDefault = 26;
        tk.verovioScale = tk.verovioScaleDefault;

        let startWidth = document.getElementById("app").offsetWidth;
        console.log("Display window initial width: " + startWidth);

        tk.setOptions({
            scale: tk.verovioScale,
            pageWidth: startWidth * 3,
            pageHeight: 2000,
            font: "Bravura",
            header: "none",
            footer: "none"
        });

        // Load and render MEI data
        console.log("Loading data into Verovio toolkit");
        tk.loadData(window.meiXML);

        console.log("Rendering graphics with Verovio");
        tk.page = 1;
        drawPage(tk.page);
        tk.pageCount = tk.getPageCount();

        // Render MIDI
        console.time("Generating MIDI");
        let base64midi = tk.renderToMIDI();
        let song = 'data:audio/midi;base64,' + base64midi;
        tk.song = song;

        $("#player").midiPlayer({
            onStop: null,
            onUpdate: midiUpdate,
            updateRate: 1000
        });
        tk.midiPlaying = false;
    }
});

// Page rendering
function drawPage(n) {
    console.log("Rendering page " + n);
    let svg = window.toolkit.renderToSVG(n);
    document.getElementById("app").innerHTML = svg;
}

function setPage(n) {
    let tk = window.toolkit;
    if ((n > 0) && (n <= tk.pageCount)) {
        drawPage(n);
        tk.page = n;
    } else {
        console.log("Page number out of range");
    }
}

function pageShift(inc) {
    setPage(window.toolkit.page + inc);
}

function firstPage() {
    setPage(1);
}

function lastPage() {
    setPage(window.toolkit.pageCount);
}

function nextPage() {
    pageShift(1);
}

function prevPage() {
    pageShift(-1);
}

// Zoom
function setZoom(newScale) {
    let tk = window.toolkit;
    tk.setOptions({
        scale: newScale
    });
    drawPage(tk.page);
    tk.verovioScale = newScale;
}

function zoomChange(scaleInc) {
    let tk = window.toolkit;
    let currentScale = tk.verovioScale;
    let newScale = currentScale + scaleInc;

    if ((newScale > 0) && (newScale < 1000)) {
        console.log("Change zoom from " + currentScale + " to " + newScale);
        setZoom(newScale);
    } else {
        console.log("Cannot zoom further");
    }
}

function zoomIn() {
    zoomChange(10);
}

function zoomOut() {
    zoomChange(-10);
}

function zoomReset() {
    console.log("Reset zoom to default");
    setZoom(window.toolkit.verovioScaleDefault);
}

// MIDI player functions
function midiUpdate(time) {
    console.log(time);
}

function midiPlay() {
    let tk = window.toolkit;
    console.log("Playing MIDI file");
    $("#player").midiPlayer.play(tk.song);
    tk.midiPlaying = true;
}

function midiStop() {
    $("#player").midiPlayer.stop();
    console.log("Stopped playback");
    window.toolkit.midiPlaying = false;
}

function midiPlayToggle() {
    if (window.toolkit.midiPlaying) {
        midiStop();
    } else {
        midiPlay();
    }
}

