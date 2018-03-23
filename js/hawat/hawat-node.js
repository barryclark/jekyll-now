/**
 * Created by alammar on 2/7/17.
 */
export function graphNode(data) {

    var grapher = this;
    // JOIN
    var inputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .output-group")
        .data(data);

    // EXIT old elements not present in new data.
    inputGroups.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    inputGroups.attr("class", "output-group")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this));

    inputGroups.select("#output-name")
        .text(function (d) {
            return "Y" + (d.index + 1)
        });


    // ENTER new elements present in new data.
    var inputs = inputGroups.enter()
        .append("g")
        .attr("class", "output-group")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this))
        .on("mouseover", function (d) {

            // Highlight the lines connected to this node
            d3.selectAll(grapher.svgElement + " line.output-" + d.index)
                .classed("nn-arrow-highlighted", true);

            // Highlight the weights connected to the node
            var weightGroups = d3.selectAll(grapher.svgElement + " .output-" + d.index + "-weight")
            weightGroups.selectAll("ellipse")
                .classed("nn-node-highlighted", true);


            var layerInputs = d3.selectAll(grapher.svgElement + " .layer-1-input-groups .output-" + d.index)
                .classed("layer-input-value-highlighted", true);
            var xValue = d.x;

            // Set up the tooltip to show the inputs and their sum
            var rows = '<table class="input-calculation">', total = 0,
                classToColorNumber = 'weight-layer-input';
            rows = rows + "<tr><th style='text-align:center'>#</th><th>input value</th></tr> ";
            for (var i = 0; i < grapher.layerInputs[1].length; i++) {

                if( i + 1 == grapher.layerInputs[1].length)
                    classToColorNumber = 'bias-layer-input';

                rows = rows + "<tr><td class='importance-10'>" + (i + 1) + "</td><td class='number "+
                    classToColorNumber+"'>" +
                    roundPrecision(grapher.layerInputs[1][i][d.index], 5) + "</td></tr>";

                total = total + grapher.layerInputs[1][i][d.index];
            }
            rows = rows + "<tr class='total-row'><td class='importance-10'>Sum:</td><td class='sum-value number'>"
                + roundPrecision(total, 5) + "</td></tr>";
            rows = rows + "</table>";


            var matrix = this.getScreenCTM()
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            //tooltip.html(d)
            //    .style("left", (window.pageXOffset + matrix.e + 15) + "px")
            //    .style("top", (window.pageYOffset + matrix.f - 30) + "px");

            grapher.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            grapher.tooltipDiv.html(rows)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");

        })
        .on("mouseout", function (d) {

            // Stop highlighting the lines connected to this node
            d3.selectAll(grapher.svgElement + " .output-" + d.index)
                .classed("nn-arrow-highlighted", false);


            // Stop highlighting the weights connected to the node
            var weightGroups = d3.selectAll(grapher.svgElement + " .output-" + d.index + "-weight")
            weightGroups.selectAll("ellipse")
                .classed("nn-node-highlighted", false);


            // Stop highlighting the weights connected to the node
            var layerInputs = d3.selectAll(grapher.svgElement + " .layer-1-input-groups .output-" + d.index)
                .classed("layer-input-value-highlighted", false);
            //weightGroups.selectAll("ellipse")
            //    .classed("nn-node-highlighted", false);


            grapher.tooltipDiv.transition()
                .duration(200)
                .style("opacity", 0);
        });
    ;

    inputs
        .append("circle")
        .attr("class", "outlined-output-node nn-node")
        .attr("r", this.nodeRadius)
        .attr("cx", 0)
        .attr("cy", 0);

    inputs.append("text")
        .attr("id", "output-name")
        .attr("class", "node-text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 5);
    //.text(function(d){
    //    return "Y" + (d.index +1)
    //});


};


export function updateOutputNodesText() {
    var outputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .output-group .node-text");
    outputTexts.text(function (d) {
        //return roundPrecision(this.layerValues[1][d.index], 2);
        return numberFormatter(this.layerValues[1][d.index], 2);
    }.bind(this));
};


export function getOutputNodeCoordinates(outputNodeCount, biasLayerX, getYCoordinateOfNodeInOutputLayer) {
    var outputLayerCoordinates = d3.range(outputNodeCount).map(function (i) {
        var y = getYCoordinateOfNodeInOutputLayer(i);
        return {x: biasLayerX, y: y, index: i, type: "input"};
    }.bind(this));

    return outputLayerCoordinates;
};

