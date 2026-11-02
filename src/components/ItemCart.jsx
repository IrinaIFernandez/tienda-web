import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ producto }) {
  const { removeItem } = useContext(CartContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={producto.imagen} alt={producto.nombre} width="60" height="60" />
        <div>
          <p><strong>{producto.nombre}</strong></p>
          <p>Cantidad: {producto.cantidad}</p>
          <p>Precio: ${producto.precio}</p>
        </div>
      </div>
      <button
        onClick={() => removeItem(producto.id)}
        style={{
          backgroundColor: "hotpink",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
}
