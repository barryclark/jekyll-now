/**
 * Created by alammar on 12/23/16.
 */


/**
 * Created by alammar on 12/8/16.
 */
var neuralNetworkCalculationViz = function (inputNodeCount, outputNodeCount, svgElement, weights, biases) {
    this.inputNodeCount = inputNodeCount;
    this.inputLayerNodeCount = inputNodeCount + 1;
    this.outputNodeCount = outputNodeCount;
    this.svgElement = svgElement;
    this.graphWidth = 500;
    this.graphHeight = 250;
    this.nodeRadius = 25;
    this.weightNodeSizeScale = 0.4;
    this.weightNodeWidthRatio = 2.2;
    this.weights = weights;
    this.biases = biases;

    this.initializeGraph();
    this.drawGraph()
};

neuralNetworkCalculationViz.prototype.updateNodeCount = function (nodeType, newValue){
    if( nodeType == "input" ) this.inputNodeCount = newValue;
    else if ( nodeType == "output" ) this.outputNodeCount = newValue;

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


    this.tooltipDiv = d3.select("body")
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

    // Now the Y coordinates for each layer
    // Input layer
    this.inputNodeY = d3.scaleLinear()
        .domain([0, this.inputNodeCount])
        .range([this.neuralNetworkMargin.top + this.nodeRadius,
            grapher.neuralNetworkHeight - this.nodeRadius]);

    this.outputNodeY = d3.scaleLinear()
        .domain([0, this.inputNodeCount - 1])
        .range([this.neuralNetworkMargin.top + this.nodeRadius,
            grapher.neuralNetworkHeight - this.nodeRadius]);

    this.inputLayerCoordinates = d3.range(this.inputNodeCount).map(function (i) {
        var y = grapher.inputNodeY(i);
        return {x: inputLayerX, y: y, index:i, type: "input"};
    });
    this.inputLayerCoordinates.push({x: inputLayerX, y: grapher.inputNodeY(this.inputNodeCount),
        index:this.inputNodeCount, type:"bias"});

    // Bias layer
    this.biasLayerCoordinates = d3.range(this.outputNodeCount).map(function (i) {
        var y = grapher.outputNodeY(i);
        return {x: biasLayerX, y: y, index: i, type: "input"};
    });

    // Output layer
    this.outputLayerCoordinates = d3.range(this.outputNodeCount).map(function (i) {
        var y = grapher.outputNodeY(i);
        return {x: outputLayerX, y: y, index:i};
    });

    // ======================================================================
    // Weights
    // Calculate weight node locations
    var weightMarginLeft = grapher.nodeRadius + grapher.nodeRadius * grapher.weightNodeWidthRatio - 5,
        weightMarginRight =  grapher.nodeRadius;
    // calculate weight layer x coordinate (one "layer" per output)   // Scales for the axes
    this.weightNodeX = d3.scaleLinear()
        .domain([0, this.inputLayerNodeCount])
        .range([inputLayerX + weightMarginLeft, biasLayerX - weightMarginRight ]);
    this.weightLayerXCoordinates = d3.range(this.inputLayerNodeCount).map(function(i){
        return grapher.weightNodeX(i);
    });
    // Calculate the angles of the all the Input-to_Bias lines
    this.lineAngles = [];
    this.weightLayerCoordinates = [];
    for (var j = 0; j < this.outputNodeCount; j++)
        for (var i = 0; i < this.inputLayerNodeCount ; i++){

            var opposite = this.inputLayerCoordinates[i].y - this.outputLayerCoordinates[j].y,
                adjacent = biasLayerX - inputLayerX,
                angle = Math.atan(opposite/adjacent),
                yCoordinate = this.inputLayerCoordinates[i].y -
                    Math.tan(angle) *
                    (this.weightLayerXCoordinates[i] - inputLayerX);

            if( i < this.inputNodeCount) // Weight
            this.weightLayerCoordinates.push({
                x: this.weightLayerXCoordinates[i],
                y:  yCoordinate,
                outputIndex: j,
                inputIndex: i,
                value: this.weights[i][j],
                type: "weight"
            });
            else // Bias
            this.weightLayerCoordinates.push({
                x: this.weightLayerXCoordinates[i],
                y:  yCoordinate,
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
                x2: this.biasLayerCoordinates[j].x,
                y2: this.biasLayerCoordinates[j].y,
                inputIndex: i,
                outputIndex: j
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
    //this.graphOutputNodes(this.outputLayerCoordinates);

    this.graphBiasNodes(this.biasLayerCoordinates);
    this.graphSoftmax(softmaxCoordinates);


    var biasNodeY = this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2 - this.nodeRadius;




};

neuralNetworkCalculationViz.prototype.graphInputNodes = function (data) {

    var grapher = this;
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
        }.bind(this))
        .on("mouseover", function(d) {

            // Highlight the lines connected to this node
            d3.selectAll(grapher.svgElement + " .input-"+ d.index)
                .classed("nn-arrow-highlighted", true);
            //
            //// Show tooltip
            //grapher.tooltipDiv.transition()
            //    .duration(100)
            //    .style("opacity", 1);
            //grapher.tooltipDiv.html(d.index )
            //    .style("left", (d3.event.pageX) + "px")
            //    .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {


            // Stop highlighting the lines connected to this node
            d3.selectAll(grapher.svgElement + " .input-"+ d.index)
                .classed("nn-arrow-highlighted", false);

            //
            //
            //
            //grapher.tooltipDiv.transition()
            //    .duration(200)
            //    .style("opacity", 0);
        });

    inputs
        .append("circle")
        .attr("class", function(d){
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
        .text(function(d){
            if(d.type == "input") return "X" + (d.index +1);
            else if(d.type == "bias") return "b";
        });




    inputGroups.moveUp();
};




neuralNetworkCalculationViz.prototype.graphWeightNodes = function(data){
    var radius = this.nodeRadius * this.weightNodeSizeScale;
    var grapher = this;
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
        })
        .on("mouseover", function(d) {

            var g = d3.select(this);
            g.select("ellipse")
                .transition()
                .duration(50)
                .attr("rx", 50);

            g.select("text")
                .transition()
                .delay(60)
                .text(function(d){
                    return d.value;
                });

            g.moveUp();
            // Show tooltip
            //grapher.tooltipDiv.transition()
            //    .duration(100)
            //    .style("opacity", 1);
            //grapher.tooltipDiv.html(d.value )
            //    .style("left", (d3.event.pageX) + "px")
            //    .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            var g = d3.select(this);
            g.select("ellipse")
                .transition()
                .duration(50)
                .attr("rx", 22);



            g.select("text")
                .transition()
                .delay(30)
                .text(function(d){
                    return d.value.toExponential(0);
                });

            //grapher.tooltipDiv.transition()
            //    .duration(200)
            //    .style("opacity", 0);
        });

    groups
        .append("ellipse")
        .attr("class", function(d){
            if (d.type == "weight") return "outlined-weight-node nn-node";
            else if(d.type == "bias") return "outlined-bias-node nn-node";
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
        .text(function(d){
            return d.value.toExponential(0);
        });

    groupElements.moveUp();
};


neuralNetworkCalculationViz.prototype.graphBiasNodes = function (data) {


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


neuralNetworkCalculationViz.prototype.graphInputToBiasLines = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .input-to-bias-line" )
        .data(data);

    inputToBiasLines.exit()
        .remove();

    var classes = "nn-arrow input-to-bias-line";

    inputToBiasLines
        .attrs({
            class: function (d){ return classes + " input-" + d.inputIndex + " output-" + d.outputIndex},
            x1: function(d){ return d.x1}, // From the center of the input node
            y1: function(d){ return d.y1},
            x2: function(d){ return d.x2},    // To the center of the bias node
            y2: function(d){ return d.y2}
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": function (d){ return classes + " input-" + d.inputIndex + " output-" + d.outputIndex},
            "x1": function(d){ return d.x1}, // From the center of the input node
            "y1": function(d){ return d.y1},
            "x2": function(d){ return d.x2},    // To the center of the bias node
            "y2": function(d){ return d.y2}
        });

};



neuralNetworkCalculationViz.prototype.graphBiasToSoftmaxArrows = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .bias-to-softmax-line" )
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "nn-arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            x1: function(d){ return d.x1}, // From the center of the input node
            y1: function(d){ return d.y1},
            x2: function(d){ return d.x2},    // To the center of the bias node
            y2: function(d){ return d.y2}
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "nn-arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            "x1": function(d){ return d.x1}, // From the center of the input node
            "y1": function(d){ return d.y1},
            "x2": function(d){ return d.x2},    // To the center of the bias node
            "y2": function(d){ return d.y2}
        });

};


neuralNetworkCalculationViz.prototype.graphSoftmaxToOutputArrows = function (data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-to-output-line" )
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "nn-arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            x1: function(d){ return d.x1}, // From the center of the input node
            y1: function(d){ return d.y1},
            x2: function(d){ return d.x2},    // To the center of the bias node
            y2: function(d){ return d.y2}
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "nn-arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            "x1": function(d){ return d.x1}, // From the center of the input node
            "y1": function(d){ return d.y1},
            "x2": function(d){ return d.x2},    // To the center of the bias node
            "y2": function(d){ return d.y2}
        });

};


neuralNetworkCalculationViz.prototype.graphSoftmax = function (data) {

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
        .attr("class", "outlined-softmax-node nn-node")
        .attr("width", this.nodeRadius * 1.5)
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



neuralNetworkCalculationViz.prototype.setInput = function (input) {

    var inputTexts = this.neuralNetworkG.selectAll(this.svgElement + " .input-group .node-text" );

    console.log(input)
    inputTexts.text(function(d){
        if(d.type == "input") { return input[d.index];}
        else if(d.type == "bias" ) return "bias";
    })

};

var weights = [ [  2.14149564e-04 , -2.14149914e-04],
                [  5.12748193e-05 ,  -5.12747974e-05]];
var biases = [  1.19155184e-05 ,  -1.19155284e-05] ;

var nnCalculationViz = new neuralNetworkCalculationViz(2, 2, "#neural-network-calculation-viz", weights, biases);



var input = [2104,	3];
nnCalculationViz.setInput(input);
