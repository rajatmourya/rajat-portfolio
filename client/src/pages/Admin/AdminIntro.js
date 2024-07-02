import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminIntro() {
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => { 
    try {
      //  const tempSkills = values.skills.split(",");
      //  values.skills = tempSkills;
      dispatch(ShowLoading());
      console.log(values);
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intros._id,
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
        initialValues={portfolioData.intros}
      >
        <Form.Item
          label="Welcome Text"
          name="welcomeText"
          rules={[{ message: "Please input your Intro!" }]}
        >
          <Input placeholder="Intro" />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ message: "Please input your First Name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ message: "Please input your Last Name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ message: "Please input your Caption!" }]}
        >
          <Input placeholder="Caption" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ message: "Please input your Description!" }]}
        >
          <TextArea rows={4} placeholder="Description" />
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

export default AdminIntro;
