$(document).ready(function() {
    var fill = d3.scale.category20();
    var layout = d3.layout.cloud().size([1000, 500]).words([
        ['Thoroman', 184],
        ['Thurman', 90],
        ['Treber', 60],
        ['Tumbleson', 50],
        ['Thoroughman', 42],
        ['Sproull', 38],
        ['Traber', 32],
        ['Thomas', 28],
        ['Smith', 28],
        ['Jones', 26],
        ['Greene', 25],
        ['Hendrix', 24],
        ['Sprinkle', 24],
        ['Holmes', 21],
        ['Moore', 20],
        ['Hunter', 18],
        ['Reed', 17],
        ['Hohn', 17],
        ['Crawford', 16],
        ['Wittenmyer', 16]
    ].map(function(d) {
        return {
            text: d[0],
            size: d[1]
        }
    })).rotate(function() {
        return ~~(Math.random() * 2) * 90;
    }).font('Impact').fontSize(function(d) {
        return d.size;
    }).on('end', draw);
    layout.start();

    function draw(w) {
        d3.select('#lastNamesCloud').append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')').selectAll('text').data(w).enter().append('text').style('font-size', function(d) {
            return d.size + 'px';
        }).style('font-family', 'Impact').style('fill', function(d, i) {
            return fill(i);
        }).attr('text-anchor', 'middle').attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        }).text(function(d) {
            return d.text;
        });
    }
});
