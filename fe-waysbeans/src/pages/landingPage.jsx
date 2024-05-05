import React from "react";
import Headers from "../components/navbar";
import Jumbotron from "../components/jumbotron";
import SectionCategory from "../components/sectionCategory";
import SectionSevices from "../components/sectionServices";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <div style={{ overflowY: 'hidden' }}>
      <div className="z-10">
        <Headers />
      </div>

      <div className="top-0 h-screen">
        <Jumbotron />
      </div>

      <div className="bg-isSecondary pb-10" style={{marginTop: -110}}>
        <SectionCategory />
      </div>

      <div>
        <SectionSevices />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
