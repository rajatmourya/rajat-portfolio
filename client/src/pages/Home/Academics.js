import React, { useState } from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";

function Academics() {
  const { portfolioData } = useSelector((state) => state.root);
  const { academics } = portfolioData;
  console.log(academics);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return ( 
    <div>
      <SectionTitle title="Academics" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#13d6d655] w-1/2 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {academics.map((macademic, index) => (
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
                {macademic.course}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={academics[selectedItemIndex].image}
            alt={academics[selectedItemIndex].title}
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl font-bold"> {academics[selectedItemIndex].course} </h1>
            <h1 className="text-tertiary text-xl"> {academics[selectedItemIndex].branch} </h1>
            <h1 className="text-tertiary text-xl"> {academics[selectedItemIndex].period} </h1>
            <h1 className="text-white text-xl"> {academics[selectedItemIndex].percentage} </h1>
            <h1 className="text-white text-xl"> {academics[selectedItemIndex].description} </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;
