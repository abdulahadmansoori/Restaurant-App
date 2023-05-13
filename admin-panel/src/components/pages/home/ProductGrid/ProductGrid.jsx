import "./ProductGrid.css";
import { Col, Empty, Result, Row, Spin, Typography, Button } from "antd";
import { Space, Table } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
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
    localStorage.setItem("updateId", id);
    navigate('/products/update-product/', { replace: true });
  }
  const addProductBtnHandler = () => {
    navigate('/products/add-product', { replace: true });
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
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
          {/* <Link to={`/update-product/${record._id}`}>Update</Link> */}
          <Button type="primary" id={record._id} onClick={() => updateBtnHandler(record._id)}><EditFilled />Update</Button>
          <Button type="primary" id={record._id} onClick={() => deleteBtnHandler(record._id)}><DeleteFilled />Delete</Button>

        </Space>
      ),
    },
  ]
  const getJsx = () => {
    // console.log(products);
    if (products.length > 0) {
      return (
        <Row gutter={[20, 30]}>
          <Table columns={columns} dataSource={products} style={{ width: '100%' }} />
        </Row>
      );
    } else if (!products.length) {
      <Empty />;
    } else {
      return <Result status="warning" title={error} />;
    }
  };
  return (
    <div style={{ marginTop: 50 }}>
      <Row justify="center" style={{ width: "80%", margin: 'auto' }}>
        <Col span={24}>
          <Title level={3} style={{ textAlign: 'center' }}>Products</Title>
          <Button onClick={addProductBtnHandler}><PlusOutlined />Add Product</Button>
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

export default ProductGrid;
