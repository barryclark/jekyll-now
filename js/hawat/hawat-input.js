

export function graphInputNodes (data) {

    var grapher = this;
    // JOIN
    var inputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .input-group")
        .data(data);

    // EXIT old elements not present in new data.
    inputGroups.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    inputGroups.attr("class", "input-group")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this));

    inputGroups.select("#input-name")
        .text(function (d) {
            return "X" + (d.index + 1)
        });


    // ENTER new elements present in new data.
    var inputs = inputGroups.enter()
        .append("g")
        .attr("class", "input-group")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this))
        .on("mouseover", function (d) {

            // Highlight the lines connected to this node
            d3.selectAll(grapher.svgElement + " line.input-" + d.index)
                .classed("nn-arrow-highlighted", true);

            // Highlight the weights connected to the node
            var weightGroups = d3.selectAll(grapher.svgElement + " .input-" + d.index + "-weight")
            weightGroups.selectAll("ellipse")
                .classed("nn-node-highlighted", true);
            var layerInputs = d3.selectAll(grapher.svgElement + " .layer-1-input-groups .input-" + d.index)
                .classed("layer-input-value-highlighted", true);
            //.classed("layer-input-value-highlighted", true);
        })
        .on("mouseout", function (d) {


            // Stop highlighting the lines connected to this node
            d3.selectAll(grapher.svgElement + " .input-" + d.index)
                .classed("nn-arrow-highlighted", false);


            // Highlight the weights connected to the node
            var weightGroups = d3.selectAll(grapher.svgElement + " .input-" + d.index + "-weight")
            weightGroups.selectAll("ellipse")
                .classed("nn-node-highlighted", false);

            var layerInputs = d3.selectAll(grapher.svgElement + " .layer-1-input-groups .input-" + d.index)
                .classed("layer-input-value-highlighted", false);
        });

    inputs
        .append("circle")
        .attr("class", function (d) {
            if (d.type == "input") return "outlined-input-node nn-node";
            else if (d.type == "bias") return "outlined-bias-node nn-node";
        })
        .attr("r", this.nodeRadius)
        .attr("cx", 0)
        .attr("cy", 0);

    inputs.append("text")
        .attr("id", "input-name")
        .attr("class", "node-text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 5)
        .text(function (d) {
            if (d.type == "input")
                if(d.index == 0)
                return "Age";
                else
                return "Sex";
            else if (d.type == "bias") return "Bias";
        });

    inputGroups.moveUp();
};


export function updateInputNodesText(newinputs) {
    var inputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .input-group .node-text");
    // Display the text in the input nodes
    inputTexts.text(function (d) {
        if (d.type == "input") {
            return newinputs[d.index];
        }
        else if (d.type == "bias") return "+1";
    });
};


export function getInputNodeCoordinates(inputNodeCount, inputLayerX, getYCoordinateOfNodeInInputLayer) {

    var inputLayerCoordinates = d3.range(inputNodeCount).map(function (i) {
        var y = getYCoordinateOfNodeInInputLayer(i);
        return {x: inputLayerX, y: y, index: i, type: "input"};
    }.bind(this));

    //  Add the bias node to the end of the input layer
    inputLayerCoordinates.push({
        x: inputLayerX, y: getYCoordinateOfNodeInInputLayer(inputNodeCount),
        index: inputNodeCount, type: "bias"
    });

    return inputLayerCoordinates;
};