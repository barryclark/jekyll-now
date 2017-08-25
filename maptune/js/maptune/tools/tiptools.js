

 /**
 * @name TipTool
 * @author Esa
 * @copyright (c) 2009, 2010 Esa I Ojala
 * @fileoverview TipTool is an extension to Gmaps api v3 for creating divs as custom tooltip assistants.
 * Facilities to attach TipTool to Markers. Control by mouseover/mouseout.
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
 * @version 0.2
 * 0.2 initialize as hidden, thanks Rod
 * 0.1 first release
 */
var TIPTOOL_VERSION = "0.2";



/**
 * @constructor TipTool()
 * @extends OverlayView
 * @param {Map} map The map where the TipTool shall be overlayed
 * @param {LatLng} point The location where the TipTool shall be overlayed
 * @param {Object} opt_options Optional object.
 */
function TipTool(map, point, opt_options) {
  this.opts = opt_options || {};
  this.point = point;
  this.setMap(map);
  this.map = map;
}

//subclass of OverlayView()
if ( typeof(google) != "undefined" ){
	TipTool.prototype = new google.maps.OverlayView();
}

/**
 * onAdd(). Called internally by API when added on map.
 * to be called just once
 */
TipTool.prototype.onAdd = function() {
  this.bgdiv_ = document.createElement('div');
  this.bgdiv_.style.position = "absolute";
  this.bgdiv_.style.overflow = "hidden";
  this.bgdiv_.className = this.opts.cssClass || this.opts.className || 'tiptoolbg';
  var panes = this.getPanes();
  var paneId = this.opts.pane || "floatPane";
  panes[paneId].appendChild(this.bgdiv_);
  this.bgdiv_.style.display = "none";

  this.div_ = document.createElement('div');
  this.div_.style.position = "absolute";
  this.div_.style.overflow = "hidden";
  this.zIndex = this.opts.zIndex || 0;
  this.div_.className = this.opts.cssClass || this.opts.className || 'tiptool';
  this.div_.innerHTML = this.opts.html || "";
  google.maps.event.addDomListener(this.div_, "click", function(event) {
    google.maps.event.trigger(me, "click", event);
  });
  var panes = this.getPanes();
  var paneId = this.opts.pane || "floatPane";
  panes[paneId].appendChild(this.div_);
  this.opacity = this.opts.opacity * 1 || 1;
  this.div_.style.filter = 'alpha(opacity:' + this.opacity*100 + ')';
  this.div_.style.opacity = this.opacity;
  this.div_.style.display = "none";
};

/**
 * called internally by API when map moves.
 */
TipTool.prototype.draw = function() {
  var pixPoint = this.getProjection().fromLatLngToDivPixel(this.point);
  this.div_.style.left = pixPoint.x + 'px';
  this.div_.style.top = pixPoint.y + 'px';
  this.bgdiv_.style.left = pixPoint.x + 'px';
  this.bgdiv_.style.top = pixPoint.y + 'px';
  var SEx = pixPoint.x + this.div_.offsetWidth;
  var SEy = pixPoint.y + this.div_.offsetHeight;
  var pixSE = new google.maps.Point(SEx, SEy);
  this.opts.SE = this.getProjection().fromDivPixelToLatLng(pixSE);
  this.opts.point = this.point;
};

/**
 * Sets latLng position of tooltip
 * @param {LatLng} point The location where the TipTool shall be moved
 */

TipTool.prototype.setPosition = function(pint) {
  if(!this.div_) {return false;}
  this.point = pint;
  this.draw();
  return true;
};
/**
 * Removes the div from DOM
 * @returns true if success, false if the div was not found
 */
TipTool.prototype.onRemove = function() {
  if(!this.div_) {return false;}
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
  return true;
};
/**
 * Sets the div display:none
 * @returns true if success, false if the div was not found
 */
TipTool.prototype.hide = function() {
  if(!this.div_) {return false;}
  this.bgdiv_.style.display = "none";
  this.div_.style.display = "none";
  // GR 27.09.2011 
  this.opts.callback(this.map,"delete");
  return true;
};
/**
 * Sets the div display: block
 * @returns true if success, false if the div was not found
 */
TipTool.prototype.show = function() {
  if(!this.div_) {return false;}
  this.bgdiv_.style.display = "inline";
  this.div_.style.display = "inline";
  // GR 27.09.2011 
  this.opts.callback(this.map,this.marker);
  return true;
};

/**
 * Sets innerHTML of the div
 * @param {String}
 * @returns true if success, false if the div was not found
 */
TipTool.prototype.setContent = function(html) {
  if(!this.div_) {return false;}
  this.div_.style["font-size"] = "1.5em";
  this.bgdiv_.innerHTML = html;
  this.div_.innerHTML = html;
  return true;
};

/**
 * Copies properties of given options object to internal this.opts
 * @param optional object
 * @returns the updated internal this.opts object
 */
TipTool.prototype.props = function(options) {  // needs work for more properties
  var opts = options || {};
  for(var prop in opts){
    this.opts[prop] = opts[prop];
  }
  return this.opts;
};
/**
 * @returns The location of the div
 * @type LatLng object (null if the div was not found)
 */
TipTool.prototype.getPosition = function() {
  if(!this.div_) {return null;}
  return this.bounds_.getCenter();
};
/**
 * @returns True if TipTool is in viewport
 * @type boolean
 */
TipTool.prototype.isVisible = function() {
  var bounds = this.map.getBounds();
  var visible = (bounds.contains(this.opts.point) && bounds.contains(this.opts.SE));
  return visible;
};
/**
 * pans map to bring TipTool in viewport
 */
TipTool.prototype.bringVisible = function() {
  // GR 12.06.2012 stop if info display 
  if ( (typeof(actualInfoMarker) != "undefined") && actualInfoMarker ){
	  return;
  }
  if(this.isVisible()){
    this.map.setCenter(this.map.getCenter());
  }else{
    this.map.panTo(this.opts.point);
  }
};
/**
 * zoom icon 
 * GR 12.06.2012 added
 */
TipTool.prototype.zoomIcon = function() {
	this.marker__fillColor = this.marker.fillColor;
	this.marker.setOptions({strokeWeight: 2.0, fillColor:"#ff0000"});
	if ( !this.marker.__zoomed ){
		var icon = this.marker.getIcon();
		if ( icon && icon.size ){
			icon.size.height *= 1.3;
			icon.size.width *= 1.3;
			if ( icon.anchor ){
				icon.anchor.x *= 1.3;
				icon.anchor.y *= 1.3;
			}
			this.marker.setIcon(icon);
			this.marker.__zoomed = true;
			// set zindex
			this.marker.__zindex = this.marker.getZIndex();
			this.marker.__zindex = (typeof(this.marker.__zoomed) != "undefined")?this.marker.__zoomed:0;
			this.marker.setZIndex(10000);
			// this.marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
};
/**
 * unzoom icon 
 * GR 12.06.2012 added
 */
TipTool.prototype.unzoomIcon = function() {
	this.marker.setOptions({strokeWeight: 1.0,fillColor:this.marker__fillColor});
	if ( this.marker.__zoomed != null ){
		var icon = this.marker.getIcon();
		if ( icon && icon.size ){
			icon.size.height /= 1.3;
			icon.size.width /= 1.3;
			if ( icon.anchor ){
				icon.anchor.x /= 1.3;
				icon.anchor.y /= 1.3;
			}
			this.marker.setIcon(icon);
			if ( this.marker.__zindex != null ){
				this.marker.setZIndex(this.__zindex);
			}
			this.marker.__zoomed = null;
			this.marker.__zindex = null;
			// this.marker.setAnimation(null);
		}
	}
};

if ( typeof(google) != "undefined" ){

	/**
	 * attachTipTool() binds TipTool to a Marker
	 * Creates an InfoWindow instance if it does not exist already
	 * @extends Marker
	 * @param InfoWindow options
	 * @author Esa 2009
	 */
	google.maps.Marker.prototype.attachTipTool = 
	google.maps.Polyline.prototype.attachTipTool = 
	google.maps.Polygon.prototype.attachTipTool = function (html, opt_options){
	  var map_ = this.getMap();
	  var position = this.getPosition();
	  map_.tiptool_ = map_.tiptool_ || new TipTool(map_, position, opt_options);  // todo

	  // GR 27.12.2012 if touch device then don't activate mouse events 
      if ( 'ontouchend' in window ){
		google.maps.event.addListener(this, 'touchstart', function (event) {
			map_.tiptool_.zoomIcon();
		});
		google.maps.event.addListener(this, 'touchend', function (event) {
			map_.tiptool_.unzoomIcon();
		});
		return;
      }		
	  google.maps.event.addListener(this, 'mouseover', function (event) {
		// if we have a mouse position in latlon, then use this
		if ( event && event.latLng ){
			position = event.latLng;
			// add y offset to get away of mouse pointer
			var pixPoint = map_.tiptool_.getProjection().fromLatLngToDivPixel(event.latLng);
			pixPoint.x += 10;
			pixPoint.y += 5;
			position = map_.tiptool_.getProjection().fromDivPixelToLatLng(pixPoint);
		}
		map_.tiptool_.setPosition(position);
		map_.tiptool_.setContent(html);
		// GR 27.09.2011 store actual marker
		 map_.tiptool_.marker = this;
		// GR 09.01.2011 show with timeout
		clearTimeout(map_.tiptool_.timer);
		map_.tiptool_.timer = setTimeout(function(){
		  map_.tiptool_.show();
			// GR 09.01.2011 force to visible
		  map_.tiptool_.bringVisible();
		}, 250);
		// GR 02.12.2011 zoom the icon
		map_.tiptool_.zoomIcon();
	  });

	  google.maps.event.addListener(this, 'mouseout', function () {
		clearTimeout(map_.tiptool_.timer);
		map_.tiptool_.timer = setTimeout(function(){
		  map_.tiptool_.hide();
		}, 250);
		// GR 02.12.2011 unzoom the icon
		map_.tiptool_.unzoomIcon();
	  });
	  google.maps.event.addListener(this, 'mousedown', function () {
		clearTimeout(map_.tiptool_.timer);
		map_.tiptool_.timer = setTimeout(function(){
		  map_.tiptool_.hide();
		}, 250);
		// GR 02.12.2011 unzoom the icon
		map_.tiptool_.unzoomIcon();
	  });
	  google.maps.event.addListener(this, 'mouseclick', function () {
		clearTimeout(map_.tiptool_.timer);
		map_.tiptool_.timer = setTimeout(function(){
		  map_.tiptool_.hide();
		}, 250);
		// GR 02.12.2011 unzoom the icon
		map_.tiptool_.unzoomIcon();
	  });
	};

	/**
	 * accessTipTool()
	 * @extends Map
	 * @returns {TipTool} reference to the TipTool object instance
	 */
	google.maps.Map.prototype.accessTipTool = function (){
	  var ret =  this.tiptool_ || {};
	  return ret;
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * attachInfoWindow() binds InfoWindow to a Marker
	 * Creates an InfoWindow instance if it does not exist already
	 * @extends Marker
	 * @param InfoWindow options
	 * @author Esa 2009
	 */

	google.maps.Marker.prototype.attachInfoWindow = function (options){
	  var map_ = this.getMap();
	  map_.bubble_ = map_.bubble_ || new google.maps.InfoWindow();
	  google.maps.event.addListener(this, 'click', function () {
		map_.bubble_.setOptions(options);
		map_.bubble_.open(map_, this);
	  });
	  map_.infoWindowClickShutter = map_.infoWindowClickShutter ||
	  google.maps.event.addListener(map_, 'click', function () {
		map_.bubble_.close();
	  });
	};

	/**
	 * accessInfoWindow()
	 * @extends Map
	 * @returns {InfoWindow} reference to the InfoWindow object instance
	 * Creates an InfoWindow instance if it does not exist already
	 * @author Esa 2009
	 */
	google.maps.Map.prototype.accessInfoWindow = function (){
	  this.bubble_ = this.bubble_ || new google.maps.InfoWindow();
	  return this.bubble_;
	};
}
