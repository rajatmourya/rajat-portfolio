import React, { useState } from "react";
import { Form, Input, Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminProject() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModel, setShowAddEditModel] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      let response;

      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", values);
      }
      dispatch(ShowLoading());

      console.log(response);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModel(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData());
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("hi");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const OnDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px- py2 text-white px-5 py-2"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModel(true);
          }}
        >
          Add project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 m-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
            <hr />
            <img
              src={project.image}
              alt={project.title}
              className="h-60 w-80"
            />
            <h1> {project.link} </h1>
            <h1> {project.description} </h1>
            <h1> {project.technologies.join(", ")} </h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-secondary text-white px-5 py-2"
                onClick={() => {
                  OnDelete(project);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModel(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModel}
          title={selectedItemForEdit ? "Edit project" : "Add project"}
          footer={null}
          onCancel={() => {
            setShowAddEditModel(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies.join(" , "),
              } || {}
            }
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ message: "Please input your Title!" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ message: "Please input your Image URL!" }]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item
              label="Link text"
              name="text"
              rules={[{ message: "Please input your Link text!" }]}
            >
              <Input placeholder="Link text" />
            </Form.Item>
            <Form.Item
              label="Link"
              name="link"
              rules={[{ message: "Please input your Link!" }]}
            >
              <Input placeholder="Link" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ message: "Please input your Description!" }]}
            >
              <TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item
              label="Technologies"
              name="technologies"
              rules={[{ message: "Please input your Technologies!" }]}
            >
              <TextArea placeholder="Technologies" />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModel(false);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProject;
