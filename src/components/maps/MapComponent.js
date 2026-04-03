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
      layer.bindPopup(`<strong>Kecamatan ${feature.properties.WADMKC}</strong>`);
      
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
    <div style={{ height: "500px", width: "100%", borderRadius: "12px", overflow: "hidden", position: "relative", zIndex: 0 }}>
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

        {data.sppg.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup maxWidth={280} minWidth={240} className="custom-tailwind-popup">
            <div className="p-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {/* Category + Status Row */}
              <div className="d-flex align-items-center gap-2 mb-2">
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: '700', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  color: '#64748b' 
                }}>
                  Unit SPPG
                </span>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontWeight: '600',
                  backgroundColor: item.status === 'Aktif' ? '#dcfce7' : '#f1f5f9',
                  color: item.status === 'Aktif' ? '#166534' : '#475569'
                }}>
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <h6 style={{ 
                fontWeight: '700', 
                color: '#1e293b', 
                fontSize: '16px', 
                marginBottom: '4px',
                lineHeight: '1.2'
              }}>
                {item.nama_sppg}
              </h6>

              {/* Address Section */}
              <div className="d-flex align-items-start gap-2 mt-3">
                <p style={{ 
                  fontSize: '13px', 
                  color: '#475569', 
                  margin: 0, 
                  lineHeight: '1.5' 
                }}>
                  {item.alamat}
                </p>
              </div>

              {/* Footer Meta */}
              <div style={{ 
                marginTop: '16px', 
                paddingTop: '12px', 
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Kode SPPG: {item.kode_sppg}
                </span>
                <a href="#" style={{ 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#2563eb', 
                  textDecoration: 'none' 
                }}>
                  Detail →
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      </MapContainer>
    </div>
  );
}