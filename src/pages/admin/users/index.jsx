import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  changeActivePage,
  controlModal,
  deleteUser,
  editUser,
  getUsers,
} from "../../../redux/action/userActions";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";

const UsersPage = () => {
  const columns = [
    {
      title: "Firstname",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Lastname",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      render: (_, user) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editUserHandler(user)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={() => deleteUserHandler(user._id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const {
    users,
    total,
    loading,
    activePage,
    selected,
    isModalOpen,
    btnLoading,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const editUserHandler = (user) => {
    setEditingUser(user);
    dispatch(controlModal());
    form.setFieldsValue({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      password: user.password,
    });
  };

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  const saveUser = () => {
    if (editingUser) {
      dispatch(editUser(editingUser._id, form));
    } else {
      dispatch(addUser(form));
    }
    setEditingUser(null);
  };

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
            <h1>Users ({users.length})</h1>
            <Button type="primary" onClick={() => dispatch(controlModal())}>
              Add
            </Button>
          </div>
        )}
        pagination={false}
        columns={columns}
        dataSource={users}
      />
      <Pagination
        current={activePage}
        total={total}
        onChange={(page) => dispatch(changeActivePage(page))}
      />
      <Modal
        title="User data"
        visible={isModalOpen}
        onOk={saveUser}
        confirmLoading={btnLoading}
        onCancel={() => {
          dispatch(controlModal());
          setEditingUser(null);
        }}
        okText={editingUser ? "Save user" : "Add user"}
      >
        <Form
          form={form}
          name="Users"
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
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
