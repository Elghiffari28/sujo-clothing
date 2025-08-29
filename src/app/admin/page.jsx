import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex justify-center mt-6 mb-6 text-xl font-semibold md:text-2xl md:font-bold py-12">
      <ul className="flex gap-4 md:gap-10">
        <li>
          <Link
            href="/admin/promos"
            className="px-4 py-2 md:px-10 md:py-4 rounded-xl bg-blue-600 text-white  shadow hover:bg-blue-700 transition"
          >
            Promo
          </Link>
        </li>
        <li>
          <Link
            href="/admin/testimoni"
            className="px-4 py-2 md:px-10 md:py-4 rounded-xl bg-green-600 text-white  shadow hover:bg-green-700 transition"
          >
            Testimoni
          </Link>
        </li>
        <li>
          <Link
            href="/admin/artikel"
            className="px-4 py-2 md:px-10 md:py-4 rounded-xl bg-purple-600 text-white  shadow hover:bg-purple-700 transition"
          >
            Artikel
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
