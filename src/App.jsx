import React from 'react'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from "./components/Cart"
import CheckoutForm from "./components/checkout"
import HomePage from "./components/HomePage"
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/categoria/:Categoria" element={<ItemListContainer />} />

        <Route path="/item/:idProducto" element={<ItemDetailContainer />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<CheckoutForm />} />

        <Route path="*" element={<main className="page-shell"><div className="empty-state"><h1>Página no encontrada</h1><p>El enlace puede haber cambiado o no existir.</p><a href="/" className="btn">Volver a la tienda</a></div></main>} />
      </Routes>
      <footer className="site-footer"><p>Aldu Accesorios</p><p>Maquillaje · belleza · accesorios</p><nav aria-label="Enlaces del pie"><Link to="/categoria/maquillajes">Maquillaje</Link><Link to="/categoria/accesorios">Accesorios</Link><Link to="/categoria/belleza">Belleza</Link></nav></footer>
    </>
  )
}

export default App
