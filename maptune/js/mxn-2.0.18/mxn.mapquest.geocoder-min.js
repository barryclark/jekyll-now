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
mxn.register("mapquest",{Geocoder:{init:function(){var c="";var a="";var e="mapquest_proxy/JSReqHandler.php";var f="geocode.access.mapquest.com";var d="80";var b="mq";this.geocoders[this.api]=new MQExec(f,b,d,c,e,a)},geocode:function(b){var a={};var d=this;var e=new MQAddress();var c=new MQLocationCollection("MQGeoAddress");e.setStreet(b.street);e.setCity(b.locality);e.setState(b.region);e.setPostalCode(b.postalcode);e.setCountry(b.country);this.geocoders[this.api].geocode(e,c);var f=c.get(0);var g=f.getMQLatLng();a.street=f.getStreet();a.locality=f.getCity();a.region=f.getState();a.country=f.getCountry();a.point=new LatLonPoint(g.getLatitude(),g.getLongitude());this.callback(a)},geocode_callback:function(a){throw"Not used"}}});