/**
 * Created by alammar on 3/10/17.
 */



export function getInputToBiasLinesData(inputLayerNodeCount, outputNodeCount,
    inputLayerCoordinates, outputLayerCoordinates){
    var inputToBiasLines = [];

    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < inputLayerNodeCount; i++)
        for (var j = 0; j < outputNodeCount; j++) {
            inputToBiasLines.push({
                x1: inputLayerCoordinates[i].x,
                y1: inputLayerCoordinates[i].y,
                x2: outputLayerCoordinates[j].x,
                y2: outputLayerCoordinates[j].y,
                inputIndex: i,
                outputIndex: j
            });
        }

    return inputToBiasLines;
}


export function getBiasToSoftmaxLinesData(outputNodeCount, outputLayerCoordinates, activationLayerX, nodeRadius){

    var BiasToSoftmaxLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < outputNodeCount; i++)
        BiasToSoftmaxLines.push({
            x1: outputLayerCoordinates[i].x,
            y1: outputLayerCoordinates[i].y,
            x2: activationLayerX - nodeRadius,
            y2: outputLayerCoordinates[i].y
        });

    console.log("BiasToSoftmaxLines", BiasToSoftmaxLines);
    return BiasToSoftmaxLines;
}


export function graphInputToBiasLines(data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .input-to-bias-line")
        .data(data);

    inputToBiasLines.exit()
        .remove();

    var classes = "nn-arrow input-to-bias-line";

    inputToBiasLines
        .attrs({
            class: function (d) {
                return classes + " input-" + d.inputIndex + " output-" + d.outputIndex
            },
            x1: function (d) {
                return d.x1
            }, // From the center of the input node
            y1: function (d) {
                return d.y1
            },
            x2: function (d) {
                return d.x2
            },    // To the center of the bias node
            y2: function (d) {
                return d.y2
            }
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": function (d) {
                return classes + " input-" + d.inputIndex + " output-" + d.outputIndex
            },
            "x1": function (d) {
                return d.x1
            }, // From the center of the input node
            "y1": function (d) {
                return d.y1
            },
            "x2": function (d) {
                return d.x2
            },    // To the center of the bias node
            "y2": function (d) {
                return d.y2
            }
        });

};




export function getSoftmaxtoOutputLinesData(outputNodeCount, activationLayerX, nodeRadius, outputLayerCoordinates,
                                            outputLayerX, classes ){

    var softmaxtoOutputLines = [];
    // Calculate the coordiantes of the lines from input to bias
    for (var i = 0; i < outputNodeCount; i++)
        softmaxtoOutputLines.push({
            x1: activationLayerX + nodeRadius + 6,
            y1: outputLayerCoordinates[i].y,
            x2: outputLayerX - nodeRadius,
            y2: outputLayerCoordinates[i].y,
            outputNode: i,
            class_name: classes[i]
        });

    return softmaxtoOutputLines;

}


export function graphBiasToSoftmaxArrows(data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .bias-to-softmax-line")
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "nn-arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            x1: function (d) {
                return d.x1
            }, // From the center of the input node
            y1: function (d) {
                return d.y1
            },
            x2: function (d) {
                return d.x2
            },    // To the center of the bias node
            y2: function (d) {
                return d.y2
            }
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "nn-arrow bias-to-softmax-line",
            "marker-end": "url(#arrow)",
            "x1": function (d) {
                return d.x1
            }, // From the center of the input node
            "y1": function (d) {
                return d.y1
            },
            "x2": function (d) {
                return d.x2
            },    // To the center of the bias node
            "y2": function (d) {
                return d.y2
            }
        });

};


export function graphSoftmaxToOutputArrows(data) {

    var inputToBiasLines = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-to-output-line")
        .data(data);

    inputToBiasLines.exit()
        .remove();

    inputToBiasLines
        .attrs({
            class: "nn-arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            x1: function (d) {
                return d.x1
            }, // From the center of the input node
            y1: function (d) {
                return d.y1
            },
            x2: function (d) {
                return d.x2
            },    // To the center of the bias node
            y2: function (d) {
                return d.y2
            }
        });

    inputToBiasLines.enter()
        .append('line')
        .attrs({
            "class": "nn-arrow softmax-to-output-line",
            "marker-end": "url(#arrow)",
            "x1": function (d) {
                return d.x1
            }, // From the center of the input node
            "y1": function (d) {
                return d.y1
            },
            "x2": function (d) {
                return d.x2
            },    // To the center of the bias node
            "y2": function (d) {
                return d.y2
            }
        });




    var softmaxOutputClassName = this.neuralNetworkG.selectAll(this.svgElement + " .softmax-output-class-name")
        .data(data);

    softmaxOutputClassName.exit()
        .remove();

    softmaxOutputClassName
        .append('text')
        .attrs({
            "class": function(d){
                return "softmax-output-class-name "+  d.highlightedOrDim
            },
            "x": function (d) {
                return d.x1
            }, // From the center of the input node
            "y": function (d) {
                return d.y1 + 25
            }
        })
        .text(function(d, i){
            return d.class_name
        });

    softmaxOutputClassName.enter()
        .append('text')
        .attrs({
            "class": "softmax-output-class-name",
            "x": function (d) {
                return d.x1
            }, // From the center of the input node
            "y": function (d) {
                return d.y1 + 25
            }
        })
        .text(function(d, i){
            return d.class_name
        });


};
