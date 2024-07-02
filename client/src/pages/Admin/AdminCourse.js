import React, { useState } from "react";
import { Form, Input, Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminCourse() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  console.log(courses);
  const [showAddEditModel, setShowAddEditModel] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(false);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post("api/portfolio/add-course", values);
      }

      if (selectedItemForEdit) {
        response = await axios.post("api/portfolio/add-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("api/portfolio/add-course", values);
      }

      dispatch(HideLoading);
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModel(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const OnDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-course", {
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
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 m-5 sm:grid-cols-1">
        {courses.map((course) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">
              {" "}
              {course.title}{" "}
            </h1>
            <hr />
            {/* <h1></h1> */}
            <img src={course.image} alt={course.title} className="h-60 w-80" />
            <h1>Period:  {course.period} </h1>
            <h1>Company: {course.company} </h1>
            <h1> {course.description} </h1>
            

            <div className="flex justify-end gap-5 mt-5 ">
              <button
                className="bg-secondary text-white px-5 py-2"
                onClick={() => {
                  OnDelete(course);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(course);
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
          visible={showAddEditModel}
          title={selectedItemForEdit ? "Edit Course" : "Add Course"}
          footer={null}
          onCancel={() => {
            setShowAddEditModel(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValue={selectedItemForEdit}
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
              label="Description"
              name="description"
              rules={[{ message: "Please input your Description!" }]}
            >
              <TextArea placeholder="Description" />
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

export default AdminCourse;