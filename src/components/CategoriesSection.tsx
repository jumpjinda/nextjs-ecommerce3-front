"use client";

import React, { useContext, useEffect } from "react";
import { CategoriesContext } from "./CategoriesContext";
import Card from "./Card";
import axios from "axios";

const CategoriesSection = () => {
  const { categories }: any = useContext(CategoriesContext);

  // const smartphones = "smartphones";

  // useEffect(() => {
  //   async function getProductByCategory() {
  //     const res = await axios.get(`/api/products/category/${smartphones}`);
  //     console.log(res.data);
  //   }
  //   getProductByCategory();
  // }, []);

  return (
    <div className="grid grid-cols-4 gap-5">
      {categories &&
        categories.map((c: string) => (
          <div
            key={c}
            className="bg-white p-5"
          >
            <Card>{c}</Card>
          </div>
        ))}
    </div>
  );
};

export default CategoriesSection;
