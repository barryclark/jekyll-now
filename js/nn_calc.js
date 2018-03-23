(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function graphInputNodes (data) {

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
            var weightGroups = d3.selectAll(grapher.svgElement + " .input-" + d.index + "-weight");
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
            var weightGroups = d3.selectAll(grapher.svgElement + " .input-" + d.index + "-weight");
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
}


function updateInputNodesText(newinputs) {
    var inputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .input-group .node-text");
    // Display the text in the input nodes
    inputTexts.text(function (d) {
        if (d.type == "input") {
            return newinputs[d.index];
        }
        else if (d.type == "bias") return "+1";
    });
}


function getInputNodeCoordinates(inputNodeCount, inputLayerX, getYCoordinateOfNodeInInputLayer) {

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
}

/**
 * Created by alammar on 2/7/17.
 */

function graphWeightNodes(data) {
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
}


function getWeightNodeCoordinates(inputLayerNodeCount,
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
}

/**
 * Created by alammar on 2/7/17.
 */
function graphNode(data) {

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
            var weightGroups = d3.selectAll(grapher.svgElement + " .output-" + d.index + "-weight");
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
            var weightGroups = d3.selectAll(grapher.svgElement + " .output-" + d.index + "-weight");
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


}


function updateOutputNodesText() {
    var outputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .output-group .node-text");
    outputTexts.text(function (d) {
        //return roundPrecision(this.layerValues[1][d.index], 2);
        return numberFormatter(this.layerValues[1][d.index], 2);
    }.bind(this));
}


function getOutputNodeCoordinates(outputNodeCount, biasLayerX, getYCoordinateOfNodeInOutputLayer) {
    var outputLayerCoordinates = d3.range(outputNodeCount).map(function (i) {
        var y = getYCoordinateOfNodeInOutputLayer(i);
        return {x: biasLayerX, y: y, index: i, type: "input"};
    }.bind(this));

    return outputLayerCoordinates;
}

/**
 * Created by alammar on 2/7/17.
 */
function graphLayerInputs(layerInputsArray, layerNumber) {


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
                var colorClass = d.type == "input" ? "layer-input-value-from-input" : "layer-input-value-from-bias";
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
            return numberFormatter(d.value, 5);
            //if (d.value > 1) return Math.round(d.value);
            //if (d.value > 0.0001) return roundPrecision(d.value, 5);
            //else
            //    return d.value.toExponential(2)
        });
}


function updateLayerInputs(layerInputsArray, layerNumber) {
    var layerInputtext = this.neuralNetworkG.selectAll(this.svgElement + " .layer-" + layerNumber + "-input-groups layer-" + layerNumber + "-input-groups text");

    layerInputtext.text(function (d) {
        return numberFormatter(layerInputsArray[1][d.index], 5);
    }.bind(this));

}

/**
 * Created by alammar on 2/7/17.
 */

function graphSoftmax(data) {

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

                var node_row = "<tr>" +
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


    var viz = this;
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
            d3.event.preventDefault();
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

}


function graphSoftmaxOutputs (softmaxOutputs) {
    var grapher = this;
    var data = [];
    for (var i = 0; i < this.softmaxOutputs.length; i++) {
        data.push({
            index: i,
            value: softmaxOutputs[i]
        });
    }

    var maxValueIndex = d3.max(this.softmaxOutputs);

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
}




function highlightTopSoftmaxOutput(){

    var highlightOrDimClass = '', topClassIndex = -1;
    if(this.softmaxOutputs){
        topClassIndex = this.softmaxOutputs.indexOf(d3.max(this.softmaxOutputs));
    }

    var softmaxOutputClassName = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-class-name");
    softmaxOutputClassName
        .attr("class", function(d, i){
            var classValue = "softmax-output-class-name ";

            if(d.outputNode == topClassIndex)
                classValue = classValue+ "highlighted-softmax-output";
            else
                classValue = classValue+ "dim-softmax-output";

            return classValue
        });

}




softmax = function (input){

    if( !(input instanceof Array))
        throw(TypeError("Input passed into softmax() is not an array. softmax() expects an array. Input: "+ input, "nnVizUtils.js"));

    var output = [], expSum = 0;

    // Calculate the sum of exp's
    for (var i = 0; i < input.length; i++){
        if( !(typeof(input[i]) == "number") ){
            throw(TypeError("An element in the array passed to softmax() is not a number. softmax() expects an array of numbers. Input: "+ input[i], "nnVizUtils.js"));
        }
        expSum = expSum + Math.exp(input[i]);
    }

    for (var j = 0; j < input.length; j++)
        output[j] = Math.exp(input[j]) / expSum;

    return output;
};

/**
 * Created by alammar on 2/11/17.
 */



function graphSigmoid(data) {

    var sigmoid = this.neuralNetworkG.selectAll(this.svgElement + " .sigmoid")
        .data([data]);


    var sigmoidGroup = sigmoid.enter()
        .append("g")
        .attr("class", "sigmoid activation")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        });


    var viz = this,
        height = this.neuralNetworkHeight / 2,
        width = this.nodeRadius * 1.5,
        yDisplacement = -(height / 2);

    // Define function to create and open tooltip
    var activate = function (d) {console.log("INSIDE", viz.layerValues[1]);
        if (viz.layerValues[1]) {
            // Set up the tooltip to show the inputs and their sum
            var rows = '<table class="softmax-calculation">', total = 0,
                inputValue = roundPrecision(viz.layerValues[1][0], 5);
            rows = rows + "<tr>" +
                "<th>sigmoid input</th>" +
                "<th>Calculation</th>" +
                "<th>sigmoid output</th>" +
                "</tr>";

            var sum_term = viz.layerValues[1].map(function (d) {
                return "e^{" + numberFormatter(d, 2) + "}"
            }).join(" + ");
            var exponential_terms = [];

            // The following line generates the html, I then copy it here hardcoded to highlight the terms I need to highlight
            //var eq = katex.renderToString("\\frac{1}{1 + e^{-(" + inputValue + ")}}");
            var eq = '<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mo>(</mo><mo>−</mo><mn>0</mn><mi mathvariant="normal">.</mi><mn>5</mn><mn>6</mn><mn>4</mn><mn>3</mn><mn>3</mn><mo>)</mo></mrow></msup></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + e^{-(-0.56433)}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.845108em;"></span><span class="strut bottom" style="height:1.2907389999999999em;vertical-align:-0.4456309999999999em;"></span><span class="base textstyle uncramped"><span class="mord reset-textstyle textstyle uncramped"><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span><span class="mfrac"><span class="vlist"><span style="top:0.38729999999999987em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle cramped"><span class="mord scriptstyle cramped"><span class="mord mathrm">1</span><span class="mbin">+</span><span class="mord"><span class="mord mathit">e</span><span class="vlist"><span style="top:-0.289em;margin-right:0.07142857142857144em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-scriptstyle scriptscriptstyle cramped"><span class="mord scriptscriptstyle cramped"><span class="mord">−</span><span class="mopen">(</span><span class="mord"></span>         <span class="mord mathrm input">' + inputValue + '</span>         <span class="mclose">)</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span></span></span></span><span style="top:-0.22999999999999998em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle textstyle uncramped frac-line"></span></span><span style="top:-0.394em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord scriptstyle uncramped"><span class="mord mathrm">1</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span></span></span></span></span>';

            var node_row = "<tr>" +
                "<td class='input'>" + inputValue + "</td>" +
                "<td class='calculation'> " + eq + "</td>" +
                "<td>" + numberFormatter(viz.sigmoidOutput, 2) + "</td>" +
                "</tr>";

            rows = rows + node_row;


            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(rows)
                .style("left", (d3.event.pageX - 250) + "px")
                .style("top", (d3.event.pageY) + "px");

        }
        else {
            var html = "Hover-over or tap one of the row in the table, then you'll see the sigmoid calculation here.";

            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(html)
                .style("left", (d3.event.pageX - 250) + "px")
                .style("top", (d3.event.pageY) + "px");
        }
    };

// Define function to close tooltip
    var deactivate = function (d) {
        viz.tooltipDiv.transition()
            .duration(200)
            .style("opacity", 0);
    };

    sigmoidGroup
        .append("rect")
        .attr("class", "outlined-sigmoid-node nn-node")
        .attr("width", width)
        .attr("height", height)
        .attr("rx", this.nodeRadius / 4)
        .attr("ry", this.nodeRadius / 4)
        .attr("x", -width / 2)
        .attr("y", yDisplacement)
        .on("mouseover", activate)
        .on("touchenter", activate)
        .on("touchmove", function (d) {
            d3.event.preventDefault();
        })
        .on("mouseout", deactivate)
        .on("touchleave", deactivate);


    sigmoidGroup.append("text")
        .attr("id", "sigmoid-label")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", -2)
        //.attr("transform", "rotate(90)")
        .text("σ");


}


function graphSigmoidOutput(sigmoidOutput) {
    var grapher = this;
    var data = [{i: 0, value: sigmoidOutput}];

    var maxValueIndex = 0;

    var sigmoidOutputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .sigmoid-output-group")
        .data(data);

    sigmoidOutputGroups.select("text")
        .attr("class", "sigmoid-output")
        .text(function (d) {
            return numberFormatter(d.value * 100, 2) + "%"
        });

    var sigmoidOutputElements = sigmoidOutputGroups.enter()
        .append("g")
        .attrs({
            class: "sigmoid-output-group",
            transform: function (d) {
                return "translate(" + (grapher.softmaxOutputsX - 8) + ", " + (grapher.getYCoordinateOfNodeInOutputLayer(d.index) + 5) + ")";
            }
        });

    sigmoidOutputElements.append("text")
        .attr("class", "sigmoid-output")
        .text(function (d) {
            return numberFormatter(d.value * 100, 2) + "%"
        });
}


function calculateSigmoid(data) {
    return 1 / ( 1 + Math.exp(-data));
}


function updateSigmoid(input) {
    this.sigmoidOutput = calculateSigmoid(input);

    // Display sigmoid and final output
    this.graphSigmoidOutput(this.sigmoidOutput);

    this.highlightTopSoftmaxOutput();
}

/**
 * Created by alammar on 3/10/17.
 */



function getInputToBiasLinesData(inputLayerNodeCount, outputNodeCount,
    inputLayerCoordinates, outputLayerCoordinates){
    var inputToBiasLines = [];

    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < inputLayerNodeCount; i++)
        for (var j = 0; j < outputNodeCount; j++) {
            inputToBiasLines.push({
                x1: inputLayerCoordinates[i].x,
                y1: inputLayerCoordinates[i].y,
                x2: outputLayerCoordinates[j].x,
                y2: outputLayerCoordinates[j].y,
                inputIndex: i,
                outputIndex: j
            });
        }

    return inputToBiasLines;
}


function getBiasToSoftmaxLinesData(outputNodeCount, outputLayerCoordinates, activationLayerX, nodeRadius){

    var BiasToSoftmaxLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < outputNodeCount; i++)
        BiasToSoftmaxLines.push({
            x1: outputLayerCoordinates[i].x,
            y1: outputLayerCoordinates[i].y,
            x2: activationLayerX - nodeRadius,
            y2: outputLayerCoordinates[i].y
        });

    console.log("BiasToSoftmaxLines", BiasToSoftmaxLines);
    return BiasToSoftmaxLines;
}


function graphInputToBiasLines(data) {

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

}




function getSoftmaxtoOutputLinesData(outputNodeCount, activationLayerX, nodeRadius, outputLayerCoordinates,
                                            outputLayerX, classes ){

    var softmaxtoOutputLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < outputNodeCount; i++)
        softmaxtoOutputLines.push({
            x1: activationLayerX + nodeRadius + 6,
            y1: outputLayerCoordinates[i].y,
            x2: outputLayerX - nodeRadius,
            y2: outputLayerCoordinates[i].y,
            outputNode: i,
            class_name: classes[i]
        });

    return softmaxtoOutputLines;

}


function graphBiasToSoftmaxArrows(data) {

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

}


function graphSoftmaxToOutputArrows(data) {

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


}

/**
 * Created by alammar on 3/12/17.
 */

// Linear scale between this.neuralNetworkMargin.left and this.neuralNetworkWidth + this.neuralNetworkMargin.left + this.properties.outputRegionWidth
function getLayerXScale (numberOfLayers, layersRegionWidth, outputRegionWidth, marginLeft, nodeRadius){
    var returnFunction;
    if( numberOfLayers == 1){ // If only one node, draw it in the center
        returnFunction = function(){return  (layersRegionWidth /2) + marginLeft};
    }
    else{ // Otherwise, separate the vertical space linearly
        returnFunction = d3.scaleLinear()
            .domain([0, numberOfLayers -1 ])
            .range([marginLeft + nodeRadius,
                layersRegionWidth - nodeRadius - outputRegionWidth]);
    }
    return returnFunction;
}


function  getNodeYCoordinate (numberOfNodesInLayer, chartAreaHeight, marginTop, nodeRadius){
    var returnFunction;
    if( numberOfNodesInLayer == 1){ // If only one node, draw it in the center
        returnFunction = function(){return  (chartAreaHeight /2) + marginTop};
    }
    else{ // Otherwise, separate the vertical space linearly
        returnFunction = d3.scaleLinear()
            .domain([0, numberOfNodesInLayer -1 ])
            .range([marginTop + nodeRadius,
                chartAreaHeight - nodeRadius]);
    }
    return returnFunction;
}

/**
 * Created by alammar on 3/12/17.
 */
var input = {
    getNodeRenderingDetails: function(layer, properties){

        var inputAndBiasNodeCount = layer.nodes;
        if( layer.bias == true)
            inputAndBiasNodeCount++;
        console.log("inputAndBiasNodeCount", inputAndBiasNodeCount);

        // Create a scale to determine the Y coordinate of each node
        var layerNodesYScale = getNodeYCoordinate(inputAndBiasNodeCount, properties.activeRegionHeight,
            properties.margins.top, properties.nodeRadius);


        var layerCoordinates = getInputNodeCoordinates$1(layer.nodes, layer.x, layerNodesYScale);
        return layerCoordinates;
    },

    draw: function(layer, properties, activeRegionSVGGroup){
        var data = layer.nodeRenderingDetails,
            containerElement = properties.containerElement;
        var inputGroups = activeRegionSVGGroup.selectAll(properties.containerElement + " .input-group")
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
                d3.selectAll(properties.containerElement + " line.input-" + d.index)
                    .classed("nn-arrow-highlighted", true);

                // Highlight the weights connected to the node
                var weightGroups = d3.selectAll(properties.containerElement + " .input-" + d.index + "-weight");
                weightGroups.selectAll("ellipse")
                    .classed("nn-node-highlighted", true);
                var layerInputs = d3.selectAll(properties.containerElement + " .layer-1-input-groups .input-" + d.index)
                    .classed("layer-input-value-highlighted", true);
            })
            .on("mouseout", function (d) {

                // Stop highlighting the lines connected to this node
                d3.selectAll(properties.containerElement + " .input-" + d.index)
                    .classed("nn-arrow-highlighted", false);

                // Highlight the weights connected to the node
                var weightGroups = d3.selectAll(properties.containerElement + " .input-" + d.index + "-weight");
                weightGroups.selectAll("ellipse")
                    .classed("nn-node-highlighted", false);

                var layerInputs = d3.selectAll(properties.containerElement + " .layer-1-input-groups .input-" + d.index)
                    .classed("layer-input-value-highlighted", false);
            });

        inputs
            .append("circle")
            .attr("class", function (d) {
                if (d.type == "input") return "outlined-input-node nn-node";
                else if (d.type == "bias") return "outlined-bias-node nn-node";
            })
            .attr("r", properties.nodeRadius)
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
    }
};


function getInputNodeCoordinates$1(inputNodeCount, inputLayerX, getYCoordinateOfNodeInInputLayer) {

    var inputLayerCoordinates = d3.range(inputNodeCount).map(function (i) {
        var y = getYCoordinateOfNodeInInputLayer(i);
        return {x: inputLayerX, y: y, index: i, type: "input"};
    });

    //  Add the bias node to the end of the input layer
    inputLayerCoordinates.push({
        x: inputLayerX, y: getYCoordinateOfNodeInInputLayer(inputNodeCount),
        index: inputNodeCount, type: "bias"
    });

    return inputLayerCoordinates;
}

/**
 * Created by alammar on 3/13/17.
 */
var block = {
    getNodeRenderingDetails: function(layer, properties){
        var blockRenderingDetails ={
            x: layer.x,
            y: (properties.activeRegionHeight / 2) + properties.margins.top,
            index: 0,
            type: "block",
            activation: layer.activation
        };
        return blockRenderingDetails;
    },

    draw: function(layer, properties, activeRegionSVGGroup){

        // JOIN
        // Each node has an SVG group of its own. In that group is an SVG circle and SVG text label
        var nodeGroups = activeRegionSVGGroup.selectAll(properties.containerElement + " .layer-" + layer.index)
            .data([layer.nodeRenderingDetails]);
        console.log(layer.nodeRenderingDetails);


        // ENTER new elements present in new data.
        var nodes = nodeGroups.enter()
            .append("g")
            .attr("class", "layer-" + layer.index + " layer-group")
            .attr("transform", function (d) {
                return "translate(" +
                    (d.x)
                    + ","
                    + (d.y) + ")";
            });
        console.log(nodes);



        nodes
            .append("rect")
            .attr("class", "outlined-sigmoid-node nn-node")
            .attr("rx", properties.nodeRadius)
            .attr("width", properties.nodeRadius * 2)
            .attr("height", properties.activeRegionHeight)
            .attr("x", -properties.nodeRadius)
            .attr("y", -properties.activeRegionHeight/2);



        nodes.append("text")
            //.attr("id", "sigmoid-label")
            //.attr("class", "node-text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", properties.activeRegionHeight/2 - 12)
            .text(layer.nodes);


        nodes.append("svg:image")
            .attr('x', -15 )
            .attr('y', -properties.activeRegionHeight/2 + 12)
            .attr('width', 30)
            .attr('height', 10)
            .attr("xlink:href","../../images/relu-symbol.png");
    }
};

/**
 * Created by alammar on 3/12/17.
 */
var nodes = {
        getNodeRenderingDetails: function (layer, properties) {

            var layerNodesYScale = getNodeYCoordinate(layer.nodes, properties.activeRegionHeight,
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
                        var weightGroups = d3.selectAll(activeRegionSVGGroup + " .output-" + d.index + "-weight");
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

}

/**
 * Created by alammar on 3/13/17.
 */
var sigmoid = {
    getNodeRenderingDetails: function(layer, properties){


    },

    draw: function(layer, properties, activeRegionSVGGroup){

    }
};

/**
 * Created by alammar on 12/23/16.
 */

var renderers = {
    input: input,
    block: block,
    defaultLayer: nodes,
    sigmoid: sigmoid
};



var neuralNetworkCalculationViz = function (inputs, inputNodeCount, outputNodeCount, activation, containerElement, weights, biases, tableElement,
                                            trainingSet, classes) {


    this.properties = {
        graphWidth: 500,
        graphHeight: 300,
        margins: {top: 10, right: 10, bottom: 10, left: 10},
        outputRegionWidth: 50,
        nodeRadius: 25,
        containerElement: inputs.containerElement,
        nodeThreashold: 7, // If more than this, display as block rather than nodes
        get activeRegionWidth(){ return this.graphWidth - this.margins.left - this.margins.right;},
        get activeRegionHeight(){return this.graphHeight - this.margins.top - this.margins.bottom;}

    };

    if (inputs){ // New abstraction
        //containerElement, graphWidth, graphHeight, margins
        this.initializeGraph(inputs.containerElement, this.properties);
        this.drawGraph(inputs);

    }
    else{ // Old ugly code

        this.inputNodeCount = inputNodeCount;
        this.inputLayerNodeCount = inputNodeCount + 1;
        this.outputNodeCount = outputNodeCount;
        this.activation = activation;
        this.svgElement = containerElement;
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

        this.initializeGraphOld();
        this.drawGraphOld();
        this.initializeTable(trainingSet);
    }
};


// Input
neuralNetworkCalculationViz.prototype.graphInputNodes = graphInputNodes;
neuralNetworkCalculationViz.prototype.updateInputNodesText = updateInputNodesText;
neuralNetworkCalculationViz.prototype.getInputNodeCoordinates = getInputNodeCoordinates;
// Weight
neuralNetworkCalculationViz.prototype.graphWeightNodes = graphWeightNodes;
neuralNetworkCalculationViz.prototype.getWeightNodeCoordinates = getWeightNodeCoordinates;
// Node / output
neuralNetworkCalculationViz.prototype.graphBiasNodes = graphNode;
neuralNetworkCalculationViz.prototype.updateOutputNodesText = updateOutputNodesText;
neuralNetworkCalculationViz.prototype.getOutputNodeCoordinates = getOutputNodeCoordinates;
// Layer inputs
neuralNetworkCalculationViz.prototype.graphLayerInputs = graphLayerInputs;
neuralNetworkCalculationViz.prototype.updateLayerInputs = updateLayerInputs;
// Softmax
neuralNetworkCalculationViz.prototype.graphSoftmax = graphSoftmax;
neuralNetworkCalculationViz.prototype.graphSoftmaxOutputs = graphSoftmaxOutputs;
neuralNetworkCalculationViz.prototype.highlightTopSoftmaxOutput = highlightTopSoftmaxOutput;
// Sigmoid
neuralNetworkCalculationViz.prototype.graphSigmoid = graphSigmoid;
neuralNetworkCalculationViz.prototype.graphSigmoidOutput = graphSigmoidOutput;
neuralNetworkCalculationViz.prototype.updateSigmoid = updateSigmoid;
// Connection lines
neuralNetworkCalculationViz.prototype.getInputToBiasLinesData = getInputToBiasLinesData;
neuralNetworkCalculationViz.prototype.graphInputToBiasLines = graphInputToBiasLines;
neuralNetworkCalculationViz.prototype.getBiasToSoftmaxLinesData = getBiasToSoftmaxLinesData;
neuralNetworkCalculationViz.prototype.graphBiasToSoftmaxArrows = graphBiasToSoftmaxArrows;
neuralNetworkCalculationViz.prototype.getSoftmaxtoOutputLinesData = getSoftmaxtoOutputLinesData;
neuralNetworkCalculationViz.prototype.graphSoftmaxToOutputArrows = graphSoftmaxToOutputArrows;


neuralNetworkCalculationViz.prototype.updateNodeCount = function (nodeType, newValue) {
    if (nodeType == "input") this.inputNodeCount = newValue;
    else if (nodeType == "output") this.outputNodeCount = newValue;

    this.drawGraph();
};



neuralNetworkCalculationViz.prototype.initializeGraph = function (containerElement, properties) {
    var nnGraphHolder = d3.select(containerElement) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", properties.graphWidth)      // make the SVG element 449 pixels wide
        .attr("height", properties.graphHeight);    // make the SVG element 249 pixels high


        this.neuralNetworkWidth = + nnGraphHolder.attr("width") - this.properties.margins.left -
            this.properties.margins.right,
        this.neuralNetworkHeight = + nnGraphHolder.attr("height") - this.properties.margins.top -
            this.properties.margins.bottom,

        this.neuralNetworkG = nnGraphHolder.append("g");
        this.activeRegionSVGGroup = this.neuralNetworkG;

    // Define arrow head
    // http://bl.ocks.org/tomgp/d59de83f771ca2b6f1d4
    var defs = nnGraphHolder.append("defs");
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

    this.tooltipDiv = d3.select(".nn-tooltip");
    //.append("div")
    //.attr("class", "nn-tooltip")
    //.style("opacity", 0);
};


neuralNetworkCalculationViz.prototype.initializeGraphOld = function () {
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

    this.tooltipDiv = d3.select(".nn-tooltip");
        //.append("div")
        //.attr("class", "nn-tooltip")
        //.style("opacity", 0);
};


neuralNetworkCalculationViz.prototype.drawGraph = function (inputs) {

    // How many layers?
    var layers = inputs.layers,
        numberOfLayers = inputs.layers.length,
        // Linear scale between this.neuralNetworkMargin.left and this.neuralNetworkWidth + this.neuralNetworkMargin.left + this.properties.outputRegionWidth
        layerXScale = getLayerXScale(numberOfLayers, this.properties.activeRegionWidth, this.properties.margins.left,
            this.properties.outputRegionWidth, this.properties.nodeRadius);


    for( var i = 0; i < numberOfLayers; i ++){

        layers[i].index = i;

        // Use scale to set the X coordinates of each layer
        layers[i].x = layerXScale(i);

        // Assign a layer-renderer that knows how to draw
        layers[i].renderer =  (typeof layers[i].type !== 'undefined') ? renderers[layers[i].type] : renderers["defaultLayer"];
        //layers[i].renderer =  (layers[i].type == 'input') ? renderers["input"] : renderers["defaultLayer"];
        console.log("renderer: ", layers[i].renderer);
    }

//
//var graphData = {
//    layers: [
//        {
//            nodes: 3,
//            type: "input",
//            bias: true
//        },
//        {
//            nodes: 1
//        },
//        {
//            type: "sigmoid",
//            nodes: 1
//        }
//    ],
//    containerElement: "#neural-network-architecture-viz",
//    weights: true,
//    weightValues: false
//};

    // Calculate Y coordinates of nodes in each layer
    for( var j = 0; j < numberOfLayers; j ++){

        layers[j].nodeRenderingDetails = layers[j].renderer.getNodeRenderingDetails(layers[j], this.properties);
    }

    // Connection regions


    // Draw all the things
    for( var m = 0; m < numberOfLayers; m++){

        layers[m].renderer.draw(layers[m], this.properties, this.activeRegionSVGGroup, this.layerInputs, this.tooltipDiv);
    }

};


neuralNetworkCalculationViz.prototype.getNodeRenderingDetails = function (layer, properties) {
    //if( )
    switch (layer.type){
        case "input": // Special consideration for bias nodes
            layer.nodeRenderingDetails = input.getNodeRenderingDetails(layer, properties);


            break;

        default:
            //console.log("DEFAULT");
            //
            //var layerNodesYScale = getNodeYCoordinate(layer.nodes, properties.activeRegionHeight,
            //    properties.margins.top, properties.nodeRadius);
            //
            //var layerCoordinates = this.getInputNodeCoordinates(layer.nodes, layer.x, layerNodesYScale);
    }
};




neuralNetworkCalculationViz.prototype.drawGraphOld = function () {

    var grapher = this;
    // Let's calculate our coordinates for all the nodes
    // Let's start with the X coordiantes for each layer
    var inputLayerX = this.neuralNetworkMargin.left + this.nodeRadius, // X value of input layer
        biasLayerX = this.neuralNetworkWidth * 2 / 3 - 20, //
        outputLayerX = this.neuralNetworkWidth - this.nodeRadius + this.neuralNetworkMargin.left,
        activationLayerX = (outputLayerX + biasLayerX) / 2;

    this.inputLayerX = inputLayerX;
    this.softmaxOutputsX = outputLayerX;



    // Calculate the Y coordinate for each node in each layer
    // 1- Set a scale for each layer
    this.getYCoordinateOfNodeInInputLayer = getNodeYCoordinate(this.inputNodeCount + 1, this.neuralNetworkHeight,
        this.neuralNetworkMargin.top, this.nodeRadius);

    this.getYCoordinateOfNodeInOutputLayer = getNodeYCoordinate(this.outputNodeCount, this.neuralNetworkHeight,
        this.neuralNetworkMargin.top, this.nodeRadius);


    // 2- Primary layers (Y depends only on how many nodes in the layer)
    //  2.1 - Input layergetLayerXScale
    //  Calculate Y coordinates for each node
    this.inputLayerCoordinates = this.getInputNodeCoordinates(this.inputNodeCount, inputLayerX,
        this.getYCoordinateOfNodeInInputLayer);

    //  2.2 - Output layer
    this.outputLayerCoordinates = this.getOutputNodeCoordinates(this.outputNodeCount, biasLayerX,
        this.getYCoordinateOfNodeInOutputLayer);



    // ======================================================================
    // Weights

    this.weightLayerXCoordinates =  this.getWeightLayerXCoordinates(grapher.nodeRadius, grapher.weightNodeWidthRatio,
        this.outputNodeCount, inputLayerX);


    // Weight Coordinates
    var weightNodeData = this.getWeightNodeCoordinates(this.inputLayerNodeCount,
        this.inputNodeCount, this.outputNodeCount, this.inputLayerCoordinates, this.weightLayerXCoordinates,
        this.outputLayerCoordinates,biasLayerX, inputLayerX );
    this.lineAngles = weightNodeData.lineAngles;
    this.weightLayerCoordinates = weightNodeData.weightLayerCoordinates;




    this.inputToBiasLines = this.getInputToBiasLinesData(this.inputLayerNodeCount, this.outputNodeCount,
        this.inputLayerCoordinates, this.outputLayerCoordinates);


    //var connectionsArea1Data = [
    //    {x: this.inputLayerCoordinates[0].x + grapher.nodeRadius, y: this.inputLayerCoordinates[0].y},
    //    {x: this.inputLayerCoordinates[this.inputLayerNodeCount-1].x + grapher.nodeRadius, y: this.inputLayerCoordinates[this.inputLayerNodeCount-1].y},
    //    {x: this.outputLayerCoordinates[this.outputNodeCount-1].x, y: this.outputLayerCoordinates[this.outputNodeCount-1].y},
    //    {x: this.outputLayerCoordinates[0].x, y: this.outputLayerCoordinates[0].y}
    //];
    //
    //
    //var line = d3.line()
    //    .x(function(d) { return d.x; })
    //    .y(function(d) { return d.y; })
    //    .curve(d3.curveLinearClosed);
    //
    //var connections = this.neuralNetworkG
    //    .append("path")
    //    .attr("d", line(connectionsArea1Data))
    //    //.datum(connectionsArea1Data)
    //    .attr("class", "input-to-bias-line")
    //    .attr("fill", "#f0f0f0")
    //    .attr("stroke", "#f0f0f0");




    this.BiasToSoftmaxLines = this.getBiasToSoftmaxLinesData(this.outputNodeCount, this.outputLayerCoordinates,
        activationLayerX, grapher.nodeRadius);


    this.softmaxtoOutputLines = this.getSoftmaxtoOutputLinesData(this.outputNodeCount, activationLayerX,
        grapher.nodeRadius, this.outputLayerCoordinates, outputLayerX,  this.classes );



    // Graph all the things
    this.graphSoftmaxToOutputArrows(this.softmaxtoOutputLines);
    this.graphBiasToSoftmaxArrows(this.BiasToSoftmaxLines);

    this.graphInputToBiasLines(this.inputToBiasLines);

    this.graphInputNodes(this.inputLayerCoordinates);
    this.graphWeightNodes(this.weightLayerCoordinates);
    //this.graphOutputNodes(this.outputLayerCoordinates);

    this.graphBiasNodes(this.outputLayerCoordinates);
    this.graphActivation( this.activation, activationLayerX);



    var biasNodeY = this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2 - this.nodeRadius;


};


neuralNetworkCalculationViz.prototype.graphActivation = function (activationFunction, activationLayerXCoordinate) {
    if( activationFunction == "softmax" ){
        var softmaxCoordinates = {x:activationLayerXCoordinate, y: this.neuralNetworkMargin.top};
        this.graphSoftmax(softmaxCoordinates);

    }
    else if ( activationFunction == "sigmoid" ){
        var sigmoidCoordinates = {x:activationLayerXCoordinate,
            y: (this.neuralNetworkHeight / 2) + this.neuralNetworkMargin.top};
        this.graphSigmoid(sigmoidCoordinates);
    }
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





neuralNetworkCalculationViz.prototype.initializeTable = function (trainingSet) {


    var viz = this;
    var table = d3.select(this.tableElement)
        .append('table')
        .attr("class", "collapsed-style");

    this.selectedPerson = false;
    var columns = [
        {head: ' ', cl: 'title', html: function(d, i){
            return '<input type="radio" name="person"  ' +
                'class="radio_'+i+'">';
        }},
        {head: 'Age', cl: 'title', html: ƒ('age')},
        {head: 'Sex', cl: 'center', html: ƒ('sex')},
        {head: 'Survived', cl: 'center', html: ƒ('survived')}
    ];

    // Table header  onclick="function(){ viz.selectedPerson = viz.trainingSet['+i+'] ; }"
    table.append('thead').append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('class', ƒ('cl'))
        .text(ƒ('head'));

    // Table body
    table.append('tbody')
        .selectAll('tr')
        .data(trainingSet).enter()
        .append('tr')
        .on("mouseover", function (d) {
            viz.setInput([d.age, d.sex]);
        })
        .on("mouseout", function (d) {
            if( viz.selectedPerson )
            viz.setInput(viz.selectedPerson);

        })
        .on("click", function(d){
            d3.select('radio_'+d.age+'_'+d.sex)
            .attr('checked', "true");
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





neuralNetworkCalculationViz.prototype.getWeightLayerXCoordinates = function (nodeRadius, weightNodeWidthRatio,
                                                                             outputNodeCount, inputLayerX) {


    var weightMarginLeft = nodeRadius + nodeRadius * weightNodeWidthRatio - 15;

    // calculate weight layer x coordinate (one "layer" per output)   // Scales for the axes
    var weightNodeX = d3.scaleLinear()
        .domain([0, outputNodeCount])
        .range([inputLayerX + weightMarginLeft, inputLayerX + weightMarginLeft]); //biasLayerX - weightMarginRight ]);

    var weightLayerXCoordinates = d3.range(outputNodeCount).map(function (i) {
        return weightNodeX(i);
    });

    return weightLayerXCoordinates;
};

neuralNetworkCalculationViz.prototype.updateActivation = function (activationInput, activation) {

    if( activation == "softmax"){
        // Calculate the softmax values and final output
        this.softmaxOutputs = softmax(activationInput);

        // Display softmax and final output
        this.graphSoftmaxOutputs(this.softmaxOutputs);
    }
    else if( activation == "sigmoid" ){
        this.updateSigmoid(activationInput);
    }

};


neuralNetworkCalculationViz.prototype.setInput = function (input$$1) {


    this.inputs = input$$1;
    this.layerInputs[1] = [];
    this.layerValues[1] = [];
    this.inputs.push(1); // This will be our input bias node

    this.updateInputNodesText(input$$1);

    // Multiply inputs by weights and calculate the next layer value
    this.feedforward(1);

    // Display layer 1 input values above their lines
    this.graphLayerInputs(this.layerInputs, 1);

    // Display the text on the output nodes
    this.updateOutputNodesText();


    // Update activation layer
    this.updateActivation(this.layerValues[1], this.activation);

    // Highlight the class name with the highest softmax score
    this.highlightTopSoftmaxOutput();

};


var weights = [[-0.016852],
    [0.704039]];
var biases = [-0.116309];
//
//var weights = [[-0.020234],
//    [1.023300]];
//var biases = [-0.119178];


//var weights = [[-0.11510573],
//    [0.19847003]];
//var biases = [-0.07722114];
//
//var weights = [[-0.11510573, -0.08358583],
//    [0.19847003, -1.00007236]];
//var biases = [-0.07722114, 0.07722116];

//var classes=["Survived", "Didn't survive"];

var trainingSet = [
    {age: 22, sex: 0, survived: 0},
    {age: 38, sex: 1, survived: 1},
    {age: 26, sex: 1, survived: 1},
    {age: 35, sex: 1, survived: 1},
    {age: 35, sex: 0, survived: 0},
    {age: 14, sex: 1, survived: 0},
    {age: 25, sex: 0, survived: 0},
    {age: 54, sex: 0, survived: 0}

];
var classes=["Survived"];

//var weights = [[2.14149564e-04, -2.14149914e-04],
//    [5.12748193e-05, -5.12747974e-05]];
//var biases = [1.19155184e-05, -1.19155284e-05];

var nnCalculationViz = new neuralNetworkCalculationViz(false, 2, 1, "sigmoid", "#neural-network-calculation-viz", weights, biases,
    "#neural-network-calculation-table", trainingSet, classes);


//var input = [22,  0];
//nnCalculationViz.setInput(input);

var graphData = {
    layers: [
        {
            nodes: 2,
            type: "input",
            bias: true
        },
        {
            nodes: 8,
            activation: "relu",
            type:"block"
        },
        {
            nodes: 1
        }
        //{
        //    type: "sigmoid",
        //    nodes: 1
        //}
    ],
    containerElement: "#neural-network-architecture-viz",
    weights: true,
    weightValues: false
};

var nnArchitectureViz = new neuralNetworkCalculationViz(graphData);

})));
