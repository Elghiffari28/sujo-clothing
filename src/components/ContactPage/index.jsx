"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Email berhasil dikirim!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("❌ Gagal mengirim email!");
      }
    } catch (error) {
      setStatus("❌ Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Hubungi Kami</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            No Telepon
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Nomor HP"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pesan
          </label>
          <textarea
            name="message"
            placeholder="Pesan"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded h-32"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-1/3 bg-primary text-white py-2 rounded-lg shadow-2xl cursor-pointer hover:bg-red-950 transition-all duration-200"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}
