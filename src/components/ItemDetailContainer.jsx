import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../data/productosFirebase";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    getProductById(idProducto).then((resultado) => {
      if (activo) setProducto(resultado);
    }).catch(() => {
      if (activo) setProducto(null);
    }).finally(() => {
      if (activo) setCargando(false);
    });
    return () => { activo = false; };
  }, [idProducto]);

  if (cargando) return <main className="page-shell"><p className="status-message" role="status">Cargando producto…</p></main>;
  if (!producto) return <main className="page-shell"><div className="empty-state"><h1>No encontramos ese producto</h1><Link className="btn" to="/">Volver al catálogo</Link></div></main>;
  return <ItemDetail {...producto} />;
}

export default ItemDetailContainer;
