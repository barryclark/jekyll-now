/**
 * Created by alammar on 2/3/17.
 */

var reluGraph = function (containerElement, xStart, xEnd, xDefault, sliderElement, reluInputElement,
                             reluFormulaInputElement, reluResult, reluGraphResult) {
    this.containerElement = containerElement;
    this.graphWidth = 400;
    this.graphHeight = 160;
    this.sliderElement = sliderElement;
    this.reluInputElement = reluInputElement;
    this.reluFormulaInputElement = reluFormulaInputElement;
    this.reluResult = reluResult;
    this.xDefault = xDefault;
    this.reluGraphResult = reluGraphResult;

    this.values = this.generateValues(xStart, xEnd);
    this.initializeGraph();
    this.attachEventsToSlider();


    this.updateReluValue(this.containerElement, this.reluInputElement, this.xDefault);
};


reluGraph.prototype.initializeGraph = function () {
    var obj = this;
    this.graphHolder = d3.select(this.containerElement) // select the 'body' element
        .append("svg")           // append an SVG element to the body
        .attr("class", "activation-graph")
        .attr("width", this.graphWidth)      // make the SVG element 449 pixels wide
        .attr("height", this.graphHeight);    // make the SVG element 249 pixels high
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
        });


    obj.x.domain(d3.extent(this.values, function (d) {
        return d.x;
    }));
    obj.y.domain(d3.extent(this.values, function (d) {
        return d.y;
    }));


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
        .call(d3.axisLeft(obj.y))
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
            .ticks(1)
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
        .attr("class", "relu-line activation-line-straight")
        .attr("d", line);



    this.valueG = this.g.append("g")
        .attr("class", "value-point")
        .attr("transform", "translate("+this.x(this.xDefault)+"," + this.y(relu(this.xDefault)) + ")");

    this.valueG.append("ellipse")
        .attr("class", "relu-value-dot activation-value-dot")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("cx", 0)
        .attr("cy", 0);


    this.valueG.append("text")
        .attr("class", "relu-value-text activation-value-text")
        .attr("fill", "red")
        .attr("text-anchor", "middle")
        .attr("font-size", "12")
        .attr("y", -8)
        .text(relu(this.xDefault));



};


reluGraph.prototype.updateGraph = function () {

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


    d3.select(".relu-line")
        .attr("d", line)
};


reluGraph.prototype.attachEventsToSlider = function ( ) {
    console.log("attach",  this.sliderElement);
    // Attach events to react to the user moving the sliders
    var self = this;
    $(this.sliderElement).on("input change", (function(){

        self.updateReluValue(self.containerElement, self.reluInputElement, this.value)
    }));

    $(this.sliderElement).css('margin-left',( this.margin.left - 20)+'px');
    $(this.sliderElement).css('width',(this.width + 40)+'px');
};




reluGraph.prototype.updateReluValue = function (containerElement, sliderElement, inputValue) {


    // Update Text values
    d3.selectAll(this.reluInputElement)
        .text(inputValue);
    d3.select(this.reluFormulaInputElement)
        .text( parseFloat(inputValue).toFixed(2) );
    // Update formula result
    d3.select(this.reluResult)
        .text(relu(inputValue));
    d3.select(this.reluGraphResult)
        .text( relu(inputValue) );

    // Update graph
    d3.select(this.containerElement + " .value-point")
        .attr("transform", "translate(" + this.x(inputValue) +"," +this.y(relu(inputValue))+")");

    // Update graph dot label
    d3.select(this.containerElement + " .relu-value-text")
        .text(relu(inputValue));


};


reluGraph.prototype.generateValues = function (xStart, xEnd) {
    var length = xEnd - xStart, values = [];

    for (var i = xStart; i <= xEnd; i = i +10) {
        var point = {x: i, y: relu(i)};
        values.push(point);
    }

    return values;
};


var relu = function (x) {
    return x < 0? 0 : x;
};

var relu_graph = new reluGraph("#relu-graph", -20, 20, 0, "#relu-slider", ".relu-input-value",
    "#relu-formula-input .relu-value-input-number", "#relu-result", ".explicit-relu-activation-output-value");


//d3.select(window).on('resize', resize);
//
//function resize() {
//    var width = parseInt(d3.select(sig.containerElement).style("width")),
//        height = parseInt(d3.select(sig.containerElement).style("height"));
//    sig.graphWidth = width;
//    sig.graphHeight = height;
//    sig.updateGraph()
//}