google.charts.load('current', {'packages':['sankey']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows([

        [ 'music meter',    'meter symbols',    1 ],
        [ 'meter symbols',  'meter signature',  1 ],

        [ 'rperm index (random)', 'rperm',      1 ],
        
        [ 'mode',           'mode systems',     1 ],
        [ 'mode systems',   'key signature',    1 ],
        [ 'mode',           'mode scales',      1 ],
        
        [ 'vperm index (random)', 'vperm',      1 ],
        
        [ 'syntagma',       'pinax',            1 ],
        [ 'pinax',          'column',           1 ],
        [ 'column',         'vperm',            1 ],
        [ 'column',         'rperm meters',     1 ],
        [ 'rperm meters',   'rperm',            1 ],

        [ 'text meter',     'pinax',            1 ],
        [ 'syllable text',  'column',           1 ],
        [ 'syllable length', 'column',          1 ],
        [ 'line position',  'column',           1 ],

        [ 'vperm',          'pitch class',      1 ],
        [ 'rperm',          'duration',         1 ],

        [ 'style',          'syntagma',         1 ],
        [ 'music meter',    'rperm meters',     1 ], 
        
        
        [ 'pitch class',    'mode scales',      1 ],
        
        [ 'mode scales',    'accidental',       1 ],

        [ 'pitch class',    'pitch name',       1 ],
        [ 'pitch class',    'clefs/ranges',     1 ],
        [ 'clefs/ranges',   'clef',             1 ],
        [ 'clefs/ranges',   'octave',           1 ]
    ]);

    var options = {
        width: 600,
        height: 400,
        sankey: {
            node: { label: { bold: true 
                            , labelPadding: 50
                            }
//                    , nodePadding : 20
                  }
            , link: {
                colorMode: 'gradient'
            }
        }
    };

    var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
    chart.draw(data, options);
}

