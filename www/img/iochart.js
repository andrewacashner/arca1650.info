google.charts.load('current', {'packages':['sankey']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'from');
    data.addColumn('string', 'to');
    data.addColumn('number', 'type'); 
    data.addRows([
        [ 'style',          'syntagma',         2 ],
        [ 'text meter',     'pinax',            2 ],
        [ 'syllable text',  'column',           2 ],
        [ 'syllable length', 'column',          2 ],
        [ 'line position',  'column',           1 ],

        [ 'music meter',    'meter symbols',    2 ],
        [ 'meter symbols',  'meter signature',  1 ],
        [ 'music meter',    'rperm meters',     2 ], 

        [ 'mode',           'mode scales',      2 ],
        [ 'mode scales',    'key signature',    1 ],
        
        [ 'syntagma',       'pinax',            1 ],
        [ 'pinax',          'column',           1 ],
        [ 'column',         'vperm',            1 ],
        [ 'column',         'rperm meters',     1 ],
        [ 'rperm meters',   'rperm',            1 ],
        [ 'rperm',          'duration',         1 ],
        [ 'choice/random',  'rperm',            1 ],

        [ 'choice/random',  'vperm',            1 ],
        [ 'vperm',          'pitch class',      1 ],

        [ 'pitch class',    'mode scales',      1 ],
        [ 'mode scales',    'accidental',       1 ],

        [ 'mode scales',    'pitch name',       1 ],
        [ 'pitch class',    'clefs/ranges',     1 ],
        [ 'clefs/ranges',   'clef',             1 ],
        [ 'clefs/ranges',   'octave',           1 ]
    ]);

    var options = {
        width: 577,
        height: 367,
        tooltip: { isHtml: true },
        sankey: {
            node: { label: { bold: true }
                    , nodePadding: 37
                    , interactivity: true
                  }
            , link: {
                colorMode: 'gradient'
            }
        }
    };

    var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
    chart.draw(data, options);
}
