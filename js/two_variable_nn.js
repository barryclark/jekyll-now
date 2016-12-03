var multiVariableNeuralNetworkTrainer = function (numberOfInputNodes,
                                                  svg_el, table_el,
                                                  dataPoints, labels,
                                                  weights, bias,
                                                  gradientDescentButton, gradientDescent10Button, gradientDescent100Button,
                                                  gradientDescentConvergeButton,
                                                  weightsRanges, biasRanges,
                                                  neuralNetworkGraphEl) {

    this.numberOfInputNodes = numberOfInputNodes;
    this.svg_el = svg_el;
    this.table_el = table_el;
    this.dataPoints = dataPoints;
    this.labels = labels;
    this.weights = weights;
    this.bias = bias;
    //this.data = [{x: this.x1, y: this.y1}, {x: this.x2, y: this.y2}];
    this.prediction = [];

    this.weightsRanges = weightsRanges;
    this.biasRanges = biasRanges;

    this.neuralNetworkGraphEl = neuralNetworkGraphEl;


    this.initializeErrorGraph();
    this.initializeNeuralNetworkGraph();


    // Attach events to react to the user moving the sliders
    var trainerSelf = this, arr=[];

    for (var c = 0; c < this.weights.length; c++){
        $(this.table_el + " #weight" + c + "Slider").on("input change", {key_id: c},
            function(e){
                trainerSelf.updateParameter("weight", e.data.key_id, this.value, true);
            }
        );
    }


    $(this.table_el + " #biasSlider").on("input change", (function () {
        trainerSelf.updateParameter("bias", 0, this.value, true);
    }));

    if (gradientDescentButton != '') {
        $(this.table_el + " " + gradientDescentButton).click(function () {
            trainerSelf.gradientDescentStep(1)
        });
    }
    if (gradientDescent10Button != '') {
        $(this.table_el + " " + gradientDescent10Button).click(function () {
            trainerSelf.gradientDescentStep(10)
        });
    }

    if (gradientDescent100Button != '') {
        $(this.table_el + " " + gradientDescent100Button).click(function () {
            trainerSelf.gradientDescentStep(100)
        });
    }


    // Update with initial weight and bias values
    // This is needed to prime this.prediction for gradient descent
    d3.range(this.numberOfInputNodes).map(function(id){
        trainerSelf.updateParameter("weight", id, trainerSelf.weights[id], true)
    });
    trainerSelf.updateParameter("bias", 0, this.bias, true)


    // Update the sliders
    for (var c = 0; c < this.weights.length; c++)
        $(this.table_el + " #weight" + c + "Slider").val(trainerSelf.weights[c])
    $(this.table_el + " #biasSlider").val(trainerSelf.bias);
};


multiVariableNeuralNetworkTrainer.prototype.initializeErrorGraph = function () {

    this.error_chart_history_x = 300;       // How many error data points to show
    this.error_chart_history_y = 100000;    // How high the bar goes
    this.error_history = [10000];

    this.errorHolder = d3.select(this.svg_el) // select the 'div' element to append the svg
        .append("svg")           // append an SVG element to the body
        .attr("width", 429)      // make the SVG element 449 pixels wide
        .attr("height", 249);    // make the SVG element 249 pixels high

    this.margin = {top: 20, right: 20, bottom: 50, left: 80};
    this.errorChartWidth = +this.errorHolder.attr("width") - this.margin.left - this.margin.right;
    this.errorChartHeight = +this.errorHolder.attr("height") - this.margin.top - this.margin.bottom;
    this.errorG = this.errorHolder.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Initialize scales and axes
    this.error_x = d3.scaleLinear()
        .rangeRound([0, this.errorChartWidth])
        .domain([0, this.error_chart_history_x]);

    this.error_y = d3.scaleLinear()
        .rangeRound([this.errorChartHeight, 2])
        .domain([0, d3.max(this.error_history, function (d) {
            return d;
        }) * 1.3]);
    this.errorGraphScaleColors = ['#F8CA00','#feb24c','#fd8d3c','#fc4e2a'];
    //Color scale
    this.errorGraphScale = d3.scaleLinear()
        .domain([400, 10000, 100000, 1000000 ])
        .range(this.errorGraphScaleColors);

    this.errorGraphLine = d3.line()
        .x(function (d, i) {
            return this.error_x(i);
        }.bind(this))
        .y(function (d, i) {
            return this.error_y(d);
        }.bind(this));

    // Draw X axis
    this.errorG.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.errorChartHeight + ")")
        .call(d3.axisBottom(this.error_x).ticks(5));
    // Draw Y axis
    this.errorYAxis = this.errorG.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(this.error_y).ticks(5));


    this.errorG.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", this.errorChartWidth)
        .attr("height", this.errorChartHeight);

    var trainer_self = this;

    this.errorG.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(this.error_history)
        .attr("class", "error-history-line")
};


multiVariableNeuralNetworkTrainer.prototype.updateParameter = function (key, key_id, value, updateUI) {

    value = parseFloat(value);
    if (key == "weight")
        this.weights[key_id] = value;
    else if (key == "bias")
        this.bias = value;

    // Calculate predictions, and total error
    this.prediction = [];
    var prediction_sum = 0, delta, delta_2, delta_sum = 0, mean_delta_sum = 0;
    for (var i = 0; i < this.dataPoints.length; i++) {

        this.prediction[i] = this.calculatePrediction(this.dataPoints[i]);

        delta = this.labels[i] - this.prediction[i];

        delta_2 = Math.pow(delta, 2);
        delta_sum = delta_sum + delta_2;

    }
    mean_delta_sum = delta_sum / this.prediction.length;

    this.addErrorPoint(mean_delta_sum);

    if( updateUI )
        this.updateUI(mean_delta_sum);

    return mean_delta_sum;
};


multiVariableNeuralNetworkTrainer.prototype.updateUI = function (mean_delta_sum) {


    // Update the error/weight/bias indicators
    for (var c = 0; c < this.numberOfInputNodes; c++) {
        $(this.table_el + " span#weight" + c ).text(this.weights[c].toFixed(3));
    }
    $(this.table_el + " span#bias").text(this.bias.toFixed(3));
    $(this.table_el + " span#error-value").text(numberWithCommas(Math.round(mean_delta_sum)));

    this.updateNeuralNetworkGraph();
};

multiVariableNeuralNetworkTrainer.prototype.addErrorPoint = function (value) {

    this.error_history.push(value);
    // Redraw the line.
    d3.select(this.svg_el + " .error-history-line")
        .attr("d", this.errorGraphLine)
        .attr("transform", "translate(" + this.error_x(-1) + ",0)");

    // Pop the old data point off the front.
    if (this.error_history.length >= this.error_chart_history_x)
        this.error_history.shift();

    this.rescaleErrorGraph();
};


multiVariableNeuralNetworkTrainer.prototype.batchAddErrorPoint = function (valuesArray) {

    this.error_history = this.error_history.concat(valuesArray);


    // Cut the needed number of elements to be within our specified error_chart_history_x
    if (this.error_history.length > this.error_chart_history_x) {
        // How much are we over by
        var overage = this.error_history.length - this.error_chart_history_x;
        this.error_history.splice(0, overage);
    }

    d3.select(this.svg_el + " .error-history-line")
        .datum(this.error_history)
        .attr("d", this.errorGraphLine)
        .attr("transform", "translate(" + this.error_x(-valuesArray.length) + ",0)");


    this.rescaleErrorGraph();

};


multiVariableNeuralNetworkTrainer.prototype.rescaleErrorGraph = function () {

    //this.error_y.domain([0, new_max_y]);
    this.error_y.domain([1, d3.max(this.error_history, function (d) {
        return d;
    })]);

    this.errorG.select(this.svg_el + " .axis--y")
        .call(d3.axisLeft(this.error_y).ticks(5));

    this.errorG.selectAll(this.svg_el +" .axis--y .tick text")
        .attr("fill", function (d){return this.errorGraphScale(d)}.bind(this))
};


multiVariableNeuralNetworkTrainer.prototype.calculatePrediction = function (x) {
    var result = 0;
    for (var c = 0; c < x.length; c++)
        result = result + x[c] * this.weights[c];

    return result + this.bias;
};

// Draw the neural network figure. Currently only works for two inputs.
multiVariableNeuralNetworkTrainer.prototype.initializeNeuralNetworkGraph = function () {
    this.nnGraphHolder = d3.select(this.neuralNetworkGraphEl) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", 429)      // make the SVG element 449 pixels wide
        .attr("height", 250);    // make the SVG element 249 pixels high
    this.neuralNetworkMargin = {top: 10, right: 10, bottom: 10, left: 10},
        this.neuralNetworkWidth = +this.nnGraphHolder.attr("width") - this.neuralNetworkMargin.left - this.neuralNetworkMargin.right,
        this.neuralNetworkHeight = +this.nnGraphHolder.attr("height") - this.neuralNetworkMargin.top - this.neuralNetworkMargin.bottom,
        this.neuralNetworkG = this.nnGraphHolder.append("g");

    var nodeRadius = 30,
        biasNodeX = this.neuralNetworkWidth * 2 / 3  - 20,
        biasNodeY = this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2 - nodeRadius;


    // Arrow #1 - Bias to Output
    // http://bl.ocks.org/tomgp/d59de83f771ca2b6f1d4
    var defs = this.nnGraphHolder.append("defs");
    defs.append("marker")
        .attrs({
            "id":"arrow",
            "viewBox":"0 -5 10 10",
            "refX":5,
            "refY":0,
            "markerWidth":4,
            "markerHeight":4,
            "orient":"auto"
        })
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class","arrowHead");
    this.neuralNetworkG.append('line')
        .attrs({
            "class":"arrow",
            "marker-end":"url(#arrow)",
            "x1":this.neuralNetworkWidth * 2 / 3  - 20,
            "y1":this.neuralNetworkMargin.top + this.neuralNetworkHeight/2 ,
            "x2":this.neuralNetworkWidth - 2 * nodeRadius + this.neuralNetworkMargin.left - 8,
            "y2":this.neuralNetworkMargin.top + this.neuralNetworkHeight/2
        });

    //============================
    // Neuron #1
    // Neuron #1 Line
    this.neuralNetworkG.append('line')
        .attrs({
            "class":"arrow",
            "x1":this.neuralNetworkMargin.left + nodeRadius, // From the center of the input node
            "y1":this.neuralNetworkMargin.top + nodeRadius ,
            "x2":biasNodeX + nodeRadius,    // To the center of the bias node
            "y2":biasNodeY + nodeRadius
        });

    // Input node #1
    this.inputNode = this.neuralNetworkG
        .append("circle")
        .attr("class", "inputNode")
        .attr("r", nodeRadius)
        .attr("cx", this.neuralNetworkMargin.left + nodeRadius  )
        .attr("cy", this.neuralNetworkMargin.top + nodeRadius);

    // Weight Node #1
    var weight1GroupX =  this.neuralNetworkMargin.left + nodeRadius + this.neuralNetworkWidth / 3 - 10,
        weight1GroupY = (weight1GroupX - this.neuralNetworkMargin.left) * 0.60 - this.neuralNetworkMargin.top ;
    this.weightG = this.neuralNetworkG.append("g")
        .attr("transform", "translate("+
            (weight1GroupX)
            +","
            +(weight1GroupY)+")"); //this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2
    this.weightNode = this.weightG
        .append("ellipse")
        .attr("class", "weightNode")
        .attr("rx", nodeRadius * 1.7)
        .attr("ry", nodeRadius )
        .attr("cx", 0)
        .attr("cy", 0);
    this.weightG.append("text")
        .attr("id", "weight0Value")
        .attr("text-anchor", "middle")
        .attr("y", 5)
        .text("");



    //============================
    // Neuron #2
    // Neuron #2 Line
    this.neuralNetworkG.append('line')
        .attrs({
            "class":"arrow",
            "x1":this.neuralNetworkMargin.left + nodeRadius, // From the center of the input node
            "y1":this.neuralNetworkHeight + this.neuralNetworkMargin.top - nodeRadius ,
            "x2":biasNodeX + nodeRadius,    // To the center of the bias node
            "y2":biasNodeY + nodeRadius
        });

    // Input node #2
    this.inputNode = this.neuralNetworkG
        .append("circle")
        .attr("class", "inputNode")
        .attr("r", nodeRadius)
        .attr("cx", this.neuralNetworkMargin.left + nodeRadius  )
        .attr("cy", this.neuralNetworkHeight + this.neuralNetworkMargin.top - nodeRadius);

    // Weight Node #2
    var weight2GroupX = this.neuralNetworkMargin.left + nodeRadius + this.neuralNetworkWidth / 3 - 10,
        weight2GroupY = this.neuralNetworkMargin.top +  this.neuralNetworkHeight +  this.neuralNetworkMargin.bottom
    - (weight1GroupX - this.neuralNetworkMargin.left) * 0.60 + 10;
    this.weightG = this.neuralNetworkG.append("g")
        .attr("transform", "translate("+
            (weight2GroupX)
            +","
            +(weight2GroupY )+")"); //this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2
    this.weightNode = this.weightG
        .append("ellipse")
        .attr("class", "weightNode")
        .attr("rx", nodeRadius * 1.7)
        .attr("ry", nodeRadius )
        .attr("cx", 0)
        .attr("cy", 0);
    this.weightG.append("text")
        .attr("id", "weight1Value")
        .attr("text-anchor", "middle")
        .attr("y", 5)
        .text("");


    // Bias Node
    this.biasG = this.neuralNetworkG.append("g")
        .attr("transform", "translate("+
            (biasNodeX)
            +","
            +(biasNodeY)+")");
    this.biasNode = this.biasG
        .append("rect")
        .attr("class", "biasNode")
        .attr("width", nodeRadius * 2 )
        .attr("height", nodeRadius * 2)
        .attr("rx", nodeRadius / 4 )
        .attr("ry", nodeRadius / 4 )
        .attr("x", 0)
        .attr("y", 0);
    this.biasG.append("text")
        .attr("id", "biasValue")
        .attr("text-anchor", "middle")
        .attr("x", nodeRadius)
        .attr("y", nodeRadius + 5)
        .text("-");



    // Output node
    this.outputNode = this.neuralNetworkG
        .append("circle")
        .attr("class", "outputNode")
        .attr("r", nodeRadius)
        .attr("cx", this.neuralNetworkWidth - nodeRadius + this.neuralNetworkMargin.left )
        .attr("cy", this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2);

};


multiVariableNeuralNetworkTrainer.prototype.updateNeuralNetworkGraph = function () {
    for( var c = 0; c < this.weights.length; c++){
        console.log(c);
        d3.select(this.neuralNetworkGraphEl + " #weight"+c+"Value")
            .text(this.weights[c].toFixed(3));

    }

    d3.select(this.neuralNetworkGraphEl + " #biasValue")
        .text(this.bias.toFixed(1));

};

multiVariableNeuralNetworkTrainer.prototype.gradientDescentStep = function (steps) {

    // I probably shouldn't do this. I started doing feature normalization so we can keep to one learning rate.
    // I decided to do it this way to maintain narrative continuity.
    this.weightLearningRates= [0.00000001, 0.01];
    this.biasLearningRate = 1;


    var error, errors_array = [], weights_array = [], biases_array =[];
    for( var c = 0; c < steps; c++){

        var sumForBias = 0, sumsForWeights = [], biasMean, weightsMeans=[],
            biasAdjustment, weightAdjustments = [],
            newBias, newWeights = [];

        // Fill with zeros
        sumsForWeights = Array.apply(null, Array(this.numberOfInputNodes)).map(Number.prototype.valueOf,0);

        // Calculate the sum part of gradient descent update formula for each parameter
        for (var i = 0; i < this.dataPoints.length; i++) {

            for(var j = 0; j < this.numberOfInputNodes; j++)
            sumsForWeights[j] = sumsForWeights[j] +  (this.prediction[i] - this.labels[i] ) * this.dataPoints[i][j];

            sumForBias = sumForBias + this.prediction[i] - this.labels[i];
        }

        //console.log("sum: ", sumsForWeights, sumForBias );

        // Calculate the mean for each parameter
        for(var k = 0; k < this.numberOfInputNodes; k++)
            weightsMeans[k] = sumsForWeights[k] / this.labels.length;
        biasMean = sumForBias / this.labels.length;
        //console.log("sum means: ", weightsMeans, biasMean);

        // Multiply with the learning rates
        for(var m = 0; m < this.numberOfInputNodes; m++)
            weightAdjustments[m] = this.weightLearningRates[m] * weightsMeans[m];
        biasAdjustment = this.biasLearningRate * biasMean;
        //console.log("adjustments: ", weightAdjustments, biasAdjustment);

        // Subtract adjustment from current parameter value
        for(var p = 0; p < this.numberOfInputNodes; p++)
            newWeights[p] = this.weights[p] - weightAdjustments[p];
        newBias = this.bias - biasAdjustment;

        // Only update the UI on the last step (if we're doing multiple steps
        // And in that case, add the errors to the error graph as a batch
        if( c == steps - 1) {

            if( errors_array.length != 0 ){
                this.batchAddErrorPoint(errors_array);
            }


            d3.range(this.numberOfInputNodes).map(function(id){
                this.updateParameter("weight", id, newWeights[id], true)
            }.bind(this));
            this.updateParameter("bias", 0, newBias, true);

        }
        else
        {


            d3.range(this.numberOfInputNodes).map(function(id){
                this.updateParameter("weight", id, newWeights[id], false)
            }.bind(this));
            error = this.updateParameter("bias", 0, newBias, false);

            errors_array.push(error);
        }
    }


    // Update the sliders
    for (var c = 0; c < this.weights.length; c++)
        $(this.table_el + " #weight" + c + "Slider").val(newWeights[c])
    $(this.table_el + " #biasSlider").val(newBias);



};


var dataPoints = [
    [2104, 3],
    [1600, 3],
    [2400, 3],
    [1416, 2],
    [3000, 4],
    [1985, 4],
    [1534, 3],
    [1427, 3],
    [1380, 3],
    [1494, 3]
];

var labels = [
    399.900,
    329.900,
    369.000,
    232.000,
    539.900,
    299.900,
    314.900,
    198.999,
    212.000,
    242.500];

var weights = [0, 0], bias = 0, weightRanges, biasRange;
var trainer3 = new multiVariableNeuralNetworkTrainer(2,
    "#training-two-chart", "#training-two-table",
    dataPoints, labels,
    weights, bias,
    "#gradient-descent-button",
    "#gradient-descent-10-button",
    "#gradient-descent-100-button",
    "#gradient-descent-converge-button",
    weightRanges, biasRange,
    "#neural-network-two-graph"
);