import React from "react";
import Image from "next/image";

const HeroProduk = ({
  name,
  description,
  description2,
  description3,
  foto,
}) => {
  return (
    <div className="w-full md:h-[60vh] bg-primary text-white">
      <div className="flex flex-col md:flex-row h-full">
        {/* Kiri */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <h1 className="font-bold text-2xl md:text-4xl lg:text-6xl my-6">
            {name}
          </h1>
          <div className="flex flex-col gap-4">
            {description && <p>{description}</p>}
            {description2 && <p>{description2}</p>}
            {description3 && <p>{description3}</p>}
          </div>
        </div>

        {/* Kanan */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
          <Image
            src={foto}
            width={500}
            height={500}
            alt="Foto Beranda"
            unoptimized
            className="w-full h-full object-scale-down"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroProduk;
