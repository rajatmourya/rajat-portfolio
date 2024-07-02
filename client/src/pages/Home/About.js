import React from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";

function About() {

  const { portfolioData } =  useSelector((state) => state.root);
  const { about } = portfolioData;
  const { lottieURL, description1, description2, skills, skillCaption} = about;
  
  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex w-full sm:flex-col items-center ">
        <div className="h-[80vh] sm:h-full w-1/2 sm:w-full">
          <lottie-player
            src={ lottieURL }
            background="##FFFFFF"
            speed="1" 
            // style="width: 300px; height: 300px"
            loop
            // controls
            autoplay
            direction="1"
            mode="normal"
          ></lottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{ description1  || ' '  }
          </p>
          <p className="text-white">{ description2 || ' '  }
          </p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-tertiary items-xl">
            {skillCaption}
        </h1>
        <div className="flex flex-wrap gap-10 mt-5">
            {skills.map((skill, index) => (
                <div className="border border-tertiary py-3 px-10">
                    <h1 className="text-tertiary">{skill || ' ' }</h1>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default About;
