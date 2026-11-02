import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget.jsx";
import logoImg from "../assets/logo.png";

const claseActiva = ({ isActive }) => isActive ? "active" : undefined;

export default function NavBar() {
  return (
    <header className="site-header">
      <div className="announcement-bar">ACCESORIOS · MAQUILLAJE · BELLEZA</div>
      <nav className="nav-inner" aria-label="Navegación principal">
        <Link to="/" className="brand" aria-label="Aldu Accesorios, inicio">
          <img src={logoImg} alt="" />
          <span>Aldu Accesorios</span>
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/" end className={claseActiva}>Inicio</NavLink></li>
          <li><NavLink to="/categoria/maquillajes" className={claseActiva}>Maquillaje</NavLink></li>
          <li><NavLink to="/categoria/accesorios" className={claseActiva}>Accesorios</NavLink></li>
          <li><NavLink to="/categoria/belleza" className={claseActiva}>Belleza</NavLink></li>
          <li><NavLink to="/cart" className={({ isActive }) => `cart-link ${isActive ? "active" : ""}`} aria-label="Ir al carrito"><CartWidget /></NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
