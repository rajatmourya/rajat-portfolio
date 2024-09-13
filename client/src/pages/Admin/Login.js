import React from "react";
import {Input, message } from "antd";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/admin-login", user);
      dispatch(HideLoading());
      if(response.data.success){
        message.success(response.data.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/admin";
      }else {
        message.error(response.data.message);
      }
      
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  }


  // const login = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     console.log(user.username);
  //     console.log(user.password);
  //     const response = await axios.post("/api/portfolio/admin-login", user);
  //     console.log(response.data);
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       localStorage.setItem("token", response.data);
  //       console.log(localStorage.getItem);
  //       window.location.href = "/admin";
  //     } else {
  //       console.log(response);
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     message.error(error.message);
  //     dispatch(HideLoading());
  //   }
  // };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-primary">
        <div className="w-96 flex gap-5 p-5 shadow border bg-gray-100 bg-white border-gray-500 flex-col">
          <h1 className="text-2xl">Rajat - Admin Login</h1>
          <hr />
          <Input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />
          <h1>{user.username}</h1>
          <Input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button className="bg-primary text-white p-2" onClick={login}>
            Login
          </button>
        </div>
      </div>
      {/* <Modal
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
        </Modal> */}
    </div>
  );
}

export default Login;
