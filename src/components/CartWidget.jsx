import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartWidget() {
  const { totalItems } = useContext(CartContext);
  const cantidad = totalItems();
 return (
    <span className="cart-widget">
      <svg className="cart-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8h16l-1.2 13H5.2L4 8Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </svg>
      {cantidad > 0 && <span className="cart-count" aria-label={`${cantidad} productos`}>{cantidad}</span>}
    </span>
  );
  }

export default CartWidget;
