import "./ProductGrid.css";
import { Col, Empty, Result, Row, Spin, Typography, Title, Container, Button, } from "antd";
import { Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductGrid = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // getting products using api
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('http://localhost:8000/products/');
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const updateBtnHandler = (id) => {
    navigate('http://localhost:3000/update-product/' + id, { replace: true });
  }
  const deleteBtnHandler = (id) => {
    if (window.confirm("Are you sure, You want to delete this product!")) {
      try {
        const resp = axios.delete('http://localhost:8000/products/' + id);
        console.log(resp.success);
        window.alert("product successfully deleted!");
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
      await getProducts();
    })();
  }, []);
  const { Title } = Typography;
  const columns = [
    {
      title: 'Iamge',
      dataIndex: 'iamge',
      key: 'iamge',
      render: (_, text) => <img src={text.image} alt="" style={{
        width: 100,
      }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
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
    if (products.length > 0) {
      return (
        <Row gutter={[20, 30]}>
          <Table columns={columns} dataSource={products} />
        </Row>
      );
    } else if (!products.length) {
      <Empty />;
    } else {
      return <Result status="warning" title={error} />;
    }
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <Title level={2}>Products</Title>
        <Button href="http://localhost:3000/add-product"><PlusOutlined />Add Product</Button>
      </Col>
      <Col span={24}>
        <Spin style={{ position: "absolute" }} spinning={isLoading}>
          {getJsx()}
        </Spin>
      </Col>
    </Row>
  );
}

export default ProductGrid;
