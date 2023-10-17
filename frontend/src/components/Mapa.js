import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={4}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
<LocationMarker setClickedLocation={setClickedLocation} />
        {clickedLocation && (
          <Marker position={clickedLocation}>
            <Popup>
              Latitud: {clickedLocation.lat.toFixed(4)}, Longitud:{" "}
              {clickedLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

const LocationMarker = ({ setClickedLocation }) => {
  useMapEvents({
    click: (e) => {
setClickedLocation(e.latlng);
    },
  });

  return null;
};

export default Map;