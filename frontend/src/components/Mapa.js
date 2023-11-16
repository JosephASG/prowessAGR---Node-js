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
        const { latlng } = e;

        const bounds = [
          [-5, -92], 
          [2, -75],  
        ];

        if (latlng.lat >= bounds[0][0] && latlng.lat <= bounds[1][0] && latlng.lng >= bounds[0][1] && latlng.lng <= bounds[1][1]) {
          setClickedLocation(latlng);
          onLocationSelect(latlng);
        }
      },
    });

    return null;
  };

  const bounds = [
    [-5, -92], 
    [2, -75], 
  ];

  return (
    <div>
      <MapContainer center={[-1.8312, -78.1834]} zoom={6} style={{ width: "100%", height: "400px", zIndex: 1 }} bounds={bounds}>
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
