import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
  profilItems,
  dataItems,
  pengaduanItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
    profilItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("profil");
      }
    });
    dataItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("data");
      }
    });
    pengaduanItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pengaduan");
      }
    });
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <a className="list-item" href="/">
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Beranda
          </span>
        </a>
      </li>
      {/* End homeItems */}

      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span
            className={topMenu == "profil" ? "title menuActive" : "title"}
          >
            Profil
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {profilItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* End profil Items */}

      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "data" ? "title menuActive" : "title"}>
            Data
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {dataItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* End blog Items */}

      <li className="visible_list dropitem">
        <a className="list-item" href="pengaduan">
          <span className={topMenu == "pengaduan" ? "title menuActive" : "title"}>
            Pengaduan
          </span>
        </a>
      </li>
      {/* End homeItems */}

    </ul>
  );
};

export default MainMenu;
