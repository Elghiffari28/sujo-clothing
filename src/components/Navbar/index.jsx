"use client";
import React, { useState, useEffect, useRef } from "react";
import Navlink from "./Navlink";
import { MessageCircleMore } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // mulai animasi loading
    setIsLoading(true);

    // simulasi delay pencarian
    setTimeout(() => {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false); // stop loading
    }, 300); // delay 0.5 detik
  };

  const handleClickResult = (productId) => {
    setSearch(""); // reset kolom search
    setResults([]); // hapus hasil pencarian
  };

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
    <nav className="bg-primary pt-4 fixed  w-full top-0 left-0 z-20">
      <div>
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Cari produk..."
              className="w-96 h-7 rounded-full shadow-2xl bg-slate-200 text-slate-800 px-4"
            />
            {isLoading && (
              <div className="bg-white border mt-2 rounded shadow-md max-h-60 overflow-y-auto absolute z-30 w-full text-center">
                Mencari...
              </div>
            )}
            {search && results.length > 0 && (
              <div className="bg-white border mt-2 rounded shadow-md max-h-60 overflow-y-auto absolute z-30 w-full">
                {results.map((product) => (
                  <div onClick={handleClickResult} key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-4"
                    >
                      <Image
                        src={product.foto}
                        width={50}
                        height={50}
                        alt="Logo"
                        unoptimized
                        className=""
                      />
                      <div>
                        <h5 className="font-semibold">{product.name}</h5>
                        <p className="text-[10px] text-gray-400">
                          {product.description.slice(0, 50)}
                          {product.description.length > 50 ? "..." : ""}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-center w-full py-3 bg-primary px-4">
            {/* Tulisan Tengah */}
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-3 text-white text-xs md:text-sm whitespace-nowrap">
              <p className="hidden md:block">Produsen Pakaian Custom</p>
              <p>0829038294382</p>
              <p>0829038294382</p>
              <p>ljhkjhk@gmail.com</p>
            </div>

            {/* Sosmed kanan */}
            <div className="flex space-x-3 text-white ml-auto">
              <Link href="/">
                <FaFacebookF size={18} />
              </Link>
              <Link href="/">
                <FaInstagram size={18} />
              </Link>
              <Link href="/">
                <FaYoutube size={18} />
              </Link>
              <Link href="/">
                <FaTiktok size={18} />
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <div className="h-[70px] bg-white w-full">
            <div className="p-4 flex flex-row w-full justify-between items-center h-20 bg-white text-black  border-b-4 border-primary">
              <div className=" items-center justify-center shrink-0">
                <Image
                  src={"/logo.png"}
                  width={100}
                  height={100}
                  alt="Logo"
                  unoptimized
                  className="md:w-38"
                />
              </div>
              <div className="hidden md:block">
                <Navlink />
              </div>
              {/* WhatsApp button (desktop & mobile) */}
              <div className="hidden md:flex h-12 mx-4 rounded-xl shadow-xl items-center px-3 py-2 bg-primary max-w-[180px]">
                <p className="font-semibold text-white flex gap-1 items-center text-center leading-tight text-xs lg:text-base">
                  <FaWhatsapp size={40} />
                  <span className="break-words">Chat With us Now</span>
                </p>
              </div>

              {/* Hamburger (Mobile Only) */}
              <button
                className="md:hidden text-black focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
            {isOpen && (
              <div
                className="absolute w-52 right-0 md:hidden bg-gray-200 h-fit shadow-2xl border-t border-gray-700"
                ref={ref}
              >
                <ul className="flex flex-col gap-4 py-4 px-6 font-semibold text-black">
                  <li>
                    {/* WhatsApp Floating Button (Mobile Only) */}
                    <Link
                      href="https://wa.me/6281387935102"
                      target="_blank"
                      className="bg-green-400 w-full flex gap-3 p-2 rounded-lg"
                    >
                      <span>Chat With Us</span>
                      <FaWhatsapp size={24} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" onClick={() => setIsOpen(false)}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
