"use client";

import { CategoriesContext } from "@/components/CategoriesContext";
import { useContext, useEffect, useState } from "react";
import LocationIcon from "./Icons/LocationIcon";
import Link from "next/link";
import MagnifyingGlassIcon from "./Icons/MagnifyingGlassIcon";
import CartIcon from "./Icons/CartIcon";
import MenuIcon from "./Icons/MenuIcon";
import { CartContext } from "./CartContext";
const { IpregistryClient } = require("@ipregistry/client");

const Navbar = () => {
  const { cartProducts }: any = useContext(CartContext);
  const { categories }: any = useContext(CategoriesContext);
  const [userCountry, setUserCountry] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    const client = new IpregistryClient("44m0ih82mwp9w3od");
    const getUserCountry = () => {
      client.lookup("73.2.2.2").then((res: any) => {
        setUserCountry(res.data.location.country.name);
        // console.log(userCountry);
      });
    };
    getUserCountry();
  }, []);

  return (
    <>
      <nav className="w-full h-[60px] bg-[#131921] text-white pr-[5px] flex">
        <div className="w-[120px] h-[60px] flex items-center">
          <Link
            href={"/"}
            className="min-w-[120px] cursor-pointer text-center"
          >
            <h1 className="text-[#FF9900]">TJ Dev</h1>
          </Link>
        </div>
        <div className="w-[140px] flex items-center">
          <LocationIcon className={"w-5 h-5 relative bottom-[-8px]"} />
          <div className="leading-none">
            <div className="text-[#CCCCCC] text-sm">Deliver to</div>
            <div className="flex font-bold cursor-pointer">
              {userCountry || "Thailand"}
            </div>
          </div>
        </div>
        <div className="w-fit h-full flex items-center ml-5">
          <div className="w-full h-[40px] flex">
            <select className="bg-[#DADADA] text-[#000000] text-sm px-2 rounded-l-[4px] cursor-pointer">
              <option value="all">All</option>
              {categories.length > 0 &&
                categories.map((c: string, index: number) => (
                  <option
                    key={index}
                    value={c}
                  >
                    {c}
                  </option>
                ))}
            </select>
            <input
              type="text"
              className="w-auto xl:w-[550px] md:w-[400px]"
            />
            <MagnifyingGlassIcon
              className={
                "h-full w-[50px] p-2 text-black bg-[#F3A846] rounded-r-[5px] cursor-pointer"
              }
            />
          </div>
        </div>

        <div className="flex items-center relative">
          <Link href={"/cart"}>
            <CartIcon className={"w-8 h-8 mx-3 cursor-pointer"} />
            <div className="text-center absolute right-2 top-2 w-[20px] h-[20px] bg-red-500 rounded-full text-xs">
              <span className="relative top-[2px]">{cartProducts.length}</span>
            </div>
          </Link>
        </div>

        <div className="hidden xl:flex w-[350px] h-full items-center ml-5 mr-3 justify-between">
          <Link href={"/products"}>
            <div>All Products</div>
          </Link>
          <Link href={"/order"}>
            <div>Order</div>
          </Link>
          <Link href={"/api/signin"}>
            <div>Sign in</div>
          </Link>
          <Link href={"/about"}>
            <div>About me</div>
          </Link>
        </div>
        <button onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon className={"xl:hidden w-7 h-7"} />
        </button>
        {openMenu && (
          <div className="xl:hidden absolute right-2 top-12 z-10 bg-[#475a7c] px-5 py-3 leading-7 rounded-md">
            <Link href={"/products"}>
              <div>All Products</div>
            </Link>
            <Link href={"/order"}>
              <div>Order</div>
            </Link>
            <Link href={"/api/signin"}>
              <div>Sign in</div>
            </Link>

            <Link href={"/about"}>
              <div>About me</div>
            </Link>
          </div>
        )}

        {/* <div className="w-full h-[40px] bg-[#222F3E]">second</div> */}
      </nav>
    </>
  );
};

export default Navbar;
