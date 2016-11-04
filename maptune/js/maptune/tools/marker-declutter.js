/**
 * @name MarkerDeclutter for Google Maps v3
 * @version version 1.0
 * @author Guenter Richter
 * @fileoverview
 * The library repositions marker of same position, to make them all visible.
 * <br/>
 * This code is derivated from the
 * MarkerClusterer for Google Maps v3 by Luke Mahe
 * which is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A Marker Declutter to avoid invisible markers, when we have same positions
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @constructor
 */
function MarkerDeclutter(map) {

  this.map_ = map;

  /**
   * @type {Array.<google.maps.Marker>}
   * @private
   */
  this.markers_ = [];

}

/**
 * Add an array of markers to the declutter.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the marker.
 */
MarkerDeclutter.prototype.addMarkers = function(markers, opt_nodraw) {
  for (var i = 0, marker; marker = markers[i]; i++) {
    this.pushMarkerTo_(marker);
  }
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Pushes a marker to the declutter.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerDeclutter.prototype.pushMarkerTo_ = function(marker) {
  marker.isAdded = false;
  if (marker['draggable']) {
    // If the marker is draggable add a listener so we update the clusters on
    // the drag end.
    var that = this;
    google.maps.event.addListener(marker, 'dragend', function() {
      marker.isAdded = false;
      that.repaint();
    });
  }
  this.markers_.push(marker);
};


/**
 * Adds a marker to the declutter and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerDeclutter.prototype.addMarker = function(marker, opt_nodraw) {
  this.pushMarkerTo_(marker);
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerDeclutter.prototype.removeMarker_ = function(marker) {
  var index = -1;
  if (this.markers_.indexOf) {
    index = this.markers_.indexOf(marker);
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        index = i;
        break;
      }
    }
  }

  if (index == -1) {
    // Marker is not in our list of markers.
    return false;
  }
  this.markers_.splice(index, 1);

  return true;
};


/**
 * Remove a marker from the array.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerDeclutter.prototype.removeMarker = function(marker, opt_nodraw) {
  var removed = this.removeMarker_(marker);

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  } else {
   return false;
  }
};


/**
 * Removes an array of markers from the internal array.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerDeclutter.prototype.removeMarkers = function(markers, opt_nodraw) {

  for (var i = 0, marker; marker = markers[i]; i++) {
    var r = this.removeMarker_(marker);
    removed = removed || r;
  }

  this.resetViewport();
  this.redraw();
  return true;
};



/**
 * Clears all registered markers.
 */
MarkerDeclutter.prototype.clearMarkers = function() {
  this.resetViewport(true);

  // Set the markers a empty array.
  this.markers_ = [];
};


/**
 * Defined for compatibility reason to MarkerClusterer
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerDeclutter.prototype.resetViewport = function(opt_hide) {
  this.clusters_ = [];
};

/**
 *
 */
MarkerDeclutter.prototype.repaint = function() {
  this.redraw();
};

/**
 * Redraws the clusters.
 */
MarkerDeclutter.prototype.redraw = function() {
  
  var posA = new Array(0);
  var baseA = new Array(0);

  // max. of marker to position into the declutter grid
  // after max., marker remain on main position
  var maxDeclutter = 50;

  if ( this.markers_.length > maxDeclutter ){
	  return;
  }

  // dynamic, zoom dependent declutter
  // ---------------------------------
  var nZoom = this.map_.getZoom();
  nZoom = Math.min((nZoom>9?(nZoom-8):1),5);

  // walk over the marker, compare positions
  // if multiple, move the marker a bit aside 
  // ---------------------------------
  for (var i = 0, marker; marker = this.markers_[i]; i++) {

	szPos = String(marker.getPosition());
	if ( posA[szPos] < maxDeclutter ){
		var icon = marker.getIcon();
		if ( icon && icon.anchor ){

			// get the marker to its grid position
			// work in progress, in this moment the grid is 10 markers heigh 
			// -------------------------------------------------------------
			icon.anchor.x = baseA[szPos].x - ((posA[szPos]%10) * 0.5 * nZoom) + (posA[szPos]/10) * 5 * nZoom;
			icon.anchor.y = baseA[szPos].y + ((posA[szPos]%10) * 3   * nZoom);
			marker.setIconAnchor(icon.anchor);
			marker.update();
		}else
		if ( icon && icon.iconAnchor ){

			// get the marker to its grid position
			// work in progress, in this moment the grid is 10 markers heigh 
			// -------------------------------------------------------------
			icon.iconAnchor[0] = baseA[szPos][0] - ((posA[szPos]%10) * 0.5 ) + (posA[szPos]/10) * 5;
			icon.iconAnchor[1] = baseA[szPos][1] + ((posA[szPos]%10) * 3   );

			// --- this is a brutal hack !!!!
			marker.proprietary_marker.options.icon.options.iconAnchor = icon.iconAnchor;
			marker.proprietary_marker.setIcon(marker.proprietary_marker.options.icon);
			marker.proprietary_marker.setZIndexOffset(9999-i);
			// --- 
		}else
		if ( icon && icon.offset ){

			// get the marker to its grid position
			// work in progress, in this moment the grid is 10 markers heigh 
			// -------------------------------------------------------------
			icon.offset.x = baseA[szPos].x - ((posA[szPos]%10) * 0.5 ) + (posA[szPos]/10) * 5 ;
			icon.offset.y = baseA[szPos].y + ((posA[szPos]%10) * 3   );
		}
		posA[szPos]++;
	}else{	
		posA[szPos] = 1;
		var icon = marker.getIcon();
		if ( icon && icon.anchor ){
			baseA[szPos] = icon.anchor;
		}else
		if ( icon && icon.iconAnchor ){
			baseA[szPos] = icon.iconAnchor;
		}else
		if ( icon && icon.offset ){
			baseA[szPos] = icon.offset;
		}else{
			baseA[szPos] = {x:0,y:0};
		}
	}
	// set the z-order of the marker in the grid 
	marker.setZIndex(9999-i);
  }
};


