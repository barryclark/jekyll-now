/*
MAPSTRACTION   v2.0.18   http://www.mapstraction.com

Copyright (c) 2012 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler, Gary Gale
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function(){

/**
 * Initialise our provider. This function should only be called 
 * from within mapstraction code, not exposed as part of the API.
 * @private
 */
var init = function() {
	this.invoker.go('init');
};

/**
 * Geocoder instantiates a geocoder with some API choice
 * @name mxn.Geocoder
 * @constructor
 * @param {String} api The API to use, currently only 'mapquest' is supported
 * @param {Function} callback The function to call when a geocode request returns (function(waypoint))
 * @param {Function} error_callback The optional function to call when a geocode request fails
 * @exports Geocoder as mxn.Geocoder
 */
var Geocoder = mxn.Geocoder = function (api, callback, error_callback) {
	this.api = api;
	this.geocoders = {};
	this.callback = callback;
	this.error_callback = error_callback || function(){};
	  
	// set up our invoker for calling API methods
	this.invoker = new mxn.Invoker(this, 'Geocoder', function(){ return this.api; });
	init.apply(this);
};

mxn.addProxyMethods(Geocoder, [
	
	/**
	 * Geocodes the provided address.
	 * @name mxn.Geocoder#geocode
	 * @function
	 * @param {Object} address Address hash, keys are: street, locality, region, country.
	 */
	'geocode',
	
	'geocode_callback'

]);

/**
 * Change the geocoding API in use
 * @name mxn.Geocoder#swap
 * @param {String} api The API to swap to
 */
Geocoder.prototype.swap = function(api) {
	if (this.api == api) { return; }

	this.api = api;
	if (!this.geocoders.hasOwnProperty(this.api)) {
		init.apply(this);
	}
};

})();