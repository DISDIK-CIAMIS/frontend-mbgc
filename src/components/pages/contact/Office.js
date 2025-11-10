import Image from "next/image";
import React from "react";

const Office = () => {
  const offices = [
    {
      id: 1,
      city: "Sekretariat",
      icon: "/images/icon/london.svg",
      address: "Jl. Jend. Sudirman No. 16, Ciamis, Jawa Barat 46211",
      phoneNumber: "(0265) 771511",
    },
  ];

  return (
    <>
      {offices.map((office) => (
        <div className="col" key={office.id}>
          <div className="iconbox-style8 text-center">
            <div className="icon">
              <Image width={120} height={120} src={office.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{office.city}</h4>
              <p className="text mb-1">{office.address}</p>
              <h6 className="mb10">{office.phoneNumber}</h6>
              <a className="text-decoration-underline" href="#">
                Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Office;
