import Image from "next/image";

const index = () => {
  const image = [];
  for (let index = 1; index <= 6; index++) {
    image.push(
      <Image
        src={"https://placehold.co/600x400"}
        width={250}
        height={250}
        alt="Foto Beranda"
        unoptimized
        className="w-full"
        key={index}
      />
    );
  }
  return (
    <div className="bg-white p-6 md:p-12 w-full">
      <div className="bg-primary text-white p-6 md:p-12">
        <div className="px-4">
          <Image
            src={"/logo_putih.png"}
            width={150}
            height={150}
            alt="Logo"
            unoptimized
            className=""
          />
        </div>
        <div className="mt-12 mx-auto px-4">
          <p className="text-justify  leading-relaxed mb-8 text-lg">
            SCA Apparel adalah perusahaan konveksi yang telah berpengalaman
            selama 5 tahun dalam memproduksi berbagai jenis pakaian dan produk
            tekstil. Kami menerapkan sistem “one-stop production”, di mana
            seluruh proses pembuatan dilakukan dalam satu atap, mulai dari
            desain, pemotongan bahan, proses jahit, sablon atau bordir, hingga
            tahap finishing dan pengemasan.Dengan didukung oleh tenaga kerja
            berpengalaman dan peralatan produksi modern, SCA mampu menghasilkan
            produk dengan kualitas terbaik serta waktu pengerjaan yang efisien.
            Kami melayani berbagai permintaan custom, baik untuk pakaian
            sehari-hari, seragam kerja, jersey, kaos promosi, maupun produk
            konveksi lainnya sesuai kebutuhan klien.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition mb-4">
            <h5 className="text-2xl font-bold text-primary mb-4">VISI</h5>
            <p className="text-gray-700 leading-relaxed text-lg font-semibold">
              Menjadi perusahaan konveksi terpercaya di Indonesia dengan produk
              berkualitas tinggi, pelayanan terbaik, serta inovasi desain yang
              selalu mengikuti tren.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h5 className="text-2xl font-bold text-primary mb-4">MISI</h5>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 font-semibold text-lg">
              <li>
                Memberikan layanan konveksi yang cepat, tepat, dan berkualitas.
              </li>
              <li>
                Mengutamakan kepuasan pelanggan dengan hasil yang sesuai
                ekspektasi.
              </li>
              <li>
                Mengembangkan kreativitas dan inovasi dalam setiap produk yang
                dihasilkan.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-8 mt-12">{image}</div>
    </div>
  );
};

export default index;
