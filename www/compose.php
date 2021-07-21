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

$mei = addslashes($rawMei);

?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Arca musarithmica output</title>
        <meta charset="utf-8"/> 
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href="arca.css"/>
        <script>
const inputText     = '<?=$inputText?>';
const inputType     = '<?=$inputType?>';
const inputStyle    = '<?=$inputStyle?>';
const inputMode     = '<?=$inputMode?>';
const inputMeter    = '<?=$inputMeter?>';
const infileName    = '<?=$infileName?>';
const mei           = '<?=$mei?>';
console.log("Setting input text [%s] in method [%s]: style [%s], mode [%s], meter [%s]...", 
    inputText, inputType, inputStyle, inputMode, inputMeter);
console.log("Loading input file [%s]...", infileName);
console.log("Rendering output file [%s]...", mei);
</script>
    </head>
    <body>
    <header>
      <h1>Arca musarithmica Athanasii Kircherii MDCL</h1>
      <p>
      A digital implementation of Athanasius Kircher´s device for automatic
      music composition from his <cite>Musurgia universalis</cite> (Rome,
      1650), Book VIII.
      </p>
      <p>
      Implemented in Haskell by Andrew Cashner (Rochester, New York,
      2021).
      </p>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="description.html">About</a></li>
        </ul>
      </nav>
      <hr/>
    </header>
    <main>
        <section>
            <h1><?=$title?></h1>
            <h2>Composed by the Arca musarithmica</h2>

            <p>Reload this page (and resend data) to produce a different setting</p>

            <p><a href="compose.html">Compose more music</a></p>

            <div class="panel-body">
                <div id="app" class="panel" 
                    style="border: 1px solid lightgray; min-height: 800px;">
                </div>
            </div>

<script type="module">
// Put the Arca output from PHP into a variable and load it into Verovio
import 'https://www.verovio.org/javascript/app/verovio-app.js';
const options = {
defaultZoom : 3
}
const app = new Verovio.App(document.getElementById("app"), options);
const mei = '<?=$mei?>';
app.loadData(mei);
</script>
        </section>
    </main>
    <footer>
      <hr/>
      Copyright © 2021 Andrew A. Cashner. All rights reserved.
    </footer>
</html>
