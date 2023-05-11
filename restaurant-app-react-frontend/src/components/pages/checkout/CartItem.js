import React from "react";
import { Badge } from "antd";

import "./CartItem.css";

const CartItem = ({ name, image, price, quantity, description }) => {
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

export default CartItem;
