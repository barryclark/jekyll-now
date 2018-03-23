/**
 * Created by alammar on 3/12/17.
 */

// Linear scale between this.neuralNetworkMargin.left and this.neuralNetworkWidth + this.neuralNetworkMargin.left + this.properties.outputRegionWidth
export function getLayerXScale (numberOfLayers, layersRegionWidth, outputRegionWidth, marginLeft, nodeRadius){
    var returnFunction;
    if( numberOfLayers == 1){ // If only one node, draw it in the center
        returnFunction = function(){return  (layersRegionWidth /2) + marginLeft}
    }
    else{ // Otherwise, separate the vertical space linearly
        returnFunction = d3.scaleLinear()
            .domain([0, numberOfLayers -1 ])
            .range([marginLeft + nodeRadius,
                layersRegionWidth - nodeRadius - outputRegionWidth]);
    }
    return returnFunction;
};


export function  getNodeYCoordinate (numberOfNodesInLayer, chartAreaHeight, marginTop, nodeRadius){
    var returnFunction;
    if( numberOfNodesInLayer == 1){ // If only one node, draw it in the center
        returnFunction = function(){return  (chartAreaHeight /2) + marginTop}
    }
    else{ // Otherwise, separate the vertical space linearly
        returnFunction = d3.scaleLinear()
            .domain([0, numberOfNodesInLayer -1 ])
            .range([marginTop + nodeRadius,
                chartAreaHeight - nodeRadius]);
    }
    return returnFunction;
};
