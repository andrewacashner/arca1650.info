<?php
# Web interface to arca using MEI output displayed via Verovio
# 2021/07/14
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
$inputTone  = $_POST['tone'];
$inputMeter = $_POST['musicMeter'];

# File basenames for input and output
$baseName = array(
    "Ave_maris_stella" => "Ave_maris_stella"
    , "Ave_Regina"       => "Ave_Regina_Angelorum"
    , "Bernardus"        => "Bernardus-Hora_novissima"
    , "Boethius"         => "Boethius-Nubibus_atris"
    , "Catullus"         => "Catullus-Viuamus_mea_Lesbia"
    , "Horace"           => "Horace-Maecenas_atavis_edite_regibus"
    , "Iste_confessor"   => "Iste_confessor_Domini"
    , "Ps150"            => "Ps-150"
    , "Shakespeare"      => "Shakespeare-If_Music_Be"
    , "Stephanus"        => "Stephanus-O_ter_quaterque_felix_Cicada"
    , "Veni_creator"     => "Veni_creator_Spiritus"
);

# File titles to be used in the generated HTML output
$fileTitle = array(
    "Ave_maris_stella" => "Ave maris stella (Iambic Euripidaeic meter)"
    , "Ave_Regina"       => "Ave Regina Angelorum (Iambic Enneasyllabic meter)"
    , "Bernardus"        => "Bernardus Melanensis, Hora novissima (Dactylic/Adonic meter)"
    , "Boethius"         => "Boethius, Nubibus atriis (Adonic meter)"
    , "Catullus"         => "Catullus, Viuamus mea Lesbia atque amemus (Hendecasyllabic meter)"
    , "Horace"           => "Horace, Maecenas atavis edite regibus (Dodecasyllabic meter)"
    , "Iste_confessor"   => "Iste confessor Domini (Sapphic meter)"
    , "Ps150"            => "Psalmi CL (Irregular meter/Prose)"
    , "Shakespeare"      => "Shakespeare, If Music Be the Food of Love (Decasyllabic meter = Iambic pentameter)"
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

if ($inputType == "diy") {

    # For DIY files, users set their own parameters for style, meter, and
    # tone.  The input files have placeholder strings for these XML
    # attributes, so we read in the input file, and replace the placeholders
    # with the values taken from the HTML form input.  We pass this modified
    # file text (as string) to arca in the shell.

    $infileName  = "input/text/$fileBasename.xml";

    $fileString  = file_get_contents($infileName);
    $fileString  = str_replace(
        array("{style}", "{musicMeter}", "{tone}"),
        array($style[$inputStyle], $inputMeter, $inputTone), 
        $fileString);

    $fileString = escapeshellarg($fileString);

    $rawMei = shell_exec("echo {$fileString} | {$arca} - -");

} else {

    # For prepared files, we just select the correct input file based on the
    # style and run arca on that.

    $infileName  = "input/prepared/$inputStyle/$fileBasename.xml";

    $rawMei = shell_exec("{$arca} {$infileName} -");
}

# Escape XML slashes for safe transfer to Javascript
$mei = addslashes($rawMei);

include('display.html');
?>

