import React from "react";
import Header from "../../component/Header";
import Intro from "./Intro";
import About from "./About";
import Academic from "./Academics";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Courses from "./Courses";
import Contect from "./Contect";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
import { useSelector } from "react-redux";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      
      <Header />
      {portfolioData && (
        <div className="bg-primary px-40 sm:px-5 ">
          <Intro promp={portfolioData} />
          <About />
          <Experiences />
          <Academic />
          <Projects />
          <Courses />
          <Contect />
          <Footer />
          <LeftSider />
        </div>
      )}
    </div>
  );
}

export default Home;
