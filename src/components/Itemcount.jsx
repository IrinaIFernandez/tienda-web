import { useState } from "react";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const cantidadDisponible = Math.max(0, Number(stock) || 0);
  const [count, setCount] = useState(Math.min(Math.max(1, initial), Math.max(1, cantidadDisponible)));

  if (cantidadDisponible === 0) return <p className="status-error">Producto sin disponibilidad.</p>;

  return (
    <div>
      <div className="counter" aria-label="Elegir cantidad">
        <button type="button" onClick={() => setCount((actual) => Math.max(1, actual - 1))} disabled={count <= 1} aria-label="Quitar una unidad">−</button>
        <span aria-live="polite">{count}</span>
        <button type="button" onClick={() => setCount((actual) => Math.min(cantidadDisponible, actual + 1))} disabled={count >= cantidadDisponible} aria-label="Agregar una unidad">+</button>
      </div>
      <div><button type="button" className="btn" onClick={() => onAdd(count)}>Agregar al carrito</button></div>
    </div>
  );
}
