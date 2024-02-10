"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

export const CartContext = createContext<string[] | null>([]);

interface Props {
  children?: ReactNode;
}

const CartContextProvider = ({ children }: Props) => {
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart") as string));
    }
  }, []);

  const addProducts = (productId: string) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProducts = (productId: string) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  const clearCart = () => {
    // !!! You must be clear a local storage if you did not, when you refresh your web in Homepage, items still show in your cart
    localStorage?.clear();
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={
        {
          cartProducts,
          setCartProducts,
          addProducts,
          removeProducts,
          clearCart,
        } as any
      }
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
