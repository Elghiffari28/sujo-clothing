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
    <div className="w-full bg-primary text-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="font-bold text-2xl md:text-4xl lg:text-6xl my-6">
            {name}
          </h1>
          <div className="flex flex-col gap-4">
            <>
              {description && <p>{description}</p>}
              {description2 && <p>{description2}</p>}
              {description3 && <p>{description3}</p>}
            </>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src={foto}
            width={250}
            height={250}
            alt="Foto Beranda"
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroProduk;
