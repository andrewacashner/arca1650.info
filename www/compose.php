<?php
# Web interface to arca using MEI output displayed via Verovio
# Andrew Cashner, 2021/07/14
#
# Run the arca to generate MEI music output, given a choice of input texts
# from a webform. Display the MEI using the Verovio web app.
#
# Take the choice of input text from the form in index.html,
# select the correct XML input file from the array of file names,
# construct the input and output filenames, and then pass these as arguments
# to 'arca-exe'.
# 
# For DIY files, where users set the input parameters instead of them being
# preset in the XML input, we have to subsitute the user's input choices
# instead of the placeholders in the XML input file.
# 
# We store the standard output from 'arca-exe' in a PHP variable, which we
# then pass to Javascript and load into the Verovio app.

# GET INPUT
# Input values from HTML form
$inputText  = $_POST['inputText'];
$inputType  = $_POST['inputType'];
$inputStyle = $_POST['style'];
$inputMode  = $_POST['mode'];
$inputMeter = $_POST['musicMeter'];

# File basenames for input and output
$baseName = array(
    "Abide"              => "Abide_with_Me"
    , "Ave_maris_stella" => "Ave_maris_stella"
    , "Ave_Regina"       => "Ave_Regina_Angelorum"
    , "Boethius"         => "Boethius-Nubibus_atris"
    , "Ps150"            => "Ps-150"
    , "Horace"           => "Horace-Maecenas_atavis_edite_regibus"
    , "Iste_confessor"   => "Iste_confessor_Domini"
    , "Stephanus"        => "Stephanus-O_ter_quaterque_felix_Cicada"
    , "Veni_creator"     => "Veni_creator_Spiritus"
);

# File titles to be used in the generated HTML output
$fileTitle = array(
    "Abide"              => "Abide with Me (Decasyllabic meter)"
    , "Ave_maris_stella" => "Ave maris stella (Iambic Euripidaeic meter)"
    , "Ave_Regina"       => "Ave Regina Angelorum (Iambic Enneasyllabic meter)"
    , "Boethius"         => "Boethius, Nubibus atriis (Adonic meter)"
    , "Ps150"            => "Psalmi CL (Irregular meter/Prose)"
    , "Horace"           => "Horace, Maecenas atavis edite regibus (Dodecasyllabic meter)"
    , "Iste_confessor"   => "Iste confessor Domini (Sapphic meter)"
    , "Stephanus"        => "Stephanus, O ter quaterque felix Cicada (Anacreontic meter)"
    , "Veni_creator"     => "Veni creator Spiritus (Iambic Archilochic meter)"
);

$title = "$fileTitle[$inputText]";

# Style selection to be inserted into XML input (maps to Haskell Style data type)
$style = array(
    "simple" => "Simple"
    , "florid" => "Florid"
);


# SET UP INPUT AND OUTPUT FILES and RUN THE ARK
$fileBasename = "$baseName[$inputText]";

$arca = "./cgi-bin/arca-exe";

# Set UTF-8 encoding to preserve Unicode in XML output of arca in standard
# output of server's shell
putenv('LANG=en_US.UTF-8');

if ($inputType == "DIY") {

    # For DIY files, users set their own parameters for style, meter, and
    # mode.  The input files have placeholder strings for these XML
    # attributes, so we read in the input file, and replace the placeholders
    # with the values taken from the HTML form input.  We pass this modified
    # file text (as string) to arca in the shell.

    $infileName  = "input/text/$fileBasename.xml";

    $fileString  = file_get_contents($infileName);
    $fileString  = str_replace(
        array("{style}", "{musicMeter}", "{mode}"),
        array($style[$inputStyle], $inputMeter, $inputMode), 
        $fileString);

    $rawMei = shell_exec("echo '{$fileString}' | {$arca} - -");

} else {

    # For prepared files, we just select the correct input file based on the
    # style and run arca on that.

    $infileName  = "input/prepared/$inputStyle/$fileBasename.xml";

    $rawMei = shell_exec("{$arca} {$infileName} -");
}

# Escape XML slashes for safe transfer to Javascript
$mei = addslashes($rawMei);

?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="arca.css" />
    <link rel="icon" type="image/png" href="img/panpipe.png" />

    <title>Arca musarithmica</title>
    <meta name="description" 
          content="Display music generated automatically by Athanasius
                   Kircher’s device for automatic music composition from his
                   Musurgia universalis (Rome, 1650), Book VIII, in Haskell 
                   implementation by Andrew Cashner (Rochester, New York, 2021)" />

    <script type="text/javascript"
            src="http://www.verovio.org/javascript/latest/verovio-toolkit-wasm.js"
            defer></script>

    <script type="text/javascript" 
            src="https://www.midijs.net/lib/midi.js"
            defer></script>
    </script>

    <script type-"text/javascript"
            src="https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.21.0/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.1.0">
    </script>

<script>
// Make XML available globally
window.meiXML = '<?=$mei?>';

// Check input
console.log("Setting input text [<?=$inputText?>] in method [<?=$inputType?>]: style [<?=$inputStyle?>], mode [<?=$inputMode?>], meter [<?=$inputMeter?>]...");
console.log("Loading input file [<?=$infileName?>]...");
console.log("Rendering output file beginning [%s]...", window.meiXML.substring(0,300));
</script>

<script type="module">
// Render music in Verovio Javascript app
import 'https://www.verovio.org/javascript/app/verovio-app.js';
const options = {
    defaultZoom : 3
}
const app = new Verovio.App(document.getElementById("app"), options);
app.loadData(window.meiXML);
</script>


<script type="text/javascript">
// Get MIDI data 
document.addEventListener("DOMContentLoaded", (event) => {
    Module.onRuntimeInitialized = async _ => {
        let tk = new verovio.toolkit();
        console.log("Verovio Toolkit has loaded!");

        // let svg = tk.renderData(meiXML, {});
        // document.getElementById("notation").innerHTML = svg;
        const base64midi = tk.renderToMIDI(window.meiXML);
        const song = 'data:audio/midi;base64,' + base64midi;
        console.log("Generated MIDI data beginning %s...", song.substring(0,100));

        console.log("MIDIjs audio status: %s", MIDIjs.get_audio_status());
        window.song = song;
    }
});
</script>

    </head>
    <body>
    <header>
      <h1>ARCA MUSARITHMICA</h1>
      <h2>a device for automatic music composition from 1650</h1>
    </header>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="description.html">About</a></li>
          <li><a href="doc/index.html">Code</a></li>
        </ul>
      </nav>
    <main>
        <section>
            <h1><?=$title?></h1>
            <h2>Composed by the Arca musarithmica</h2>

            <p>Reload this page (and resend data) to produce a different setting</p>

            <p><a href="compose.html">Compose more music</a></p>

            <section>
                <noscript>
                Javascript must be enabled in your browser to display the music.
                </noscript>
                <midi-player 
                    src=""
                    sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"></midi-player>
                <div class="playback-controls">
                    <button onclick="MIDIjs.play(window.song);">Listen (MIDI)</button>
                    <button onclick="MIDIjs.stop();">Stop playback</button>
                </div>
                <div class="panel-body">
                    <div id="app" class="panel"></div>
                </div>
            </section>

        </section>
    </main>
    <footer>
      Copyright © 2021 Andrew A. Cashner. All rights reserved.
    </footer>
</html>
