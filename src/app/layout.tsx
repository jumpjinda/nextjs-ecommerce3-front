import CategoriesProvider from "@/components/CategoriesContext";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CartContextProvider from "@/components/CartContext";

export const metadata: Metadata = {
  title: "Ecommerce Front",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <CategoriesProvider>
            <Navbar />
            {children}
          </CategoriesProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
