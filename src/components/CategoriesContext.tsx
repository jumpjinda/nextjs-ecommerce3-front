"use client";

import { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext({});

export default function CategoriesProvider({ children }: any) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const data = await fetch(
        "https://dummyjson.com/products/categories"
      ).then((res) => res.json());
      setCategories(data);
    }
    getCategories();
  }, []);

  return (
    <>
      <CategoriesContext.Provider value={{ categories }}>
        {children}
      </CategoriesContext.Provider>
    </>
  );
}
