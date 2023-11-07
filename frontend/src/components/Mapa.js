import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import customIcon from "../imagenes/marcador.png"; // Importa tu imagen de marcador personalizada

const customMarkerIcon = new L.Icon({
  iconUrl: customIcon, // Ruta a tu imagen personalizada
  iconSize: [32, 32], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});


const Map = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={4}
        style={{ width: "100%", height: "400px", zIndex: 1 }}
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
<LocationMarker setClickedLocation={setClickedLocation} />
        {clickedLocation && (
          <Marker position={clickedLocation} icon={customMarkerIcon}>
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