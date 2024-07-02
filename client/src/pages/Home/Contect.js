import React from "react";
import SectionTitle from "../../component/SectionTitle";
import { useSelector } from "react-redux";

function Contect() {
  const { portfolioData } =  useSelector((state) => state.root);
  const { contact } = portfolioData;
  const user = contact;

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-white text-sm">{"{"}</p>
          {Object.keys(user).map((key) => (
            <p className="ml-5">
              <span className="text-tertiary">{key} : </span>
              <span className="text-tertiary">{user[key]}</span>
            </p>
          ))}
          <p className="text-white">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <lottie-player
            src="https://lottie.host/e3776aa8-12ce-4ffa-b384-e8aeeec9b5ca/q0DSVH8FyL.json"
            background="transparent"
            speed="1"
            loop
            // controls
            autoplay
            direction="1"
            mode="normal"
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contect;
