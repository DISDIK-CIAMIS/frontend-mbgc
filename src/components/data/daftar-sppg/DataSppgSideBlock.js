import React from "react";

const DataSppgSideBlock = ({ data }) => {
  const statisticsData = [
    {
      text: "Jumlah SPPG (existing)",
      title: data?.totalSppg || 0,
      icon: "flaticon-home",
    },
    {
      text: "Jumlah SPPG Operasional",
      title: data?.totalSppgAktif || 0,
      icon: "flaticon-search-chart",
    },
    {
      text: "Jumlah SPPG Tidak Operasional",
      title: data?.totalSppgNonAktif || 0,
      icon: "flaticon-review",
    },
    {
      text: "Jumlah SPPG Dalam Proses",
      title: data?.totalSppgDalamProses || 0,
      icon: "flaticon-like",
    },
  ];

  return (
    // The Row stays OUTSIDE the map
    <div className="row g-3"> 
      {statisticsData.map((item, index) => (
        <div key={index} className="col-12"> {/* Forces one block per line in the sidebar */}
          <div className="d-flex justify-content-between align-items-center statistics_funfact py-3 px-4 shadow-lg bg-white rounded-3 border">
            <div className="details">
              {/* Reduced font size slightly for sidebar fit */}
              <div className="text fz14 text-muted mb-1">{item.text}</div>
              <div className="title fz20 fw-bold">{item.title}</div>
            </div>
            <div 
              className="icon d-flex align-items-center justify-content-center" 
              style={{ 
                width: "50px", 
                height: "50px", 
                borderRadius: "50%", 
                backgroundColor: "#f8f9fa",
                flexShrink: 0,
                marginLeft: "15px" 
              }}
            >
              <i className={`${item.icon} text-primary`} style={{ fontSize: '20px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSppgSideBlock;