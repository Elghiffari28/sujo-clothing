"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import FooterArtikel from "./FooterArticle";
import Link from "next/link";

const Footer = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchArtikels = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/artikel", { cache: "no-store" });
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
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
            +6282227522502
          </p>
          <p className="flex gap-2 py-1 items-center">
            {" "}
            <span>
              <FaPhone size={20} />
            </span>
            +6282219100276
          </p>
          <p className="flex gap-2 py-1 items-center">
            <span>
              <FaEnvelope size={20} />
            </span>
            sujoclothing@gmail.com
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FooterArtikel articles={articles} />
        <div className="flex space-x-6 text-white m-auto mt-4">
          <Link
            href="https://www.facebook.com/profile.php?id=100094128155580&mibextid=ZbWKwL"
            target="_blank"
          >
            <FaFacebookF size={18} />
          </Link>
          <Link
            href="https://www.instagram.com/sujocustom.art?igsh=MTJnbDduZmt6aWVxMQ=="
            target="_blank"
          >
            <FaInstagram size={18} />
          </Link>
          <Link href="https://www.youtube.com/@SCA-APPAREL" target="_blank">
            <FaYoutube size={18} />
          </Link>
          <Link
            href="https://www.tiktok.com/@sujocustom.art?_t=ZS-8z44FklLjL0&_r=1"
            target="_blank"
          >
            <FaTiktok size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
