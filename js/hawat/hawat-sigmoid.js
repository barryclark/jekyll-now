/**
 * Created by alammar on 2/11/17.
 */



export function graphSigmoid(data) {

    var sigmoid = this.neuralNetworkG.selectAll(this.svgElement + " .sigmoid")
        .data([data]);


    var sigmoidGroup = sigmoid.enter()
        .append("g")
        .attr("class", "sigmoid activation")
        .attr("transform", function (d) {
            return "translate(" +
                (d.x)
                + ","
                + (d.y) + ")";
        });


    var viz = this,
        height = this.neuralNetworkHeight / 2,
        width = this.nodeRadius * 1.5,
        yDisplacement = -(height / 2)
        ;

    // Define function to create and open tooltip
    var activate = function (d) {console.log("INSIDE", viz.layerValues[1])
        if (viz.layerValues[1]) {
            // Set up the tooltip to show the inputs and their sum
            var rows = '<table class="softmax-calculation">', total = 0,
                inputValue = roundPrecision(viz.layerValues[1][0], 5);
            rows = rows + "<tr>" +
                "<th>sigmoid input</th>" +
                "<th>Calculation</th>" +
                "<th>sigmoid output</th>" +
                "</tr>";

            var sum_term = viz.layerValues[1].map(function (d) {
                return "e^{" + numberFormatter(d, 2) + "}"
            }).join(" + ");
            var exponential_terms = [];

            // The following line generates the html, I then copy it here hardcoded to highlight the terms I need to highlight
            //var eq = katex.renderToString("\\frac{1}{1 + e^{-(" + inputValue + ")}}");
            var eq = '<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mo>(</mo><mo>−</mo><mn>0</mn><mi mathvariant="normal">.</mi><mn>5</mn><mn>6</mn><mn>4</mn><mn>3</mn><mn>3</mn><mo>)</mo></mrow></msup></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + e^{-(-0.56433)}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.845108em;"></span><span class="strut bottom" style="height:1.2907389999999999em;vertical-align:-0.4456309999999999em;"></span><span class="base textstyle uncramped"><span class="mord reset-textstyle textstyle uncramped"><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span><span class="mfrac"><span class="vlist"><span style="top:0.38729999999999987em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle cramped"><span class="mord scriptstyle cramped"><span class="mord mathrm">1</span><span class="mbin">+</span><span class="mord"><span class="mord mathit">e</span><span class="vlist"><span style="top:-0.289em;margin-right:0.07142857142857144em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-scriptstyle scriptscriptstyle cramped"><span class="mord scriptscriptstyle cramped"><span class="mord">−</span><span class="mopen">(</span><span class="mord"></span>         <span class="mord mathrm input">' + inputValue + '</span>         <span class="mclose">)</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span></span></span></span><span style="top:-0.22999999999999998em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle textstyle uncramped frac-line"></span></span><span style="top:-0.394em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord scriptstyle uncramped"><span class="mord mathrm">1</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span><span class="sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"></span></span></span></span></span>'

            var node_row = "<tr>" +
                "<td class='input'>" + inputValue + "</td>" +
                "<td class='calculation'> " + eq + "</td>" +
                "<td>" + numberFormatter(viz.sigmoidOutput, 2) + "</td>" +
                "</tr>";

            rows = rows + node_row;


            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(rows)
                .style("left", (d3.event.pageX - 250) + "px")
                .style("top", (d3.event.pageY) + "px");

        }
        else {
            var html = "Hover-over or tap one of the row in the table, then you'll see the sigmoid calculation here.";

            viz.tooltipDiv.transition()
                .duration(100)
                .style("opacity", 1);
            viz.tooltipDiv.html(html)
                .style("left", (d3.event.pageX - 250) + "px")
                .style("top", (d3.event.pageY) + "px");
        }
    };

// Define function to close tooltip
    var deactivate = function (d) {
        viz.tooltipDiv.transition()
            .duration(200)
            .style("opacity", 0);
    };

    sigmoidGroup
        .append("rect")
        .attr("class", "outlined-sigmoid-node nn-node")
        .attr("width", width)
        .attr("height", height)
        .attr("rx", this.nodeRadius / 4)
        .attr("ry", this.nodeRadius / 4)
        .attr("x", -width / 2)
        .attr("y", yDisplacement)
        .on("mouseover", activate)
        .on("touchenter", activate)
        .on("touchmove", function (d) {
            d3.event.preventDefault()
        })
        .on("mouseout", deactivate)
        .on("touchleave", deactivate);


    sigmoidGroup.append("text")
        .attr("id", "sigmoid-label")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", -2)
        //.attr("transform", "rotate(90)")
        .text("σ");


};


export function graphSigmoidOutput(sigmoidOutput) {
    var grapher = this;
    var data = [{i: 0, value: sigmoidOutput}];

    var maxValueIndex = 0;

    var sigmoidOutputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .sigmoid-output-group")
        .data(data);

    sigmoidOutputGroups.select("text")
        .attr("class", "sigmoid-output")
        .text(function (d) {
            return numberFormatter(d.value * 100, 2) + "%"
        });

    var sigmoidOutputElements = sigmoidOutputGroups.enter()
        .append("g")
        .attrs({
            class: "sigmoid-output-group",
            transform: function (d) {
                return "translate(" + (grapher.softmaxOutputsX - 8) + ", " + (grapher.getYCoordinateOfNodeInOutputLayer(d.index) + 5) + ")";
            }
        });

    sigmoidOutputElements.append("text")
        .attr("class", "sigmoid-output")
        .text(function (d) {
            return numberFormatter(d.value * 100, 2) + "%"
        });
};


export function calculateSigmoid(data) {
    return 1 / ( 1 + Math.exp(-data));
}


export function updateSigmoid(input) {
    this.sigmoidOutput = calculateSigmoid(input);

    // Display sigmoid and final output
    this.graphSigmoidOutput(this.sigmoidOutput);

    this.highlightTopSoftmaxOutput();
}