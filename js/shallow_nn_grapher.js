/**
 * Created by alammar on 12/8/16.
 */
var shallowNeuralNetworkGrapher = function (inputNodeCount, outputNodeCount, svgElement, analyticsCategory) {
    this.inputNodeCount = inputNodeCount;
    this.outputNodeCount = outputNodeCount;
    this.svgElement = svgElement;
    this.graphWidth = 350;
    this.analyticsCategory = analyticsCategory;

    this.initializeGraph();
    this.drawGraph()
};

shallowNeuralNetworkGrapher.prototype.updateNodeCount = function (nodeType, newValue){
    if( nodeType == "input" ) this.inputNodeCount = newValue;
    else if ( nodeType == "output" ) this.outputNodeCount = newValue;

    this.drawGraph();
};

shallowNeuralNetworkGrapher.prototype.initializeGraph = function () {
    this.nnGraphHolder = d3.select(this.svgElement) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", this.graphWidth)      // make the SVG element 449 pixels wide
        .attr("height", 250);    // make the SVG element 249 pixels high
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

};

shallowNeuralNetworkGrapher.prototype.drawGraph = function () {


    var grapher = this;
    this.nodeRadius = 15;
    this.weightNodeWidthRatio = 1.7;
    // Let's calculate our coordinates for all the nodes
    // Let's start with the X coordiantes for each layer
    var inputLayerX = this.neuralNetworkMargin.left + this.nodeRadius, // X value of input layer
        biasLayerX = this.neuralNetworkWidth * 2 / 3 - 20, //
        outputLayerX = this.neuralNetworkWidth - this.nodeRadius + this.neuralNetworkMargin.left,
        softmaxLayerX = (outputLayerX + biasLayerX) / 2;

    // Now the Y coordinates for each layer
    // Input layer
    this.inputLayerCoordinates = d3.range(this.inputNodeCount).map(function (i) {
        var y = grapher.neuralNetworkMargin.top + (i + 1) * grapher.neuralNetworkHeight / (grapher.inputNodeCount + 1);
        return {x: inputLayerX, y: y, index:i};
    });
    // Bias layer
    this.biasLayerCoordinates = d3.range(this.outputNodeCount).map(function (i) {

        var y = grapher.neuralNetworkMargin.top + (i + 1) * grapher.neuralNetworkHeight / (grapher.outputNodeCount + 1);
        return {x: biasLayerX, y: y, index: i};
    });
    // Output layer
    this.outputLayerCoordinates = d3.range(this.outputNodeCount).map(function (i) {
        var y = grapher.neuralNetworkMargin.top + (i + 1) * grapher.neuralNetworkHeight / (grapher.outputNodeCount + 1);
        return {x: outputLayerX, y: y, index:i};
    });

    // Weights
    // Calculate weight node locations
    var weightMarginLeft = grapher.nodeRadius +grapher.nodeRadius * grapher.weightNodeWidthRatio + 15,
        weightMarginRight = weightMarginLeft,
        weightRegion = biasLayerX - inputLayerX - weightMarginLeft - weightMarginRight;
    // calculate weight layer x coordinate (one "layer" per output)   // Scales for the axes
    this.weightNodeX = d3.scaleLinear()
        .domain([0, this.outputNodeCount -1])
        .range([inputLayerX + weightMarginLeft, biasLayerX - weightMarginRight]);
    this.weightLayerXCoordinates = d3.range(this.outputNodeCount).map(function(i){
        return grapher.weightNodeX(i);
    });


    // Calculate the angles of the all the Input-to_Bias lines
    this.lineAngles = [];
    for (var j = 0; j < this.outputNodeCount; j++)
        for (var i = 0; i < this.inputNodeCount; i++){

            //initialize inner array
            if( i == 0 ) this.lineAngles[j] = new Array(this.inputNodeCount);

            var opposite = this.inputLayerCoordinates[i].y - this.outputLayerCoordinates[j].y,
                adjacent = biasLayerX - inputLayerX,
                angle = Math.atan(opposite/adjacent);

            this.lineAngles[j][i] = angle;
        }


    this.weightLayerCoordinates = [];
    for (var i = 0; i < this.inputNodeCount; i++)
        for (var j = 0; j < this.outputNodeCount; j++) {
            this.weightLayerCoordinates.push({
                x: this.weightLayerXCoordinates[j],
                y:  this.inputLayerCoordinates[i].y -
                    Math.tan(this.lineAngles[j][i]) *
                    (this.weightLayerXCoordinates[j] - inputLayerX),
                outputIndex: j,
                inputIndex: i
            })
        }


    this.inputToBiasLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < this.inputNodeCount; i++)
        for (var j = 0; j < this.outputNodeCount; j++) {
            this.inputToBiasLines.push({
                x1: this.inputLayerCoordinates[i].x,
                y1: this.inputLayerCoordinates[i].y,
                x2: this.biasLayerCoordinates[j].x,
                y2: this.biasLayerCoordinates[j].y
            });
        }


    this.BiasToSoftmaxLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < this.outputNodeCount; i++)
        this.BiasToSoftmaxLines.push({
            x1: this.biasLayerCoordinates[i].x,
            y1: this.biasLayerCoordinates[i].y,
            x2: softmaxLayerX - grapher.nodeRadius,
            y2: this.biasLayerCoordinates[i].y
        });


    this.softmaxtoOutputLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < this.outputNodeCount; i++)
        this.softmaxtoOutputLines.push({
            x1: softmaxLayerX + grapher.nodeRadius + 6,
            y1: this.biasLayerCoordinates[i].y,
            x2: outputLayerX - grapher.nodeRadius - 8,
            y2: this.biasLayerCoordinates[i].y
        });

    var softmaxCoordinates = {x: softmaxLayerX, y: this.neuralNetworkMargin.top};



    // Graph all the things
    this.graphSoftmaxToOutputArrows(this.softmaxtoOutputLines);
    this.graphBiasToSoftmaxArrows(this.BiasToSoftmaxLines);
    this.graphInputToBiasLines(this.inputToBiasLines);
    this.graphInputNodes(this.inputLayerCoordinates);
    this.graphWeightNodes(this.weightLayerCoordinates);
    this.graphOutputNodes(this.outputLayerCoordinates);

    this.graphBiasNodes(this.biasLayerCoordinates);
    this.graphSoftmax(softmaxCoordinates);


    var biasNodeY = this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2 - this.nodeRadius;




};

shallowNeuralNetworkGrapher.prototype.graphInputNodes = function (data) {

    // JOIN
    var inputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .input-group" )
        .data(data);

    // EXIT old elements not present in new data.
    inputGroups.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    inputGroups.attr("class", "input-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this));

    inputGroups.select("#input-name")
        .text(function(d){
            return "X" + (d.index +1)
        });


    // ENTER new elements present in new data.
    var inputs = inputGroups.enter()
        .append("g")
        .attr("class", "input-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this));

    inputs
        .append("circle")
        .attr("class", "input-node")
        .attr("r", this.nodeRadius)
        .attr("cx", 0)
        .attr("cy", 0);

    inputs.append("text")
        .attr("id", "input-name")
        .attr("class", "grapher-node-text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 5)
        .text(function(d){
            return "X" + (d.index +1)
        });




    inputGroups.moveUp();
};



shallowNeuralNetworkGrapher.prototype.graphWeightNodes = function(data){
    var radius = this.nodeRadius * 0.6;
    var t = d3.transition()
        .duration(750);

    // JOIN
    var groupElements = this.neuralNetworkG.selectAll(this.svgElement + " .weight-group" )
        .data(data);

    // EXIT old elements not present in new data.
    groupElements.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    groupElements.attr("class", "weight-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        });

    groupElements.select("#weight0Value")
        .text(function(d){
            return "W" + (d.outputIndex + 1) + "," + (d.inputIndex + 1);
        });

    // ENTER new elements present in new data.
    var groups = groupElements.enter()
        .append("g")
        .attr("class", "weight-group")
        .attr("transform", function(d){
            return "translate(" +
            (d.x)
            + ","
            + (d.y) + ")";
        });

    groups
        .append("ellipse")
        .attr("class", "weightNode")
        .attr("rx", radius * this.weightNodeWidthRatio)
        .attr("ry", radius)
        .attr("cx", 0)
        .attr("cy", 0)
        .transition(t)
        .attr("y", 0)
        .style("fill-opacity", 1);

    groups.append("text")
        .attr("id", "weight0Value")
        .attr("class", "grapherWeightNodeText")
        .attr("text-anchor", "middle")
        .attr("y", 3)
        .text(function(d){
            return "W" + (d.outputIndex + 1) + "," + (d.inputIndex + 1);
        });

    groupElements.moveUp();
};


shallowNeuralNetworkGrapher.prototype.graphBiasNodes = function (data) {


    // JOIN
    var biasNodes = this.neuralNetworkG.selectAll(this.svgElement + " .bias-group" )
        .data(data);

    // EXIT old elements not present in new data.
    biasNodes.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    biasNodes.attr("class", "bias-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y  - this.nodeRadius) + ")";
        }.bind(this));

    biasNodes.moveUp();
    // ENTER new elements present in new data.
    var biases = biasNodes.enter()
        .append("g")
        .attr("class", "bias-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y  - this.nodeRadius) + ")";
        }.bind(this));

    biases
        .append("rect")
        .attr("class", "biasNode")
        .attr("width", this.nodeRadius * 2)
        .attr("height", this.nodeRadius * 2)
        .attr("rx", this.nodeRadius / 4)
        .attr("ry", this.nodeRadius / 4)
        .attr("x", 0)
        .attr("y", 0);

    biases.append("text")
        .attr("id", "biasValue")
        .attr("class", "grapher-node-text")
        .attr("text-anchor", "middle")
        .attr("x", this.nodeRadius)
        .attr("y", this.nodeRadius + 5)
        .text(function(d){
            return "+b" + (d.index +1)
        });

};


shallowNeuralNetworkGrapher.prototype.graphOutputNodes = function (data) {

    // JOIN
    var inputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .output-group" )
        .data(data);

    // EXIT old elements not present in new data.
    inputGroups.exit()
        .attr("class", "exit")
        .remove();

    // UPDATE old elements present in new data.
    inputGroups.attr("class", "output-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this));

    inputGroups.select("#output-name")
        .text(function(d){
            return "Y" + (d.index +1)
        });


    // ENTER new elements present in new data.
    var inputs = inputGroups.enter()
        .append("g")
        .attr("class", "output-group")
        .attr("transform", function(d){
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        }.bind(this));

    inputs
        .append("circle")
        .attr("class", "output-node")
        .attr("r", this.nodeRadius)
        .attr("cx", 0)
        .attr("cy", 0);

    inputs.append("text")
        .attr("id", "output-name")
        .attr("class", "grapher-node-text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 5)
        .text(function(d){
            return "Y" + (d.index +1)
        });




    //var outputNodes = this.neuralNetworkG.selectAll(this.svgElement + " .output-node" )
    //    .data(data);
    //
    //outputNodes.exit()
    //    .remove();
    //
    //outputNodes
    //    .attr("cx", function(d){return d.x})
    //    .attr("cy", function(d){return d.y});
    //
    //outputNodes.enter()
    //    .append("circle")
    //    .attr("class", "output-node")
    //    .attr("r", this.nodeRadius)
    //    .attr("cx", function(d){return d.x})
    //    .attr("cy", function(d){return d.y});
};

shallowNeuralNetworkGrapher.prototype.graphInputToBiasLines = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .input-to-bias-line" )
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
        class: "arrow input-to-bias-line",
        x1: function(d){ return d.x1}, // From the center of the input node
        y1: function(d){ return d.y1},
        x2: function(d){ return d.x2},    // To the center of the bias node
        y2: function(d){ return d.y2}
    });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "arrow input-to-bias-line",
            "x1": function(d){ return d.x1}, // From the center of the input node
            "y1": function(d){ return d.y1},
            "x2": function(d){ return d.x2},    // To the center of the bias node
            "y2": function(d){ return d.y2}
        });

};



shallowNeuralNetworkGrapher.prototype.graphBiasToSoftmaxArrows = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .bias-to-softmax-line" )
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            x1: function(d){ return d.x1}, // From the center of the input node
            y1: function(d){ return d.y1},
            x2: function(d){ return d.x2},    // To the center of the bias node
            y2: function(d){ return d.y2}
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            "x1": function(d){ return d.x1}, // From the center of the input node
            "y1": function(d){ return d.y1},
            "x2": function(d){ return d.x2},    // To the center of the bias node
            "y2": function(d){ return d.y2}
        });

};


shallowNeuralNetworkGrapher.prototype.graphSoftmaxToOutputArrows = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-to-output-line" )
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            x1: function(d){ return d.x1}, // From the center of the input node
            y1: function(d){ return d.y1},
            x2: function(d){ return d.x2},    // To the center of the bias node
            y2: function(d){ return d.y2}
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            "x1": function(d){ return d.x1}, // From the center of the input node
            "y1": function(d){ return d.y1},
            "x2": function(d){ return d.x2},    // To the center of the bias node
            "y2": function(d){ return d.y2}
        });

};


shallowNeuralNetworkGrapher.prototype.graphSoftmax = function (data) {

    var softmax = this.neuralNetworkG.selectAll(this.svgElement + " .softmax" )
        .data([data]);



    var softmaxGroup = softmax.enter()
        .append("g")
        .attr("class", "softmax")
        .attr("transform", function(d){
            return "translate(" +
            (d.x)
            + ","
            + (d.y) + ")";
        });

    softmaxGroup
        .append("rect")
        .attr("class", "softmaxNode")
        .attr("width", this.nodeRadius * 2)
        .attr("height", this.neuralNetworkHeight)
        .attr("rx", this.nodeRadius / 4)
        .attr("ry", this.nodeRadius / 4)
        .attr("x", 0-this.nodeRadius/2)
        .attr("y", 0);

    softmaxGroup.append("text")
        .attr("id", "biasValue")
        .attr("text-anchor", "middle")
        .attr("x", this.neuralNetworkHeight /2)
        .attr("y", -2)
        .attr("transform", "rotate(90)")
        .text("softmax");

};

var softmaxNNExample = new shallowNeuralNetworkGrapher(2, 2, "#shallow-neural-network-graph",
    "Basics of Neural Networks - Viz 4 Features & Classes");
//softmaxNNExample.updateNodeCount("input", 4)





//plugin bootstrap minus and plus
// http://bootsnipp.com/snippets/1Pj1d
//http://jsfiddle.net/laelitenetwork/puJ6G/
$( document ).ready(function() {
    $('.btn-number').click(function(e){
        e.preventDefault();

        var fieldName = $(this).attr('data-field');
        var type      = $(this).attr('data-type');
        var input = $("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if(type == 'minus') {
                var minValue = parseInt(input.attr('min'));
                if(!minValue) minValue = 1;
                if(currentVal > minValue) {
                    input.val(currentVal - 1).change();
                }
                if(parseInt(input.val()) == minValue) {
                    $(this).attr('disabled', true);
                }

            } else if(type == 'plus') {
                var maxValue = parseInt(input.attr('max'));
                if(!maxValue) maxValue = 9999999999999;
                if(currentVal < maxValue) {
                    input.val(currentVal + 1).change();
                }
                if(parseInt(input.val()) == maxValue) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function(){
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {

        var minValue =  parseInt($(this).attr('min'));
        var maxValue =  parseInt($(this).attr('max'));
        if(!minValue) minValue = 1;
        if(!maxValue) maxValue = 9999999999999;
        var valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }

        ///var fieldName = $(this).attr('data-field');
        var fieldName = $(this).attr('name');
        if(fieldName == "quant[1]"){
            softmaxNNExample.updateNodeCount("input", valueCurrent);
            ga('send', 'event', softmaxNNExample.analyticsCategory, "Set number of", "Features", valueCurrent);
        }
        else if(fieldName == "quant[2]") {
            softmaxNNExample.updateNodeCount("output", valueCurrent);
            ga('send', 'event', softmaxNNExample.analyticsCategory, "Set number of", "Classes", valueCurrent);
        }
    });
    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});