import { Menu, Typography} from 'antd';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const { Title } = Typography;

const items = [
    { label: 'New Orders', key: '' },
    { label: 'In Processing', key: 'processing' },
    { label: 'Delivered', key: 'delivered' },
    { label: 'Canceled', key: 'canceled' }
];


const Orders = () => {
    const [current, setCurrent] = useState('pending');

    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(`/orders/${e.key}`)
    }
    return (<div style={{marginTop:50}}>
    <Title level={3} style={{ textAlign: 'center' }}>Orders</Title>
        <Menu style={{ justifyContent: "center" }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        
    </div>)
}
export default Orders;