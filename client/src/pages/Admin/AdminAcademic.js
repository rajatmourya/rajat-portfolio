import React, { useState } from "react";
import { Form, Input, Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminAcademic() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { academics } = portfolioData;
  console.log(academics) 
  const [showAddEditModel, setShowAddEditModel] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      let response;

      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-academic", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-academic", values);
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
      const response = await axios.post("/api/portfolio/delete-academic", {
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
          Add Academic
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 m-5 sm:grid-cols-1">
        {academics.map((academic) => (
          <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">{academic.course}</h1>
            <h1 className="text-primary">{academic.branch}</h1>
            <hr />
            <img
              src={academic.image}
              alt={academic.title}
              className="h-60 w-80"
            />
            <h1> {academic.college} </h1>
            <h1> {academic.period} </h1>
            <h1> {academic.percentage} </h1>
            <h1> {academic.description} </h1>

            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-secondary text-white px-5 py-2"
                onClick={() => {
                  OnDelete(academic);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(academic);
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
          title={selectedItemForEdit ? "Edit academic" : "Add academic"}
          footer={null}
          onCancel={() => {
            setShowAddEditModel(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={ { selectedItemForEdit } || {} }
          >
            <Form.Item
              label="Course"
              name="course"
              rules={[{ message: "Please input your Course!" }]}
            >
              <Input placeholder="Course" />
            </Form.Item>
            <Form.Item
              label="Branch"
              name="branch"
              rules={[{ message: "Please input your Branch!" }]}
            >
              <Input placeholder="Branch" />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ message: "Please input your Image URL!" }]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item
              label="Period"
              name="period"
              rules={[{ message: "Please input your Period!" }]}
            >
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item
              label="Percentage"
              name="percentage"
              rules={[{ message: "Please input your Percentage!" }]}
            >
              <Input placeholder="Percentage" />
            </Form.Item>
            <Form.Item
              label="College"
              name="college"
              rules={[{ message: "Please input your College!" }]}
            >
              <Input placeholder="College" />
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

export default AdminAcademic;
