/**
 * Created by alammar on 2/3/17.
 */

var sigmoidGraph = function (containerElement, xStart, xEnd, xDefault, sliderElement, sigmoidInputElement,
                             sigmoidFormulaInputElement, sigmoidResult, sigmoidGraphResult) {
    this.containerElement = containerElement;
    this.graphWidth = 400;
    this.graphHeight = 160;
    this.sliderElement = sliderElement;
    this.sigmoidInputElement = sigmoidInputElement;
    this.sigmoidFormulaInputElement = sigmoidFormulaInputElement;
    this.sigmoidResult = sigmoidResult;
    this.xDefault = xDefault;
    this.sigmoidGraphResult = sigmoidGraphResult;

    this.values = this.generateValues(xStart, xEnd);
    this.initializeGraph();
    this.attachEventsToSlider();


    this.updateSigmoidValue(this.containerElement, this.sigmoidInputElement, this.xDefault);
};


sigmoidGraph.prototype.initializeGraph = function () {
    var obj = this;
    this.graphHolder = d3.select(this.containerElement) // select the container element
        .append("svg")           // append an SVG element to the body
        .attr("class", "activation-graph")
        .attr("width", this.graphWidth)
        .attr("height", this.graphHeight);
    this.margin = {top: 30, right: 60, bottom: 20, left: 60};
    this.width = +this.graphHolder.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.graphHolder.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.graphHolder.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


    this.x = d3.scaleLinear()
        .rangeRound([0, this.width]);

    this.y = d3.scaleLinear()
        .rangeRound([this.height, 0]);

    var line = d3.line()
        .x(function (d) {
            return obj.x(d.x);
        })
        .y(function (d) {
            return obj.y(d.y);
        })
        .curve(d3.curveCardinal.tension(0.5));


    obj.x.domain(d3.extent(this.values, function (d) {
        return d.x;
    }));
    obj.y.domain([0, 1]);


    // X axis
    this.g.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class", "x-axis")
        .call(d3.axisBottom(obj.x))
        .select(".domain")
        .remove();

    // Y Axis
    this.g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(obj.y)
            .tickValues([0, 0.5, 1]))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Output");


    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(obj.x)
            .ticks(1)
    }

    // add the X gridlines
    this.g.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + this.height + ")")
        .call(make_x_gridlines()
            .tickSize(-this.height)
            .tickFormat("")
        );

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(obj.y)
            .tickValues([0, 0.5, 1])
    }

    // add the Y gridlines
    this.g.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-this.width)
            .tickFormat("")
        );


    // Line
    this.g.append("path")
        .datum(this.values)
        .attr("class", "sigmoid-line")
        .attr("d", line);



    this.valueG = this.g.append("g")
        .attr("class", "value-point")
        .attr("transform", "translate("+this.x(this.xDefault)+"," + this.y(sigmoid(this.xDefault)) + ")");

    this.valueG.append("ellipse")
        .attr("class", "sigmoid-value-dot")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("cx", 0)
        .attr("cy", 0);


    this.valueG.append("text")
        .attr("class", "sigmoid-value-text")
        .attr("fill", "red")
        .attr("text-anchor", "middle")
        .attr("font-size", "12")
        .attr("y", -8)
        .text(sigmoid(this.xDefault));



};


sigmoidGraph.prototype.updateGraph = function () {

    var obj = this;
    this.width =  this.graphWidth - this.margin.left - this.margin.right;
    this.height = this.graphHeight - this.margin.top - this.margin.bottom;

    var svg = d3.select(this.containerElement + " svg")
        .attr("width", this.graphWidth)
        .attr("height", 160);

    this.x.rangeRound([0, this.width]);
    this.y.rangeRound([this.height, 0]);

    d3.select(".x-axis")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class", "x-axis")
        .call(d3.axisBottom(this.x))
        .select(".domain")
        .remove();



    var line = d3.line()
        .x(function (d) {
            return obj.x(d.x);
        })
        .y(function (d) {
            return obj.y(d.y);
        })
        .curve(d3.curveCardinal.tension(0.5));


    d3.select(".sigmoid-line")
        .attr("d", line)
};


sigmoidGraph.prototype.attachEventsToSlider = function ( ) {
    console.log("attach",  this.sliderElement);
    // Attach events to react to the user moving the sliders
    var self = this;
    $(this.sliderElement).on("input change", (function(){

        self.updateSigmoidValue(self.containerElement, self.sigmoidInputElement, this.value)
    }));

    $(this.sliderElement).css('margin-left',( this.margin.left - 20)+'px');
    $(this.sliderElement).css('width',(this.width + 40)+'px');
};




sigmoidGraph.prototype.updateSigmoidValue = function (containerElement, sliderElement, inputValue) {


    // Update Text values
    d3.selectAll(this.sigmoidInputElement)
        .text(inputValue);
    d3.select(this.sigmoidFormulaInputElement)
        .text( parseFloat(inputValue).toFixed(2) );
    // Update formula result
    d3.select(this.sigmoidResult)
        .text(sigmoid(inputValue).toFixed(11));
    d3.select(this.sigmoidGraphResult)
        .text( sigmoid(inputValue).toFixed(11) );

    // Update graph
    d3.select(this.containerElement + " .value-point")
        .attr("transform", "translate(" + this.x(inputValue) +"," +this.y(sigmoid(inputValue))+")");

    // Update graph dot label
    d3.select(this.containerElement + " .sigmoid-value-text")
        .text(sigmoid(inputValue).toFixed(11));


};


sigmoidGraph.prototype.generateValues = function (xStart, xEnd) {
    var length = xEnd - xStart, values = [];

    for (var i = xStart; i <= xEnd; i++) {
        var point = {x: i, y: sigmoid(i)};
        values.push(point);
    }

    return values;
};


var sigmoid = function (x) {
    return 1 / ( 1 + Math.exp(-x))
};

var sig = new sigmoidGraph("#sigmoid-graph", -20, 20, 0, "#sigmoid-slider", ".sigmoid-input-value",
    "#sigmoid-formula-input .sigmoid-value-input-number", "#sigmoid-result", ".explicit-activation-output-value");


//d3.select(window).on('resize', resize);
//
//function resize() {
//    var width = parseInt(d3.select(sig.containerElement).style("width")),
//        height = parseInt(d3.select(sig.containerElement).style("height"));
//    sig.graphWidth = width;
//    sig.graphHeight = height;
//    sig.updateGraph()
//}