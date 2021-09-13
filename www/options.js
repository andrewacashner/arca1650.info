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
 * Conditional dropdown menus for prepared tone, where user selects style and
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
/* Conditional dropdown menus in do-it-yourself tone, where user selects
 * style, text, tone, and meter
 */

/* Update the select options:
 * For tone, just reset to the default option; we will fully set the tone
 * options after style and text are both selected.
 */
function diySetOptions(style) {
    diyTextOptions(style);
    diyMeterOptions(style);
    diyToneOptions(style); 
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
            "Duple":  "Duple meter (C), only option in florid style",
        }
    };

    var musicMeter = document.getElementById("musicMeter");
    musicMeter = createOptions(musicMeter, meters, style);

    return true;
}

/* Update 'tone' select element with the correct options for permissible tones
 * for given style ("simple" or "florid") and text ("inputText" value).
 *
 * 'Text' argument is optional; if it is omitted we just reset the default
 * option.
 */
function diyToneOptions(style, text) { 
    console.log("Displaying tone options for style '%s', text '%s'", style, text);

    let legalTones = {
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
            [1, 2, 3, 4, 9, 10],
            "Boethius":             // Adonium                  // Pinax 1 
            [5, 6, 7, 8, 11, 12],
            "Stephanus":            // Anacreonticum            // Pinax 3
            [1, 2, 3, 4, 9, 10]
        }
    };

    let toneLabels = {
        "Tone0":  "Select a tone or mood",
        "Tone1":  "Tone I: Pious, religious",
        "Tone2":  "Tone II: Cheerful, easygoing",
        "Tone3":  "Tone III: Tearful",
        "Tone4":  "Tone IV: Sad, mournful",
        "Tone5":  "Tone V: Heroic, lively",
        "Tone6":  "Tone VI: Warlike",
        "Tone7":  "Tone VII: Delightful",
        "Tone8":  "Tone VIII: Joyful",
        "Tone9":  "Tone IX: Confident",
        "Tone10": "Tone X: Calm, mild",
        "Tone11": "Tone XI: Majestic",
        "Tone12": "Tone XII: Grave, austere"
    };


    // Clear all options in case any have already been set
    let toneSelect = document.getElementById("tone");
    toneSelect = removeChildren(toneSelect);

    // Reset the first option
    var firstOpt = new Option(toneLabels["Tone0"], "");
    toneSelect.add(firstOpt);

    // If the text was omitted, just stop here
    if (text != undefined) {
        // Only add as many tones as allowed
        // Pull out the labels for tones included in the table
        let tones = legalTones[style][text];
        for (let m of tones) {
            let toneName = "Tone" + m;
            var opt = new Option(toneLabels[toneName], toneName);
            toneSelect.add(opt);
        }
    }

    return true;
}



