"use client";
import React from "react";
import HeroProduk from "@/components/Produk/HeroProduk";
import Image from "next/image";
import souvenir from "@/lib/souvenir";

const page = () => {
  if (!souvenir) return <p>Produk tidak ditemukan</p>;
  // console.log("object", souvenir);
  return (
    <div className="bg-white py-12">
      <HeroProduk
        name={souvenir.name}
        description={souvenir.description}
        description2={souvenir.description2} // undefined jika tidak ada
        description3={souvenir.description3}
        foto={souvenir.foto}
      />
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full mt-8">
            <h1 className="text-center font-bold bg-primary text-white px-4 py-2 rounded-md mb-4 w-fit mx-auto text-2xl md:text-3xl lg:text-4xl">
              Contoh Desain
            </h1>
            <div className="flex flex-wrap justify-center w-full">
              {souvenir.contoh_desain.map((contoh, index) => (
                <div
                  key={index}
                  className="w-1/2 sm:w-1/3 lg:w-1/4 px-2 py-2  shadow-sm hover:shadow-xl transition"
                >
                  <Image
                    src={contoh.foto}
                    width={250}
                    height={250}
                    alt="Foto Beranda"
                    unoptimized
                    className="w-full"
                  />
                  <h3 className="text-center font-semibold mt-4 md:text-xl">
                    {contoh.nama}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-8">
            <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl">
              Jenis Printing
            </h1>
            <div className="flex flex-wrap justify-center w-full">
              {souvenir.jenis_print.map((print, index) => (
                <div
                  key={index}
                  className="w-1/2 sm:w-1/3 lg:w-1/4 px-2 py-2  shadow-sm hover:shadow-xl transition"
                >
                  <Image
                    src={print.foto}
                    width={250}
                    height={250}
                    alt="Foto Beranda"
                    unoptimized
                    className="w-full"
                  />
                  <h3 className="text-center font-semibold mt-4 md:text-xl">
                    {print.nama}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
