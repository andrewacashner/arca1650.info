/* Write your own text for the Arca musarithmica
 *
 * 2021/11/08
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

/* DIY MODE
 *
/* Conditional dropdown menus in do-it-yourself tone, where user selects
 * style, text, tone, and meter
 */

// Update musicMeter select with appropriate meter options for each style
function diyMeterOptions(style) {
    console.log("Displaying meter options for style '%s'", style);
    
    let meters = {
        "simple": {
            unselected:    "Select a musical meter (mensuration):",
            "Duple":       "Duple meter (alla breve, cut C)",
            "TripleMinor": "Triple meter, three minims per unit (C3)",
            "TripleMajor": "Triple meter, three semibreves per unit (cut C3)"
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
            "DIY":                  // DIY, Pinax 1-2
            [1, 2, 3, 6, 7, 8, 9, 10, 11, 12]
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



