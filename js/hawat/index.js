/**
 * Created by alammar on 12/23/16.
 */

import {graphInputNodes, updateInputNodesText, getInputNodeCoordinates} from './hawat-input';
import {graphWeightNodes, getWeightNodeCoordinates} from './hawat-weight';
import {graphNode, updateOutputNodesText, getOutputNodeCoordinates} from './hawat-node'
import {graphLayerInputs, updateLayerInputs} from './hawat-layer-inputs'
import {graphSoftmax, graphSoftmaxOutputs, highlightTopSoftmaxOutput} from './hawat-softmax'
import {graphSigmoid, graphSigmoidOutput, updateSigmoid} from './hawat-sigmoid'
import {getInputToBiasLinesData, graphInputToBiasLines, getBiasToSoftmaxLinesData, graphBiasToSoftmaxArrows,
    getSoftmaxtoOutputLinesData, graphSoftmaxToOutputArrows } from './hawat-connection-lines'
import {input} from './layer-renderers/input'
import {block} from './layer-renderers/block'
import {nodes} from './layer-renderers/nodes'
import {sigmoid} from './layer-renderers/sigmoid'
import * as util from './hawat-util'


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
        layerXScale = util.getLayerXScale(numberOfLayers, this.properties.activeRegionWidth, this.properties.margins.left,
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

        layers[m].renderer.draw(layers[m], this.properties, this.activeRegionSVGGroup, this.layerInputs, this.tooltipDiv)
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
    this.getYCoordinateOfNodeInInputLayer = util.getNodeYCoordinate(this.inputNodeCount + 1, this.neuralNetworkHeight,
        this.neuralNetworkMargin.top, this.nodeRadius);

    this.getYCoordinateOfNodeInOutputLayer = util.getNodeYCoordinate(this.outputNodeCount, this.neuralNetworkHeight,
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
            .attr('checked', "true")
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


    // Update activation layer
    this.updateActivation(this.layerValues[1], this.activation);

    // Highlight the class name with the highest softmax score
    this.highlightTopSoftmaxOutput()

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


