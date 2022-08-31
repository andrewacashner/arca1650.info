// Very simple web app to display MEI via Verovio Toolkit and play MIDI
// Andrew Cashner, 2022/08/31
document.addEventListener("DOMContentLoaded", (event) => {
    Module.onRuntimeInitialized = async _ => {
        let tk = new verovio.toolkit();
        console.log("Verovio has loaded");

        tk.setOptions({
            scale: 26,
            pageHeight: 2000,
            pageWidth: 1000,
            font: "Bravura",
            header: "none",
            footer: "none"
        });

        console.log("Loading data into Verovio toolkit");
        tk.loadData(window.meiXML);

        console.log("Rendering graphics with Verovio");
        let svg = tk.renderToSVG();
        document.getElementById("app").innerHTML = svg;

        console.time("Generating MIDI");
        let base64midi = tk.renderToMIDI();
        let song = 'data:audio/midi;base64,' + base64midi;
        window.song = song;

        $("#player").midiPlayer({
            onStop: null,
            onUpdate: midiUpdate,
            updateRate: 1000
        });
        window.page = 1;
        window.toolkit = tk;
    }
});

// MIDI player functions
function midiUpdate(time) {
    console.log(time);
}

function midiStop() {
    $("#player").midiPlayer.stop();
    console.log("Stopped playback");
}

function midiPlay() {
    console.log("Playing MIDI file beginning %s...", song.substring(0,100));
    $("#player").midiPlayer.play(window.song);
}

function pageShift(inc) {
    let thisPage = window.page + inc;
    console.log("Rendering page " + thisPage);
    let svg = window.toolkit.renderToSVG(thisPage);
    document.getElementById("app").innerHTML = svg;
    window.page = thisPage;
}

function nextPage() {
    pageShift(1);
}

function prevPage() {
    pageShift(-1);
}

