import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Recruitersrow from '../Components/RecruitersRow/RecruitersRow';
import Features from "../Components/Features/Features";
import PlacementCellInfo from "../Components/PlacementCellInfo/PlacementCellInfo";
import FrontPage from "../Components/FrontPage/FrontPage";
import Footer from "../Components/Footer/Footer";



function Home() {
  return (
    <div>
      <Navbar />
      <FrontPage />
      <Features/>
      <Recruitersrow/>
      {/* <PlacementCellInfo/> */}
      <Footer/>
    </div>
  );
}

export default Home;

