import React, { useEffect } from "react";
import { Tabs } from "antd";
import Header from "../../component/Header";
import { useSelector } from "react-redux";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminAcademic from "./AdminAcademic";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminCourse from "./AdminCourse";
import AdminContact from "./AdminContact";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  },[]);

  return (
    <div>
      <Header />
      <div className="flex gap-10 items-center justify-between  py-5 px-5">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl text-secondary">PortFolio Admin</h1>
          <div className="bg-gray-500 w-60 h-[1px]"></div>
        </div>
        <div className="flex gap-10 items-center justify-between  py-5 px-5">
        <button className="flex bg-primary text-white px-5 py-2">
          Change User Details
        </button>
        <button className="bg-primary text-white px-5 py-2" onClick={() => {
          localStorage.removeItem("token");
          window.location.href ="/admin-login";
        }
        }>Logout</button>
        </div>
      </div>
      <hr />
      {portfolioData && (
        <div className="px-5 pb-10 pt-5">
          <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            items={[
              {
                label: "Intro",
                key: "1",
                children: <AdminIntro />,
              },
              {
                label: "About",
                key: "2",
                children: <AdminAbout />,
              },
              {
                label: "Academic",
                key: "3",
                children: <AdminAcademic />,
                // disabled: true,
              },
              {
                label: "Experience",
                key: "4",
                children: <AdminExperience />,
              },
              {
                label: "Project",
                key: "5",
                children: <AdminProject />,
              },
              {
                label: "Course",
                key: "6",
                children: <AdminCourse />,
              },
              {
                label: "Contact",
                key: "7",
                children: <AdminContact />,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default Admin;
