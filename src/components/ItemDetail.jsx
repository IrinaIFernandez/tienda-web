import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { formatoPrecio } from "../utils/formato";
import ItemCount from "./Itemcount";

function ItemDetail({
  id,
  nombre,
  precio,
  categoria,
  imagen,
  descripcion,
  stock,
  esDemostracion,
}) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (quantity) => {
    addToCart({ id, nombre, precio, imagen }, quantity);
    setAdded(true);
    toast.success(`${nombre} se agregó al carrito`);
  };

  const claseImagen =
    id === "demo-esponja-maquillaje"
      ? "detail-image detail-image--sponge"
      : "detail-image";

  return (
    <main className="page-shell">
      <div className="detail-layout">
        <img className={claseImagen} src={imagen} alt={nombre} />

        <section className="detail-copy">
          <p className="eyebrow">
            {esDemostracion ? "Producto de muestra" : categoria}
          </p>

          <h1>{nombre}</h1>
          <p className="detail-price">{formatoPrecio(precio)}</p>
          <p className="detail-description">{descripcion}</p>
          <p className="muted">
            Disponibilidad y precio a confirmar al momento de la compra.
          </p>

          {!added ? (
            <ItemCount stock={stock ?? 10} onAdd={handleAddToCart} />
          ) : (
            <div className="detail-actions">
              <Link className="btn" to="/cart">
                Ver carrito
              </Link>
              <Link className="btn btn-secondary" to="/">
                Seguir comprando
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ItemDetail;