import React, { useState } from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } =  useSelector((state) => state.root);
  const { experiences } = portfolioData;
  return (
    <div>
      {true && (
        <div>
        <SectionTitle title="Experience" />
  
        <div className="flex py-10 gap-20 sm:flex-col">
          <div className="flex flex-col gap-10 border-l-2 border-[#13d6d655] w-1/2 sm:flex-row sm:overflow-x-scroll sm:w-full">
            {experiences.map((experience, index) => (
              <div
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl px-5 py-3 ${
                    selectedItemIndex === index
                      ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#147e7927] sm:w-full"
                      : "text-white"
                  }`}
                >
                  {experience.period}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 justify-center">
              <h1 className="text-secondary text-xl">{experiences[selectedItemIndex].title}</h1>
              <h1 className="text-tertiary text-xl">{experiences[selectedItemIndex].company}</h1>
              <h1 className="text-white text-xl">{experiences[selectedItemIndex].description} </h1>
          </div>
        </div>
      </div>
      )}
    </div>
    
  );
}

export default Experiences;
