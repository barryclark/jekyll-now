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
mxn.register('openlayers', {	

Geocoder: {
	
	init: function() {
		var me = this;
	},
	
	geocode: function(address){
		var me = this;
		
		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
		}
		
		if (address.hasOwnProperty('lat') && address.hasOwnProperty('lon')) {
			var latlon = address.toProprietary(this.api);
			OpenLayers.Request.GET({
				url: 'http://nominatim.openstreetmap.org/reverse',
				params: {
					'lat': address.lat,
					'lon': address.lon,
					'addressdetails': 1,
					'format': 'json'
				},
				callback: function(request) { me.geocode_callback(JSON.parse(request.responseText), request.status); }
			});
		} else {
			OpenLayers.Request.GET({
				url: 'http://nominatim.openstreetmap.org/search',
				params: {
					'q': address.address,
					'addressdetails': 1,
					'format': 'json'
				},
				callback: function(request) { me.geocode_callback(JSON.parse(request.responseText), request.status); }
			});
		}
	},
	
	geocode_callback: function(results, status){
		var return_location = {};
		
		if (status != 200) {
			this.error_callback(response.statusText);
		} 
		else {
			return_location.street = '';
			return_location.locality = '';
			return_location.postcode = '';
			return_location.region = '';
			return_location.country = '';
			
			var place;
			
			if (results.length > 0) {
				place = results[0];
			} else {
				place = results;
			}
			var street_components = [];
			
			if (place.address.country) {
				return_location.country = place.address.country;
			}
			if (place.address.state) {
				return_location.region = place.address.state;
			}
			if (place.address.city) {
				return_location.locality = place.address.city;
			}
			if (place.address.postcode) {
				return_location.postcode = place.address.postcode;
			}
			if (place.address.road) {
				street_components.push(place.address.road);
			}
			if (place.address.house_number) {
				street_components.unshift(place.address.house_number);
			}
			
			if (return_location.street === '' && street_components.length > 0) {
				return_location.street = street_components.join(' ');
			}
			
			return_location.point = new mxn.LatLonPoint(parseFloat(place.lat), parseFloat(place.lon));
			
			this.callback(return_location);
		}
	}
}
});