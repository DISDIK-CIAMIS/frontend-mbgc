import Pagination from "@/components/blog/Pagination";
import Blog from "@/components/blog/blog-list-v1/Blog";
import BlogSidebar from "@/components/blog/sidebar";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

export const metadata = {
  title: "Blog List v1  || Homez - Real Estate NextJS Template",
};

const BlogV1 = () => {
  return (
    <div className="bgc-f7">
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Start */}
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Dasar Hukum</h2>
                <div className="breadcumb-list">
                  <a href="#">Profil</a>
                  <a href="#">Dasar Hukum</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Start */}

      {/* Blog Section Area */}
      <section className="our-blog pt-0" style={{ height: '1280px' }}>
        <div className="container" style={{ height: '100%' }}>
          <div
            className="row aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="300"
            style={{ height: '100%' }}
          >
            <div className="col-lg-12" style={{ height: '100%' }}>
              <div className="blog-style1 large-size bgc-white" style={{ height: '100%' }}>
                <div className="blog-content pl30 pb20" style={{ height: '100%' }}>
                  <div className="w-full h-full" style={{ height: '100%' }}>
                    <iframe
                      src="/files/SALINAN SURAT EDARAN TENTANG PEMBENTUKAN SATUAN TUGAS PERCEPATAN PENYELENGGARAAN PROGRAM MBG DI DAERAH.pdf"
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      title="PDF Viewer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* End .col-lg-8 */}

            {/* <div className="col-lg-4"> */}
              {/* <div className="blog-sidebar"> */}
                {/* <div className="sidebar-widget mb30"> */}
                  {/* <h6 className="widget-title">Categories</h6> */}
                  {/* <div className="category-list d-flex flex-column mt20"> */}
                      {/* <button className="ud-btn btn-transparent"><a href="#">Download</a></button> */}
                  {/* </div> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
            {/* End .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
  );
};

export default BlogV1;
