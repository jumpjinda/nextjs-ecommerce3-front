"use client";

import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { Key, SetStateAction, useContext, useEffect, useState } from "react";

const Product = ({ params }: any) => {
  const id = params.id;
  const { addProducts }: any = useContext(CartContext);
  const [product, setProduct] = useState<any>();
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    async function getProduct() {
      const res = await axios.get(`/api/products/id/${id}`);
      const data = res.data;
      setProduct(data);
    }
    getProduct();
  }, []);

  if (product) {
    return (
      <div className="max-w-[1000px] mx-auto flex mt-10">
        <div className="flex">
          <div className="w-[50px] h-[500px]">
            {product.images.map(
              (
                image: Key | null | undefined,
                index: SetStateAction<number>
              ) => (
                <img
                  key={image}
                  src={image}
                  onMouseOver={() => setMainImage(index)}
                  className="cursor-pointer mb-3 border-solid border-2 rounded-md hover:border-sky-500"
                />
              )
            )}
          </div>
          <div className="w-[300px] h-[500px] mx-5">
            <img
              src={product.images[mainImage]}
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1>{product.title}</h1>
          <p>rating {product.rating}</p>
          <hr />
          <div className="flex">
            <span className="relative top-[6px] mr-1">$</span>
            <h1>{product.price}</h1>
          </div>
          <p>Brand: {product.brand}</p>
          <hr />
          <h2>About this item</h2>
          <p>{product.description}</p>
          <button
            className="bg-[#F7CA01] px-5 py-2 w-fit rounded-xl"
            onClick={() => addProducts(product._id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }
};

export default Product;
