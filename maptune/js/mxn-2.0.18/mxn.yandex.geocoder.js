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
mxn.register('yandex', {

Geocoder: {
	
	init: function() {		
		var me = this;
	},
	
	geocode: function(address){
		var mapstraction_geocoder = this;		
		
		if (!address.hasOwnProperty('address') || address.address === null || address.address === '') {
			address.address = [ address.street, address.locality, address.region, address.country ].join(', ');
		}
		var geocoder = new YMaps.Geocoder(address.address, { results: 1 });
		YMaps.Events.observe(geocoder, geocoder.Events.Load, function (response) {
			if (response.found > 0) {
				mapstraction_geocoder.geocode_callback(response.get(0));
			} else {
				mapstraction_geocoder.error_callback(response);
			}
		});
 
		YMaps.Events.observe(geocoder, geocoder.Events.Fault, function (error) {
			mapstraction_geocoder.error_callback(error.message);
		});
	},
	
	geocode_callback: function(response){

		var return_location = { street: '', locality: '', region: '', country: '' };
		
		var locLev;
		if ((locLev = response.AddressDetails.Country)) {
			return_location.country = locLev.CountryName;
			if ((locLev = locLev.AdministrativeArea)) {
				return_location.region = locLev.AdministrativeAreaName;
				if ((locLev = locLev.Locality)) {
					return_location.locality = locLev.LocalityName;
					if ((locLev = locLev.Thoroughfare)) {
						return_location.street = locLev.ThoroughfareName;
					}
				}
			}
		}

		ypoint = response.getGeoPoint();
		return_location.point = new mxn.LatLonPoint(ypoint.getY(), ypoint.getX());
		this.callback(return_location);
	}
}
});
