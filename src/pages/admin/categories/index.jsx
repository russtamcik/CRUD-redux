import { useState, Fragment, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  Space,
  Image,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import request from "./../../../server";
import { ENDPOINT } from "../../../constants";

const CategoriesPage = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => {
        console.log(photo);
        return (
          <Image
            height={50}
            src={`${ENDPOINT}upload/${photo._id}.${photo.name.split(".")[1]}`}
          />
        );
      },
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => edit(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={() => deleteCategory(row._id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let {
        data: { data },
      } = await request.get("category");
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOk = async () => {
    try {
      if (photo) {
        setBtnLoading(true);
        let values = await form.validateFields();
        let categoryData = { ...values, photo: photo._id };
        if (selected === null) {
          await request.post("category", categoryData);
        } else {
          await request.put(`category/${selected}`, categoryData);
        }
        getData();
        form.resetFields();
        setIsModalOpen(false);
      } else {
        message.error("Upload photo");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const uploadImage = async (e) => {
    try {
      // console.log(e.target.files[0]);
      let form = new FormData();
      form.append("file", e.file.originFileObj);

      let { data } = await request.post("upload", form);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };
  async function edit(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`category/${id}`);
    setPhoto(data.photo);
    form.setFieldsValue(data);
  }

  async function deleteCategory(id) {
    confirm("Are you sure you want to delete");
    if (confirm) {
      try {
        await request.delete(`category/${id}`);
        getData();
        message.success("Category deleted successfully");
      } catch (err) {
        message.error("Failed to delete category");
      }
      getData();
    }
  }

  return (
    <Fragment>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Categories ({data.length})</h1>
            <Button onClick={showModal} type="primary">
              Add
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Category data"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={btnLoading}
        onCancel={handleCancel}
        okText={selected === null ? "Add category" : "Save category"}
      >
        <Form
          form={form}
          name="category"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Upload
            onChange={uploadImage}
            listType="picture"
            maxCount={1}
            fileList={
              photo
                ? [
                    {
                      thumbUrl: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                      name: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                      url: `${ENDPOINT}upload/${photo._id}.${
                        photo.name.split(".")[1]
                      }`,
                    },
                  ]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>Upload photo (Max: 1)</Button>
          </Upload>
          {/* <input type="file" onChange={uploadImage} /> */}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CategoriesPage;
