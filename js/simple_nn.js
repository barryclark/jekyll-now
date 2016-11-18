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

// add commas to a big number fo readibility
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}







var NN_trainer = function (svg_el, table_el, areas, prices, weight, bias, x1, y1, x2) {
    this.svg_el = svg_el;
    this.table_el = table_el;
    this.areas = areas;
    this.prices = prices;
    this.ex_weight = weight;
    this.ex_bias = bias;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = this.x2 * this.ex_weight + this.ex_bias;
    this.data = [{x: this.x1, y: this.y1}, {x: this.x2, y: this.y2}];
    this.dataPoints = zip([this.areas, this.prices]);


    this.holder = d3.select(this.svg_el) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("width", 449)      // make the SVG element 449 pixels wide
        .attr("height", 249);    // make the SVG element 249 pixels high

    this.margin = {top: 20, right: 20, bottom: 30, left: 50},
        this.width = +this.holder.attr("width") - this.margin.left - this.margin.right,
        this.height = +this.holder.attr("height") - this.margin.top - this.margin.bottom,
        this.g = this.holder.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


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

    $(this.table_el + " #weightSlider").val(this.ex_weight);
    $(this.table_el + " #biasSlider").val(this.ex_bias);



    $(this.table_el + " #weightSlider").on("input change", (function(){
        trainer.updateWeightAndBias(this.value, -1)
    }));

    $(this.table_el + " #biasSlider").on("input change", (function(){
        trainer.updateWeightAndBias(-1, this.value)
    }));

};









NN_trainer.prototype.updateWeightAndBias = function (weight, bias) {

    var predictionDataPoints,
        errorLines,
        errorLineValues = [];


    if (weight != -1)  this.ex_weight = parseFloat(weight);
    if (bias != -1) this.ex_bias = parseFloat(bias);

    this.data[0].y = this.data[0].x * this.ex_weight + this.ex_bias;
    this.data[1].y = this.data[1].x * this.ex_weight + this.ex_bias;


    // Calculate predictions, and total error
    var prediction_sum = 0, prediction = [], delta, delta_2, delta_sum = 0;
    for (var i = 0; i < this.areas.length; i++) {
        prediction[i] = this.areas[i] * this.ex_weight + this.ex_bias;
        delta = this.prices[i] - prediction[i];

        delta_2 = Math.pow(delta, 2);
        delta_sum = delta_sum + delta_2;

        errorLineValues[i] = [{x: this.areas[i], y: this.prices[i]}, {x: this.areas[i], y: prediction[i]}]
    }


    // Update the error/weight/bias indicators
    $(this.table_el + " span#weight").text(this.ex_weight);
    $(this.table_el + " span#bias").text(this.ex_bias);
    $(this.table_el + " span#error-value").text(numberWithCommas(Math.round(delta_sum)));

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

    predictionDataPoints = zip([this.areas, prediction]);


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




var w= 0.1, b = 150;

var trainer = new NN_trainer("#training-one-chart",  "#training-one",
    [2104, 1600, 2400],
    [399.900, 329.900, 369.000],
    w,
    b,
    0,
    0,
    2600);
trainer.updateWeightAndBias(w, b);

