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
mxn.register('googlev3', {	

Geocoder: {
	
	init: function() {
		this.geocoders[this.api] = new google.maps.Geocoder();
	},
	
	geocode: function(query){
		var me = this;
		var geocode_request_object = {};
		if (typeof(query) == 'object') {
			// query is a LatLonPoint object (reverse geocode)
			if (query.hasOwnProperty('lat') && query.hasOwnProperty('lon')) {
				geocode_request_object.latLng = query.toProprietary(this.api);
			}
			// query is an address object
			else{
				geocode_request_object.address = [ query.street, query.locality, query.region, query.country ].join(', ');
			}
		}
		// query is an address string
		else {
			geocode_request_object.address = query;
		}
		this.geocoders[this.api].geocode(geocode_request_object, function(results, status) {
			me.geocode_callback(results, status);
		});
	},
	
	geocode_callback: function(results, status){
		var return_location = {};

		if (status != google.maps.GeocoderStatus.OK) {
			this.error_callback(status);
		} 
		else {
			return_location.street = '';
			return_location.locality = '';
			return_location.postcode = '';
			return_location.region = '';
			return_location.country = '';

			var place = results[0];
			var streetparts = [];
			
			for (var i = 0; i < place.address_components.length; i++) {
				var addressComponent = place.address_components[i];
				for (var j = 0; j < addressComponent.types.length; j++) {
					var componentType = addressComponent.types[j];
					switch (componentType) {
						case 'country':
							return_location.country = addressComponent.long_name;
							break;
						case 'administrative_area_level_1':
							return_location.region = addressComponent.long_name;
							break;
						case 'locality':
							return_location.locality = addressComponent.long_name;
							break;
						case 'street_address':
							return_location.street = addressComponent.long_name;
							break;
						case 'postal_code':
							return_location.postcode = addressComponent.long_name;
							break;
						case 'street_number':
							streetparts.unshift(addressComponent.long_name);
							break;
						case 'route':
							streetparts.push(addressComponent.long_name);
							break;
					}
				}
			}
			
			if (return_location.street === '' && streetparts.length > 0) {
				return_location.street = streetparts.join(' ');
			}		
			
			return_location.point = new mxn.LatLonPoint(place.geometry.location.lat(), place.geometry.location.lng());
			
			this.callback(return_location);
		}
	}
}
});