import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Navigasi",
      links: [
        { label: "Beranda", href: "#" },
        { label: "Profil", href: "#" },
        { label: "Data", href: "#" },
        { label: "Pengaduan", href: "#" },
      ],
    }
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-lg-5 col-md-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
