import { Col, Empty, Result, Row, Spin, Typography, Title, Container, Button, } from "antd";
import { Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UsersGrid = () => {

  const [users, setusers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  // const dispatch = useDispatch();

  // getting users using api
  const getusers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('http://localhost:8000/users/');
      // console.log(data)
      setusers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const updateBtnHandler = (id) => {
    navigate('http://localhost:3000/update-user/' + id, { replace: true });
  }
  const deleteBtnHandler = (id) => {
    if (window.confirm("Are you sure, You want to delete this user!")) {
      try {
        const resp = axios.delete('http://localhost:8000/users/' + id);
        console.log(resp.success);
        window.alert("user successfully deleted!");
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log(id);
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await getusers();
    })();
  }, []);
  const { Title } = Typography;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'addess',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'IsAdmin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" id={record._id} onClick={() => updateBtnHandler(record._id)}>Update</Button>
          <Button type="primary" id={record._id} onClick={() => deleteBtnHandler(record._id)}>Delete</Button>

        </Space>
      ),
    },
  ]
  const getJsx = () => {
    if (users.length > 0) {
      return (
        <Row gutter={[20, 30]}>
          <Table columns={columns} dataSource={users} />
        </Row>
      );
    } else if (!users.length) {
      <Empty />;
    } else {
      return <Result status="warning" title={error} />;
    }
  };
  return (
    // <Container>
    <Row justify="center">
      <Col span={24}>
        <Title level={2}>Users</Title>
        <Button href="http://localhost:3000/add-user"><PlusOutlined />Add User</Button>
      </Col>
      <Col span={24}>
        <Spin style={{ position: "absolute" }} spinning={isLoading}>
          {getJsx()}
        </Spin>
      </Col>
    </Row>
    // </Container>
  );
}

export default UsersGrid;
