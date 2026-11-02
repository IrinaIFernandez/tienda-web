import { Link } from "react-router-dom";
import { formatoPrecio } from "../utils/formato";

function Item({ id, nombre, precio, imagen, categoria, descripcion, esDemostracion }) {
  return (
    <article className="product-card">
      <Link to={`/item/${id}`} aria-label={`Ver ${nombre}`}>
        <div className="product-image-wrap">
          <img className="product-image" src={imagen} alt={nombre} loading="lazy" />
          // imagen brocha 
           <img
            className={`product-image ${id === "demo-esponja-maquillaje" ? "product-image--sponge" : ""}`}
            src={imagen}
            alt={nombre}
            loading="lazy"
          />
          <span className="product-tag">{esDemostracion ? "Producto de muestra" : categoria}</span>
        </div>
      </Link>
      <div className="product-card-body">
        <h2 className="product-name">{nombre}</h2>
        <p className="product-description">{descripcion}</p>
        <div className="product-card-bottom">
          <span className="product-price">{formatoPrecio(precio)}</span>
          <Link className="btn btn-secondary" to={`/item/${id}`}>Ver producto</Link>
        </div>
      </div>
    </article>
  );
}

export default Item;
