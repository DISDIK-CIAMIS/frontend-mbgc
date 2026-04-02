import Explore from "@/components/common/Explore";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import About from "@/components/home/home-v1/About";
import ApartmentType from "@/components/home/home-v1/ApartmentType";
import CallToActions from "@/components/common/CallToActions";
import FeaturedListings from "@/components/home/home-v1/FeatuerdListings";
import Header from "@/components/home/home-v1/Header";
import Partner from "@/components/common/Partner";
import PopularListings from "@/components/home/home-v1/PopularListings";
import PropertiesByCities from "@/components/home/home-v1/PropertiesByCities";
import Testimonial from "@/components/home/home-v1/Testimonial";
import Hero from "@/components/home/home-v1/hero";
import Image from "next/image";
import Blog from "@/components/common/Blog";
import Link from "next/link";
import PopulerProperty from "@/components/home/home-v1/PopulerProperty";
import DataUmum from "@/components/home/home-v1/DataUmum";
import { getHomeStats } from "@/services/home_stats";

export const metadata = {
  title: "Beranda || MBGC - Satgas Percepatan MBG Kabupaten Ciamis",
};

const Home_V1 = async () => {
  let apiData = [];

  try {
    apiData = await getHomeStats();
  } catch (error) {
    console.error("Failed to fetch Home Stats data:", error);
  }

  const stats = {
    totalSppg: apiData.length,
    totalKecamatan: new Set(apiData.map(i => i.kecamatan).filter(Boolean)).size,
    totalDesa: new Set(apiData.map(i => i.desa_kelurahan).filter(Boolean)).size,
    totalYayasan: apiData.filter(i => i.jenis_mitra?.toLowerCase() === 'yayasan').length,
  };

  const types = [
    { id: 1, icon: "flaticon-home", title: "Unit SPPG", count: stats.totalSppg },
    { id: 2, icon: "flaticon-map", title: "Kecamatan", count: stats.totalKecamatan },
    { id: 3, icon: "flaticon-home-2", title: "Desa", count: stats.totalDesa },
    { id: 4, icon: "flaticon-home-3", title: "Dapur Yayasan", count: stats.totalYayasan },
  ];


  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Home Banner Style V1 */}
      <section className="home-banner-style1 p0">
        <div className="home-style1">
          <div className="container">
            <div className="row">
              <div className="col-xl-11 mx-auto">
                <Hero />
              </div>
            </div>
          </div>
          {/* End .container */}

          <a href="#explore-property">
            <div className="mouse_scroll animate-up-4">
              <Image
                width={20}
                height={105}
                src="/images/about/home-scroll.png"
                alt="scroll image"
              />
            </div>
          </a>
        </div>
      </section>
      {/* End Home Banner Style V1 */}

      {/* Statistik */}
      <section id="statistik" className="pb30 pb30-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="300"
              >
                <h2 className="title">Data Terkini</h2>
                <p className="paragraph">
                  Menampilkan data terkait Program MBG di Kabupaten Ciamis
                </p>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <p className="paragraph" data-aos="fade-up" data-aos-delay="100" data-aos-duration="300">
                    Update Terakhir: 25 Oktober 2025
                  </p>
                </div>
                {/* End prev */}
              </div>
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div
                className="explore-apartment-slider"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="300"
              >
                <DataUmum types={types} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Explore Apartment */}

      {/* Explore Blog */}
      <section className="pb90 pb20-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up" data-aos-duration="300">
              <div className="main-title text-start text-md-center">
                <h2 className="title">Berita Terkini</h2>
                <p className="paragraph">
                  Seputar Percepatan Program MBG di Kabupaten Ciamis
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" data-aos="fade-up" data-aos-delay="100" data-aos-duration="300">
            <Blog />
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* Explore Blog */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Our Partners */}
      
      {/* End Our Partners */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V1;
