import { Menu, Typography, Collapse, Button, Badge, Col, Row } from 'antd';
import { ClockCircleOutlined, CloseOutlined, CheckOutlined, SettingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./Orders.css";
const { Title } = Typography;
const { Panel } = Collapse;


const items = [

    {
        label: 'Orders',
        key: 'currentOrders',
    }
];

const CurrentOrders = (o) => {
    const navigate = useNavigate();
    const { orders } = o;
    const cancelBtnHandler = (id) => {
        if (window.confirm("Are you sure, you want to Cancel this order?")) {
            let status = "";
            try {
                axios.put('http://localhost:8000/orders/' + id, { status: "Canceled" });
                status = "order Canceled Succesfully";
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
        <div style={{ width: "80%", margin: "auto" }}>
            <Title level={5}>Current Orders</Title>
            <Collapse accordion>
                {orders.map((order, id) =>
                (<Panel header={order.orderName + " (" + (order.products).length + ")"} key={order._id} extra={genExtra(order.createdAt.split('T') ,order.status, order.total)}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={14}>
                            {order.productDetails.map((order, id) => (
                                <Item name={order.name} image={order.image} price={order.price} quantity={order.quantity} description={order.description} />
                            ))}
                        </Col>
                        <Col className="gutter-row" span={10}>
                            <div className="cart-details">

                                <div>
                                    <span>Shipping</span>
                                    <span className="price">$2.99</span>
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
                            <Button type='primary' onClick={() => cancelBtnHandler(order._id)} hidden={(order.status != 'Pending') ? true : false} style={{ alignItems: "right" }}><CloseOutlined /> Cancle Order</Button>
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
            <Button danger={(status == 'Canceled') ? true : false}>{icon} {status}</Button>
        </>)
};
const Item = ({ name, image, price, quantity, description }) => {
    return (
        <div className="cart-item">
            <div className="cart-item__info">
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

            <div className="cart-item__price">${price}</div>
        </div>
    );
};
const Orders = () => {
    const [current, setCurrent] = useState('currentOrders');
    const [cookies] = useCookies();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const getOrders = async (status) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("http://localhost:8000/orders/user/" + cookies.token);
            setOrders(data);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        (async () => {
            await getOrders(current);
        })();
    }, []);
    const onClick = (e) => {
        setCurrent(e.key);
    }
    return (<>
        <Menu style={{ justifyContent: "center" }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <CurrentOrders orders={orders} />
    </>)
}
export default Orders;