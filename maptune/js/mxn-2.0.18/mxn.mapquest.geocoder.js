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
mxn.register('mapquest', {	

Geocoder: {
	
	init: function() {		
		//set up the connection to the geocode server
		var proxyServerName = "";
		var proxyServerPort = "";
		var proxyServerPath = "mapquest_proxy/JSReqHandler.php";
		var serverName = "geocode.access.mapquest.com";
		var serverPort = "80";
		var serverPath = "mq";
		
		this.geocoders[this.api] = new MQExec(serverName, serverPath, serverPort, proxyServerName,
			proxyServerPath, proxyServerPort );
	},
	
	geocode: function(address){
		var return_location = {};
		var mapstraction_geodocer = this;
		
		var mqaddress = new MQAddress();
		var gaCollection = new MQLocationCollection("MQGeoAddress");
		
		//populate the address object with the information from the form
		mqaddress.setStreet(address.street);
		mqaddress.setCity(address.locality);
		mqaddress.setState(address.region);
		mqaddress.setPostalCode(address.postalcode);
		mqaddress.setCountry(address.country);

		this.geocoders[this.api].geocode(mqaddress, gaCollection);
		var geoAddr = gaCollection.get(0);
		var mqpoint = geoAddr.getMQLatLng();
		
		return_location.street = geoAddr.getStreet();
		return_location.locality = geoAddr.getCity();
		return_location.region = geoAddr.getState();
		return_location.country = geoAddr.getCountry();
		return_location.point = new LatLonPoint(mqpoint.getLatitude(), mqpoint.getLongitude());
		
		this.callback(return_location);
	},
	
	geocode_callback: function(response){
		throw 'Not used';
	}
}
});