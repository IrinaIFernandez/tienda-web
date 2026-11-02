import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/config";
import { CartContext } from "../context/CartContext";
import { formatoPrecio } from "../utils/formato";

export default function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ nombre: "", email: "", telefono: "" });
  const [orderId, setOrderId] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (event) => setBuyer((actual) => ({ ...actual, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cart.length === 0 || enviando) return;
    setEnviando(true);
    try {
      const order = {
        comprador: { nombre: buyer.nombre.trim(), email: buyer.email.trim(), telefono: buyer.telefono.trim() },
        items: cart.map(({ id, nombre, precio, quantity }) => ({ id, nombre, precio, quantity })),
        total: totalPrice(),
        fecha: serverTimestamp(),
        estado: "pendiente",
      };
      const docRef = await addDoc(collection(db, "ordenes"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("No se pudo guardar la orden:", error);
      toast.error("No se pudo registrar tu pedido. Revisá tu conexión o contactanos.");
    } finally {
      setEnviando(false);
    }
  };

  if (orderId) return (
    <main className="page-shell"><section className="checkout-success">
      <p className="eyebrow">Pedido enviado</p><h1>¡Gracias por tu compra!</h1>
      <p>Registramos tu pedido. Contactanos para coordinar el pago y la entrega.</p>
      <p>Número de pedido: <code>{orderId}</code></p>
      <Link className="btn" to="/">Volver a la tienda</Link>
    </section></main>
  );

  if (cart.length === 0) return (
    <main className="page-shell"><div className="empty-state"><h1>No hay productos para finalizar</h1><p>Agregá productos al carrito antes de continuar.</p><Link className="btn" to="/">Ver productos</Link></div></main>
  );

  return (
    <main className="page-shell">
      <section className="checkout-card">
        <p className="eyebrow" style={{ textAlign: "center" }}>Último paso</p><h1>Finalizar pedido</h1>
        <div className="checkout-items" aria-label="Resumen del pedido">
          {cart.map((item) => <p key={item.id}>{item.quantity} × {item.nombre} <strong>{formatoPrecio(item.precio * item.quantity)}</strong></p>)}
          <p className="checkout-total">Total estimado: {formatoPrecio(totalPrice())}</p>
          <p className="muted" style={{ marginBottom: 0 }}>Envío, disponibilidad y pago se coordinan luego de enviar el pedido.</p>
        </div>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo<input id="nombre" name="nombre" autoComplete="name" value={buyer.nombre} onChange={handleChange} required maxLength={100} /></label>
          <label htmlFor="email">Correo electrónico<input id="email" type="email" name="email" autoComplete="email" value={buyer.email} onChange={handleChange} required maxLength={150} /></label>
          <label htmlFor="telefono">Teléfono de contacto<input id="telefono" type="tel" name="telefono" autoComplete="tel" value={buyer.telefono} onChange={handleChange} required maxLength={40} /></label>
          <button className="btn" type="submit" disabled={enviando}>{enviando ? "Enviando pedido…" : "Enviar pedido"}</button>
        </form>
      </section>
    </main>
  );
}
