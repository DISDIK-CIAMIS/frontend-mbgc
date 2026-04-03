import React from "react";

const DataSppgBlock = ({ data }) => {
  // Define the array INSIDE the component so it can use the 'data' prop
  const statisticsData = [
    {
      text: "Jumlah SPPG (existing)",
      title: data?.totalSppg || 0, // Access data passed from parent
      icon: "flaticon-home",
    },
    {
      text: "Jumlah SPPG Operasional",
      title: data?.totalSppgAktif || 0,
      icon: "flaticon-search-chart",
    },
    {
      text: "Jumlah SPPG Tidak Operasional",
      title: data?.totalSppgNonAktif || 0, // This is your sum from the API!
      icon: "flaticon-review",
    },
    {
      text: "Jumlah SPPG Dalam Proses",
      title: data?.totalSppgDalamProses || 0,
      icon: "flaticon-like",
    },
  ];

  return (
    <>
      {statisticsData.map((item, index) => ( // renamed 'data' to 'item' to avoid confusion
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between align-items-center statistics_funfact">
            <div className="details">
              <div className="text fz25">{item.text}</div>
              <div className="title">{item.title}</div>
            </div>
            <div 
              className="icon d-flex align-items-center justify-content-center" 
              style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                flexShrink: 0,
                marginLeft: "15px" 
              }}
            >
              <i className={item.icon} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DataSppgBlock;