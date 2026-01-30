"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const handleSave = async () => {
    // if (!editor) return;
    console.log("📄 Content:", content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("image", file);

    const res = await fetch("/api/artikel", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Artikel tersimpan!");
      setTitle("");
      setFile(null);
    } else {
      const err = await res.json();
      console.error(err);
      alert("Gagal simpan artikel: " + err.error);
    }
  };

  // if (!editor) return null;

  return (
    <div className="flex flex-col  bg-white p-8 border-2 border-black m-4 md:m-10 lg:m-20 rounded-lg">
      {/* Judul */}
      <input
        type="text"
        placeholder="Judul"
        className="border p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Upload Gambar */}
      <input
        type="file"
        accept="image/*"
        className="border p-2 rounded mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <SimpleEditor onChange={setContent} />
      {/* <SimpleEditor onChange={(value) => setContent(value)} /> */}

      {/* <SimpleEditor /> */}

      {/* Simpan */}
      <motion.button
        whileTap={{ scale: 0.9, boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
        transition={{ duration: 0.2 }}
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow mt-4"
      >
        Simpan
      </motion.button>
    </div>
  );
}
