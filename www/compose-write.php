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

include('display.html');
?>

