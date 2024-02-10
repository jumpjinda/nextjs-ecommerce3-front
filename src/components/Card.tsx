import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Card = ({ children }: any) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function getProductByCategory() {
      const res = await axios.get(`/api/products/category/${children}`);
      setProducts(res.data);
    }
    getProductByCategory();
  }, []);

  if (products) {
    return (
      <div>
        <h1>{children}</h1>
        <div className="grid grid-cols-2 gap-2">
          {products
            .slice(0, 4)
            .map(
              (
                p: { _id: any; images: (string | undefined)[] },
                i: React.Key | null | undefined
              ) => (
                <div key={i}>
                  <Link href={`/products/${p._id}`}>
                    <img
                      src={p.images[0]}
                      className="w-[150px] h-[150px] object-contain"
                    />
                  </Link>
                </div>
              )
            )}
        </div>
        <Link href={`/api/products/categories/${children}`}>
          <p className="mt-2 hover:underline">See more</p>
        </Link>
      </div>
    );
  }
};

export default Card;
