import React, { useState } from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";

function Courses() {
  const { portfolioData } =  useSelector((state) => state.root);
  const { courses } = portfolioData;

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <div>
      <SectionTitle title="Courses" />

      <div className="flex py-10 gap-20 sm:flex-col">
      <div className="flex flex-col gap-10 border-l-2 border-[#13d6d655] w-1/2 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((course, index) => (
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
                {course.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {courses[selectedItemIndex].title}
            </h1>
            <h1 className="text-white text-xl">
              {courses[selectedItemIndex].description}
            </h1>
          </div>
          
          <img
            src={courses[selectedItemIndex].image}
            alt={courses[selectedItemIndex].title}
            className="h-52 w-80"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses