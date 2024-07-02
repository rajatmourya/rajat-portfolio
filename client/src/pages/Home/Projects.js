import React, { useState } from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Projects() {
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <div>
      <SectionTitle title="projects" />

      <div className="flex py-10 gap-20 sm:flex-col">
      <div className="flex flex-col gap-10 border-l-2 border-[#13d6d655] w-1/2 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
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
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={projects[selectedItemIndex].image}
            alt={projects[selectedItemIndex].title}
            className="h-52 w-80"
          />

          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {projects[selectedItemIndex].title}
            </h1>
            <h1 className="text-white text-xl">
              {projects[selectedItemIndex].description}
            </h1>
            <h1 className="text-white text-xl">
              {projects[selectedItemIndex].technologies.join(", ")}
            </h1>
            <Link to={projects[selectedItemIndex].link}>
              <h1 className="text-secondary text-xl ">
                {projects[selectedItemIndex].text}
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
