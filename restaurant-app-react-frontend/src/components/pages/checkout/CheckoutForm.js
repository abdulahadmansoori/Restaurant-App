import { Button, Form, Input, Modal, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import "./CheckoutForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../../store/reducers/cartReducer";
import TextArea from "antd/es/input/TextArea";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const success = () => {
    Modal.success({
      title: "Order Placed!",
      content: "Your order has been successfully placed",
      onOk() {
        dispatch(emptyCart());
        navigate("/");
      },
    });
  };
  const { cart } = useSelector((state) => state);
  const formSubmitHandler = (values) => {
    const userInfo = { ...values };
    let products = [];
    let total=0;
    cart.map((p) => {
      products.push({
        '_id': p._id,
        'quantity': p.quantity
      });
      total+=p.price;
    })
    total=total+((total/100)*2)+2.99
    const order = {
      'user': cookies.token,
      'orderName': userInfo.firstName +' '+ userInfo.lastName,
      'address': userInfo.address +', '+ userInfo.zipCode +', '+ userInfo.city +', '+ userInfo.state +', '+ userInfo.country,
      'products': products,
      'total': total,
    }
    console.log(order);
    success();
  };
  const { Option } = Select;
  return (
    <Form className="checkout-form" onFinish={formSubmitHandler}>
      <div className="flex">
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input placeholder="First name" />
        </Form.Item>

        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input placeholder="Last name" />
        </Form.Item>
      </div>

      <Form.Item name="country" rules={[{ required: true, message: 'Please input your country!' }]}>
        <Select placeholder="Country/Region">
          <Select.Option value="pakistan">Pakistan</Select.Option>
          <Select.Option value="india">India</Select.Option>
          <Select.Option value="bangladesh">Bangladesh</Select.Option>
          <Select.Option value="afghanistan">Afghanistan</Select.Option>
        </Select>
      </Form.Item>

      {/* <Form.Item name="apartment">
        <Input placeholder="Apartment, suit, etc. (optional)" />
      </Form.Item> */}

      <div className="flex">
        <Form.Item name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item name="state" rules={[{ required: true, message: 'Please input your state!' }]}>
          <Select placeholder="state"><Option value={"sindh"}>sindh</Option></Select>
        </Form.Item>

        <Form.Item name="zipCode" rules={[{ required: true, message: 'Please input your zipcode' }]}>
          <Input placeholder="ZIP code" />
        </Form.Item>
      </div>
      <Form.Item name="address" rules={[{ required: true, message: 'Please input your other info like flat #, Apartment, near by place' }]}>
        <TextArea placeholder="Address" rows={5} />
      </Form.Item>
      <div className="actions">
        <Link className="link" to="/cart">
          <LeftOutlined /> Return to cart
        </Link>

        <Button type="primary" htmlType="submit">
          Continue to shipping
        </Button>
      </div>
    </Form>
  );
};

export default CheckoutForm;
