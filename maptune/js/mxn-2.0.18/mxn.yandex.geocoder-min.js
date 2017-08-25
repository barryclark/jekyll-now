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
mxn.register("yandex",{Geocoder:{init:function(){var a=this},geocode:function(a){var b=this;if(!a.hasOwnProperty("address")||a.address===null||a.address===""){a.address=[a.street,a.locality,a.region,a.country].join(", ")}var c=new YMaps.Geocoder(a.address,{results:1});YMaps.Events.observe(c,c.Events.Load,function(d){if(d.found>0){b.geocode_callback(d.get(0))}else{b.error_callback(d)}});YMaps.Events.observe(c,c.Events.Fault,function(d){b.error_callback(d.message)})},geocode_callback:function(b){var a={street:"",locality:"",region:"",country:""};var c;if((c=b.AddressDetails.Country)){a.country=c.CountryName;if((c=c.AdministrativeArea)){a.region=c.AdministrativeAreaName;if((c=c.Locality)){a.locality=c.LocalityName;if((c=c.Thoroughfare)){a.street=c.ThoroughfareName}}}}ypoint=b.getGeoPoint();a.point=new mxn.LatLonPoint(ypoint.getY(),ypoint.getX());this.callback(a)}}});