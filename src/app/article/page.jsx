"use client";

import { useEffect, useState } from "react";
import ArtikelCard from "@/components/ArticleCard";

export default function ArtikelList() {
  const [artikels, setArtikels] = useState([]);

  useEffect(() => {
    const fetchArtikels = async () => {
      const res = await fetch("/api/artikel", { cache: "no-store" });
      const data = await res.json();
      setArtikels(data);
    };
    fetchArtikels();
  }, []);

  return (
    <div className="px-6 py-12 bg-white">
      <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-black text-white py-8 px-6 text-center mb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Artikel
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Temukan berbagai artikel terbaru seputar apparel, desain, dan tips
            menarik lainnya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artikels.map((artikel) => (
          <ArtikelCard key={artikel.id} artikel={artikel} />
        ))}
      </div>
    </div>
  );
}
