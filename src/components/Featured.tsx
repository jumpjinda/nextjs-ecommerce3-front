"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import Link from "next/link";

const Featured = () => {
  const [newestProduct, setNewestProduct] = useState<string[]>();
  const [images, setImages] = useState([]);
  const [id, setId] = useState<string | undefined>();

  useEffect(() => {
    async function getNewestProduct() {
      const res = await axios.get("/api/products/newest-product");
      if (res.status === 200) {
        setNewestProduct(await res.data);
        setImages(res.data.images);
        setId(res.data._id);
      } else {
        return;
      }
    }
    getNewestProduct();
  }, []);

  return (
    <div className="flex w-full h-[500px]">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1>50% Discount today!</h1>
        <Link href={`/products/${id}`}>
          <p className="underline">Check our product here!</p>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-[500px] h-[450px]">
          <Carousel
            slides={images}
            // autoSlide={true}
            // autoSlideInterval={3000}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
