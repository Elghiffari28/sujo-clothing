import Image from "next/image";

const index = () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];

  const renderedImages = images.map((img, index) => (
    <Image
      key={index}
      src={`/images/${img}`}
      width={250}
      height={250}
      alt={`Foto ${index + 1}`}
      unoptimized
      className="w-120 hover:scale-105 transition-all duration-300 rounded-md hover:brightness-75"
    />
  ));
  return (
    <div className="bg-white py-6 md:p-12 w-full">
      <div className="bg-primary text-white p-3 md:p-6">
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
        <div className="h-3/4 flex flex-col items-center px-4 pt-2">
          <div className=" w-full">
            <p className="text-justify leading-relaxed mb-4 text-md">
              SCA Apparel adalah perusahaan konveksi yang telah berpengalaman
              selama 5 tahun dalam memproduksi berbagai jenis pakaian dan produk
              tekstil. Kami menerapkan sistem “one-stop production”, di mana
              seluruh proses pembuatan dilakukan dalam satu atap, mulai dari
              desain, pemotongan bahan, proses jahit, sablon atau bordir, hingga
              tahap finishing dan pengemasan. Dengan didukung oleh tenaga kerja
              berpengalaman dan peralatan produksi modern, SCA mampu
              menghasilkan produk dengan kualitas terbaik serta waktu pengerjaan
              yang efisien. Kami melayani berbagai permintaan custom, baik untuk
              pakaian sehari-hari, seragam kerja, jersey, kaos promosi, maupun
              produk konveksi lainnya sesuai kebutuhan klien.
            </p>

            <div className="bg-gray-50 p-3 rounded-lg shadow hover:shadow-lg transition mb-4">
              <h5 className="text-2xl font-bold text-primary mb-2">VISI</h5>
              <p className="text-gray-700 leading-relaxed text-md font-semibold">
                Menjadi perusahaan konveksi terpercaya di Indonesia dengan
                produk berkualitas tinggi, pelayanan terbaik, serta inovasi
                desain yang selalu mengikuti tren.
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow hover:shadow-lg transition">
              <h5 className="text-2xl font-bold text-primary mb-2">MISI</h5>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 font-semibold text-md">
                <li>
                  Memberikan layanan konveksi yang cepat, tepat, dan
                  berkualitas.
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
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-12 p-2 md:p-0">
        {renderedImages}
      </div>
    </div>
  );
};

export default index;
