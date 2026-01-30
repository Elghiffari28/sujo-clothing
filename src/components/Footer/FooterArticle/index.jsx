import Image from "next/image";
import Link from "next/link";

export default function FooterArtikel({ articles }) {
  // cuma ambil 2 artikel pertama
  let latestArticles = [];
  if (articles.length > 0) {
    latestArticles = articles.slice(0, 2);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-2xl font-semibold">Artikel</h3>

      <div className="flex flex-col gap-3">
        {latestArticles.map((artikel) => (
          <Link
            href={`/article/${artikel.id}`}
            key={artikel.id}
            className="relative w-[300px] aspect-[16/9] rounded-lg overflow-hidden border border-white"
          >
            {/* Gambar isi penuh parent */}
            <Image
              src={`/api${artikel.imageUrl}` || "https://placehold.co/600x400"}
              alt={artikel.title}
              fill
              className="object-cover hover:brightness-75"
            />

            {/* Overlay judul */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-sm font-semibold">
              <h4 className="font-medium line-clamp-2">{artikel.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
