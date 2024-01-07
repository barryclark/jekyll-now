/**
 * Created by alammar on 12/23/16.
 */


/**
 * Created by alammar on 12/8/16.
 */
var neuralNetworkCalculationViz = function (inputNodeCount, outputNodeCount, svgElement, weights, biases, tableElement,
                                            trainingSet, classes) {
    this.inputNodeCount = inputNodeCount;
    this.inputLayerNodeCount = inputNodeCount + 1;
    this.outputNodeCount = outputNodeCount;
    this.svgElement = svgElement;
    this.graphWidth = 500;
    this.graphHeight = 300;
    this.nodeRadius = 25;
    this.weightNodeSizeScale = 0.4;
    this.weightNodeWidthRatio = 2.2;
    this.weights = weights;
    this.biases = biases;
    weights.push(biases);
    this.weightsAndBiasWeights = weights; // We will treat biases as an input node with value 1, with the bias value as its weight
    this.layerInputs = [];
    this.layerValues = [];
    this.tableElement = tableElement;
    this.trainingSet = trainingSet;
    this.classes = classes;

    this.initializeGraph();
    this.drawGraph();
    this.initializeTable(trainingSet);
};

neuralNetworkCalculationViz.prototype.updateNodeCount = function (nodeType, newValue) {
    if (nodeType == "input") this.inputNodeCount = newValue;
    else if (nodeType == "output") this.outputNodeCount = newValue;

    this.drawGraph();
};

neuralNetworkCalculationViz.prototype.initializeGraph = function () {
    this.nnGraphHolder = d3.select(this.svgElement) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", this.graphWidth)      // make the SVG element 449 pixels wide
        .attr("height", this.graphHeight);    // make the SVG element 249 pixels high
    this.neuralNetworkMargin = {top: 10, right: 10, bottom: 10, left: 10},
        this.neuralNetworkWidth = +this.nnGraphHolder.attr("width") - this.neuralNetworkMargin.left - this.neuralNetworkMargin.right,
        this.neuralNetworkHeight = +this.nnGraphHolder.attr("height") - this.neuralNetworkMargin.top - this.neuralNetworkMargin.bottom,
        this.neuralNetworkG = this.nnGraphHolder.append("g");

    // Define arrow head
    // http://bl.ocks.org/tomgp/d59de83f771ca2b6f1d4
    var defs = this.nnGraphHolder.append("defs");
    defs.append("marker")
        .attrs({
            "id": "arrow",
            "viewBox": "0 -5 10 10",
            "refX": 5,
            "refY": 0,
            "markerWidth": 4,
            "markerHeight": 4,
            "orient": "auto"
        })
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "arrowHead");


    this.tooltipDiv = d3.select(this.svgElement)
        .append("div")
        .attr("class", "nn-tooltip")
        .style("opacity", 0);

};

neuralNetworkCalculationViz.prototype.drawGraph = function () {


    var grapher = this;
    // Let's calculate our coordinates for all the nodes
    // Let's start with the X coordiantes for each layer
    var inputLayerX = this.neuralNetworkMargin.left + this.nodeRadius, // X value of input layer
        biasLayerX = this.neuralNetworkWidth * 2 / 3 - 20, //
        outputLayerX = this.neuralNetworkWidth - this.nodeRadius + this.neuralNetworkMargin.left,
        softmaxLayerX = (outputLayerX + biasLayerX) / 2;

    this.inputLayerX = inputLayerX;
    this.softmaxOutputsX = outputLayerX;
    // Now the Y coordinates for each layer
    // Input layer
    this.getYCoordinateOfNodeInInputLayer = d3.scaleLinear()
        .domain([0, this.inputNodeCount])
        .range([this.neuralNetworkMargin.top + this.nodeRadius,
            grapher.neuralNetworkHeight - this.nodeRadius]);

    this.getYCoordinateOfNodeInOutputLayer = d3.scaleLinear()
        .domain([0, this.inputNodeCount - 1])
        .range([this.neuralNetworkMargin.top + this.nodeRadius,
            grapher.neuralNetworkHeight - this.nodeRadius]);

    this.inputLayerCoordinates = d3.range(this.inputNodeCount).map(function (i) {
        var y = grapher.getYCoordinateOfNodeInInputLayer(i);
        return {x: inputLayerX, y: y, index: i, type: "input"};
    });
    this.inputLayerCoordinates.push({
        x: inputLayerX, y: grapher.getYCoordinateOfNodeInInputLayer(this.inputNodeCount),
        index: this.inputNodeCount, type: "bias"
    });

    // Bias layer
    this.outputLayerCoordinates = d3.range(this.outputNodeCount).map(function (i) {
        var y = grapher.getYCoordinateOfNodeInOutputLayer(i);
        return {x: biasLayerX, y: y, index: i, type: "input"};
    });

    // Output layer
    this.outputLayerCoordinates = d3.range(this.outputNodeCount).map(function (i) {
        var y = grapher.getYCoordinateOfNodeInOutputLayer(i);
        return {x: outputLayerX, y: y, index: i};
    });

    // ======================================================================
    // Weights
    // Calculate weight node locations
    var weightMarginLeft = grapher.nodeRadius + grapher.nodeRadius * grapher.weightNodeWidthRatio - 15,
        weightMarginRight = grapher.nodeRadius;
    // calculate weight layer x coordinate (one "layer" per output)   // Scales for the axes
    this.weightNodeX = d3.scaleLinear()
        .domain([0, this.outputNodeCount])
        .range([inputLayerX + weightMarginLeft, inputLayerX + weightMarginLeft]); //biasLayerX - weightMarginRight ]);
    this.weightLayerXCoordinates = d3.range(this.outputNodeCount).map(function (i) {
        return grapher.weightNodeX(i);
    });
    // Calculate the angles of the all the Input-to_Bias lines
    this.lineAngles = [];
    this.weightLayerCoordinates = [];
    this.weightLayerYCoordinates = [];

    for (var j = 0; j < this.outputNodeCount; j++)
        for (var i = 0; i < this.inputLayerNodeCount; i++) {

            var opposite = this.inputLayerCoordinates[i].y - this.outputLayerCoordinates[j].y,
                adjacent = biasLayerX - inputLayerX,
                angle = Math.atan(opposite / adjacent),
                yCoordinate = this.inputLayerCoordinates[i].y -
                    Math.tan(angle) *
                    (this.weightLayerXCoordinates[j] - inputLayerX);

            if (j == 0) {
                this.weightLayerYCoordinates[i] = [];
                this.lineAngles[i] = [];
            }
            this.lineAngles[i][j] = angle;
            this.weightLayerYCoordinates[i][j] = yCoordinate;

            if (i < this.inputNodeCount) // Weight
                this.weightLayerCoordinates.push({
                    x: this.weightLayerXCoordinates[j],
                    y: yCoordinate,
                    outputIndex: j,
                    inputIndex: i,
                    value: this.weights[i][j],
                    type: "weight"
                });
            else // Bias
                this.weightLayerCoordinates.push({
                    x: this.weightLayerXCoordinates[j],
                    y: yCoordinate,
                    outputIndex: j,
                    inputIndex: i,
                    value: this.biases[j],
                    type: "bias"
                });
        }


    this.inputToBiasLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < this.inputLayerNodeCount; i++)
        for (var j = 0; j < this.outputNodeCount; j++) {
            this.inputToBiasLines.push({
                x1: this.inputLayerCoordinates[i].x,
                y1: this.inputLayerCoordinates[i].y,
                x2: this.outputLayerCoordinates[j].x,
                y2: this.outputLayerCoordinates[j].y,
                inputIndex: i,
                outputIndex: j
            });
        }


    this.BiasToSoftmaxLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < this.outputNodeCount; i++)
        this.BiasToSoftmaxLines.push({
            x1: this.outputLayerCoordinates[i].x,
            y1: this.outputLayerCoordinates[i].y,
            x2: softmaxLayerX - grapher.nodeRadius,
            y2: this.outputLayerCoordinates[i].y
        });


    this.softmaxtoOutputLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < this.outputNodeCount; i++)
        this.softmaxtoOutputLines.push({
            x1: softmaxLayerX + grapher.nodeRadius + 6,
            y1: this.outputLayerCoordinates[i].y,
            x2: outputLayerX - grapher.nodeRadius,
            y2: this.outputLayerCoordinates[i].y,
            outputNode: i,
            class_name: this.classes[i]
        });

    var softmaxCoordinates = {x: softmaxLayerX, y: this.neuralNetworkMargin.top};


    // Graph all the things
    this.graphSoftmaxToOutputArrows(this.softmaxtoOutputLines);
    this.graphBiasToSoftmaxArrows(this.BiasToSoftmaxLines);
    this.graphInputToBiasLines(this.inputToBiasLines);
    this.graphInputNodes(this.inputLayerCoordinates);
    this.graphWeightNodes(this.weightLayerCoordinates);
    //this.graphOutputNodes(this.outputLayerCoordinates);

    this.graphBiasNodes(this.outputLayerCoordinates);
    this.graphSoftmax(softmaxCoordinates);


    var biasNodeY = this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2 - this.nodeRadius;


};

neuralNetworkCalculationViz.prototype.graphInputNodes = function (data) {

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
            if (d.type == "input") return "X" + (d.index + 1);
            else if (d.type == "bias") return "b";
        });

    inputGroups.moveUp();
};


neuralNetworkCalculationViz.prototype.updateInputNodesText = function (newinputs) {
    var inputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .input-group .node-text");
    // Display the text in the input nodes
    inputTexts.text(function (d) {
        if (d.type == "input") {
            return newinputs[d.index];
        }
        else if (d.type == "bias") return "+1";
    });
};


neuralNetworkCalculationViz.prototype.graphWeightNodes = function (data) {
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


neuralNetworkCalculationViz.prototype.feedforward = function (layerNumber) {
    // Calculate the values scaled by the weights (the input to the next layer)
    for (var i = 0; i < this.weightsAndBiasWeights.length; i++)
        for (var j = 0; j < this.weightsAndBiasWeights[i].length; j++) {

            if (j == 0) this.layerInputs[layerNumber][i] = [];
            this.layerInputs[layerNumber][i][j] = this.weightsAndBiasWeights[i][j] * this.inputs[i];

            // Calculate the output nodes
            if (i == 0) this.layerValues[1][j] = 0;

            this.layerValues[layerNumber][j] = this.layerValues[1][j] + this.layerInputs[layerNumber][i][j];
        }
};


neuralNetworkCalculationViz.prototype.graphBiasNodes = function (data) {

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
            var rows = '<table class="input-calculation">', total = 0;
            rows = rows + "<tr><th>#</th><th>input values</th></tr> ";
            for (var i = 0; i < grapher.layerInputs[1].length; i++) {
                rows = rows + "<tr><td class='importance-10'>" + (i + 1) + "</td><td class='importance-20'>" +
                    roundPrecision(grapher.layerInputs[1][i][d.index], 8) + "</td></tr>";

                total = total + grapher.layerInputs[1][i][d.index];
            }
            rows = rows + "<tr class='total-row'><td class='importance-10'>Sum:</td><td class='importance-30'>" + roundPrecision(total, 8) + "</td></tr>";
            rows = rows + "</table>";


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

neuralNetworkCalculationViz.prototype.updateOutputNodesText = function () {
    var outputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .output-group .node-text");
    outputTexts.text(function (d) {
        //return roundPrecision(this.layerValues[1][d.index], 2);
        return numberFormatter(this.layerValues[1][d.index], 2);
    }.bind(this));
};

neuralNetworkCalculationViz.prototype.graphLayerInputs = function (layerInputsArray, layerNumber) {


    var layerInputs = layerInputsArray[layerNumber], layerInputsObjects = [];

    for (var i = 0; i < layerInputs.length; i++)
        for (var j = 0; j < layerInputs[i].length; j++) {
            layerInputsObjects.push({
                input: i,
                output: j,
                value: layerInputs[i][j],
                angle: this.lineAngles[i][j],
                type: i == (layerInputs.length - 1) ? "bias" : "input"
            });
        }


    var layerInputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .layer-" + layerNumber + "-input-groups")
        .data(layerInputsObjects);

    layerInputGroups.select("text").text(function (d) {
        return numberFormatter(d.value, 5);
    });
    //var texts = layerInputGroups.selectAll("text");

    //texts.text(function(d){
    //    console.log(d.value, numberFormatter(d.value, 5))
    //    return numberFormatter(d.value, 5);
    //});


    // Possible change: Make into its own function. Create elements on initialization, only update text on input change
    var grapher = this, xCoordinate = 225, offset = 4;
    var layerInputselements = layerInputGroups.enter()
        .append("g")
        .attrs({
            class: "layer-" + layerNumber + "-input-groups",
            transform: function (d) {
                // Some geometry to calculate the y coordinate of the input value
                // The Y coordinate relative to the input node is really the opposite of the angle
                // Its length is the tan of the angle * the adjacent
                var yRelativeToInputNode = Math.tan(grapher.lineAngles[d.input][d.output]) *
                        (xCoordinate - grapher.inputLayerX),
                // Now to transform the relative Y to absolute Y
                    yCoordinate = grapher.inputLayerCoordinates[d.input].y - yRelativeToInputNode - offset,
                    opposite = grapher.outputLayerCoordinates[d.output].y - yCoordinate,
                    adjacent = grapher.lineAngles[d.input][d.output] != 0 ? opposite / Math.tan(-grapher.lineAngles[d.input][d.output]) : 0.0001,
                    adjustedXCoordinate = xCoordinate - adjacent;

                return "translate(" + xCoordinate + "," + yCoordinate + ")";
            }
        });


    layerInputselements.append("text")
        .attrs({
            class: function (d) {
                colorClass = d.type == "input" ? "layer-input-value-from-input" : "layer-input-value-from-bias";
                return "layer-" + layerNumber + "-inputs layer-input-value output-" + d.output + " input-" + d.input + " " + colorClass
            },
            "text-anchor": "middle",
            x: 0,
            y: 0,
            transform: function (d) {
                return "rotate(" + (-Math.degrees(d.angle)) + ")"
            }
        })
        .text(function (d) {
            if (d.value > 1) return Math.round(d.value);
            if (d.value > 0.0001) return roundPrecision(d.value, 5);
            else
                return d.value.toExponential(2)
        });
};


neuralNetworkCalculationViz.prototype.updateLayerInputs = function (layerInputsArray, layerNumber) {
    var layerInputtext = this.neuralNetworkG.selectAll(this.svgElement + " .layer-" + layerNumber + "-input-groups layer-" + layerNumber + "-input-groups text");

    layerInputtext.text(function (d) {
        return layerInputsArray[1][d.index];
    }.bind(this))
};


neuralNetworkCalculationViz.prototype.graphSoftmaxOutputs = function (softmaxOutputs) {
    var grapher = this;
    var data = [];
    for (var i = 0; i < this.softmaxOutputs.length; i++) {
        data.push({
            index: i,
            value: softmaxOutputs[i]
        })
    }

    var maxValueIndex = d3.max(this.softmaxOutputs)

    var softmaxOutputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-group")
        .data(data);

    softmaxOutputGroups.select("text")
        .attr("class", function(d){
            if (d.value == maxValueIndex)
                return "highlighted-softmax-output";
            else
                return "dim-softmax-output";
        })
        .text(function (d) {

            return numberFormatter(d.value * 100, 2) + "%"
        });

    var softmaxOutputElements = softmaxOutputGroups.enter()
        .append("g")
        .attrs({
            class: "softmax-output-group",
            transform: function (d) {
                return "translate(" + (grapher.softmaxOutputsX - 8) + ", " + (grapher.getYCoordinateOfNodeInOutputLayer(d.index) + 5) + ")";
            },
            //"font-size": function(d){return 10 + d.value * 8 }
        });

    softmaxOutputElements.append("text")
        .attr("class", function(d){
            if (d.value == maxValueIndex)
                return "highlighted-softmax-output"
            else
                return "dim-softmax-output"

        })
        .text(function (d) {
            return numberFormatter(d.value * 100, 2) + "%"
        });
};

neuralNetworkCalculationViz.prototype.graphInputToBiasLines = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .input-to-bias-line")
        .data(data);

    inputToBiasLines.exit()
        .remove();

    var classes = "nn-arrow input-to-bias-line";

    inputToBiasLines
        .attrs({
            class: function (d) {
                return classes + " input-" + d.inputIndex + " output-" + d.outputIndex
            },
            x1: function (d) {
                return d.x1
            }, // From the center of the input node
            y1: function (d) {
                return d.y1
            },
            x2: function (d) {
                return d.x2
            },    // To the center of the bias node
            y2: function (d) {
                return d.y2
            }
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": function (d) {
                return classes + " input-" + d.inputIndex + " output-" + d.outputIndex
            },
            "x1": function (d) {
                return d.x1
            }, // From the center of the input node
            "y1": function (d) {
                return d.y1
            },
            "x2": function (d) {
                return d.x2
            },    // To the center of the bias node
            "y2": function (d) {
                return d.y2
            }
        });

};


neuralNetworkCalculationViz.prototype.graphBiasToSoftmaxArrows = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .bias-to-softmax-line")
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "nn-arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            x1: function (d) {
                return d.x1
            }, // From the center of the input node
            y1: function (d) {
                return d.y1
            },
            x2: function (d) {
                return d.x2
            },    // To the center of the bias node
            y2: function (d) {
                return d.y2
            }
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "nn-arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            "x1": function (d) {
                return d.x1
            }, // From the center of the input node
            "y1": function (d) {
                return d.y1
            },
            "x2": function (d) {
                return d.x2
            },    // To the center of the bias node
            "y2": function (d) {
                return d.y2
            }
        });

};


neuralNetworkCalculationViz.prototype.graphSoftmaxToOutputArrows = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-to-output-line")
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "nn-arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            x1: function (d) {
                return d.x1
            }, // From the center of the input node
            y1: function (d) {
                return d.y1
            },
            x2: function (d) {
                return d.x2
            },    // To the center of the bias node
            y2: function (d) {
                return d.y2
            }
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "nn-arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            "x1": function (d) {
                return d.x1
            }, // From the center of the input node
            "y1": function (d) {
                return d.y1
            },
            "x2": function (d) {
                return d.x2
            },    // To the center of the bias node
            "y2": function (d) {
                return d.y2
            }
        });




    var softmaxOutputClassName = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-class-name")
        .data(data);

    softmaxOutputClassName.exit()
        .remove();

    softmaxOutputClassName
    .append('text')
        .attrs({
            "class": function(d){
                return "softmax-output-class-name "+  d.highlightedOrDim
            },
            "x": function (d) {
                return d.x1
            }, // From the center of the input node
            "y": function (d) {
                return d.y1 + 25
            }
        })
        .text(function(d, i){
            return d.class_name
        });

    softmaxOutputClassName.enter()
        .append('text')
        .attrs({
            "class": "softmax-output-class-name",
            "x": function (d) {
                return d.x1
            }, // From the center of the input node
            "y": function (d) {
                return d.y1 + 25
            }
        })
        .text(function(d, i){
            return d.class_name
        });


};

neuralNetworkCalculationViz.prototype.highlightTopSoftmaxOutput = function () {

    var highlightOrDimClass = '', topClassIndex = -1;
    if(this.softmaxOutputs){
        topClassIndex = this.softmaxOutputs.indexOf(d3.max(this.softmaxOutputs))
    }

    var softmaxOutputClassName = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-class-name")
    softmaxOutputClassName
        .attr("class", function(d, i){
            var classValue = "softmax-output-class-name ";

            if(d.outputNode == topClassIndex)
                classValue = classValue+ "highlighted-softmax-output";
            else
                classValue = classValue+ "dim-softmax-output";

            return classValue
        })

};


neuralNetworkCalculationViz.prototype.initializeTable = function (trainingSet) {


    var table = d3.select(this.tableElement).append('table');


    var columns = [
        {head: 'Age', cl: 'title', html: ƒ('age')},
        {head: 'Sex', cl: 'center', html: ƒ('sex')},
        {head: 'Survived', cl: 'center', html: ƒ('survived')}
    ];

    table.append('thead').append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('class', ƒ('cl'))
        .text(ƒ('head'));

    var viz = this;
    table.append('tbody')
        .selectAll('tr')
        .data(trainingSet).enter()
        .append('tr')
        .on("mouseover", function (d) {
            viz.setInput([d.age, d.sex]);
        })
        .selectAll('td')
        .data(function (row, i) {
            // evaluate column objects against the current row
            return columns.map(function (c) {
                var cell = {};
                d3.keys(c).forEach(function (k) {
                    cell[k] = typeof c[k] == 'function' ? c[k](row, i) : c[k];
                });
                return cell;
            });
        })
        .enter()
        .append('td')
        .html(ƒ('html'))
        .attr('class', ƒ('cl'));
};


neuralNetworkCalculationViz.prototype.graphSoftmax = function (data) {

    var softmax = this.neuralNetworkG.selectAll(this.svgElement + " .softmax")
        .data([data]);


    var softmaxGroup = softmax.enter()
        .append("g")
        .attr("class", "softmax")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        });

    // Define function to create and open tooltip
    var activate = function(d){
        if( viz.layerValues[1] ){
            // Set up the tooltip to show the inputs and their sum
            var rows = '<table class="softmax-calculation">', total = 0;
            rows = rows + "<tr>" +
                "<th>Softmax input</th>" +
                "<th>Calculation</th>" +
                "<th>Softmax output</th>" +
                "<th>Class</th>" +
                "</tr>";

            var sum_term = viz.layerValues[1].map(function(d){return "e^{" + numberFormatter(d, 2) + "}"}).join(" + ");
            var exponential_terms = [];
            var softMaxTopResult = viz.softmaxOutputs.indexOf(d3.max(viz.softmaxOutputs));
            for( var i = 0; i < viz.layerValues[1].length; i ++ ){
                exponential_terms[i] = " e^{" + numberFormatter(viz.layerValues[1][i], 2)+"}";
                var eq =  katex.renderToString("\\frac{"+exponential_terms[i]+"}{"+sum_term+"}");
                // If the node has the top softmax value, highlight it
                var highlight_cell = softMaxTopResult == i ? "highlighted" : "";

                node_row = "<tr>" +
                    "<td class='input'>"+numberFormatter(viz.layerValues[1][i], 2)+"</td>" +
                    "<td class='calculation'> " + eq +"</td>" +
                    "<td class='"+highlight_cell+"'>"+ numberFormatter(viz.softmaxOutputs[i], 2)+"</td>" +
                    "<td class='class-name "+highlight_cell+"'>"+ viz.classes[i]+"</td>" +
                    "</tr>";

                rows = rows + node_row;
            }

            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(rows)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        }
        else{
            var html = "Hover-over or tap one of the row in the table, then you'll see the softmax calculation here.";

            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(html)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        }
    };

    // Define function to close tooltip
    var deactivate = function(d){
        viz.tooltipDiv.transition()
            .duration(200)
            .style("opacity", 0);
    };


    viz = this;
    softmaxGroup
        .append("rect")
        .attr("class", "outlined-softmax-node nn-node")
        .attr("width", this.nodeRadius * 1.5)
        .attr("height", this.neuralNetworkHeight)
        .attr("rx", this.nodeRadius / 4)
        .attr("ry", this.nodeRadius / 4)
        .attr("x", 0 - this.nodeRadius / 2)
        .attr("y", 0)
        .on("mouseover", activate)
        .on("touchenter", activate)
        .on("touchmove", function(d){
            d3.event.preventDefault()
        })
        .on("mouseout", deactivate)
        .on("touchleave", deactivate);


    softmaxGroup.append("text")
        .attr("id", "biasValue")
        .attr("text-anchor", "middle")
        .attr("x", this.neuralNetworkHeight / 2)
        .attr("y", -2)
        .attr("transform", "rotate(90)")
        .text("softmax");

};


neuralNetworkCalculationViz.prototype.setInput = function (input) {


    this.inputs = input;
    this.layerInputs[1] = [];
    this.layerValues[1] = [];
    this.inputs.push(1); // This will be our input bias node

    this.updateInputNodesText(input);

    // Multiply inputs by weights and calculate the next layer value
    this.feedforward(1);

    // Display layer 1 input values above their lines
    this.graphLayerInputs(this.layerInputs, 1);

    // Display the text on the output nodes
    this.updateOutputNodesText();

    // Calculate the softmax values and final output
    this.softmaxOutputs = softmax(this.layerValues[1]);

    // Display softmax and final output
    this.graphSoftmaxOutputs(this.softmaxOutputs);

    // Highlight the class name with the highest softmax score
    this.highlightTopSoftmaxOutput()

};


var weights = [[-0.11510573],
    [0.19847003]];
var biases = [-0.07722114];
//
//var weights = [[-0.11510573, -0.08358583],
//    [0.19847003, -1.00007236]];
//var biases = [-0.07722114, 0.07722116];

//var classes=["Survived", "Didn't survive"];

var trainingSet = [
    {age: 22, sex: 0, survived: 0},
    {age: 38, sex: 1, survived: 1},
    {age: 26, sex: 1, survived: 1}
];

var classes=["Survived"];

//var weights = [[2.14149564e-04, -2.14149914e-04],
//    [5.12748193e-05, -5.12747974e-05]];
//var biases = [1.19155184e-05, -1.19155284e-05];

var nnCalculationViz = new neuralNetworkCalculationViz(2, 1, "#neural-network-calculation-viz", weights, biases,
    "#neural-network-calculation-table", trainingSet, classes);


//var input = [22,  0];
//nnCalculationViz.setInput(input);
