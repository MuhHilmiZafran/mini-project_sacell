import { createContext, useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsRef = collection(db, 'products');
      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      });
      return () => unsubscribe();
    };

    getProducts();
  }, []);

  const addProduct = async (product) => {
    const res = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newProduct = {
      id: res.id,
      ...product,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (productId, updateDataProduct) => {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, updateDataProduct);
  };

  const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, 'products', productId));
  };

  return <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>{children}</ProductContext.Provider>;
};
