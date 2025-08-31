"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { products } from "@/lib/products";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

const quicksand = Montserrat({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});
const Navlink = () => {
  const [isOpen, setIsOpen] = useState(false); // state dropdown
  const ref = useRef();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`flex flex-col md:flex-row text-lg pl-4  lg:text-xl items-baseline space-x-2 lg:space-x-8 space-y-2 md:space-y-0 h-full ${quicksand.className}`}
    >
      <Link
        href={"/"}
        className="p-2 rounded bg-primary text-white text-lg font-semibold flex gap-1 items-center"
      >
        <FaWhatsapp size={24} />
        Chat With Us
      </Link>
      <Link
        href={"/"}
        className={`font-semibold group relative ${
          pathname === "/" && "border-orange-500 border-b-3"
        }`}
      >
        Home
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
      </Link>
      <Link
        href={"/profile"}
        className={`font-semibold group relative ${
          pathname === "/profile" && "border-orange-500 border-b-3"
        }`}
      >
        Profil
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
      </Link>

      {/* Dropdown Produk */}

      <div className="relative" ref={ref}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`font-semibold group relative flex items-center gap-1 ${
            pathname.startsWith("/product") && "border-orange-500 border-b-3"
          }`}
        >
          Produk
          {isOpen ? (
            <ChevronUp className="inline-block w-4 h-4" />
          ) : (
            <ChevronDown className="inline-block w-4 h-4" />
          )}
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
        </button>

        {isOpen && (
          <div
            className=" md:absolute md:top-full md:left-0 md:mt-2
      w-full md:w-48  md:bg-white border-b md:border  md:rounded md:shadow-lg z-50
      flex flex-col"
          >
            <ul>
              {products.map((product, index) => (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  key={index}
                >
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </li>
              ))}
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link href={`/product/souvenir`}>Souvenir</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Link
        href={"/testimoni"}
        className={`font-semibold group relative ${
          pathname === "/testimoni" && "border-orange-500 border-b-3"
        }`}
      >
        Testimoni
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
      </Link>
      <Link
        href={"/article"}
        className={`font-semibold group relative ${
          pathname === "/article" && "border-orange-500 border-b-3"
        }`}
      >
        Artikel
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
      </Link>
      <Link
        href={"/contact"}
        className={`font-semibold group relative ${
          pathname === "/contact" && "border-orange-500 border-b-3"
        }`}
      >
        Kontak
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
      </Link>
    </div>
  );
};

export default Navlink;
