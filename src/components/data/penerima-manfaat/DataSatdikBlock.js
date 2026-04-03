'use client'
import React from 'react';

const DataSatdikBlock = ({ title, sekolah, siswa, icon, variant }) => {
  // Mapping warna tetap sama
  const variants = {
    paud: { color: '#007bff', bg: '#e3f2fd' }, // Biru
    sd: { color: '#fd7e14', bg: '#fff4e5' }, // Oranye
    smp: { color: '#20c997', bg: '#e6fcf5' }, // Hijau/Tosca
    sma: { color: '#6f42c1', bg: '#f3f0ff' }, // Ungu
  };

  const selected = variants[variant] || variants.paud;

  return (
    <>
      {/* 1. Menambahkan CSS Internal untuk Animasi */}
      <style jsx>{`
        .stat-card-mbgc {
          transition: all 0.35s ease-in-out; /* Transisi halus untuk semua properti */
          border: 1px solid #f0f0f0; /* Border tipis default */
          cursor: pointer; /* Menunjukkan bahwa kartu interaktif */
          overflow: hidden; /* Menjaga animasi tetap di dalam kartu */
        }

        /* Efek saat Kursor di Atas Kartu (Hover) */
        .stat-card-mbgc:hover {
          transform: translateY(-8px); /* Mengangkat kartu ke atas */
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08) !important; /* Bayangan lebih luas & lembut */
          border-color: ${selected.color}; /* Border berubah warna sesuai jenjang */
        }

        /* Efek pada Ikon Box saat Kartu di-Hover */
        .stat-card-mbgc:hover .icon-box-mbgc {
          transform: scale(1.1) rotate(-5deg); /* Ikon membesar & sedikit berputar */
          background-color: ${selected.color} !important; /* Background ikon menjadi penuh */
          color: #ffffff !important; /* Warna ikon menjadi putih */
        }

        /* Transisi halus untuk ikon box */
        .icon-box-mbgc {
          transition: all 0.3s ease;
        }

        /* Pastikan Ikon Font Awesome di tengah sempurna */
        .icon-box-mbgc i {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {/* 2. Struktur Kartu (Hanya Ubah Ikon) */}
      <div className="item-card bg-white p-4 rounded-3 shadow-sm h-100 stat-card-mbgc">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="icon-box-mbgc d-flex align-items-center justify-content-center rounded-3 me-3"
            style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: selected.bg, 
              color: selected.color,
              fontSize: '1.25rem' // Ukuran font disesuaikan sedikit untuk FA
            }}
          >
            {/* PERBAIKAN DI SINI: Gunakan prop icon dari data array */}
            <i className={`${icon}`}></i>
          </div>
          <h6 className="mb-0 fw-bold" style={{ fontSize: '1rem', color: '#333' }}>{title}</h6>
        </div>

        <div className="row g-0 pt-3 border-top" style={{ borderColor: '#f0f0f0 !important' }}>
          <div className="col-6 text-center">
            <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sekolah</small>
            <span className="fw-bold h5 mb-0" style={{ color: selected.color }}>{sekolah}</span>
          </div>
          <div className="col-6 border-start ps-3 text-center" style={{ borderColor: '#f0f0f0 !important' }}>
            <small className="text-muted d-block mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Siswa</small>
            <span className="fw-bold h5 mb-0" style={{ color: selected.color }}>{siswa}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataSatdikBlock;