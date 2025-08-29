"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import FontSize from "./Extension/FontSize";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Editor() {
  const [currentFontSize, setCurrentFontSize] = useState("16px");
  const [editorState, setEditorState] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Tulis sesuatu...</p>",
    immediatelyRender: false,
    onSelectionUpdate: ({ editor }) => {
      const size = editor.getAttributes("textStyle").fontSize || "16px";
      setCurrentFontSize(size);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const updateFontSize = () => {
      const size = editor.getAttributes("textStyle").fontSize || "16px";
      setCurrentFontSize(size);
    };

    editor.on("selectionUpdate", updateFontSize);
    editor.on("transaction", updateFontSize); // biar lebih responsif

    // cleanup
    return () => {
      editor.off("selectionUpdate", updateFontSize);
      editor.off("transaction", updateFontSize);
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.on("selectionUpdate", () => {
      setEditorState((prev) => prev + 1);
    });

    return () => {
      editor.off("selectionUpdate");
    };
  }, [editor]);

  function getCurrentFontSize(editor) {
    if (!editor) return "16px"; // default
    const attrs = editor.getAttributes("textStyle");
    return attrs.fontSize || "16px";
  }

  function getButtonClass(isActive) {
    return `p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-300" : ""}`;
  }

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSave = async () => {
    if (!editor) return;
    const content = editor.getHTML();

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
      editor.commands.setContent("<p>Tulis sesuatu...</p>");
    } else {
      const err = await res.json();
      console.error(err);
      alert("Gagal simpan artikel: " + err.error);
    }
  };

  if (!editor) return null;

  return (
    <div className="flex flex-col  bg-white p-8 border-2 border-black m-20 rounded-lg">
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

      {/* Toolbar Container */}
      <div className="flex flex-wrap items-center gap-2 border rounded-t-lg p-2 bg-gray-50 shadow-sm">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          <Bold size={18} />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          <Italic size={18} />
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          <UnderlineIcon size={18} />
        </button>

        {/* Font Size */}
        <select
          className="border rounded px-2 py-1"
          value={currentFontSize}
          onChange={(e) => {
            editor.chain().focus().setFontSize(e.target.value).run();
            setCurrentFontSize(e.target.value);
          }}
        >
          {["12px", "14px", "16px", "18px", "20px", "24px", "28px"].map(
            (size) => (
              <option key={size} value={size}>
                {size.replace("px", "")}
              </option>
            )
          )}
        </select>

        {/* Font Color */}
        <input
          type="color"
          value={editor.getAttributes("textStyle").color || "#000000"}
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-8 h-8 p-1 border rounded"
        />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <AlignRight size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <AlignJustify size={18} />
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
        >
          <List size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          }`}
        >
          <ListOrdered size={18} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="border rounded-b p-4 mb-4 min-h-[200px] bg-white shadow-sm">
        <EditorContent
          editor={editor}
          className="min-h-[400px] p-6 prose max-w-none focus:outline-none"
        />
      </div>

      {/* Simpan */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        Simpan
      </button>
    </div>
  );
}
