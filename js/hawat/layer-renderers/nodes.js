/**
 * Created by alammar on 3/12/17.
 */
import * as util from '../hawat-util'
var nodes = {
        getNodeRenderingDetails: function (layer, properties) {

            var layerNodesYScale = util.getNodeYCoordinate(layer.nodes, properties.activeRegionHeight,
                properties.margins.top, properties.nodeRadius);

            var layerCoordinates = getNodeCoordinates(layer.nodes, layer.x, layerNodesYScale);
            return layerCoordinates;
        },

        draw: function (layer, properties, activeRegionSVGGroup, layerInputs, tooltipDiv) {
            console.log("layer", layer);
            var data = layer.nodeRenderingDetails,
                containerElement = properties.containerElement;

            // JOIN
            // Each node has an SVG group of its own. In that group is an SVG circle and SVG text label
            var nodeGroups = activeRegionSVGGroup.selectAll(containerElement + " .layer-" + layer.index)
                .data(data);

            // EXIT old elements not present in new data.
            nodeGroups.exit()
                .attr("class", "exit")
                .remove();

            // UPDATE old elements present in new data.
            nodeGroups.attr("class", "layer-" + layer.index + " layer-group")
                // Change the location in case the number of nodes has changed
                .attr("transform", function (d) {
                    return "translate(" +
                        (d.x)
                        + ","
                        + (d.y) + ")";
                }.bind(this));

            nodeGroups.select("#output-name")
                .text(function (d) {
                    return "Y" + (d.index + 1)
                });


            // ENTER new elements present in new data.
            var inputs = nodeGroups.enter()
                .append("g")
                .attr("class", ".layer-" + layer.index + " layer-group")
                .attr("transform", function (d) {
                    return "translate(" +
                        (d.x)
                        + ","
                        + (d.y) + ")";
                })
                .on("mouseover", function (d) {

                        if (layerInputs != '') {

                            // Highlight the lines connected to this node
                            d3.selectAll(activeRegionSVGGroup + " line.output-" + d.index)
                                .classed("nn-arrow-highlighted", true);

                            // Highlight the weights connected to the node
                            var weightGroups = d3.selectAll(activeRegionSVGGroup + " .output-" + d.index + "-weight");
                            weightGroups.selectAll("ellipse")
                                .classed("nn-node-highlighted", true);


                            var layerInputs = d3.selectAll(activeRegionSVGGroup + " .layer-1-input-groups .output-" + d.index)
                                .classed("layer-input-value-highlighted", true);
                            var xValue = d.x;

                            // Set up the tooltip to show the inputs and their sum
                            var rows = '<table class="input-calculation">', total = 0,
                                classToColorNumber = 'weight-layer-input';
                            rows = rows + "<tr><th style='text-align:center'>#</th><th>input value</th></tr> ";
                            for (var i = 0; i < layerInputs[1].length; i++) {

                                if (i + 1 == layerInputs[1].length)
                                    classToColorNumber = 'bias-layer-input';

                                rows = rows + "<tr><td class='importance-10'>" + (i + 1) + "</td><td class='number " +
                                    classToColorNumber + "'>" +
                                    roundPrecision(layerInputs[1][i][d.index], 5) + "</td></tr>";

                                total = total + layerInputs[1][i][d.index];
                            }
                            rows = rows + "<tr class='total-row'><td class='importance-10'>Sum:</td><td class='sum-value number'>"
                                + roundPrecision(total, 5) + "</td></tr>";
                            rows = rows + "</table>";


                            var matrix = this.getScreenCTM()
                                .translate(+this.getAttribute("cx"), +this.getAttribute("cy"));
                            //tooltip.html(d)
                            //    .style("left", (window.pageXOffset + matrix.e + 15) + "px")
                            //    .style("top", (window.pageYOffset + matrix.f - 30) + "px");

                            tooltipDiv.transition()
                                .duration(100)
                                .style("opacity", 1);
                            tooltipDiv.html(rows)
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY) + "px");
                        }


                    }
                )
                .
                on("mouseout", function (d) {

                    if (layerInputs != '') {
                        // Stop highlighting the lines connected to this node
                        d3.selectAll(activeRegionSVGGroup + " .output-" + d.index)
                            .classed("nn-arrow-highlighted", false);


                        // Stop highlighting the weights connected to the node
                        var weightGroups = d3.selectAll(activeRegionSVGGroup + " .output-" + d.index + "-weight")
                        weightGroups.selectAll("ellipse")
                            .classed("nn-node-highlighted", false);


                        // Stop highlighting the weights connected to the node
                        var layerInputs = d3.selectAll(activeRegionSVGGroup + " .layer-1-input-groups .output-" + d.index)
                            .classed("layer-input-value-highlighted", false);
                        //weightGroups.selectAll("ellipse")
                        //    .classed("nn-node-highlighted", false);


                        tooltipDiv.transition()
                            .duration(200)
                            .style("opacity", 0);
                    }
                });


            inputs
                .append("circle")
                .attr("class", "outlined-output-node nn-node")
                .attr("r", properties.nodeRadius)
                .attr("cx", 0)
                .attr("cy", 0);

            inputs.append("text")
                .attr("id", "output-name")
                .attr("class", "node-text")
                .attr("text-anchor", "middle")
                .attr("x", 0)
                .attr("y", 5);


        }
    };


function getNodeCoordinates(nodeCount, layerXCoordinate, getYCoordinateOfNodeLayer) {


    var nodeLayerCoordinates = d3.range(nodeCount).map(function (i) {
        var y = getYCoordinateOfNodeLayer(i);
        return {x: layerXCoordinate, y: y, index: i, type: "input"};
    });

    return nodeLayerCoordinates;

};

export {nodes};