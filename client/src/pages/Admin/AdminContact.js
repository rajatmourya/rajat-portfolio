import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminContact() {
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => { 
    try {
      dispatch(ShowLoading());
      console.log(values);
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
      });
      
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  return (
    <div className="flex flex-col justify-between ">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.contact}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ message: "Please input your Name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ message: "Please input your Age!" }]}
        >
          <Input placeholder="Age" />
        </Form.Item>
        
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ message: "Please input your Gender!" }]}
        >
          <Input placeholder="Gender" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ message: "Please input your Mobile!" }]}
        >
          <Input placeholder="Mobile" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ message: "Please input your Address!" }]}
        >
          <TextArea rows={4} placeholder="Address" />
        </Form.Item>

        <div className="flex justify-end w-full" label="Welcome Text">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
