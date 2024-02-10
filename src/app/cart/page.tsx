"use client";

import { CartContext } from "@/components/CartContext";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const CartPage = () => {
  const { cartProducts, addProducts, removeProducts, clearCart }: any =
    useContext(CartContext);

  const [products, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const res = await axios.post("/api/cart", cartProducts);
      setProduct(res.data);
    }
    if (cartProducts.length > 0) {
      getProducts();
    }
  }, [cartProducts]);

  useEffect(() => {
    // if (typeof window === "undefined") {
    //   return;
    // }
    if (window?.location.href.includes("success")) {
      // console.log("useEffect execute");
      setIsSuccess(true);
      clearCart();
      // !!! You must be clear a local storage if you did not, when you refresh your web in Homepage, items still show in your cart
      localStorage.clear();
    }
  }, []);

  const addQuantity = (id) => {
    addProducts(id);
  };

  const lessQuantity = (id) => {
    removeProducts(id);
  };

  async function goToPayment() {
    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    // console.log(res.data);
    if (res.data) {
      // console.log(response.data.url);
      window.location = res.data;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg p-7 mt-20 text-center">
        <h1>Thanks for your order!</h1>
        <p>We will email you when your order will be sent.</p>
      </div>
    );
  }

  return (
    <>
      {!cartProducts.length && (
        <div className="bg-gray-300 w-1/2 mx-auto rounded-lg p-7 mt-20 text-center">
          <h1>Your cart is empty</h1>
        </div>
      )}

      {cartProducts.length > 0 && (
        <div className="flex flex-col md:grid grid-cols-3 gap-5 mt-20">
          <div className="col-span-2 bg-white rounded-lg p-7">
            <h1>Cart</h1>
            {products.length > 0 && (
              <table className="w-full mt-4">
                <thead className="text-center uppercase text-gray-400 text-sm">
                  <tr>
                    <th className="text-left">Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td className="flex items-center mt-2">
                        <div className="w-28 border rounded-lg flex justify-center mr-3 mb-2">
                          <img
                            src={p.images[0]}
                            className="max-h-20 p-1"
                          />
                        </div>
                        <Link
                          href={`/products/${p._id}`}
                          className="hover:underline"
                        >
                          {p.title}
                        </Link>
                      </td>

                      <td>
                        <div className="flex items-center justify-center">
                          <button
                            className="p-2"
                            onClick={() => lessQuantity(p._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 bg-gray-300 rounded-sm"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 12H6"
                              />
                            </svg>
                          </button>

                          {cartProducts.filter((id) => id === p._id).length}

                          <button
                            className="p-2"
                            onClick={() => addQuantity(p._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 bg-gray-300 rounded-sm"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m6-6H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        {cartProducts.filter((id) => id === p._id).length *
                          p.price}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-top">
                    <td></td>
                    <td></td>
                    <td className="flex justify-center text-xl italic font-bold">
                      ${total}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="p-7 text-center">
            {/* <form
                method="POST"
                action="/api/checkout"
              > */}
            <h2 className="mb-5">Order information</h2>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                type="text"
                placeholder="PostalCode"
                name="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <Input
              type="text"
              placeholder="StreetAddress"
              name="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            {/* <Input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              /> */}
            <button
              onClick={goToPayment}
              // type="submit"
              className="bg-blue-500 w-full flex justify-center mt-3 text-white py-3 rounded-lg"
            >
              Continue to payment
            </button>
            {/* </form> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
