import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const leerCarrito = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(leerCarrito);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity = 1) => {
    const cantidad = Math.max(1, Math.floor(Number(quantity) || 1));
    setCart((actual) => {
      const existente = actual.find((producto) => producto.id === item.id);
      if (existente) {
        return actual.map((producto) => producto.id === item.id
          ? { ...producto, quantity: producto.quantity + cantidad }
          : producto);
      }
      return [...actual, { ...item, quantity: cantidad }];
    });
  };

  const removeItem = (id) => setCart((actual) => actual.filter((producto) => producto.id !== id));
  const clearCart = () => setCart([]);
  const totalPrice = () => cart.reduce((total, producto) => total + Number(producto.precio || 0) * producto.quantity, 0);
  const totalItems = () => cart.reduce((total, producto) => total + producto.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
