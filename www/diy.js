// Conditional dropdown menus for input data to the Arca musarithmica
// Andrew A. Cashner, 2021/07/27

function removeChildren(node) {
    // Return a node with no children
    // Clear all options in case any have already been set
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
}

// Update 'inputText' and 'musicMeter' select options
function setOptions(style) {
    textOptions(style);
    meterOptions(style);
}

// Update 'inputText' select options with only the texts that can be set in the
// given style
function textOptions(style) { 
    console.log("Displaying input text options for style '%s'", style);

    let texts = {
        "simple": {
            unselected:         "Select a text to set in simple style:",
            "Abide":            "Abide with Me",
            "Ave_maris_stella": "Ave maris stella",
            "Boethius":         "Boethius, Nubibus atris",
            "Horace":           "Horace, Maecenas atavis edite regibus",
            "Iste_confessor":   "Iste confessor Domini",
            "Stephanus":        "Stephanus, O ter quaterque felix Cicada",
            "Veni_creator":     "Veni creator Spiritus"
        },
        "florid": { 
            unselected:         "Select a text to set in florid style:", 
            "Abide":            "Abide with Me", 
            "Ave_maris_stella": "Ave maris stella",
            "Ave_Regina":       "Ave Regina angelorum",
            "Boethius":         "Boethius, Nubibus atris",
            "Stephanus":        "Stephanus, O ter quaterque felix Cicada",
            "Veni_creator":     "Veni creator Spiritus"
        }
    }

    // Clear all options in case any have already been set
    let textSelect = document.getElementById("inputText");
    textSelect = removeChildren(textSelect);

    // Write the options relevant for this style with their value labels
    let theseTexts = texts[style];
    for (let t in theseTexts) {
        var opt = new Option(theseTexts[t], t);
        textSelect.add(opt);
    }

    return true;
}

// Update musicMeter select with appropriate meter options for each style
function meterOptions(style) {
    console.log("Displaying meter options for style '%s'", style);
    
    let meters = {
        labels: {
            unselected:  "",
            duple:       "Duple",
            tripleMinor: "TripleMinor",
            tripleMajor: "TripleMajor"
        },
        "simple": {
            unselected:  "Select a musical meter (mensuration):",
            duple:       "Duple meter (alla breve, cut C)",
            tripleMinor: "Triple meter, three minims per unit (C3)",
            tripleMajor: "Triple meter, three semibreves per unit (cut C3)"
        },
        "florid": {
            unselected:  "Duple meter (C), only option in florid style",
        }
    }

    // Clear all options in case any have already been set
    let meterSelect = document.getElementById("musicMeter");
    meterSelect = removeChildren(meterSelect);

    // Write the options relevant for this style with their value labels
    let theseMeters = meters[style];
    for (let m in theseMeters) {
        var opt = new Option(theseMeters[m], meters.labels[m]);
        meterSelect.add(opt);
    }

    return true;
}

// Update <select id="mode"> with the correct options for permissible
// modes for this style and text
function modeOptions(style, text) { 
    console.log("Displaying mode options for style '%s', text '%s'", style, text);

    let legalModes = {
        "simple": {
            "Abide": // Decasyllabicum // Pinax 8
            [5, 6, 7, 8, 11, 12],
            "Ave_maris_stella": // IambicumEuripidaeum // Pinax 4
            [1, 2, 3, 4, 9, 10],
            "Ave_Regina": // IambicumEnneasyllabicum // Pinax 7
            [5, 6, 8, 10, 12],
            "Boethius": // Adonium // Pinax 3
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "Horace": // Dodecasyllabicum // Pinax 11
            [5, 6, 7, 8, 11, 12],
            "Iste_confessor": // Sapphicum // Pinax 10
            [1, 2, 3, 4, 9, 10],
            "Ps150": // Prose // Pinax 1 and 2
            [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
            "Stephanus": // Anacreonticum // Pinax 5
            [1, 2, 3, 4, 9, 10],
            "Veni_creator": // IambicumArchilochicum // Pinax 6 
            [5, 6, 8, 12]
        },
        "florid": {
            "Abide": // Decasyllabicum // Pinax 5
            [1, 2, 3, 4, 9, 10],
            "Ave_maris_stella": // IambicumEuripidaeum // Pinax 2
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "Ave_Regina": // IambicumEnneasyllabicum // Pinax 5
            [5, 6, 8, 10, 12],
            "Boethius": // Adonium // Pinax 1 
            [5, 6, 7, 8, 11, 12],
            "Stephanus": // Anacreonticum // Pinax 3
            [1, 2, 3, 4, 9, 10],
            "Veni_creator": // IambicumArchilochicum // Pinax 4
            [5, 6, 7, 8, 11, 12] // needs 2 modes, second set: [1, 2, 3, 4, 9 ,10]
        }
    };

    let modeLabels = {
        "Mode0":  "Select a mode or mood",
        "Mode1":  "Mode I: Pious, religious",
        "Mode2":  "Mode II: Cheerful, easygoing",
        "Mode3":  "Mode III: Tearful",
        "Mode4":  "Mode IV: Sad, mournful",
        "Mode5":  "Mode V: Heroic, lively",
        "Mode6":  "Mode VI: Warlike",
        "Mode7":  "Mode VII: Delightful",
        "Mode8":  "Mode VIII: Joyful",
        "Mode9":  "Mode IX: Confident",
        "Mode10": "Mode X: Calm, mild",
        "Mode11": "Mode XI: Majestic",
        "Mode12": "Mode XII: Grave, austere"
    };

    let modes = legalModes[style][text];

    // Clear all options in case any have already been set
    let modeSelect = document.getElementById("mode");
    modeSelect = removeChildren(modeSelect);

    // Reset the first option
    var firstOpt = new Option(modeLabels["Mode0"], "");
    modeSelect.add(firstOpt);

    // Only add as many modes as allowed
    for (let m of modes) {
        let modeName = "Mode" + m;
        var opt = new Option(modeLabels[modeName], modeName);
        modeSelect.add(opt);
    }

    return true;
}



