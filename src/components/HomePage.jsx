import { Link } from "react-router-dom";
import { catalogoDemo } from "../data/catalogoDemo";
import Item from "./Item";
import ganchos from "../assets/ganchos.png";
import compacto from "../assets/pcompacto.png";
import sombras from "../assets/sombras.png";

const destacados = catalogoDemo.slice(0, 4).map((producto) => ({ ...producto, esDemostracion: true }));

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow">Aldu Accesorios · maquillaje · belleza</span>
          <h1>Pequeños detalles, grandes favoritos</h1>
          <p>Explorá accesorios y esenciales de belleza para acompañar tu estilo todos los días.</p>
          <Link className="btn" to="/categoria/belleza">Explorar la tienda <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-hero-image" aria-label="Productos de belleza y maquillaje">
          <img className="hero-image-main" src={sombras} alt="Paleta de sombras" />
          <img className="hero-image-small" src={compacto} alt="Polvo compacto" />
        </div>
      </section>

      <section className="home-section" aria-labelledby="categorias-titulo">
        <div className="home-section-heading"><div><span className="eyebrow">Encontrá lo que buscás</span><h2 id="categorias-titulo">Comprá por categoría</h2></div><p>Ideas simples para sumar a tu rutina o regalar.</p></div>
        <div className="category-grid">
          <Link className="category-tile" to="/categoria/maquillajes"><img src={sombras} alt="" /><span>Maquillaje <b aria-hidden="true">↗</b></span></Link>
          <Link className="category-tile" to="/categoria/accesorios"><img src={ganchos} alt="" /><span>Accesorios <b aria-hidden="true">↗</b></span></Link>
          <Link className="category-tile" to="/categoria/belleza"><img src={compacto} alt="" /><span>Belleza <b aria-hidden="true">↗</b></span></Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="destacados-titulo">
        <div className="home-section-heading"><div><span className="eyebrow">Una selección para vos</span><h2 id="destacados-titulo">Favoritos de la tienda</h2></div><Link className="btn btn-secondary" to="/categoria/maquillajes">Ver catálogo</Link></div>
        <div className="home-products">{destacados.map((producto) => <Item key={producto.id} {...producto} />)}</div>
      </section>

      <section className="home-promo">
        <div><span className="eyebrow">Descubrí algo nuevo</span><h2>Tu próximo esencial de belleza puede estar acá.</h2></div>
        <Link className="btn" to="/categoria/accesorios">Ver accesorios <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}

export default HomePage;
