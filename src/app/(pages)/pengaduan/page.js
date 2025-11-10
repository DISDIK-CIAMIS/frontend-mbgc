import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";
import Image from "next/image";

export const metadata = {
  title: "Contact  || Homez - Real Estate NextJS Template",
};

const Contact = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Our Contact With Map */}
      {/* <section className="p-0">
        <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=14&output=embed&iwloc=near"
          title="London Eye, London, United Kingdom"
          aria-label="London Eye, London, United Kingdom"
        />
      </section> */}
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section className="pt60 pb90 pb10-md">
        <div className="container">
          <div className="row d-flex align-items-start">
            <div className="col-lg-6 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  Formulir Pengaduan
                </h4>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-4 offset-lg-1">
              <h2 className="mb20 text-capitalize">
                Sampaikan Pengaduan Anda
              </h2>
              <p className="text">
                Kami berkomitmen untuk menampung setiap keluhan, masukan, 
                dan saran Anda demi peningkatan layanan yang lebih baik.
              </p>
              <div className="animate_content text-center text-xl-start">
                <div className="animate_thumb">
                  <Image
                    width={591}
                    height={452}
                    className="w-100 h-100 cover"
                    src="/images/pengaduan/ilustrasi-1.png"
                    alt="error-page-img"
                  />
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

      {/* Visit our Office */}
      <section className="pt0 pb20 pb10-md">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="main-title text-center">
                <h2 className="title">Hubungi Kami</h2>
                {/* <p className="paragraph">
                  Realton has more than 9,000 offices of all sizes and all
                  potential of session.
                </p> */}
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row d-flex align-items-start" data-aos="fade-up" data-aos-delay="100">
            <Office />
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Visit our Office */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Contact;
