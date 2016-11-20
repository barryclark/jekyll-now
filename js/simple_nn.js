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




var NN_trainer = function (svg_el, table_el, areas, prices, weight, bias, x1, y1, x2,
                           gradientDescentButton, gradientDescent10Button, gradientDescent100Button,
                           gradientDescentConvergeButton, normalize, error_chart_el) {
    this.svg_el = svg_el;
    this.table_el = table_el;
    this.areas = areas;
    this.prices = prices;
    this.weight = weight;
    this.bias = bias;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = x2 * weight + bias;
    this.data = [{x: this.x1, y: this.y1}, {x: this.x2, y: this.y2}];
    this.prediction = [];
    this.dataPoints = zip([this.areas, this.prices]);
    this.normalize = normalize;
    this.error_chart_el = error_chart_el;


    console.log(this.dataPoints);

    // Normalization doesn't work quite yet. Actually decided to roll back during implementation
    // because changing the weights and biases between examples would confuse readers.
    if(normalize)
        this.normalizeFeatures(areas, prices);


    this.initializeGraph();

    if(error_chart_el != "")
        this.initializeErrorGraph();

    // Set the initial values of the sliders
    this.updateWeightAndBias(this.weight, this.bias);

    // Attach events to react to the user moving the sliders
    var trainer_self = this;
    $(this.table_el + " #weightSlider").on("input change", (function(){
        trainer_self.updateWeightAndBias(this.value, -1)
    }));

    $(this.table_el + " #biasSlider").on("input change", (function(){
        trainer_self.updateWeightAndBias(-1, this.value)
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

    if (gradientDescentConvergeButton != ''){
        $(this.table_el + " " + gradientDescentConvergeButton).click(function(){
            trainer_self.gradientDescentStep(1)
        });
    }


    $(this.table_el + " #weightSlider").val(this.weight);
    $(this.table_el + " #weightBias").val(this.bias);
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
        .attr("width", 449)      // make the SVG element 449 pixels wide
        .attr("height", 249);    // make the SVG element 249 pixels high
    this.margin = {top: 20, right: 20, bottom: 30, left: 50},
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
    console.log("initializeErrorGraph");

    this.error_chart_history_x = 200;       // How many error data points to show
    this.error_chart_history_y = 100000;    // How high the bar goes
    this.error_history = [10000];


    this.errorHolder = d3.select(this.error_chart_el) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", 240)      // make the SVG element 449 pixels wide
        .attr("height", 120);    // make the SVG element 249 pixels high

        this.errorChartWidth = +this.errorHolder.attr("width") - this.margin.left - this.margin.right;
        this.errorChartHeight = +this.errorHolder.attr("height") - this.margin.top - this.margin.bottom;
        this.errorG = this.errorHolder.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // Initialize scales and axes
    this.error_x = d3.scaleLinear()
        .rangeRound([0, this.errorChartWidth])
        .domain([this.x1, this.error_chart_history_x]);

    this.error_y = d3.scaleLinear()
        .rangeRound([this.errorChartHeight, 0])
        .domain([this.y1, d3.max(this.error_history, function (d) { return d + d * 0.2; })]);



    this.errorGraphLine = d3.line()
        .x(function(d, i) { return this.error_x(i);}.bind(this))
        .y(function(d, i) { return this.error_y(d); }.bind(this));

    // Draw X axis
    this.errorG.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.errorChartHeight + ")")
        .call(d3.axisBottom(this.error_x).ticks(5));
    // Draw Y axis
    this.errorG.append("g")
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

    this.rescaleErrorGraph(this.max_error_y);
};


NN_trainer.prototype.rescaleErrorGraph = function (new_max_y) {
    console.log("rescale");
    //this.error_y.domain([0, new_max_y]);
    this.error_y.domain([this.y1, d3.max(this.error_history, function (d) { return d; })]);

    this.errorG.select(this.error_chart_el +" .axis--y")
        .call(d3.axisLeft(this.error_y).ticks(5));
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

NN_trainer.prototype.updateWeightAndBias = function (weight, bias) {

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

    //Update error chart if available
    if(this.error_chart_el != "")
        this.addErrorPoint(mean_delta_sum);
    // Update the error/weight/bias indicators
    $(this.table_el + " span#weight").text(this.weight);
    $(this.table_el + " span#bias").text(this.bias);
    $(this.table_el + " span#error-value").text(numberWithCommas(Math.round(mean_delta_sum)));

    // Update comment on the score
    if (delta_sum < 1200) {
        $(" span#error-value-message").html("I honestly didn't know this was possible..");
    }
    else if (delta_sum < 1500) {
        $(this.table_el + " span#error-value-message").html("Hello there, superintelligent AI overlord..");
    }
    else if (delta_sum < 1700) {
        $(this.table_el + " span#error-value-message").html("Whoa whoa! Easy there, <a href='https://en.wikipedia.org/wiki/Yann_LeCun'>LeCun</a>!!");
    }
    else if (delta_sum < 2000) {
        $(this.table_el + " span#error-value-message").text("Nice! You cracked 2,000!");
    }
    else if (delta_sum < 2397) {
        $(this.table_el + " span#error-value-message").text("Good job!");
    }
    else if (delta_sum >= 1000000) {
        $(this.table_el + " span#error-value-message").text("Are you even trying?");
    }
    else if (delta_sum >= 50000) {
        $(this.table_el + " span#error-value-message").text("seriously?");
    }
    else if (delta_sum >= 2397) {
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

    this.dataPointDots.moveUp();
};




NN_trainer.prototype.gradientDescentStep = function (number_of_steps) {

    // I probably shouldn't do this. I started doing feature normalization so we can keep to one learning rate.
    // I decided to do it this way to maintain narrative continuity.
    this.learningRate = 0.00000001;
    this.learningRate2 = 1;

    for( var c = 0; c < number_of_steps; c++){

        var sum_for_bias = 0, sum_for_weight = 0, bias_mean, weight_mean, bias_adjustment, weight_adjustment,
            new_b, new_w;
        for (var i = 0; i < this.areas.length; i++) {
            sum_for_bias = sum_for_bias + this.prediction[i] - this.prices[i];
            sum_for_weight = sum_for_weight +  (this.prediction[i] - this.prices[i] ) * this.areas[i];
        }

        console.log("sum: ", sum_for_weight, sum_for_bias );

        bias_mean = sum_for_bias / this.areas.length;
        weight_mean = sum_for_weight / this.areas.length;
        console.log("sum means: ", weight_mean, bias_mean);

        bias_adjustment = this.learningRate2 * bias_mean;
        weight_adjustment = this.learningRate * weight_mean;
        console.log("adjustments: ", weight_adjustment, bias_adjustment);

        new_b = this.bias - bias_adjustment;
        new_w =this.weight - weight_adjustment;

        console.log("new weight & bias: ",new_w, new_b );
        this.updateWeightAndBias( new_w, new_b);
    }

    $(this.table_el + " #weightSlider").val(new_w);
    $(this.table_el + " #weightBias").val(new_b);


};





var trainer = new NN_trainer("#training-one-chart",  "#training-one",
    [2104, 1600, 2400], // areas
    [399.900, 329.900, 369.000], // prices
    0.1,    // initial weight
    150,    // initial bias
    0,      // x1
    0,      // y1
    2600,   // x2
    "", "", "", "", false, "");



var trainer2 = new NN_trainer("#training-one-gd-chart",  "#training-one-gd",
    [2104, 1600, 2400],
    [399.900, 329.900, 369.000],
    0.1,      // initial weight
    150,      // initial bias
    0,      // x1
    0,      // y1
    2600,   // x2
    "#gradient-descent-button",
    "#gradient-descent-10-button",
    "#gradient-descent-100-button",
    "#gradient-descent-converge-button",
    false,
    "#training-one-gd-error-chart"
);
