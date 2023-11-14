import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customIcon from "../imagenes/marcador.png";

const customMarkerIcon = new L.Icon({
  iconUrl: customIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Mapa = ({ onLocationSelect }) => {
  const [clickedLocation, setClickedLocation] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        setClickedLocation(e.latlng);
        onLocationSelect(e.latlng);
         // Llama a la función de devolución de llamada para pasar la latitud y longitud al componente padre
      },
    });

    return null;
  };

  return (
    <div>
      <MapContainer center={[0, 0]} zoom={4} style={{ width: "100%", height: "400px", zIndex: 1 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
        {clickedLocation && (
          <Marker position={clickedLocation} icon={customMarkerIcon}>
            <Popup>
              Latitud: {clickedLocation.lat.toFixed(4)}, Longitud: {clickedLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Mapa;
