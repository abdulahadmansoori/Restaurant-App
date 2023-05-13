
import { Typography, Collapse, Button, Badge, Col, Row } from 'antd';
import { ClockCircleOutlined, CloseOutlined, CheckOutlined, SettingOutlined, UserOutlined, DoubleRightOutlined, EnvironmentOutlined, PhoneOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../Orders.css";
import { useEffect, useState } from 'react';
import Orders from '../Orders';

const { Panel } = Collapse;
const { Title } = Typography;

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const status = 'Pending';

    const getOrders = async (status) => {
        console.log("status: " +status);
        try {
            setIsLoading(true);
            const { data } = await axios.get("http://localhost:8000/orders/" + status);
            setOrders(data);
            console.log(data , status);
        } catch (error) {
            setError(error.message);
            console.log(error.message , status);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        (async () => {
            await getOrders(status);
        })();
    }, []);

    const btnHandler = (id, s) => {

        if (window.confirm(`Are you sure, you want to ${s} this order?`)) {
            let status = "";
            try {
                axios.put('http://localhost:8000/orders/' + id, { status: s });
                status = `order ${s} Succesfully`;
                navigate("/");
            }
            catch (error) {
                console.log(error.message);
                status = error.message;
            }
            finally {
                alert(status);
            }
        }
    }
    return (<>
    <Orders c={orders.length}/>
        <div style={{ width: "80%", margin: "auto" }}>
            <Title level={5} style={{margin:"2px 3px"}}>New Orders</Title>
            <Collapse accordion>
                {orders.map((order, id) =>
                (<Panel header={order.orderName} key={order._id} extra={genExtra((order.updatedAt).split('T'), order.status, order.total)}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={14}>
                            <p>Order Info</p>
                            {order.productDetails.map((order, id) => (
                                <Item name={order.name} image={order.image} price={order.price} quantity={order.quantity} description={order.description} />
                            ))}
                        </Col>
                        <Col className="gutter-row" span={10}>
                            <div className="order-details">

                                <div >
                                    <span>Shipping </span>
                                    <span className="price"> $2.99</span>
                                </div>

                                <div>
                                    <span>
                                        Estimated taxes 2%
                                    </span>
                                    <span className="price">${(order.total / 100) * 2}</span>
                                </div>
                            </div>

                            <div className="order-total">
                                <span>Total</span>
                                <span>
                                    <span>USD</span> <span>${order.total}</span>
                                </span>
                            </div>

                        </Col>
                    </Row>
                    <p>Shipping Info</p>
                    <Row>
                        {/* <Divider /> */}
                        <Col className="gutter-row" span={10}>
                            <div>
                                <div><span><UserOutlined /> {order.orderName}</span></div>
                                <div><span><EnvironmentOutlined /> <b>{order.address}</b></span></div>

                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>
                                <div><span><PhoneOutlined /> {order.userDetails.phone}</span></div>
                                <div><span><MessageOutlined /> {order.userDetails.email}</span></div>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Button onClick={() => btnHandler(order._id, 'Canceled')} hidden={(order.status !== 'Pending') ? true : false} style={{ margin: "0 2px", width: "48%" }}><CloseOutlined /> Cancle</Button>
                            <Button type='primary' onClick={() => btnHandler(order._id, 'Processing')} style={{ margin: "0 2px", width: "48%" }}>Process <DoubleRightOutlined /></Button>
                        </Col>
                    </Row>
                </Panel>)
                )}
            </Collapse>
        </div>
    </>)
}
const genExtra = (date, status, total) => {
    let icon;
    if (status === 'Delivered') {
        icon = <CheckOutlined />
    }
    if (status === 'Canceled') {
        icon = <CloseOutlined />
    }
    if (status === 'Processing') {
        icon = <SettingOutlined />
    }
    if (status === 'Pending') {
        icon = <ClockCircleOutlined />
    }
    return (
        <>
            <span style={{ margin: "0px 10px" }}>
                <span style={{margin:'0 15px'}}>{date[0]}</span> <span >{(date[1].split(':'))[0]}:{(date[1].split(':'))[1]}:{(date[1].split(':'))[1]}</span>
            </span>
            <span style={{ margin: "0px 10px" }}>
                <span>USD</span> <span style={{ fontWeight: 600 }}>${total}</span>
            </span>
            <Button danger={(status === 'Canceled') ? true : false}>{icon} {status}</Button>
        </>)
};
const Item = ({ name, image, price, quantity, description }) => {
    return (
        <div className="order-item">
            <div className="order-item__info">
                <Badge count={quantity} color="#787778">
                    <div className="image">
                        <img src={image} alt={name} />
                    </div>
                </Badge>

                <div>
                    <h4>{name}</h4>
                    <p>{description}</p>
                </div>
            </div>

            <div className="order-item__price">${price}</div>
        </div>
    );
};
export default PendingOrders;