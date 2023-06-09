import { Breadcrumb } from "antd";
import { RightOutlined, QuestionCircleFilled } from "@ant-design/icons";

import CheckoutForm from "./CheckoutForm";
import CartItem from "./CartItem";

import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSubTotal } from "../../../store/reducers/cartReducer";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  return (
    <div className="checkout">
      <div className="checkout__left-section">

        <Breadcrumb separator={<RightOutlined className="icon" />}>
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
          <Breadcrumb.Item>Information</Breadcrumb.Item>
          <Breadcrumb.Item>Shipping</Breadcrumb.Item>
          <Breadcrumb.Item>Payment</Breadcrumb.Item>
        </Breadcrumb>


        <h3>Shipping address</h3>
        <CheckoutForm />
      </div>

      <div className="checkout__right-section">
        {cart.map((cartItem) => (
          <CartItem {...cartItem} />
          
        ))}

        <div className="cart-details">
          <div>
            <span>Subtotal</span>
            <span className="price">${dispatch(cartSubTotal())}</span>
          </div>

          <div>
            <span>Shipping</span>
            <span className="price">$2.99</span>
          </div>

          <div>
            <span>
              Estimated taxes 2% <QuestionCircleFilled className="question-mark" />
            </span>
            <span className="price">${(dispatch(cartSubTotal())/100)*2}</span>
          </div>
        </div>

        <div className="cart-total">
          <span>Total</span>
          <span>
            <span>USD</span> <span>${((dispatch(cartSubTotal())/100)*2)+ dispatch(cartSubTotal()) + 2.99}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
