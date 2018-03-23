/**
 * Created by alammar on 3/6/17.
 */
var accuracyGraph = function(containerElement, data){
    this.containerElement = containerElement;

    this.initializeGraph(containerElement, data);
};

accuracyGraph.prototype.initializeGraph = function(containerElement, data){

    this.graphHolder = d3.select(this.containerElement) // select the 'body' element
        .append("svg")
        .attr("class", "accuracy-graph")
        .attr("width", 300)
        .attr("height", 450);

        this.margin = {top: 50, right: 30, bottom: 40, left: 40};
        this.width = +this.graphHolder.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.graphHolder.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.graphHolder.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        //margin = {top: 20, right: 20, bottom: 30, left: 40},
        //width = +svg.attr("width") - margin.left - margin.right,
        //height = +svg.attr("height") - margin.top - margin.bottom,
        //g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, this.width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([this.height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#ccc9fa", "#d18fe2", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // New Scales
    var x = d3.scaleLinear()
    .rangeRound([0, this.width]);

    var y0 = d3.scaleBand()
    .rangeRound([this.height, 0])
    .paddingInner(0.1);

    var y1 = d3.scaleBand()
    .padding(0.05);


    var keys = ["score", "validationScore"];


    x0.domain(data.map(function(d) { return d.hiddenNodes; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    // New Scale adjustments
    x.domain([0, 100]).nice();
    y0.domain(data.map(function(d) {return d.hiddenNodes; }).reverse());
    y1.domain(keys).rangeRound([0, y0.bandwidth()]);

    // Draw the bars
    this.g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(0, " + y0(d.hiddenNodes) + ")"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", 0)// function(d) { return x(d.value); })
        .attr("y", function(d) { return y1(d.key); })
        .attr("width", function(d) { return x(d.value); }.bind(this))
        .attr("height", y1.bandwidth())
        .attr("fill", function(d) { return z(d.key); });


    // Draw X axis
    this.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x).ticks(null, "s"))
        .append("text")
        .attr("x", this.width/2)
        .attr("y", "30")
        //.attr("y", x(x.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Accuracy");

    // Draw Y Axis
    this.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(y0))
        .append("text")
        .attr("x", this.height/2)
        .attr("y", 30)
        .attr("transform", "rotate(90)")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text("# of Hidden Nodes");

    // Legend
    var legend = this.g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("transform", "translate(0, -45)")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", this.width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", this.width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
};

var accuracyScores = [
    {hiddenNodes: 0, score: 68.00, validationScore: 70.79},
    {hiddenNodes: 1, score: 60.67, validationScore: 63.57},
    {hiddenNodes: 2, score: 60.67, validationScore: 63.57},
    {hiddenNodes: 3, score: 76.17, validationScore:74.23 },
    {hiddenNodes: 4, score: 79.17, validationScore: 77.66},
    {hiddenNodes: 8, score: 79.17, validationScore: 77.66},
    {hiddenNodes: 16, score: 79.17, validationScore: 77.66},
    {hiddenNodes: 32, score: 78.67, validationScore: 77.32},
    {hiddenNodes: 64, score: 78.83, validationScore: 77.66}
    //{hiddenNodes: 128, score: 75.17, validationScore: 74.23 },
    //{hiddenNodes: 256, score: 76.67, validationScore:74.91 },
    //{hiddenNodes: 512, score: 78.17, validationScore: 77.32},
    //{hiddenNodes: 1024, score: 78.67, validationScore:77.32 },
    //{hiddenNodes: , score: , validationScore: },
];



var accuracy_graph = new accuracyGraph("#accuracy-graph", accuracyScores);