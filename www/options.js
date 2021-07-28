/* Conditional dropdown menus for input data to the Arca musarithmica
 *
 * Andrew Cashner, 2021/07/27
 */

/* Make a 'select' element with options appropriate for the given style.
 * Remove any options that may have been set before.
 *
 * Arguments: 
 *  (1) element         -- HTML element node
 *  (2) optionsPerStyle -- Object with two nested sets of properties: one for
 *                         "simple" style, the other for "florid"; within
 *                         each the property keys are the option's 'value'
 *                         attribute of and the key is the text
 *  (3) style           -- String, "simple" or "florid"
 *
 *  Returns the document element with updated options.
 */
function createOptions(element, optionsPerStyle, style) {
    
    // Clear all options in case any have already been set
    element = removeChildren(element);

    // Write the options relevant for this style with their value labels
    let options = optionsPerStyle[style];
    for (let o in options) {
        var thisOpt = new Option(options[o], o);
        element.add(thisOpt);
    }

    return element;
}

// Return a node with no children; clear all options in case any have already been set.
function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
}

/* PREPARED MODE
 *
 * Conditional dropdown menus for prepared mode, where user selects style and
 * input text only
 */

/* Update 'inputText' select options with only the texts that can be set in
 * the given style
 */
function preparedTextOptions(style) { 
    console.log("Displaying input text options for style '%s'", style);

    let texts = {
        "simple": {
            unselected:         "Select a text to set in simple style:",
            "Abide":            "Abide with Me",
            "Ave_maris_stella": "Ave maris stella",
            "Ave_Regina":       "Ave Regina angelorum",
            "Boethius":         "Boethius, Nubibus atris",
            "Horace":           "Horace, Maecenas atavis edite regibus",
            "Iste_confessor":   "Iste confessor Domini",
            "Ps150":            "Psalm 150",
            "Stephanus":        "Stephanus, O ter quaterque felix Cicada",
            "Veni_creator":     "Veni creator Spiritus"
        },
        "florid": {
            unselected:         "Select a text to set in florid style:",
            "Abide":            "Abide with Me",
            "Ave_maris_stella": "Ave maris stella",
            "Ave_Regina":       "Ave Regina angelorum",
            "Boethius":         "Boethius, Nubibus atris",
            "Iste_confessor":   "Iste confessor Domini",
            "Stephanus":        "Stephanus, O ter quaterque felix Cicada",
            "Veni_creator":     "Veni creator Spiritus"
        }
    };

    var inputText = document.getElementById("inputText");
    inputText = createOptions(inputText, texts, style);

    return true;
}

/* DIY MODE
 *
/* Conditional dropdown menus in do-it-yourself mode, where user selects
 * style, text, mode, and meter
 */

/* Update the select options:
 * For mode, just reset to the default option; we will fully set the mode
 * options after style and text are both selected.
 */
function diySetOptions(style) {
    diyTextOptions(style);
    diyMeterOptions(style);
    diyModeOptions(style); 
}

/* Update 'inputText' select options with only the texts that can be set in
 * the given style
 */
function diyTextOptions(style) { 
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
            "Stephanus":        "Stephanus, O ter quaterque felix Cicada"
        }
    };

    var inputText = document.getElementById("inputText");
    inputText = createOptions(inputText, texts, style);

    return true;
}

// Update musicMeter select with appropriate meter options for each style
function diyMeterOptions(style) {
    console.log("Displaying meter options for style '%s'", style);
    
    let meters = {
        "simple": {
            unselected:    "Select a musical meter (mensuration):",
            "Duple":       "Duple meter (alla breve, cut C)",
            "TripleMinor": "Triple meter, three minims per unit (C3)",
            "TripleMajor": "Triple meter, three semibreves per unit (cut C3)"
        },
        "florid": {
            unselected:  "Duple meter (C), only option in florid style",
        }
    };

    var musicMeter = document.getElementById("musicMeter");
    musicMeter = createOptions(musicMeter, meters, style);

    return true;
}

/* Update 'mode' select element with the correct options for permissible modes
 * for given style ("simple" or "florid") and text ("inputText" value).
 *
 * 'Text' argument is optional; if it is omitted we just reset the default
 * option.
 */
function diyModeOptions(style, text) { 
    console.log("Displaying mode options for style '%s', text '%s'", style, text);

    let legalModes = {
        "simple": {
            "Abide":                // Decasyllabicum           // Pinax 8
            [5, 6, 7, 8, 11, 12],
            "Ave_maris_stella":     // IambicumEuripidaeum      // Pinax 4
            [1, 2, 3, 4, 9, 10],
            "Ave_Regina":           // IambicumEnneasyllabicum  // Pinax 7
            [5, 6, 8, 10, 12],
            "Boethius":             // Adonium                  // Pinax 3
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "Horace":               // Dodecasyllabicum         // Pinax 11
            [5, 6, 7, 8, 11, 12],
            "Iste_confessor":       // Sapphicum                // Pinax 10
            [1, 2, 3, 4, 9, 10],
            "Ps150":                // Prose                    // Pinax 1 and 2
            [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
            "Stephanus":            // Anacreonticum            // Pinax 5
            [1, 2, 3, 4, 9, 10],
            "Veni_creator":         // IambicumArchilochicum    // Pinax 6 
            [5, 6, 8, 12]
        },
        "florid": {
            "Abide":                // Decasyllabicum           // Pinax 5
            [1, 2, 3, 4, 9, 10],
            "Ave_maris_stella":     // IambicumEuripidaeum      // Pinax 2
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "Ave_Regina":           // IambicumEnneasyllabicum  // Pinax 5
            [5, 6, 8, 10, 12],
            "Boethius":             // Adonium                  // Pinax 1 
            [5, 6, 7, 8, 11, 12],
            "Stephanus":            // Anacreonticum            // Pinax 3
            [1, 2, 3, 4, 9, 10]
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


    // Clear all options in case any have already been set
    let modeSelect = document.getElementById("mode");
    modeSelect = removeChildren(modeSelect);

    // Reset the first option
    var firstOpt = new Option(modeLabels["Mode0"], "");
    modeSelect.add(firstOpt);

    // If the text was omitted, just stop here
    if (text != undefined) {
        // Only add as many modes as allowed
        // Pull out the labels for modes included in the table
        let modes = legalModes[style][text];
        for (let m of modes) {
            let modeName = "Mode" + m;
            var opt = new Option(modeLabels[modeName], modeName);
            modeSelect.add(opt);
        }
    }

    return true;
}



