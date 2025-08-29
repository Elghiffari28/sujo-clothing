"use client";
import { useParams } from "next/navigation";
import React from "react";
import { products } from "@/lib/products";
import HeroProduk from "@/components/Produk/HeroProduk";
import Image from "next/image";

const page = () => {
  const params = useParams(); // ambil semua param route
  const id = params.id;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Produk tidak ditemukan</p>;

  return (
    <div className="bg-white py-12">
      <HeroProduk
        name={product.name}
        description={product.description}
        description2={product.description2} // undefined jika tidak ada
        description3={product.description3}
        foto={product.foto}
      />
      <div className="w-full px-4 md:px-8 lg:px-12">
        {(Array.isArray(product.chart_size) && product.chart_size.length > 0) ||
        (typeof product.chart_size === "string" &&
          product.chart_size.trim() !== "") ? (
          <div className="mt-12 flex justify-center items-center flex-col gap-8 mb-12">
            <h2 className="text-center text-4xl font-bold">Size Chart</h2>
            <div>
              {Array.isArray(product.chart_size) ? (
                product.chart_size.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    width={250}
                    height={250}
                    alt={`Foto Beranda ${idx}`}
                    unoptimized
                    className="w-full mb-8"
                  />
                ))
              ) : (
                <Image
                  src={product.chart_size}
                  width={250}
                  height={250}
                  alt="Foto Beranda"
                  unoptimized
                  className="w-full"
                />
              )}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col justify-center items-center">
          {product.materials?.length > 0 && (
            <div className="w-full">
              <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl">
                Material
              </h1>
              <div className="flex justify-center flex-wrap w-full">
                {product.materials.map((material, index) => (
                  <div
                    key={index}
                    className="w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2 shadow-sm hover:shadow-xl transition"
                  >
                    <Image
                      src={material.foto}
                      width={250}
                      height={250}
                      alt="Foto Beranda"
                      unoptimized
                      className="w-full"
                    />
                    <h3 className="text-center font-semibold mt-4 md:text-xl">
                      {material.nama}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full mt-8">
            <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl">
              Contoh Desain
            </h1>
            <div className="flex flex-wrap justify-center w-full">
              {product.contoh_desain.map((contoh, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default page;
