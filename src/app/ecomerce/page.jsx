"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CarouselPromo from "@/components/CarouselPromo";

const page = () => {
  return (
    <div>
      <CarouselPromo />
    </div>
    // <div className="px-6 py-12 lg:p-12 text-center">
    //   <h1 className="text-2xl font-bold mb-2 text-white">Pesan Produk Kami</h1>
    //   <p className="text-gray-300 mb-6">Pilih cara termudah untuk order:</p>

    //   <div className="space-y-4 flex flex-col justify-center items-center">
    //     <Link
    //       href="https://wa.me/62xxxx"
    //       className="block bg-green-500 text-white py-3 rounded-lg shadow-md w-full max-w-md"
    //     >
    //       <div className="flex justify-center items-center gap-4">
    //         <Image
    //           src={"/wa.png"}
    //           width={100}
    //           height={100}
    //           alt="logo wa"
    //           className="bg-white p-2 rounded-xl"
    //         />
    //         <p>Chat Admin (WhatsApp)</p>
    //       </div>
    //     </Link>
    //     <Link
    //       href="https://shopee.co.id/produk"
    //       className="block bg-orange-500 text-white py-3 rounded-lg shadow-md w-full max-w-md "
    //     >
    //       <div className="flex justify-center items-center gap-4">
    //         <Image
    //           src={"/shopee.jpeg"}
    //           width={50}
    //           height={50}
    //           alt="logo shopee"
    //         />
    //         <p>Pesan di Shopee</p>
    //       </div>
    //     </Link>
    //     <Link
    //       href="https://tokopedia.com/produk"
    //       className="block bg-green-600 text-white py-3 rounded-lg shadow-md w-full max-w-md"
    //     >
    //       <div className="flex justify-center items-center gap-4">
    //         <Image
    //           src={"/tokped.png"}
    //           width={50}
    //           height={50}
    //           alt="logo tokopedia"
    //         />
    //         <p>Pesan di Tokopedia</p>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default page;
