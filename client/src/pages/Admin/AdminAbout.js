import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminAbout() {
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => { 
    try {
       const tempSkills = values.skills.split(",");
       values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
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
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(",  ")
        }}
      >
        <Form.Item
          label="Lottie URL"
          name="lottieURL"
          rules={[{ message: "Please input your Lottie URL!" }]}
        >
          <Input placeholder="Lottie URL" />
        </Form.Item>

        <Form.Item
          label="Description1"
          name="description1"
          rules={[{ message: "Please input your Description1!" }]}
        >
          <TextArea rows={4} placeholder="Description1" />
        </Form.Item>
        <Form.Item
          label="Description2"
          name="description2"
          rules={[{ message: "Please input your Description2!" }]}
        >
          <TextArea rows={4} placeholder="Description2" />
        </Form.Item>

        <Form.Item
          label="Skills"
          name="skills"
          rules={[{ message: "Please input your Skills!" }]}
        >
          <TextArea rows={4} placeholder="Skills" />
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

export default AdminAbout;
