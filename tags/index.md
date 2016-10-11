---
layout: default
permalink: /tags/
javascripts: [/js/d3.min.js, /js/d3.layout.cloud.js]
csses: [/css/tags.css]
---

<hr />
  <nav class="tags" style="float: none;">
    {% assign tags = site.tags | sort %}
    {% for tag in tags %}
      {% capture page_name %}/tags/{{ tag[0] | replace: ' ', '_' }}/{% endcapture %}
      <a href="{{ page_name }}" 
        {% if forloop.first or page.title == tag[0] %}
          class="{% if forloop.first %}first{% endif %}"
        {% endif %}>
        {{ tag[0] }}
      </a>{% unless forloop.last %}|{% endunless %}
    {% endfor %}
  </nav>
<hr />

<div id="tagCloud" class="tagCloud" style=""></div>
<script type="text/javascript">
    var fill = d3.scale.category20();
    
    var words = [{% for tag in site.tags %}{text: '{{ tag[0] }}', size: '{{ tag[1] | size }}'}{% unless forloop.last %},{% endunless %}{% endfor %}];
    
    var min = words.reduce(function(p,c){return Math.min(p, c.size);},0);
    var max = words.reduce(function(p,c){return Math.max(p, c.size);},0);
    var multiplier = function(size) {return 15 + (25 - 15) * (size - min) / (max - min);};
    
    var layout = d3.layout.cloud().size([700, 500]).words(words).rotate(function() {
        return ~~(Math.random() * 2) * 90;
    }).font('Impact').fontSize(function(d) {
        return multiplier(d.size);
    }).on('end', draw);
    layout.start();
    function draw(w) {
        d3.select('#tagCloud').append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')').selectAll('text').data(w).enter().append('text').style('font-size', function(d) {
            return d.size + 'px';
        }).style('font-family', 'Impact').style('fill', function(d, i) {
            return fill(i);
        }).attr('text-anchor', 'middle').attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        }).text(function(d) {
            return d.text;
        });
    }
</script>
