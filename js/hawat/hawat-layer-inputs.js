/**
 * Created by alammar on 2/7/17.
 */
export function graphLayerInputs(layerInputsArray, layerNumber) {


    var layerInputs = layerInputsArray[layerNumber], layerInputsObjects = [];

    for (var i = 0; i < layerInputs.length; i++)
        for (var j = 0; j < layerInputs[i].length; j++) {
            layerInputsObjects.push({
                input: i,
                output: j,
                value: layerInputs[i][j],
                angle: this.lineAngles[i][j],
                type: i == (layerInputs.length - 1) ? "bias" : "input"
            });
        }


    var layerInputGroups = this.neuralNetworkG.selectAll(this.svgElement + " .layer-" + layerNumber + "-input-groups")
        .data(layerInputsObjects);

    layerInputGroups.select("text").text(function (d) {
        return numberFormatter(d.value, 5);
    });
    //var texts = layerInputGroups.selectAll("text");

    //texts.text(function(d){
    //    console.log(d.value, numberFormatter(d.value, 5))
    //    return numberFormatter(d.value, 5);
    //});


    // Possible change: Make into its own function. Create elements on initialization, only update text on input change
    var grapher = this, xCoordinate = 225, offset = 4;
    var layerInputselements = layerInputGroups.enter()
        .append("g")
        .attrs({
            class: "layer-" + layerNumber + "-input-groups",
            transform: function (d) {
                // Some geometry to calculate the y coordinate of the input value
                // The Y coordinate relative to the input node is really the opposite of the angle
                // Its length is the tan of the angle * the adjacent
                var yRelativeToInputNode = Math.tan(grapher.lineAngles[d.input][d.output]) *
                        (xCoordinate - grapher.inputLayerX),
                // Now to transform the relative Y to absolute Y
                    yCoordinate = grapher.inputLayerCoordinates[d.input].y - yRelativeToInputNode - offset,
                    opposite = grapher.outputLayerCoordinates[d.output].y - yCoordinate,
                    adjacent = grapher.lineAngles[d.input][d.output] != 0 ? opposite / Math.tan(-grapher.lineAngles[d.input][d.output]) : 0.0001,
                    adjustedXCoordinate = xCoordinate - adjacent;

                return "translate(" + xCoordinate + "," + yCoordinate + ")";
            }
        });


    layerInputselements.append("text")
        .attrs({
            class: function (d) {
                var colorClass = d.type == "input" ? "layer-input-value-from-input" : "layer-input-value-from-bias";
                return "layer-" + layerNumber + "-inputs layer-input-value output-" + d.output + " input-" + d.input + " " + colorClass
            },
            "text-anchor": "middle",
            x: 0,
            y: 0,
            transform: function (d) {
                return "rotate(" + (-Math.degrees(d.angle)) + ")"
            }
        })
        .text(function (d) {
            return numberFormatter(d.value, 5);
            //if (d.value > 1) return Math.round(d.value);
            //if (d.value > 0.0001) return roundPrecision(d.value, 5);
            //else
            //    return d.value.toExponential(2)
        });
};


export function updateLayerInputs(layerInputsArray, layerNumber) {
    var layerInputtext = this.neuralNetworkG.selectAll(this.svgElement + " .layer-" + layerNumber + "-input-groups layer-" + layerNumber + "-input-groups text");

    layerInputtext.text(function (d) {
        return numberFormatter(layerInputsArray[1][d.index], 5);;
    }.bind(this));

}