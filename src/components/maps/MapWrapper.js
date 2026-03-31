"use client";

import dynamic from "next/dynamic";

// This is where the ssr: false logic lives
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "400px" }} className="bgc-eee animate-pulse d-flex align-items-center justify-content-center">
      <p>Memuat Peta...</p>
    </div>
  ),
});

export default function MapWrapper({ data }) {
  return <MapComponent data={data} />;
}