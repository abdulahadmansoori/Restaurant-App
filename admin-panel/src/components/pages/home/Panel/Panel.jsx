import { ShoppingOutlined, UserOutlined, WifiOutlined, FormOutlined, CheckOutlined, SlidersOutlined, SyncOutlined, ClockCircleOutlined, TableOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import Title from 'antd/es/typography/Title';
import "./Panel.css";
import PendingOrders from '../OrderGrid/States/PendingOrders';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const onChange = (key) => {
  // console.log(key);
};
const Panel = () => { 
  const [panel, setPanel] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // getting products using api
  const getCounts = async () => {
    try {
      setIsLoading(true);
      const counts = await axios.get('http://localhost:8000/panel/counts');
      const products = await axios.get('http://localhost:8000/panel/counts');
      setPanel(counts.data);
      setOrders(products.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getCounts();
    })();
  }, []);
  return(
  <>
    <div style={{ margin: '15px 0' }}>
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={8}>
          <div className='panelCard'>
            <Row>
              <Col span={8}>
                <Title level={1} style={{ margin: '20px 35px', color: '#c00a27' }}><ShoppingOutlined /> </Title>
              </Col>
              <Col span={16}>
                <div style={{ margin: '12px 0', fontWeight: 600 }}>
                  <span>Orders In </span>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <span ><ClockCircleOutlined /> Pending <span style={{ float: 'right', margin: '0 10px', fontWeight: 600 }}>{panel.pendingOrderCount}</span></span>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <span ><SyncOutlined /> Process <span style={{ float: 'right', margin: '0 10px', fontWeight: 600 }}>{panel.processingOrderCount}</span></span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div className='panelCard'>
            <Row>
              <Col span={8}>
                <Title level={1} style={{ margin: '20px 35px', color: '#c00a27' }}><TableOutlined /> </Title>
              </Col>
              <Col span={16}>
                <div style={{ margin: '12px 0', fontWeight: 600 }}>
                  <span>Products In </span>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <span ><SlidersOutlined /> Showcase <span style={{ float: 'right', margin: '0 10px', fontWeight: 600 }}>{panel.productCount}</span></span>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <span ><CheckOutlined /> Avaliable <span style={{ float: 'right', margin: '0 10px', fontWeight: 600 }}>{panel.avaliableProductCount}</span></span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div className='panelCard'>
            <Row>
              <Col span={8}>
                <Title level={1} style={{ margin: '20px 35px', color: '#c00a27' }}><UserOutlined /> </Title>
              </Col>
              <Col span={16}>
                <div style={{ margin: '12px 0', fontWeight: 600 }}>
                  <span>Users In </span>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <span ><FormOutlined /> Register <span style={{ float: 'right', margin: '0 10px', fontWeight: 600 }}>{panel.userCount}</span></span>
                </div>
                <div style={{ margin: '12px 0' }}>
                  <span ><WifiOutlined /> Active <span style={{ float: 'right', margin: '0 10px', fontWeight: 600 }}>{panel.activeUserCount}</span></span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
    <PendingOrders />
  </>
)};
export default Panel;