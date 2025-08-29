"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
const page = () => {
  const [testimonis, setTestimonis] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const getTesti = async () => {
    const res = await fetch("/api/testimoni");
    setTestimonis(await res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let testiId = editingId;
      let imageUrl = currentImageUrl;

      if (editingId) {
        // --- UPDATE TESTIMONI ---
        // 1. Update teks dulu
        const res = await fetch(`/api/testimoni/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keterangan, imageUrl }), // sementara pakai image lama
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          // console.log(err);
          throw new Error(err.message || "Gagal update testimoni (teks)");
        }

        // 2. Kalau ada file baru → upload
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) {
            throw new Error("Upload gambar gagal");
          }

          const { url } = await uploadRes.json();
          imageUrl = url;

          // 3. Update lagi hanya kolom gambar
          const updateImg = await fetch(`/api/testimoni/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keterangan, imageUrl }),
          });

          if (!updateImg.ok) {
            throw new Error("Update gambar gagal, file tidak dipakai");
          }
        }
      } else {
        // --- CREATE TESTIMONI ---
        // 1. Harus ada file → upload dulu
        if (!file) {
          throw new Error(
            "File gambar wajib diisi saat membuat testimoni baru"
          );
        }

        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Upload gambar gagal");
        }

        const { url } = await uploadRes.json();
        imageUrl = url;

        // 2. Baru simpan data ke DB
        const res = await fetch("/api/testimoni", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keterangan, imageUrl }),
        });

        if (!res.ok) {
          throw new Error("Gagal tambah testimoni");
        }

        const newTesti = await res.json();
        testiId = newTesti.id;
      }

      alert(
        editingId
          ? "Testimoni berhasil diupdate!"
          : "Testimoni berhasil dibuat!"
      );

      // Reset form
      setKeterangan("");
      setFile(null);
      setEditingId(null);
      setCurrentImageUrl("");
      getTesti();
    } catch (err) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan");
    }
  };

  function handleEdit(testimoni) {
    setKeterangan(testimoni.keterangan);
    setEditingId(testimoni.id);
    setCurrentImageUrl(testimoni.imageUrl); // simpan gambar lama
  }

  async function deleteTesti(id) {
    await fetch(`/api/testimoni/${id}`, { method: "DELETE" });
    getTesti();
  }

  useEffect(() => {
    getTesti();
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="p-6">
        {/* Form tambah / edit */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 mb-12 max-w-xl mx-auto bg-white shadow-md rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {editingId ? "Edit Testimoni" : "Tambah Testimoni"}
          </h2>

          <input
            placeholder="Keterangan"
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />

          <input
            type="file"
            className="border p-3 w-full rounded-lg bg-gray-50"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Preview */}
          {(file || currentImageUrl) && (
            <div className="mt-3">
              <Image
                src={file ? URL.createObjectURL(file) : currentImageUrl}
                alt="Preview"
                width={100}
                height={100}
                className="w-36 md:w-48 rounded-lg shadow-md border"
              />
            </div>
          )}

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2.5 rounded-lg w-full md:w-auto font-medium">
            {editingId ? "Update Testimoni" : "Tambah Testimoni"}
          </button>
        </form>

        {/* Daftar Testimoni */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonis.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl shadow hover:shadow-md transition p-5 flex flex-col"
            >
              <p className="text-gray-700 text-sm mb-3">{p.keterangan}</p>
              <Image
                src={p.imageUrl}
                alt={p.keterangan}
                width={100}
                height={100}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg text-white text-sm font-medium transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTesti(p.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white text-sm font-medium transition"
                >
                  🗑️ Hapus
                </button>
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
};

export default page;
