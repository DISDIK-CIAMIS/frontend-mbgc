"use client";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ciamisGeoData from "@/data/batas-kecamatan-ciamis.json";
// Standard fix for Leaflet icons in Next.js
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: shadowIcon.src,
});

export default function MapComponent({ data }) {
  const center = [-7.3275, 108.5]; // Ciamis coordinates

  // Fungsi untuk mengatur gaya visual garis batas
  const geojsonStyle = {
    color: "#2c3e50", // Warna garis batas
    weight: 2,        // Ketebalan garis
    fillColor: "#3498db",
    fillOpacity: 0.1, // Transparansi area dalam
  };

  // Fungsi interaktif saat kursor menyentuh wilayah kecamatan
  const onEachKecamatan = (feature, layer) => {
    if (feature.properties && feature.properties.WADMKC) {
      // Munculkan popup nama kecamatan saat diklik
      layer.bindPopup(`<strong>Kecamatan: ${feature.properties.WADMKC}</strong>`);
      
      // Efek hover (optional)
      layer.on({
        mouseover: (e) => {
          const l = e.target;
          l.setStyle({ fillOpacity: 0.5, weight: 3 });
        },
        mouseout: (e) => {
          const l = e.target;
          l.setStyle({ fillOpacity: 0.1, weight: 2 });
        }
      });
    }
  };

  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Menampilkan Batas Kecamatan */}
        <GeoJSON 
          data={ciamisGeoData} 
          style={geojsonStyle} 
          onEachFeature={onEachKecamatan}
        />
      </MapContainer>
    </div>
  );
}