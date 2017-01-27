/**
 * Created by alammar on 12/30/16.
 */

QUnit.test( "Softmax", function( assert ) {
    assert.throws(  function() { softmax(1) }, new TypeError("Input passed into softmax() is not an array. softmax() expects an array. Input: 1"),
        "Passing in anything that's not an array should throw an error." );
    assert.throws(  function() { softmax([1, "a"]) }, new TypeError("An element in the array passed to softmax() is not a number. softmax() expects an array of numbers. Input: a", "nnVizUtils.js"),
        "Passing an array that includes any non-number element throws an error." );
    assert.deepEqual( softmax([1, 1]), [0.5, 0.5], "softmax([1, 1]) should be [0.5, 0.5]." );
    assert.deepEqual( softmax([1, 2]), [0.2689414213699951, 0.7310585786300049], "softmax([1, 2]) should be [0.2689414213699951, 0.7310585786300049]." );
    assert.deepEqual( softmax([1, 2, 4]), [0.04201006613406605, 0.11419519938459449, 0.8437947344813395], "softmax([1, 2, 4]) should be [0.04201006613406605, 0.11419519938459449, 0.8437947344813395]." );

});