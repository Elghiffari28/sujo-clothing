import Image from "next/image";
import Link from "next/link";

export default function ArtikelCard({ artikel }) {
  // Ambil preview konten maksimal 100 karakter
  const preview = artikel.content.replace(/<[^>]+>/g, ""); // hapus tag HTML
  const previewText =
    preview.length > 100 ? preview.slice(0, 100) + "..." : preview;

  return (
    <Link href={`/article/${artikel.id}`} className="h-full">
      <div className="flex flex-col h-full border rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer bg-white">
        {artikel.imageUrl && (
          <div className="relative w-full aspect-[16/9] mb-3">
            <Image
              src={artikel.imageUrl}
              alt={artikel.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <h2 className="text-lg font-semibold mb-1">{artikel.title}</h2>

        <p className="text-sm text-gray-500 mb-2">
          {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Supaya preview isi sisa ruang dengan maksimal 3 baris */}
        <p className="text-gray-700 text-sm line-clamp-3 flex-grow">
          {previewText}
        </p>
      </div>
    </Link>
  );
}
