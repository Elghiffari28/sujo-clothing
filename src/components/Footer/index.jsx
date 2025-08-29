"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import FooterArtikel from "./FooterArticle";

const Footer = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArtikels = async () => {
      const res = await fetch("/api/artikel", { cache: "no-store" });
      const data = await res.json();
      setArticles(data);
    };
    fetchArtikels();
  }, []);
  return (
    <footer className=" md:flex flex-row gap-4 items-center justify-center p-4 md:p-6 lg:p-8 bg-black text-white w-full">
      <div className="flex flex-col justify-center gap-2 col-span-2 md:col-span-1 p-4 border-b-2 md:border-0 border-white mb-4">
        <Image
          src={"/logo_putih.png"}
          width={150}
          height={150}
          alt="Logo"
          unoptimized
          className=""
        />
        <p className="text-justify">
          SCA Apparel adalah Produsen Pakaian Custom terpercaya. kami hadir
          untuk memberikan solusi pakaian custom yang stylish, nyaman, dan
          berkualitas.
        </p>
      </div>
      <div className="p-4 ">
        <h3 className="mb-4 text-2xl font-semibold">Kontak</h3>
        <p className="text-justify">
          Depan SMK ISAS Jln. Leuwimunding - Palasah Desa Ciparay Kecamatan
          leuwimunding Kabupaten Majalengka Jawa Barat 45473
        </p>
        <div className="mt-6 lg:mt-12 mb-12">
          <p className="flex gap-2 py-1 items-center">
            <span>
              <FaPhone size={20} />
            </span>
            081387935102
          </p>
          <p className="flex gap-2 py-1 items-center">
            {" "}
            <span>
              <FaPhone size={20} />
            </span>
            081326992662
          </p>
          <p className="flex gap-2 py-1 items-center">
            <span>
              <FaEnvelope size={20} />
            </span>
            sujocustomart@gmail.com
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FooterArtikel articles={articles} />
        <div>logologo</div>
      </div>
    </footer>
  );
};

export default Footer;
