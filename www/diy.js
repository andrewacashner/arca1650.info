function setOptions(style) {
    textOptions(style);
    meterOptions(style);
}

function textOptions(style) { 
    switch (style) {
        case "simple" :
            document.getElementById("inputText").options[0] =
                new Option("Select a text to set in simple style:", "");
            document.getElementById("inputText").options[1] = 
                new Option("Abide with Me", "Abide");
            document.getElementById("inputText").options[2] = 
                new Option("Ave maris stella", "Ave_maris_stella");
            document.getElementById("inputText").options[3] = 
                new Option("Ave Regina angelorum", "Ave_Regina");
            document.getElementById("inputText").options[4] = 
                new Option("Boethius, Nubibus atris", "Boethius");
            document.getElementById("inputText").options[5] = 
                new Option("Horace, Maecenas atavis edite regibus", "Horace");
            document.getElementById("inputText").options[6] = 
                new Option("Iste confessor Domini", "Iste_confessor");
            document.getElementById("inputText").options[7] = 
                new Option("Psalm 150", "Ps150");
            document.getElementById("inputText").options[8] = 
                new Option("Stephanus, O ter quaterque felix Cicada", "Stephanus");
            document.getElementById("inputText").options[9] =
                new Option("Veni creator Spiritus", "Veni_creator");
            break;

        case "florid":
            document.getElementById("inputText").options[0] =
                new Option("Select a text to set in florid style:", "");
            document.getElementById("inputText").options[1] = 
                new Option("Abide with Me", "Abide");
            document.getElementById("inputText").options[2] = 
                new Option("Ave maris stella", "Ave_maris_stella");
            document.getElementById("inputText").options[3] = 
                new Option("Ave Regina angelorum", "Ave_Regina");
            document.getElementById("inputText").options[4] = 
                new Option("Boethius, Nubibus atris", "Boethius");
            document.getElementById("inputText").options[5] = 
                new Option("Stephanus, O ter quaterque felix Cicada", "Stephanus");
            document.getElementById("inputText").options[6] =
                new Option("Veni creator Spiritus", "Veni_creator");
            break;
    }

    return true;
}

function meterOptions(style) {
    // Update musicMeter select with appropriate meter options for each style

    console.log("Displaying meter options for style '%s'", style);
    
    const meters = {
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
            duple:       null,
            tripleMinor: null,
            tripleMajor: null
        }
    }

    let theseMeters = meters[style];
    let i = 0;
    for (let m in theseMeters) {
        if (theseMeters[m] == null) {
            var obj = document.getElementById("musicMeter").options;
            obj.remove(i);
        } else {
            document.getElementById("musicMeter").options[i] = 
                new Option(theseMeters[m], meters.labels[m]);
        }
        ++i;
    }

    return true;
}

function modeOptions(style, text) { 
    // Update <select id="mode"> with the correct options for permissible
    // modes for this style and text
   
    console.log("Displaying mode options for style '%s', text '%s'", style, text);

    const legalModes = {
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

    const modeLabels = {
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

    document.getElementById("mode").options[0] = 
        new Option(modeLabels["Mode0"], "");

    let i = 1;
    for (let m of modes) {
        let modeName = "Mode" + m;
        document.getElementById("mode").options[i] = 
            new Option(modeLabels[modeName], modeName);
        ++i;
    }

    // TODO need to remove illegal options

    return true;
}


