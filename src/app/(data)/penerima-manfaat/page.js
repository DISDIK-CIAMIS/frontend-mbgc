import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/property/dashboard/Footer";
import data from "@/data/penerima-manfaat.json";
import PenerimaManfaatBlock from "@/components/data/daftar-sppg/PenerimaManfaatBlock";
import ClientOnlyTable from "@/components/tables/ClientOnlyTable";
import DynamicChartWrapper from "@/components/charts/DynamicChartWrapper";
import DataSatdikBlock from "@/components/data/penerima-manfaat/DataSatdikBlock";
import KelompokB3Block from "@/components/data/penerima-manfaat/KelompokB3Block";
import { getPenerimaManfaat } from "@/services/DataPenerimaManfaat";

export const metadata = {
  title: "Penerima Manfaat || MBGC - Satgas Percepatan MBG Kabupaten Ciamis",
};

export default async function DashboardHomePage() {

  const ApiData = await getPenerimaManfaat();

  const dataPendidikan = [
    { 
      title: 'PAUD Sederajat',
      sekolah: ApiData.summarySiswa.jumlahSekolahPAUD.toLocaleString('id-ID'),
      siswa: ApiData.summarySiswa.jumlahSiswaPAUD.toLocaleString('id-ID'),
      icon: 'fa-solid fa-child',
      variant: 'paud' 
    },
    { 
      title: 'SD Sederajat', 
      sekolah: ApiData.summarySiswa.jumlahSekolahSD.toLocaleString('id-ID'), 
      siswa: ApiData.summarySiswa.jumlahSiswaSD.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-book-open', 
      variant: 'sd' 
    },
    { 
      title: 'SMP Sederajat', 
      sekolah: ApiData.summarySiswa.jumlahSekolahSMP.toLocaleString('id-ID'), 
      siswa: ApiData.summarySiswa.jumlahSiswaSMP.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-graduation-cap', 
      variant: 'smp' 
    },
    { 
      title: 'SMA Sederajat', 
      sekolah: ApiData.summarySiswa.jumlahSekolahSMA.toLocaleString('id-ID'), 
      siswa: ApiData.summarySiswa.jumlahSiswaSMA.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-school', 
      variant: 'sma'
    },
  ];

  const dataB3 = [
    { 
      title: 'Balita', 
      jumlah: ApiData.summaryBumilstun.totalBalita.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-baby', 
      variant: 'balita' 
    },
    { 
      title: 'Ibu Hamil', 
      jumlah: ApiData.summaryBumilstun.totalBumil.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-person-pregnant', 
      variant: 'bumil' 
    },
    { 
      title: 'Ibu Menyusui', 
      jumlah: ApiData.summaryBumilstun.totalBusui.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-baby-carriage', 
      variant: 'busui' 
    },
    { 
      title: 'Anak Stunting', 
      jumlah: ApiData.summaryBumilstun.totalAnakStunting.toLocaleString('id-ID'), 
      icon: 'fa-solid fa-ruler-vertical', 
      variant: 'stunting' 
    },
  ];

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
                    <h2>Penerima Manfaat</h2>
                    <p className="text">Menampilkan data per Kecamatan hingga tingkat Desa/Kelurahan</p>
                  </div>
                </div>
              </div>

              <div className="row mb20">
                <div className="text-center mb-4">
                  <h5 className="pill-title">
                    <i className="fa-solid fa-chart-pie me-2"></i>
                    Satuan Pendidikan
                  </h5>
                </div>
                {dataPendidikan.map((item, index) => (
                  <div key={index} className="col-sm-6 col-xxl-3 mb20">
                    <DataSatdikBlock
                      title={item.title}
                      sekolah={item.sekolah}
                      siswa={item.siswa}
                      icon={item.icon}
                      variant={item.variant}
                    />
                  </div>
                ))}
              </div>

              <div className="row mb20">
                <div className="text-center mb-4">
                  <h5 className="pill-title">
                    <i className="fa-solid fa-chart-pie me-2"></i>
                    Kelompok B3 & Anak Stunting
                  </h5>
                </div>
                {dataB3.map((item, index) => (
                  <div key={index} className="col-sm-6 col-xxl-3 mb20">
                    <KelompokB3Block
                      title={item.title}
                      jumlah={item.jumlah}
                      icon={item.icon}
                      variant={item.variant}
                    />
                  </div>
                ))}
              </div>

              <div className="row mb30">
                <div className="col-lg-12">
                  <DynamicChartWrapper componentPath="PesertaDidikChart" data={ApiData.summaryWilayah} />
                </div>
              </div>

              <div className="row mb30">
                <div className="col-lg-12">
                  <DynamicChartWrapper componentPath="KelompokB3Chart" data={ApiData.summaryWilayah} />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                    <div className="datatable-wrapper">
                        <ClientOnlyTable data={ApiData.summaryWilayah} component="PenerimaManfaatTable" />
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
