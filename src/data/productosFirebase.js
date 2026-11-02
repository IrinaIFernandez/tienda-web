import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { catalogoDemo } from "./catalogoDemo";

const combinarCatalogos = (productosFirestore = []) => {
  const porId = new Map(productosFirestore.map((producto) => [producto.id, producto]));
  for (const producto of catalogoDemo) {
    if (!porId.has(producto.id)) porId.set(producto.id, { ...producto, esDemostracion: true });
  }
  return [...porId.values()];
};

export const getProductos = async () => {
  try {
    const snapshot = await getDocs(collection(db, "productos"));
    const productos = snapshot.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
    return combinarCatalogos(productos);
  } catch (error) {
    console.warn("No se pudo cargar el catálogo de Firestore; se muestran los productos de ejemplo.", error);
    return catalogoDemo.map((producto) => ({ ...producto, esDemostracion: true }));
  }
};

export const getProductById = async (id) => {
  const demo = catalogoDemo.find((producto) => producto.id === id);
  if (demo) return { ...demo, esDemostracion: true };

  const snapshot = await getDoc(doc(db, "productos", id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const getProductosByCategory = async (categoria) => {
  const categoriaNormalizada = categoria.toLocaleLowerCase("es");
  let productosFirestore = [];
  try {
    const productosRef = collection(db, "productos");
    const resultado = await getDocs(query(productosRef, where("categoria", "==", categoriaNormalizada)));
    productosFirestore = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
  } catch (error) {
    console.warn("No se pudo cargar esta categoría desde Firestore; se muestran los productos de ejemplo.", error);
  }
  return combinarCatalogos(productosFirestore).filter(
    (producto) => producto.categoria?.toLocaleLowerCase("es") === categoriaNormalizada,
  );
};
