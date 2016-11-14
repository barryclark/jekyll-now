$(document).ready(function() {
    var fill = d3.scale.category20();
    var layout = d3.layout.cloud().size([700, 500]).words([
        ['John', 76],
        ['Mary', 72],
        ['William', 67],
        ['Sarah', 53],
        ['Charles', 40],
        ['George', 38],
        ['James', 37],
        ['Samuel', 37],
        ['Thomas', 32],
        ['Elizabeth', 29],
        ['Joseph', 25],
        ['Oliver', 23],
        ['Robert', 23],
        ['Anna', 19],
        ['Jane', 14],
        ['Martha', 14],
        ['Nancy', 12],
        ['Eliza', 11],
        ['Jacob', 11],
        ['Annie', 10]
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
        d3.select('#firstNamesCloud').append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')').selectAll('text').data(w).enter().append('text').style('font-size', function(d) {
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
