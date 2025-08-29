"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const page = () => {
  const [testimoni, setTestimoni] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/testimoni");
      const data = await res.json();
      setTestimoni(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="w-full bg-white p-4 md:p-8 lg:p-12">
        <div className="w-full md:w-1/2 bg-primary text-white p-8">
          <div className="mb-4">
            <Image
              src={"/logo_putih.png"}
              width={150}
              height={150}
              alt="Logo"
              unoptimized
              className=""
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold uppercase mb-2">
              Menurut Konsumen
            </h1>
            <ul className="list-decimal list-inside">
              <li>Kualitas bahan terbaik dan jahitan rapi.</li>
              <li>Layanan cepat dan customer service responsif.</li>
              <li>Bisa custom desain sesuai keinginan.</li>
              <li>Harga bersaing dengan hasil maksimal.</li>
              <li>Produksi satu atap, lebih efisien dan terkontrol.</li>
              <li>Tepat waktu dan bisa dipercaya untuk order besar.</li>
            </ul>
            <p className="text-justify"></p>
          </div>
        </div>
      </div>
      <div className="bg-black text-white p-4 md:p-8 lg:p-12 border-b-4 border-white">
        <div className="flex gap-2 mb-4 md:mb-8 items-center ">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold">
            Testimoni
          </h1>
          <Image
            src={"/logo_putih.png"}
            width={150}
            height={150}
            alt="Logo"
            unoptimized
            className=""
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {testimoni.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.imageUrl}
                  alt={item.keterangan}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item.keterangan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
