"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ArtikelDetail() {
  const params = useParams();
  const { id } = params;

  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const res = await fetch(`/api/artikel/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal fetch artikel");
        const data = await res.json();
        setArtikel(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!artikel) return <p className="p-6">Artikel tidak ditemukan</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 bg-white py-16">
      {/* Judul */}
      <h1 className="text-3xl font-bold mb-4">{artikel.title}</h1>

      {/* Tanggal */}
      <p className="text-sm text-gray-500 mb-6">
        {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Gambar */}
      {artikel.imageUrl && (
        <div className="relative w-full h-96 mb-6 border shadow-lg">
          <Image
            src={artikel.imageUrl}
            alt={artikel.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Konten HTML */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: artikel.content }}
      ></div>
    </div>
  );
}
