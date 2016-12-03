/**
 * Created by alammar on 11/16/16.
 */

// Zip it like python - https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
function zip(arrays) {
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) {
            return array[i]
        })
    });
}

// Makes an element be drawn on top of other elements
// https://stackoverflow.com/questions/17786618/how-to-use-z-index-in-svg-elements
d3.selection.prototype.moveUp = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

// Add commas to a big number fo readibility
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate standard deviation of an array
// Needed for feature normalization
// https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
function standardDeviation(values){
    var avg = average(values);
    var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff = average(squareDiffs);
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}
function average(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);
    var avg = sum / data.length;
    return avg;
}




var NN_trainer = function (svg_el, table_el, areas, prices, weight, bias, x1, y1, x2, y2,
                           gradientDescentButton, gradientDescent10Button, gradientDescent100Button,
                           gradientDescentConvergeButton, normalize, error_chart_el, heatmap_el,
                           weightRange, biasRange, neuralNetworkGraphEl) {
    this.svg_el = svg_el;
    this.table_el = table_el;
    this.areas = areas;
    this.prices = prices;
    this.weight = weight;
    this.bias = bias;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.data = [{x: this.x1, y: this.y1}, {x: this.x2, y: this.y2}];
    this.prediction = [];
    this.dataPoints = zip([this.areas, this.prices]);
    this.normalize = normalize;
    this.error_chart_el = error_chart_el;
    this.heatmap_el = heatmap_el;

    this.miniGraphWidth = 210;
    this.miniGraphHeight = 180;

    this.weightRange = weightRange;
    this.biasRange = biasRange;

    this.neuralNetworkGraphEl = neuralNetworkGraphEl;

    this.miniGraphMargin =  {top: 30, right: 50, bottom: 35, left: 30};

    // Normalization doesn't work quite yet. Actually decided to roll back during implementation
    // because changing the weights and biases between examples would confuse readers.
    if(normalize)
        this.normalizeFeatures(areas, prices);


    this.initializeGraph();

    if(error_chart_el != "")
        this.initializeErrorGraph();
    if( this.heatmap_el != "")
        this.initializeHeatmap();
    if( this.neuralNetworkGraphEl != "")
        this.initializeNeuralNetworkGraph()

    // Set the initial values of the sliders
    this.updateWeightAndBias(this.weight, this.bias, true);

    // Attach events to react to the user moving the sliders
    var trainer_self = this;
    $(this.table_el + " #weightSlider").on("input change", (function(){
        trainer_self.updateWeightAndBias(this.value, -1, true)
    }));

    $(this.table_el + " #biasSlider").on("input change", (function(){
        trainer_self.updateWeightAndBias(-1, this.value, true)
    }));

    if (gradientDescentButton != ''){
        $(this.table_el + " " + gradientDescentButton).click(function(){
            trainer_self.gradientDescentStep(1)
        });
    }
    if (gradientDescent10Button != ''){
        $(this.table_el + " " + gradientDescent10Button).click(function(){
            trainer_self.gradientDescentStep(10)
        });
    }

    if (gradientDescent100Button != ''){
        $(this.table_el + " " + gradientDescent100Button).click(function(){
            trainer_self.gradientDescentStep(100)
        });
    }


    // Update the reading of the weight/bias numbers
    $(this.table_el + " #weightSlider").val(this.weight);
    $(this.table_el + " #biasSlider").val(this.bias);
};


NN_trainer.prototype.normalizeFeatures = function(areas, prices){

    this.area_std = standardDeviation(areas);
    this.area_mean = average(areas);
    this.areas_normalized = normalizeFeaturesArray(areas, this.area_mean, this.area_std);


    this.prices_std = standardDeviation(prices);
    this.prices_mean = average(prices);
    this.prices_normalized = normalizeFeaturesArray(prices, this.prices_mean, this.prices_std);

};


// Returns a normalized array, given an input array, with the standard deviation and mean of its elements
normalizeFeaturesArray = function(array, mean, std){
    outputArray = [];
    for ( var i = 0; i < array.length; i ++)
        outputArray[i] = (array[i] - mean) / std;

    return outputArray;
};


NN_trainer.prototype.initializeGraph = function(){
    this.holder = d3.select(this.svg_el) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", 429)      // make the SVG element 449 pixels wide
        .attr("height", 249);    // make the SVG element 249 pixels high
    this.margin = {top: 20, right: 20, bottom: 50, left: 50},
        this.width = +this.holder.attr("width") - this.margin.left - this.margin.right,
        this.height = +this.holder.attr("height") - this.margin.top - this.margin.bottom,
        this.g = this.holder.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Initialize scales and axes
    this.x = d3.scaleLinear()
        .rangeRound([0, this.width]);
    this.y = d3.scaleLinear()
        .rangeRound([this.height, 0]);
    this.x.domain([this.x1, this.x2]);
    this.y.domain([this.y1, this.y2]);

    // define the line
    this.valueline = d3.line()
        .x(function (d) {
            return this.x(d.x);
        }.bind(this))
        .y(function (d) {
            return this.y(d.y);
        }.bind(this));

    // Draw prediction line
    this.g.append("path")
        .attr("class", "line")
        .attr("d", this.valueline(this.data));
    // Draw X axis
    this.g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(this.x).ticks(5));
    // Draw Y axis
    this.g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(this.y).ticks(5));
    // Draw datapoints as dots
    this.dataPointDots = this.g.selectAll(this.svg_el + " .dot")
        .data(this.dataPoints)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) {
            return this.x(d[0])
        }.bind(this))
        .attr("cy", function (d) {
            return this.y(d[1])
        }.bind(this));
};




NN_trainer.prototype.initializeErrorGraph = function(){


    this.error_chart_history_x = 300;       // How many error data points to show
    this.error_chart_history_y = 100000;    // How high the bar goes
    this.error_history = [10000];

    this.miniErrorChartMargin = {top: 30, right: 30, bottom: 35, left: 65};
    this.errorHolder = d3.select(this.error_chart_el) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", this.miniGraphWidth)      // make the SVG element 449 pixels wide
        .attr("height", this.miniGraphHeight);    // make the SVG element 249 pixels high

        this.errorChartWidth = +this.errorHolder.attr("width") -
            this.miniErrorChartMargin.left - this.miniErrorChartMargin.right;
        this.errorChartHeight = +this.errorHolder.attr("height") -
            this.miniErrorChartMargin.top - this.miniErrorChartMargin.bottom;
        this.errorG = this.errorHolder.append("g").attr("transform", "translate("
            + this.miniErrorChartMargin.left + ","
            + this.miniErrorChartMargin.top + ")");

    // Initialize scales and axes
    this.error_x = d3.scaleLinear()
        .rangeRound([0, this.errorChartWidth])
        .domain([this.x1, this.error_chart_history_x]);

    this.error_y = d3.scaleLinear()
        .rangeRound([this.errorChartHeight, 2])
        .domain([1, d3.max(this.error_history, function (d) { return d; }) * 1.3]);
    this.errorGraphScaleColors = ['#F8CA00','#feb24c','#fd8d3c','#fc4e2a'];
    //Color scale
    this.errorGraphScale = d3.scaleLinear()
        .domain([400, 10000, 100000, 1000000 ])
        .range(this.errorGraphScaleColors);


    this.errorGraphLine = d3.line()
        .x(function(d, i) { return this.error_x(i);}.bind(this))
        .y(function(d, i) { return this.error_y(d); }.bind(this));

    // Draw X axis
    this.errorG.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.errorChartHeight + ")")
        .call(d3.axisBottom(this.error_x).ticks(5));
    // Draw Y axis
    this.errorYAxis = this.errorG.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(this.error_y).ticks(5));

    // Y axis label
    this.errorHolder .append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ 15 +","
            +(this.errorChartHeight/2 + this.miniErrorChartMargin.top)+")rotate(-90)")
        .attr("class", "error-axis-label")
        .text("Error");


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


    // Chart title
    this.errorHolder.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+
            ((this.miniErrorChartMargin.left + this.errorChartWidth + this.miniErrorChartMargin.right)/2)
            +","+
            20 +")")
        .attr("class", "chart-title")
        .text("Error Log");

};

// Adds an error points to the error graph
// https://gist.github.com/mbostock/1642874
NN_trainer.prototype.addErrorPoint = function (value) {

    this.error_history.push(value);
    // Redraw the line.
    d3.select(this.error_chart_el +" .error-history-line")
        .attr("d", this.errorGraphLine)
        .attr("transform", "translate(" + this.error_x(-1) + ",0)");

    // Pop the old data point off the front.
    if( this.error_history.length >= this.error_chart_history_x)
        this.error_history.shift();

    this.rescaleErrorGraph();
};


NN_trainer.prototype.batchAddErrorPoint = function (valuesArray) {

    this.error_history = this.error_history.concat(valuesArray);



    // Cut the needed number of elements to be within our specified error_chart_history_x
    if( this.error_history.length > this.error_chart_history_x)
    {
        // How much are we over by
        var overage = this.error_history.length - this.error_chart_history_x
        this.error_history.splice(0, overage);

    }

    d3.select(this.error_chart_el +" .error-history-line")
        .datum(this.error_history)
        .attr("d", this.errorGraphLine)
        .attr("transform", "translate(" + this.error_x(-valuesArray.length) + ",0)");



    this.rescaleErrorGraph();

};


NN_trainer.prototype.rescaleErrorGraph = function () {

    //this.error_y.domain([0, new_max_y]);
    this.error_y.domain([1, d3.max(this.error_history, function (d) { return d; })]);

    this.errorG.select(this.error_chart_el +" .axis--y")
        .call(d3.axisLeft(this.error_y).ticks(5));

    //this.heatmapColorScale
    this.errorG.selectAll(this.error_chart_el +" .axis--y .tick text")
        .attr("fill", function (d){return this.errorGraphScale(d)}.bind(this))
};


NN_trainer.prototype.calculatePrediction = function (x) {
    var prediction;
    if(this.normalize){
        // scale
        var scaled_x = (x - this.area_mean)/ this.area_std,
            scaled_prediction = scaled_x * this.weight + this.bias;
        prediction = scaled_prediction * this.prices_std + this.prices_mean;
    }
    else
        prediction = x * this.weight + this.bias;
    
    return prediction;
};

NN_trainer.prototype.updateWeightAndBias = function (weight, bias, updateUI) {

    var predictionDataPoints,
        errorLines,
        errorLineValues = [];


    if (weight != -1)  this.weight = parseFloat(weight);
    if (bias != -1) this.bias = parseFloat(bias);

    this.data[0].y = this.calculatePrediction(this.data[0].x);
    this.data[1].y = this.calculatePrediction(this.data[1].x);


    // Calculate predictions, and total error
    this.prediction = [];
    var prediction_sum = 0, delta, delta_2, delta_sum = 0, mean_delta_sum=0;
    for (var i = 0; i < this.areas.length; i++) {
        //this.prediction[i] = this.areas[i] * this.weight + this.bias;
        this.prediction[i] = this.calculatePrediction(this.areas[i]);
        delta = this.prices[i] - this.prediction[i];

        delta_2 = Math.pow(delta, 2);
        delta_sum = delta_sum + delta_2;

        errorLineValues[i] = [{x: this.areas[i], y: this.prices[i]}, {x: this.areas[i], y: this.prediction[i]}]
    }
    mean_delta_sum = delta_sum / this.prediction.length;

    if( updateUI )
    this.updateUI(mean_delta_sum, errorLineValues);



    return mean_delta_sum;
};

NN_trainer.prototype.updateUI = function(mean_delta_sum, errorLineValues){

    //Update error chart if available
    if(this.error_chart_el != "")
        this.addErrorPoint(mean_delta_sum);

    // Update the error/weight/bias indicators
    $(this.table_el + " span#weight").text(this.weight.toFixed(3));
    $(this.table_el + " span#bias").text(this.bias.toFixed(1));
    $(this.table_el + " span#error-value").text(numberWithCommas(Math.round(mean_delta_sum)));

    // Update comment on the score
    if (mean_delta_sum < 450) {
        $(" span#error-value-message").html("I honestly didn't know this was 'humanly' possible..");
    }
    else if (mean_delta_sum < 500) {
        $(this.table_el + " span#error-value-message").html("Hello there, superintelligent AI overlord..");
    }
    else if (mean_delta_sum < 600) {
        $(this.table_el + " span#error-value-message").html("Whoa whoa! Easy there, <a href='https://en.wikipedia.org/wiki/Yann_LeCun'>LeCun</a>!!");
    }
    else if (mean_delta_sum < 750) {
        $(this.table_el + " span#error-value-message").text("Nice! You cracked 750!");
    }
    else if (mean_delta_sum < 799) {
        $(this.table_el + " span#error-value-message").text("Good job!");
    }
    else if (mean_delta_sum >= 800000) {
        $(this.table_el + " span#error-value-message").text("Are you even trying?");
    }
    else if (mean_delta_sum >= 100000) {
        $(this.table_el + " span#error-value-message").text("Way off, buddy");
    }
    else {
        $(this.table_el + " span#error-value-message").text("");
    }


    // DRAW & UPDATE ERROR LINES
    // Draw the line's predictions for our datapoints as dots
    // DATA JOIN - only really useful the first time. It adds an element for each datapoint
    errorLines = this.g.selectAll(this.svg_el + " .error-line")
        .data(errorLineValues);
    // ENTER + UPDATE
    // Creates the dots the first time
    errorLines.enter().append("path")
        .attr("class", "error-line")
        .attr("d", function (d) {
            return this.valueline(d)
        }.bind(this));
    // UPDATE
    // This updates the coordinates of the prediction dots everytime the line changes
    errorLines.attr("d", function (d) {
        return this.valueline(d)
    }.bind(this));


    // DRAW / UPDATE PREDICTION LINE
    d3.select(this.svg_el + " .line")
        .attr("d", this.valueline(this.data));

    predictionDataPoints = zip([this.areas, this.prediction]);

    // DRAW & UPDATE PREDICTION POINTS
    // Draw the line's predictions for our datapoints as dots
    // DATA JOIN - only really useful the first time. It adds an element for each datapoint
    predictions = this.g.selectAll(this.svg_el + " .prediction-dot")
        .data(predictionDataPoints);
    // ENTER + UPDATE
    // Creates the dots the first time
    predictions.enter().append("circle")
        .attr("class", "prediction-dot")
        .attr("r", 3.5)
        .attr("cx", function (d) {
            return this.x(d[0])
        }.bind(this))
        .attr("cy", function (d) {
            return this.y(d[1])
        }.bind(this));
    // UPDATE
    // This updates the coordinates of the prediction dots everytime the line changes
    predictions.attr("cx", function (d) {
            return this.x(d[0])
        }.bind(this))
        .attr("cy", function (d) {
            return this.y(d[1])
        }.bind(this));

    if( this.heatmap_el != "")
        this.updateHeatmapElement(this.weight, this.bias, mean_delta_sum);


    if( this.neuralNetworkGraphEl != "")
        this.updateNeuralNetworkGraph()

    this.dataPointDots.moveUp();
};



NN_trainer.prototype.gradientDescentStep = function (number_of_steps) {

    // I probably shouldn't do this. I started doing feature normalization so we can keep to one learning rate.
    // I decided to do it this way to maintain narrative continuity.
    this.learningRate = 0.00000001;
    this.learningRate2 = 1;


    var error, errors_array = [], weights_array = [], biases_array =[];
    for( var c = 0; c < number_of_steps; c++){

        var sum_for_bias = 0, sum_for_weight = 0, bias_mean, weight_mean, bias_adjustment, weight_adjustment,
            new_b, new_w;
        for (var i = 0; i < this.areas.length; i++) {
            sum_for_bias = sum_for_bias + this.prediction[i] - this.prices[i];
            sum_for_weight = sum_for_weight +  (this.prediction[i] - this.prices[i] ) * this.areas[i];
        }

        //console.log("sum: ", sum_for_weight, sum_for_bias );

        bias_mean = sum_for_bias / this.areas.length;
        weightsMeans = sum_for_weight / this.areas.length;
        //console.log("sum means: ", weightsMeans, bias_mean);

        bias_adjustment = this.learningRate2 * bias_mean;
        weight_adjustment = this.learningRate * weightsMeans;
        //console.log("adjustments: ", weight_adjustment, bias_adjustment);

        new_b = this.bias - bias_adjustment;
        new_w =this.weight - weight_adjustment;

        // Only update the UI on the last step (if we're doing multiple steps
        // And in that case, add the errors to the error graph as a batch
        if( c == number_of_steps - 1) {

            if( errors_array.length != 0 ){
                this.batchAddErrorPoint(errors_array);
            }


            this.updateWeightAndBias(new_w, new_b, true);
        }
        else
        {
            error = this.updateWeightAndBias( new_w, new_b, false);
            weights_array.push(new_w);
            biases_array.push(new_b);
            errors_array.push(error);
        }
    }

    $(this.table_el + " #weightSlider").val(new_w);
    $(this.table_el + " #biasSlider").val(new_b);


};



NN_trainer.prototype.initializeHeatmap = function(){


    this.heatmapSideNumberOfElements = 15;
    //this.heatmapColors = ['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#0868ac','#084081'].reverse();
    //this.heatmapColors = ['#F8CA00','#a1dab4','#41b6c4','#225ea8'].reverse();
    this.heatmapColors = ['#fcfc99','#feb24c','#fd8d3c','#fc4e2a'];
    //this.heatmapColors = ['#ffffcc','#feb24c','#fd8d3c','#fc4e2a'];
    this.heatmapEmptyBoxColor = "#f0f0f0";
    this.heatmapData = this.generateHeatmapData(this.heatmapSideNumberOfElements);

    this.heatmapHolder = d3.select(this.heatmap_el) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", this.miniGraphWidth)
        .attr("height", this.miniGraphHeight);

    this.heatmapWidth = +this.heatmapHolder.attr("width") - this.miniGraphMargin.left - this.miniGraphMargin.right;
    this.heatmapHeight = +this.heatmapHolder.attr("height") - this.miniGraphMargin.top - this.miniGraphMargin.bottom;
    this.heatmapG = this.heatmapHolder.append("g").attr("transform", "translate(" + (this.miniGraphMargin.left + 15 )+ "," + this.miniGraphMargin.top + ")");



    this.heatmapBoxSize = (this.heatmapHeight) / this.heatmapSideNumberOfElements;


    // Initialize scales and axes

    // Scales for the axes
    this.heatmapXAxisScale = d3.scaleLinear()
        .domain(this.weightRange)
        .rangeRound([0, this.heatmapHeight]);
    this.heatmapYAxisScale = d3.scaleLinear()
        .domain(this.biasRange)
        .range([this.heatmapHeight , 0]);


    // Scales to map weight/bias to box number
    // Maps [0, 0.4] to discreet box numbers [1, 2, 3, ... ] for the x axis
    this.heatmapX = d3.scaleQuantile()
        .domain(this.weightRange)
        .range(d3.range(this.heatmapSideNumberOfElements));
    // Maps [0,400] to discreet box numbers [15, 14, 13,, ... 1 ] for the y axis
    this.heatmapY = d3.scaleQuantile()
        .domain(this.biasRange)
        .range(d3.range(this.heatmapSideNumberOfElements).map(function(d){
            return this.heatmapSideNumberOfElements  -1 - d;
        }.bind(this)));

    //Color scale
    this.heatmapColorScale = d3.scaleLinear()
        .domain([400, 10000, 100000, 1000000 ])
        .range(this.heatmapColors);

    // Draw X axis
    this.heatmapG.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.heatmapHeight + ")")
        .call(d3.axisBottom(this.heatmapXAxisScale).ticks(5));
    // Draw Y axis
    this.heatmapG.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(this.heatmapYAxisScale).ticks(5));

    // Weight axis label
    this.heatmapHolder.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+
            (this.heatmapWidth/2 + this.miniGraphMargin.left ) +","
            +( this.miniGraphMargin.top + this.heatmapHeight + this.miniGraphMargin.bottom - 5 )+")")
        .attr("class", "weight-axis-label")
        .text("Weight");

    // Bias axis label
    this.heatmapHolder.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (this.miniGraphMargin.left/2) +","
            +(this.heatmapHeight/2 + this.miniGraphMargin.top)+")rotate(-90)")
        .attr("class", "bias-axis-label")
        .text("Bias");

    // Chart title
    this.heatmapHolder.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+
            ((this.miniGraphMargin.left + this.heatmapWidth + this.miniGraphMargin.right)/2)
            +","+
            20 +")")
        .attr("class", "chart-title")
        .text("Weight vs. Bias vs. Error");


    this.updateHeatmap(this.heatmapData);
};



NN_trainer.prototype.updateHeatmap= function(data){
    var heatmapBoxSize = this.heatmapBoxSize, heatmapColorScale = this.heatmapColorScale;


    this.heatmap = this.heatmapG.selectAll(".heatmap-square")
        .data(data);

    this.heatmap.enter().append("rect")
        .attr("x", function(d){return (d.x) * heatmapBoxSize})
        .attr("y", function(d){return (d.y) * heatmapBoxSize})
        .attr("width", heatmapBoxSize)
        .attr("height", heatmapBoxSize)
        .attr("class", "heatmap-square")
        .attr("id", function(d){ return "box_" + d.x + "_" + d.y})
        .attr("fill", function(d, i){
            if(d.error == 0)
                return this.heatmapEmptyBoxColor;
            else
                return heatmapColorScale(d.error);}.bind(this))
};

NN_trainer.prototype.updateHeatmapElement = function(weight, bias, error){

    var x = this.heatmapX(weight), y = this.heatmapY(bias), heatmapColorScale = this.heatmapColorScale;

    var r = d3.select("#box_"+ x + "_" + y)
        .filter(function(d){return d.error == 0 })
        .datum({x: x, y: y, error: error});


    r.attr("fill", function(d, i){  return heatmapColorScale(d.error) })
        .attr("stroke", "#888")
        .attr("stroke-opacity",1)
        .transition().duration(1000)
        .attr("stroke-opacity",0);


    //r.enter().append("rect")
    //    .attr("x", function(d){console.log("XX"); return (d.x) * this.heatmapBoxSize})
    //    .attr("y", function(d){return (d.y) * this.heatmapBoxSize})
    //    .attr("width", this.heatmapBoxSize)
    //    .attr("height", this.heatmapBoxSize)
    //    .attr("class", "heatmap-square")
    //    .attr("id", function(d){ return d.x + "_" + d.y})
    //    .attr("fill", function(d, i){ console.log("FILLING") ; if(d.error == 0) return "#a0f0f0";  else  return heatmapColorScale(d.error);})

};


NN_trainer.prototype.generateHeatmapData= function(size){
    var data = [];
    for(var i = 0; i < size; i++)
        for( var j = 0; j < size; j++)
            data.push({x: i, y: j, error: 0});

    return data;
};


NN_trainer.prototype.initializeNeuralNetworkGraph= function(){
    this.nnGraphHolder = d3.select(this.neuralNetworkGraphEl) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", 429)      // make the SVG element 449 pixels wide
        .attr("height", 150);    // make the SVG element 249 pixels high
    this.neuralNetworkMargin = {top: 10, right: 10, bottom: 10, left: 10},
        this.neuralNetworkWidth = +this.nnGraphHolder.attr("width") - this.neuralNetworkMargin.left - this.neuralNetworkMargin.right,
        this.neuralNetworkHeight = +this.nnGraphHolder.attr("height") - this.neuralNetworkMargin.top - this.neuralNetworkMargin.bottom,
        this.neuralNetworkG = this.nnGraphHolder.append("g");

    var nodeRadius = 30;

    // Arrow
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
            "x1":this.neuralNetworkMargin.left + 2 * nodeRadius,
            "y1":this.neuralNetworkMargin.top + this.neuralNetworkHeight/2 ,
            "x2":this.neuralNetworkWidth - 2 * nodeRadius + this.neuralNetworkMargin.left - 8,
            "y2":this.neuralNetworkMargin.top + this.neuralNetworkHeight/2
        });


    // Input node
    this.inputNode = this.neuralNetworkG
        .append("circle")
        .attr("class", "inputNode")
        .attr("r", nodeRadius)
        .attr("cx", this.neuralNetworkMargin.left + nodeRadius  )
        .attr("cy", this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2);

    // Weight Node
    this.weightG = this.neuralNetworkG.append("g")
        .attr("transform", "translate("+
            (this.neuralNetworkMargin.left + nodeRadius + this.neuralNetworkWidth / 3 - 10)
            +","
            +(this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2)+")");
    this.weightNode = this.weightG
        .append("ellipse")
        .attr("class", "weightNode")
        .attr("rx", nodeRadius * 1.7)
        .attr("ry", nodeRadius )
        .attr("cx", 0)
        .attr("cy", 0);
    this.weightG.append("text")
        .attr("id", "weightValue")
        .attr("text-anchor", "middle")
        .attr("y", 5)
        .text("");


    // Bias Node
    this.biasG = this.neuralNetworkG.append("g")
        .attr("transform", "translate("+
            (this.neuralNetworkWidth * 2 / 3  - 20)
            +","
            +(this.neuralNetworkMargin.top + this.neuralNetworkHeight / 2 - nodeRadius)+")");
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


NN_trainer.prototype.updateNeuralNetworkGraph = function(){
    d3.select(this.neuralNetworkGraphEl + " #weightValue")
        .text(this.weight.toFixed(3));

    d3.select(this.neuralNetworkGraphEl + " #biasValue")
        .text(this.bias.toFixed(1));



}



var trainer = new NN_trainer("#training-one-chart",  "#training-one",
    [2104, 1600, 2400], // areas
    [399.900, 329.900, 369.000], // prices
    0.1,    // initial weight
    150,    // initial bias
    0,      // x1
    0,      // y1
    2600,   // x2
    410,    //y2
    "", "", "", "", false, "", "", "", "", "#neural-network-graph");



var trainer2 = new NN_trainer("#training-one-gd-chart",  "#training-one-gd",
    [2104, 1600, 2400],
    [399.900, 329.900, 369.000],
    0,      // initial weight
    0,      // initial bias
    0,      // x1
    0,      // y1
    2600,   // x2
    410,    //y2
    "#gradient-descent-button",
    "#gradient-descent-10-button",
    "#gradient-descent-100-button",
    "#gradient-descent-converge-button",
    false,
    "#training-one-gd-error-chart",
    "#training-one-gd-heatmap",
    [0, 0.4],
    [0, 460],
    "#neural-network-gd-graph"
);


