"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Image from "next/image";
import Link from "next/link";

export default function NewArticlePage() {
  const [artikels, setArtikels] = useState([]);

  useEffect(() => {
    const fetchArtikels = async () => {
      try {
        const res = await fetch("/api/artikel", { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal fetch artikel");
        const data = await res.json();
        setArtikels(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchArtikels();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus artikel ini?")) return;

    try {
      const res = await fetch(`/api/artikel/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setArtikels((prev) => prev.filter((a) => a.id !== id));
      } else {
        const err = await res.json();
        alert("Gagal hapus: " + err.error);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat hapus artikel");
      console.error(error);
    }
  };
  return (
    <div className="py-12 bg-white">
      <Editor />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Daftar Artikel</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artikels.map((artikel) => (
            <div
              key={artikel.id}
              className="bg-white border rounded-xl shadow hover:shadow-md transition overflow-hidden"
            >
              {artikel.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={
                      artikel.imageUrl.startsWith("http")
                        ? artikel.imageUrl
                        : `${artikel.imageUrl}`
                    }
                    alt={artikel.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg line-clamp-2">
                  {artikel.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() => handleDelete(artikel.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 px-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition shadow"
        >
          ← Kembali ke pilihan admin
        </Link>
      </div>
    </div>
  );
}
