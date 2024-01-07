/**
 * Created by alammar on 12/23/16.
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

// Add commas to a big number fo readibility
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate standard deviation of an array
// Needed for feature normalization
// https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
function standardDeviation(values){
    var avg = average(values);
    var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff = average(squareDiffs);
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}
function average(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);
    var avg = sum / data.length;
    return avg;
}

// From http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};


roundPrecision = function(number, precision) {
    precision = Math.floor(precision);
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

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


numberFormatter = function(value, digit_limit){

    // default to 4 digits if not set
    digit_limit = digit_limit || 4;

    //If abs(value) has more than 6 digits, we'll show it as exp
    digits = Math.floor(Math.log10(Math.abs(value)) + 1);

    // Deals with numbers above 99999 and below -99999
    if (digits > digit_limit){
        return value.toExponential(1);
    }

    // Deals with abs(numbers) between 99999 and 1
    if ((value > 1) || (value < -1)){
        return roundPrecision(value, digit_limit - digits);
    }

    //Deals with decimals with less than digit_limit significant digits
    if (digits > -digit_limit){
        return roundPrecision(value, digit_limit);
    }

    if( value == 0 )
        return 0;
    return value.toExponential(1);

};