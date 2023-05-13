import { Col, Empty, Result, Row, Spin, Typography,Button} from "antd";
import { Space, Table} from 'antd';
import { PlusOutlined, WifiOutlined, DeleteOutlined, FormOutlined, DisconnectOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
    localStorage.setItem("updateId", id);
    navigate('/users/update-user/', { replace: true });
  }
  const addUserBtnHandler = () => {
    navigate('/users/add-user/', { replace: true });
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
      title: 'Status',
      // dataIndex: 'status',
      key: 'status',
      render: (_, record) => (record.status) ? <WifiOutlined style={{ color: 'green' }} /> : <DisconnectOutlined style={{ color: 'red' }} />,
    },
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
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'IsAdmin',
      key: 'isAdmin',
      render: (_, record) => (record.isAdmin) ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" id={record._id} onClick={() => updateBtnHandler(record._id)}><FormOutlined /> Update</Button>
          <Button type="primary" id={record._id} onClick={() => deleteBtnHandler(record._id)}><DeleteOutlined /> Delete</Button>

        </Space>
      ),
    },
  ]

  const getJsx = () => {
    if (users.length > 0) {
      return (
        <Row gutter={[20, 30]}>
          <Table columns={columns} dataSource={users} style={{ width: '100%' }} />
        </Row>
      );
    } else if (!users.length) {
      <Empty />;
    } else {
      return <Result status="warning" title={error} />;
    }
  };
  return (
    <div style={{marginTop:50}}>
    <Row justify="center" style={{ width: '80%', margin: 'auto' }}>
      <Col span={24}>
        <Title level={3} style={{ textAlign: 'center' }}>Users</Title>
        <Button onClick={addUserBtnHandler}><PlusOutlined />Add User</Button>
      </Col>
      <Col span={24}>
        <Spin style={{ position: "absolute" }} spinning={isLoading}>
          {getJsx()}
        </Spin>
      </Col>
    </Row>
    </div>
  );
}

export default UsersGrid;
