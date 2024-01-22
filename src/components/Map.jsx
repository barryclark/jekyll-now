import * as React from "react";
import { Map, Marker } from "react-map-gl";

const longitude = 23.55589332597593;
const latitude = 46.06957654591634;

export default function MyMap() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoicmF6dmFuNDIiLCJhIjoiY2xyaXcwemJkMGRzYjJscG5uZ2lnc2xvaiJ9.BMTJyFNyFjcI81XEthp7dw"
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 16,
      }}
      style={{ width: 600, height: 600 }}
      mapStyle="mapbox://styles/razvan42/clrj101eb00oo01qththo326l"
    >
      <Marker
        longitude={longitude}
        latitude={latitude}
        anchor="bottom"
      >
        <img
          src="/logo.png"
          className="w-12 h-12"
        />
      </Marker>
    </Map>
  );
}
