import Item from "./Item";

function ItemList({ productos }) {
  return (
    <section className="product-grid" aria-label="Productos">
      {productos.map((producto) => <Item key={producto.id} {...producto} />)}
    </section>
  );
}

export default ItemList;
