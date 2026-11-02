import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductos, getProductosByCategory } from "../data/productosFirebase";
import ItemList from "./ItemList";

const nombresCategoria = {
  maquillajes: "Maquillajes",
  accesorios: "Accesorios",
  belleza: "Belleza",
};

export default function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const { Categoria } = useParams();
  const categoria = Categoria?.toLocaleLowerCase("es");

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError(false);
    const cargar = categoria ? getProductosByCategory(categoria) : getProductos();
    cargar.then((resultado) => {
      if (activo) setProductos(resultado);
    }).catch(() => {
      if (activo) setError(true);
    }).finally(() => {
      if (activo) setCargando(false);
    });
    return () => { activo = false; };
  }, [categoria]);

  const titulo = nombresCategoria[categoria] || "Todos los productos";

  return (
    <main className="catalog-main">
      <p className="eyebrow" style={{ textAlign: "center" }}>Aldu Accesorios</p>
      <h1 className="catalog-title">{greeting || titulo}</h1>
      <p className="catalog-greeting">Accesorios, maquillaje y detalles para tu rutina.</p>
      {cargando && <p className="status-message" role="status">Cargando productos…</p>}
      {!cargando && error && <div className="empty-state"><h2>No pudimos cargar los productos</h2><p>Probá de nuevo en unos minutos.</p><button className="btn" onClick={() => window.location.reload()}>Reintentar</button></div>}
      {!cargando && !error && productos.length === 0 && <div className="empty-state"><h2>Todavía no hay productos en esta categoría</h2><p>Mientras tanto, podés ver todo el catálogo.</p><Link to="/" className="btn">Ver productos</Link></div>}
      {!cargando && !error && productos.length > 0 && <ItemList productos={productos} />}
    </main>
  );
}
