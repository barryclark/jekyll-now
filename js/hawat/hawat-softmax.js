/**
 * Created by alammar on 2/7/17.
 */

export function graphSoftmax(data) {

    var softmax = this.neuralNetworkG.selectAll(this.svgElement + " .softmax")
        .data([data]);


    var softmaxGroup = softmax.enter()
        .append("g")
        .attr("class", "softmax")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        });

    // Define function to create and open tooltip
    var activate = function(d){
        if( viz.layerValues[1] ){
            // Set up the tooltip to show the inputs and their sum
            var rows = '<table class="softmax-calculation">', total = 0;
            rows = rows + "<tr>" +
                "<th>Softmax input</th>" +
                "<th>Calculation</th>" +
                "<th>Softmax output</th>" +
                "<th>Class</th>" +
                "</tr>";

            var sum_term = viz.layerValues[1].map(function(d){return "e^{" + numberFormatter(d, 2) + "}"}).join(" + ");
            var exponential_terms = [];
            var softMaxTopResult = viz.softmaxOutputs.indexOf(d3.max(viz.softmaxOutputs));
            for( var i = 0; i < viz.layerValues[1].length; i ++ ){
                exponential_terms[i] = " e^{" + numberFormatter(viz.layerValues[1][i], 2)+"}";
                var eq =  katex.renderToString("\\frac{"+exponential_terms[i]+"}{"+sum_term+"}");
                // If the node has the top softmax value, highlight it
                var highlight_cell = softMaxTopResult == i ? "highlighted" : "";

                var node_row = "<tr>" +
                    "<td class='input'>"+numberFormatter(viz.layerValues[1][i], 2)+"</td>" +
                    "<td class='calculation'> " + eq +"</td>" +
                    "<td class='"+highlight_cell+"'>"+ numberFormatter(viz.softmaxOutputs[i], 2)+"</td>" +
                    "<td class='class-name "+highlight_cell+"'>"+ viz.classes[i]+"</td>" +
                    "</tr>";

                rows = rows + node_row;
            }

            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(rows)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        }
        else{
            var html = "Hover-over or tap one of the row in the table, then you'll see the softmax calculation here.";

            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(html)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        }
    };

    // Define function to close tooltip
    var deactivate = function(d){
        viz.tooltipDiv.transition()
            .duration(200)
            .style("opacity", 0);
    };


    var viz = this;
    softmaxGroup
        .append("rect")
        .attr("class", "outlined-softmax-node nn-node")
        .attr("width", this.nodeRadius * 1.5)
        .attr("height", this.neuralNetworkHeight)
        .attr("rx", this.nodeRadius / 4)
        .attr("ry", this.nodeRadius / 4)
        .attr("x", 0 - this.nodeRadius / 2)
        .attr("y", 0)
        .on("mouseover", activate)
        .on("touchenter", activate)
        .on("touchmove", function(d){
            d3.event.preventDefault()
        })
        .on("mouseout", deactivate)
        .on("touchleave", deactivate);


    softmaxGroup.append("text")
        .attr("id", "biasValue")
        .attr("text-anchor", "middle")
        .attr("x", this.neuralNetworkHeight / 2)
        .attr("y", -2)
        .attr("transform", "rotate(90)")
        .text("softmax");

};


export function graphSoftmaxOutputs (softmaxOutputs) {
    var grapher = this;
    var data = [];
    for (var i = 0; i < this.softmaxOutputs.length; i++) {
        data.push({
            index: i,
            value: softmaxOutputs[i]
        })
    }

    var maxValueIndex = d3.max(this.softmaxOutputs)

    var softmaxOutputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-group")
        .data(data);

    softmaxOutputGroups.select("text")
        .attr("class", function(d){
            if (d.value == maxValueIndex)
                return "highlighted-softmax-output";
            else
                return "dim-softmax-output";
        })
        .text(function (d) {

            return numberFormatter(d.value * 100, 2) + "%"
        });

    var softmaxOutputElements = softmaxOutputGroups.enter()
        .append("g")
        .attrs({
            class: "softmax-output-group",
            transform: function (d) {
                return "translate(" + (grapher.softmaxOutputsX - 8) + ", " + (grapher.getYCoordinateOfNodeInOutputLayer(d.index) + 5) + ")";
            },
            //"font-size": function(d){return 10 + d.value * 8 }
        });

    softmaxOutputElements.append("text")
        .attr("class", function(d){
            if (d.value == maxValueIndex)
                return "highlighted-softmax-output"
            else
                return "dim-softmax-output"

        })
        .text(function (d) {
            return numberFormatter(d.value * 100, 2) + "%"
        });
};


export function updateSoftmax(input){
    this.softmaxOutputs = softmax(input);

    // Display softmax and final output
    this.graphSoftmaxOutputs(this.softmaxOutputs);

    this.highlightTopSoftmaxOutput();
}

export function highlightTopSoftmaxOutput(){

    var highlightOrDimClass = '', topClassIndex = -1;
    if(this.softmaxOutputs){
        topClassIndex = this.softmaxOutputs.indexOf(d3.max(this.softmaxOutputs))
    }

    var softmaxOutputClassName = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-class-name")
    softmaxOutputClassName
        .attr("class", function(d, i){
            var classValue = "softmax-output-class-name ";

            if(d.outputNode == topClassIndex)
                classValue = classValue+ "highlighted-softmax-output";
            else
                classValue = classValue+ "dim-softmax-output";

            return classValue
        })

}




softmax = function (input){

    if( !(input instanceof Array))
        throw(TypeError("Input passed into softmax() is not an array. softmax() expects an array. Input: "+ input, "nnVizUtils.js"));

    var output = [], expSum = 0;

    // Calculate the sum of exp's
    for (var i = 0; i < input.length; i++){
        if( !(typeof(input[i]) == "number") ){
            throw(TypeError("An element in the array passed to softmax() is not a number. softmax() expects an array of numbers. Input: "+ input[i], "nnVizUtils.js"));
        }
        expSum = expSum + Math.exp(input[i]);
    }

    for (var j = 0; j < input.length; j++)
        output[j] = Math.exp(input[j]) / expSum;

    return output;
};