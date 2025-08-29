"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromoAdmin() {
  const [promos, setPromos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  async function fetchPromos() {
    const res = await fetch("/api/promos");
    setPromos(await res.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let promoId = editingId;
    let imageUrl = currentImageUrl;

    if (editingId) {
      // 1. Update data teks dulu
      const res = await fetch(`/api/promos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl: currentImageUrl, // sementara pakai lama
        }),
      });

      if (!res.ok) {
        alert("Gagal update promo");
        return;
      }
    } else {
      // 1. Buat promo baru tanpa gambar dulu
      const res = await fetch("/api/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl: "", // kosong dulu
        }),
      });

      if (!res.ok) {
        alert("Gagal tambah promo");
        return;
      }

      const newPromo = await res.json();
      promoId = newPromo.id;
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
        alert("Upload gambar gagal");
        return;
      }

      const { url } = await uploadRes.json();
      imageUrl = url;

      // 3. Update promo dengan URL gambar
      await fetch(`/api/promos/${promoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      });
    }

    alert(editingId ? "Promo berhasil diupdate!" : "Promo berhasil dibuat!");

    // Reset form
    setTitle("");
    setDescription("");
    setFile(null);
    setEditingId(null);
    setCurrentImageUrl("");
    fetchPromos();
  };

  async function togglePromo(id, status) {
    await fetch(`/api/promos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: status }),
    });
    fetchPromos();
  }
  function handleEdit(promo) {
    setTitle(promo.title);
    setDescription(promo.description);
    setEditingId(promo.id);
    setCurrentImageUrl(promo.imageUrl); // simpan gambar lama
  }

  async function deletePromo(id) {
    await fetch(`/api/promos/${id}`, { method: "DELETE" });
    fetchPromos();
  }

  useEffect(() => {
    fetchPromos();
  }, []);

  return (
    <div className="p-6 md:p-12 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manajemen Promo</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-10 max-w-xl mx-auto"
      >
        <input
          placeholder="Judul"
          className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Deskripsi"
          className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="border p-3 w-full rounded bg-gray-50"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Preview gambar baru / lama */}
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-32 md:w-40 mt-3 rounded shadow"
          />
        ) : currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt="Current"
            className="w-32 md:w-40 mt-3 rounded shadow"
          />
        ) : null}

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded w-full md:w-auto">
          {editingId ? "Update Promo" : "Tambah Promo"}
        </button>
      </form>

      {/* List Promo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promos.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg shadow-sm p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{p.description}</p>
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-40 object-cover mt-3 rounded"
              />
              <p className="mt-2 text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    p.isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {p.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => togglePromo(p.id, !p.isActive)}
                className={`flex-1 px-3 py-2 rounded text-white text-sm transition ${
                  p.isActive
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {p.isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded text-white text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => deletePromo(p.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white text-sm transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
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
