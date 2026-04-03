'use client'
import React from 'react';

const KelompokB3Block = ({ title, jumlah, icon, variant }) => {
  // Mapping warna khusus untuk Kelompok B3
  const variants = {
    balita: { color: '#007bff', bg: '#e3f2fd' },    // Biru
    bumil: { color: '#e83e8c', bg: '#fce4ec' },     // Pink (Ibu Hamil)
    busui: { color: '#6f42c1', bg: '#f3f0ff' },     // Ungu (Ibu Menyusui)
    stunting: { color: '#dc3545', bg: '#fff5f5' },  // Merah (Stunting)
  };

  const selected = variants[variant] || variants.balita;

  return (
    <>
      <style jsx>{`
        .stat-card-mbgc {
          transition: all 0.35s ease-in-out;
          border: 1px solid #f0f0f0;
          cursor: pointer;
          overflow: hidden;
        }

        .stat-card-mbgc:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08) !important;
          border-color: ${selected.color};
        }

        .stat-card-mbgc:hover .icon-box-mbgc {
          transform: scale(1.1) rotate(-5deg);
          background-color: ${selected.color} !important;
          color: #ffffff !important;
        }

        .icon-box-mbgc {
          transition: all 0.3s ease;
        }

        .icon-box-mbgc i {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="item-card bg-white p-4 rounded-3 shadow-sm h-100 stat-card-mbgc">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="icon-box-mbgc d-flex align-items-center justify-content-center rounded-3 me-3"
            style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: selected.bg, 
              color: selected.color,
              fontSize: '1.25rem'
            }}
          >
            <i className={`${icon}`}></i>
          </div>
          <h6 className="mb-0 fw-bold" style={{ fontSize: '1rem', color: '#333' }}>{title}</h6>
        </div>

        <div className="pt-3 border-top" style={{ borderColor: '#f0f0f0 !important' }}>
          <div className="text-start">
            <small className="text-muted d-block mb-1" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Penerima Manfaat
            </small>
            <div className="d-flex align-items-baseline">
              <span className="fw-bold h4 mb-0" style={{ color: selected.color }}>{jumlah}</span>
              <span className="ms-2 text-muted" style={{ fontSize: '0.85rem' }}>Orang</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KelompokB3Block;