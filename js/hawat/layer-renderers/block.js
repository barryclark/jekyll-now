/**
 * Created by alammar on 3/13/17.
 */
import * as util from '../hawat-util'
var block = {
    getNodeRenderingDetails: function(layer, properties){
        var blockRenderingDetails ={
            x: layer.x,
            y: (properties.activeRegionHeight / 2) + properties.margins.top,
            index: 0,
            type: "block",
            activation: layer.activation
        };
        return blockRenderingDetails;
    },

    draw: function(layer, properties, activeRegionSVGGroup){

        // JOIN
        // Each node has an SVG group of its own. In that group is an SVG circle and SVG text label
        var nodeGroups = activeRegionSVGGroup.selectAll(properties.containerElement + " .layer-" + layer.index)
            .data([layer.nodeRenderingDetails]);
        console.log(layer.nodeRenderingDetails);


        // ENTER new elements present in new data.
        var nodes = nodeGroups.enter()
            .append("g")
            .attr("class", "layer-" + layer.index + " layer-group")
            .attr("transform", function (d) {
                return "translate(" +
                    (d.x)
                    + ","
                    + (d.y) + ")";
            });
        console.log(nodes);



        nodes
            .append("rect")
            .attr("class", "outlined-sigmoid-node nn-node")
            .attr("rx", properties.nodeRadius)
            .attr("width", properties.nodeRadius * 2)
            .attr("height", properties.activeRegionHeight)
            .attr("x", -properties.nodeRadius)
            .attr("y", -properties.activeRegionHeight/2);



        nodes.append("text")
            //.attr("id", "sigmoid-label")
            //.attr("class", "node-text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", properties.activeRegionHeight/2 - 12)
            .text(layer.nodes);


        nodes.append("svg:image")
            .attr('x', -15 )
            .attr('y', -properties.activeRegionHeight/2 + 12)
            .attr('width', 30)
            .attr('height', 10)
            .attr("xlink:href","../../images/relu-symbol.png")
    }
};

export {block};