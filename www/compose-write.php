<?php
# Web interface to arca using MEI output displayed via Verovio
# For DIY texts created on the site
# 2021/11/08
#
# Run the arca to generate MEI music output, given a choice of input texts
# from a webform. Display the MEI using the Verovio web app.
#
# Input the user's choices into an XML shell file, construct the input and
# output filenames, and then pass these as arguments to 'arca-exe'.
# 
# We store the standard output from 'arca-exe' in a PHP variable, which we
# then pass to Javascript and load into the Verovio app.

# GET INPUT
# Input values from HTML form
$title       = $_POST['inputTextTitle'];
$wordsAuthor = $_POST['inputTextWordsAuthor'];
$inputText   = $_POST['inputText'];
$inputTone   = $_POST['tone'];
$inputMeter  = $_POST['musicMeter'];

# Clean up input text
$inputText = str_replace("\r\n", "</l><l>", $inputText);

# SET UP INPUT AND OUTPUT FILES and RUN THE ARK
$arca = "./cgi-bin/arca-exe";

# Set UTF-8 encoding to preserve Unicode in XML output of arca in standard
# output of server's shell
putenv('LANG=en_US.UTF-8');

# For DIY files, users set their own parameters for style, meter, and
# tone.  The input files have placeholder strings for these XML
# attributes, so we read in the input file, and replace the placeholders
# with the values taken from the HTML form input.  We pass this modified
# file text (as string) to arca in the shell.
$infileName  = "input/text/diy.xml";

$fileString  = file_get_contents($infileName);
$fileString  = str_replace(
    array("{title}", "{wordsAuthor}", "{musicMeter}", "{tone}", "{inputText}"),
    array($title, $wordsAuthor, $inputMeter, $inputTone, $inputText), 
    $fileString);

$fileString = escapeshellarg($fileString);

$rawMei = shell_exec("echo {$fileString} | {$arca} - -");

# Escape XML slashes for safe transfer to Javascript
$mei = addslashes($rawMei);

?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Arca musarithmica</title>
    <meta name="description" 
          content="Display music generated automatically by Athanasius
                   Kircher’s device for automatic music composition from his
                   Musurgia universalis (Rome, 1650), Book VIII, in Haskell 
                   implementation (2021)">

    <link rel="stylesheet" type="text/css" href="arca.css">
    <link rel="icon" type="image/png" href="img/panpipe.png">

    <script>
      // Bring in MEI data from PHP and check input parameters -->
      var mei = '<?=$mei?>';
      if (mei.length === 0) {
          console.error("Empty MEI output from arca");
      }
      window.meiXML = mei;

      console.log("Setting input text [<?=$inputText?>] in method [<?=$inputType?>]: style [<?=$inputStyle?>], tone [<?=$inputTone?>], meter [<?=$inputMeter?>]...");
      console.log("Loading input file [<?=$infileName?>]...");
      console.log("Rendering MEI output file beginning [%s]...", window.meiXML.substring(0,300));
    </script>

    <script src="verovio/verovio-toolkit-wasm.js" defer></script>
    <script src="verovio/jquery.min.js" defer></script>
    <script src="midi/019_church_organ.js" defer></script>
    <script src="midi/midiplayer.js" defer></script>
    <script src="script/arca-verovio-app.js" defer></script>
  </head>
  <body>
    <header>
      <h1>ARCA MUSARITHMICA</h1>
      <h2>a device for automatic music composition from 1650</h2>
    </header>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="doc/index.html">Code</a></li>
        </ul>
      </nav>
    <main>
        <section>
            <h1><?=$title?></h1>
            <h2>Composed by the Arca musarithmica</h2>

            <p><a href="compose.html">Compose more music</a> or reload this page to produce a different setting</p>

            <section>
                <noscript>
                Javascript must be enabled in your browser to display the music.
                </noscript>
                <div class="controls">
                    <div class="playback-controls">
                        <button onclick="midiPlay();">Play (MIDI)</button>
                        <button onclick="midiStop();">Stop</button>
                    </div>
                    <div class="page-controls">
                        <button onclick="prevPage();">Previous page</button>
                        <button onclick="nextPage();">Next page</button>
                    </div>
                </div>
                <div id="player"></div>
                <div class="panel-body">
                    <div id="app" class="panel"></div>
                </div>
            </section>

        </section>
        <section>
            <ul>
                <li>MEI newly generated from user-selected options and prepared input texts in XML by the <code>arca</code> Haskell program </li>
                <li>MEI rendered into SVG graphics by RISM’s <a href="https://www.verovio.org/">Verovio</a> <a href="https://www.verovio.org/app.html">Javascript app</a></li>
                <li>MIDI generated by Verovio toolkit and played by Verovio midi player, which uses <a href="http://zz85.github.io/wild-web-midi/">Wild Web MIDI</a></li>
                <li>The Verovio software is made freely available under the GNU Lesser General Public License v3.0.</li>
            </ul>
        </section>
    </main>
    <footer>
      <p>Copyright © 2022 
        <a href="https://orcid.org/0000-0002-7468-8579">Andrew A. Cashner</a>. 
        All rights reserved. 
        (Except where other licenses are specified for third-party software.)</p>
    </footer>
</html>
