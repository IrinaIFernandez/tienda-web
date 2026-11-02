import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatoPrecio } from "../utils/formato";

function Cart() {
  const { cart, totalPrice, removeItem, clearCart } = useContext(CartContext);

  if (cart.length === 0) return (
    <main className="page-shell">
      <div className="empty-state"><p className="eyebrow">Tu bolsa</p><h1>Tu carrito está vacío</h1><p>Explorá el catálogo y encontrá algo que te guste.</p><Link to="/" className="btn">Ver productos</Link></div>
    </main>
  );

  return (
    <main className="page-shell">
      <div className="page-heading"><p className="eyebrow">Tu bolsa</p><h1>Carrito de compras</h1><p>Revisá tus productos antes de continuar.</p></div>
      <div className="cart-layout">
        <section className="cart-list" aria-label="Productos en el carrito">
          {cart.map((item) => (
            <article className="cart-row" key={item.id}>
              <img className="cart-row-image" src={item.imagen} alt={item.nombre} />
              <div><h2>{item.nombre}</h2><p>{item.quantity} × {formatoPrecio(item.precio)}</p></div>
              <div className="cart-row-actions"><strong>{formatoPrecio(item.precio * item.quantity)}</strong><button className="btn btn-danger" type="button" onClick={() => removeItem(item.id)} aria-label={`Quitar ${item.nombre}`}>Quitar</button></div>
            </article>
          ))}
          <div className="cart-actions"><Link to="/" className="btn btn-quiet">Seguir comprando</Link><button className="btn btn-danger" type="button" onClick={clearCart}>Vaciar carrito</button></div>
        </section>
        <aside className="cart-summary">
          <h2>Resumen</h2>
          <p className="summary-line"><span>Productos</span><span>{cart.reduce((total, item) => total + item.quantity, 0)}</span></p>
          <p className="summary-line summary-total"><span>Total estimado</span><span>{formatoPrecio(totalPrice())}</span></p>
          <p className="muted" style={{ fontSize: ".85rem" }}>Envío y disponibilidad se confirman al coordinar la compra.</p>
          <Link className="btn" to="/checkout">Continuar</Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
