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
mxn.register("microsoft7",{Geocoder:{init:function(){},geocode:function(c){var a=this;var f="";var d=false;if(typeof(c)=="object"){if(c.hasOwnProperty("lat")&&c.hasOwnProperty("lon")){f=c.lat+","+c.lon}else{f=[c.street,c.locality,c.region,c.country].join(", ")}}else{f=c}jsonp_callback_context=this;var b="http://dev.virtualearth.net/REST/v1/Locations/"+f+"?output=json&jsonp=jsonp_callback_context.geocode_callback&key="+microsoft_key;var e=document.createElement("script");e.type="text/javascript";e.src=b;document.body.appendChild(e)},geocode_callback:function(b){if(b.statusDescription!="OK"){this.error_callback(b.statusDescription)}else{var c=b.resourceSets[0].resources[0];var a={street:c.address.addressLine,locality:c.address.locality,postcode:c.address.postalCode,region:c.address.adminDistrict,country:c.address.countryRegion,point:new mxn.LatLonPoint(c.point.coordinates[0],c.point.coordinates[1])};this.callback(a)}}}});