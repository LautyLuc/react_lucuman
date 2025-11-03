import React from "react";
import './carrito.css'

const Cart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 21 21"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 6.5h12.5l-1.586 5.55a2 2 0 0 1-1.923 1.45h-6.7a2 2 0 0 1-1.989-1.78L4.5 4.5h-2"
      ></path>
      <g fill="currentColor" transform="translate(2 4)">
        <circle cx="5" cy="12" r="1"></circle>
        <circle cx="13" cy="12" r="1"></circle>
      </g>
    </g>
  </svg>
);

const cartWidget = () => {
  return (
    <button className="cart-btn">
      <Cart width={24} height={24} />
    </button>
  );
};

export default cartWidget;
