import dynamic from "next/dynamic";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/property/dashboard/Footer";
import data from "@/data/daftar-sppg.json";
import DataSppgBlock from "@/components/data/daftar-sppg/DataSppgBlock";
import ClientOnlyTable from "@/components/tables/ClientOnlyTable";
import MapWrapper from "@/components/maps/MapWrapper";
import { getDataSppg } from "@/services/DataSppg";

export const metadata = {
  title: "Data Sebaran SPPG || MBGC - Satgas Percepatan MBG Kabupaten Ciamis",
};

export default async function SebaranSppgPage() {

  const apiData = await getDataSppg(); // Fetched correctly here

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper">
          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Data Sebaran SPPG</h2>
                    <p className="text">Menampilkan data sebaran SPPG di Kabupaten Ciamis</p>
                  </div>
                </div>
              </div>

              <div className="row mb30">
                <div className="col-lg-12">
                  <div className="p30 bgc-white bdrs12">
                    {/* <h4 className="title mb20">Sebaran SPPG Kabupaten Ciamis</h4> */}
                    <MapWrapper data={apiData} />
                  </div>
                </div>
              </div>

              <div className="row">
                <DataSppgBlock data={apiData}/>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="datatable-wrapper">
                    <ClientOnlyTable data={apiData} />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
