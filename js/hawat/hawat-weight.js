/**
 * Created by alammar on 2/7/17.
 */

export function graphWeightNodes(data) {
    var radius = this.nodeRadius * this.weightNodeSizeScale;
    var grapher = this;
    var t = d3.transition()
        .duration(750);

    // JOIN
    var groupElements = this.neuralNetworkG.selectAll(this.svgElement + " .weight-group")
        .data(data);

    // EXIT old elements not present in new data.
    groupElements.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    groupElements.attr("class", function (d) {
            return "weight-group input-" + d.inputIndex + "-weight output-" + d.outputIndex + "-weight"
        })
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        });

    groupElements.select("#weight0Value")
        .text(function (d) {
            return "W" + (d.outputIndex + 1) + "," + (d.inputIndex + 1);
        });

    // ENTER new elements present in new data.
    var groups = groupElements.enter()
        .append("g")
        .attr("class", function (d) {
            return "weight-group input-" + d.inputIndex + "-weight output-" + d.outputIndex + "-weight"
        })
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        })
        .on("mouseover", function (d) {

            // Expand the node
            var g = d3.select(this);
            g.select("ellipse")
                .transition()
                .duration(50)
                .attr("rx", 50);

            // Make text darker
            g.select("text")
                .classed("weightNodeText-highlighted", true)
                .transition()
                .text(function (d) {
                    return d.value;
                });
            //nn-node-highlighted
            g.moveUp();
            // Show tooltip
            //grapher.tooltipDiv.transition()
            //    .duration(100)
            //    .style("opacity", 1);
            //grapher.tooltipDiv.html(d.value )
            //    .style("left", (d3.event.pageX) + "px")
            //    .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            var g = d3.select(this);
            g.select("ellipse")
                .transition()
                .duration(50)
                .attr("rx", 22);


            g.select("text")
                .classed("weightNodeText-highlighted", false)
                .transition()
                .delay(30)
                .attr("font-size", "12px")
                .text(function (d) {
                    return numberFormatter(d.value);
                });

            //grapher.tooltipDiv.transition()
            //    .duration(200)
            //    .style("opacity", 0);
        });

    groups
        .append("ellipse")
        .attr("class", function (d) {
            if (d.type == "weight") return "outlined-weight-node nn-node";
            else if (d.type == "bias") return "outlined-bias-node nn-node";
        })
        .attr("rx", radius * this.weightNodeWidthRatio)
        .attr("ry", radius)
        .attr("cx", 0)
        .attr("cy", 0);


    groups.append("text")
        .attr("id", "weight0Value")
        .attr("class", "weightNodeText")
        .attr("text-anchor", "middle")
        .attr("y", 3)
        .text(function (d) {
            return numberFormatter(d.value);
        });

    groupElements.moveUp();
};


export function getWeightNodeCoordinates(inputLayerNodeCount,
                                                                           inputNodeCount, outputNodeCount,
                                                                           inputLayerCoordinates, weightLayerXCoordinates,
                                                                           outputLayerCoordinates,
                                                                           biasLayerX, inputLayerX ) {

    // Calculate the angles of the all the Input-to_Bias lines
    var lineAngles = [],
        weightLayerCoordinates = [],
        weightLayerYCoordinates = [];

    for (var j = 0; j < outputNodeCount; j++)
        for (var i = 0; i < inputLayerNodeCount; i++) {

            var opposite = inputLayerCoordinates[i].y - outputLayerCoordinates[j].y,
                adjacent = biasLayerX - inputLayerX,
                angle = Math.atan(opposite / adjacent),
                yCoordinate = inputLayerCoordinates[i].y -
                    Math.tan(angle) *
                    (weightLayerXCoordinates[j] - inputLayerX);

            if (j == 0) {
                weightLayerYCoordinates[i] = [];
                lineAngles[i] = [];
            }
            lineAngles[i][j] = angle;
            weightLayerYCoordinates[i][j] = yCoordinate;

            if (i < inputNodeCount) // Weight
                weightLayerCoordinates.push({
                    x: this.weightLayerXCoordinates[j],
                    y: yCoordinate,
                    outputIndex: j,
                    inputIndex: i,
                    value: this.weights[i][j],
                    type: "weight"
                });
            else // Bias
                weightLayerCoordinates.push({
                    x: this.weightLayerXCoordinates[j],
                    y: yCoordinate,
                    outputIndex: j,
                    inputIndex: i,
                    value: this.biases[j],
                    type: "bias"
                });
        }
    return {lineAngles: lineAngles,
        weightLayerCoordinates: weightLayerCoordinates
        //weightLayerYCoordinates: weightLayerYCoordinates
        };
};
