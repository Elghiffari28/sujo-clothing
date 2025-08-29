"use client";
import CarouselPromo from "@/components/CarouselPromo";
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const videosRef = useRef([]);

  useEffect(() => {
    const videos = videosRef.current;

    // Hero video main langsung
    if (videos[0]) videos[0].play();

    // Observer untuk video lainnya
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videos.forEach((video, index) => {
      if (index !== 0 && video) {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div className="items-center justify-items-center min-h-screen">
      <section className="w-full">
        <Hero ref={(el) => (videosRef.current[0] = el)} />
      </section>
      <section className="w-full p-8 bg-white">
        <div className="w-full flex flex-col md:flex-row  bg-primary text-white p-4">
          <div className="md:w-1/2 md:px-8 mb-4 md:mb-0">
            <div className="my-8 mx-auto">
              <Image
                src={"/logo_putih.png"}
                width={150}
                height={150}
                alt="Logo"
                unoptimized
                className=""
              />
            </div>
            <div>
              <h1 className="font-bold mb-4 lg:text-2xl">
                Produsen Pakaian Custom
              </h1>
              <p className="text-justify">
                SCA APPAREL adalah usaha yang bergerak di bidang pembuatan
                pakaian custom dengan kualitas tinggi dan desain yang dapat
                disesuaikan sep enuhnya dengan keinginan p elanggan. Kami
                melayani berbagai kebutuhan fashion dan seragam, baik untuk
                keperluan personal, komunitas, bisnis, hingga event berskala
                besar. Kami percaya bahwa setiap orang dan organisasi memiliki
                identitas unik, dan pakaian adalah salah satu cara terbaik untuk
                mengekspresikannya.Oleh karena itu,kami hadir untuk memberikan
                solusi pakaian custom yang stylish, nyaman, dan berkualitas.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div>
              <Image
                src={"https://placehold.co/600x400"}
                width={250}
                height={250}
                alt="Foto Beranda"
                unoptimized
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black w-full py-4 lg:p-12 text-white">
        <h1 className="text-2xl lg:text-7xl font-bold text-center mb-4">
          Hot Promo
        </h1>
        <div className="flex justify-center items-center">
          <CarouselPromo />
        </div>
        <div className="flex justify-center items-center p-4 bg-primary w-52 rounded-xl shadow-2xl mx-auto mt-4">
          <Link href={"/ecomerce"}>Order Now</Link>
        </div>
      </section>

      <section className="w-full p-4 md:p-8 lg:p-12 bg-white ">
        <div className="bg-primary p-4 text-white text-center mb-4 w-full md:w-3/4 mx-auto">
          <h1 className="text-2xl font-black">Cara Pemesanan</h1>
          <p>
            Bagaimana Cara Order Pakaian Custom di SCA APPAREL Simak Yuk
            Videonya !
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div>
            <video
              ref={(el) => (videosRef.current[1] = el)}
              className="w-full h-[400px] object-cover"
              muted
              loop
              playsInline
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div>
            <video
              ref={(el) => (videosRef.current[2] = el)}
              className="w-full h-[400px] object-cover"
              muted
              loop
              playsInline
            >
              <source src="/videos/video2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <div>
        <section className="w-full relative bg-primary text-white p-12 z-0">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-1/2">
              <h1 className="font-black text-3xl md:text-4xl lg:text-5xl mb-8 text-center md:text-left">
                Tim Produksi
              </h1>
              <p className="text-justify mb-4">
                SCA APPAREL telah berpengalaman dalam memproduksi berbagai jenis
                pakaian custom selama bertahun-tahun. Tim kami terdiri dari
                tenaga profesional di bidang desain, pemotongan, dan penjahitan,
                yang telah menangani berbagai pesanan dari Komunitas dan
                organisasi Sekolah dan universitas Perusahaan dan instansi
                pemerintahan Event olahraga dan acara khususBrand lokal dan
                clothing line baru Dengan dukungan peralatan produksi modern dan
                kontrol kualitas yang ketat,kami memastikan setiap pesanan
                dikirim dalam kondisi terbaik, sesuai dengan spesifikasi dan
                waktu yang dijanjikan.
              </p>
            </div>
            <div className="md:w-1/2 flex items-center">
              <video
                ref={(el) => (videosRef.current[1] = el)}
                className="w-full  object-cover z-0"
                muted
                loop
                playsInline
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="container mx-auto pb-16 pt-4 text-center">
            <Link
              href={"/contact"}
              className="bg-white mt-4 text-black px-4 py-2 rounded-md text-xl lg:text-2xl font-bold"
            >
              Hubungi Kami
            </Link>
          </div>
          {/* Segitiga */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0.704 334.137 499.869 69.031"
              preserveAspectRatio="none"
              className=" w-full h-24 md:h-32"
            >
              <path
                d="M 0.704 334.137 L 3.814 334.137 L 250.638 380.807 L 497.463 334.137 L 500.573 334.137 L 500.573 403.168 L 0.704 403.168 L 0.704 334.137 Z"
                fill="white"
                id="object-0"
                transform="matrix(1, 0, 0, 1, 0, 1.4210854715202004e-14)"
              />
            </svg>
          </div>
        </section>
      </div>
      <section className="bg-primary text-white p-6 md:p-12">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          <div className="flex flex-col justify-center items-center px-4 mb-12">
            <h1 className="font-black text-center text-3xl md:text-5xl mb-8 ">
              Mengapa Memilih
            </h1>
            <Image
              src={"/logo_putih.png"}
              width={150}
              height={150}
              alt="Logo"
              unoptimized
              className="md:w-52"
            />
          </div>
          <div className="grid grid-cols-3 gap-8 md:gap-12 lg:gap-20 items-center justify-center">
            <div className="h-48 lg:h-56 md:w-48 flex flex-col justify-center items-center">
              <Image
                src={"/images/kualitas-produk.png"}
                width={150}
                height={150}
                alt="Foto Beranda"
                unoptimized
                className="w-20 h-28 md:h-44 object-contain"
              />
              <p className="font-semibold text-center mt-4 text-md md:text-2xl">
                Quality Product
              </p>
            </div>
            <div className="h-48 lg:h-56 md:w-48 flex flex-col justify-center items-center">
              <Image
                src={"/images/best-desain.png"}
                width={150}
                height={150}
                alt="Foto Beranda"
                unoptimized
                className="w-20 h-28 md:h-44 object-contain"
              />
              <p className="font-semibold text-center mt-4 text-md md:text-2xl">
                Best Design
              </p>
            </div>
            <div className="h-48 lg:h-56 md:w-48 flex flex-col justify-center items-center">
              <Image
                src={"/images/thumb.png"}
                width={150}
                height={150}
                alt="Foto Beranda"
                unoptimized
                className="w-20 h-28 md:h-44 object-contain"
              />
              <p className="font-semibold text-center mt-4 text-md md:text-2xl">
                Berpengalaman
              </p>
            </div>
            <div className="h-48 lg:h-56 md:w-48 flex flex-col justify-center items-center">
              <Image
                src={"/images/profesional.png"}
                width={150}
                height={150}
                alt="Foto Beranda"
                unoptimized
                className="w-20 h-28 md:h-44 object-contain"
              />
              <p className="font-semibold text-center mt-4 text-md md:text-2xl">
                Profesional
              </p>
            </div>
            <div className="h-48 lg:h-56 md:w-48 flex flex-col justify-center items-center">
              <Image
                src={"/images/best-price.png"}
                width={150}
                height={150}
                alt="Foto Beranda"
                unoptimized
                className="w-20 h-28 md:h-44 object-contain"
              />
              <p className="font-semibold text-center mt-4 text-md md:text-2xl">
                Best Price
              </p>
            </div>
            <div className="h-48 lg:h-56 md:w-48 flex flex-col justify-center items-center">
              <Image
                src={"/images/garansi.png"}
                width={150}
                height={150}
                alt="Foto Beranda"
                unoptimized
                className="w-20 h-28 md:h-44 object-contain"
              />
              <p className="font-semibold text-center mt-4 text-md md:text-2xl">
                Garansi
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white w-full ">
        <div className="flex flex-col justify-center items-center lg:p-6 md:p-12">
          <div className="flex flex-col justify-center items-center px-4 md:px-8">
            <div className="flex gap-4 mb-4 items-center justify-start">
              <h3>Sekilas Tentang</h3>
              <Image
                src={"/logo.png"}
                width={150}
                height={150}
                alt="Logo"
                unoptimized
                className=""
              />
            </div>
            <div className="">
              <p className="text-justify">
                SCA Apparel adalah perusahaan konveksi yang menyediakan layanan
                produksi pakaian secara terpadu dalam satu atap mulai dari
                desain awal, pemilihan bahan, cutting, sablon/printing, bordir,
                jahit, finishing, hingga pengemasan siap kirim. Dengan
                pengalaman lebih dari lima tahun melayani pemesanan skala kecil
                hingga menengah-besar, SCA hadir sebagai mitra tepercaya bagi
                brand lokal, komunitas, instansi, event organizer, dan reseller
                pakaian custom di seluruh Indonesia.
              </p>
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row mt-8">
            <div className="md:w-1/2 px-8 flex justify-center items-center">
              <video
                ref={(el) => (videosRef.current[1] = el)}
                className="w-full  object-cover"
                muted
                loop
                playsInline
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="md:w-1/2 px-4">
              <h1 className="font-black md:text-2xl lg:text-3xl mb-2">
                Nilai Utama Kami
              </h1>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="font-semibold">ONE STOP PRODUCTION :</span>
                  Semua tahapan produksi berada dibawah Pengawasan Internal
                  SCA,mempersingkat lead time dan meminimalkan kesalahan antar
                  vendor.
                </p>
                <p>
                  <span className="font-semibold">KUALITAS KONSISTEN :</span>
                  SOP produksi,quality check berlapis,serta penggunann mesin
                  industri untuk hasil rapi dan tahan lama.
                </p>
                <p>
                  <span className="font-semibold">FLEKSIBLE & CUSTOM :</span>
                  Menerima pemesanan variatif Jersey,kaos,jaket,hoodie,polo
                  shirt,wearpack,seragam kerja,merchandise komunitas,dan produk
                  special order.
                </p>
                <p>
                  <span className="font-semibold">HARGA KOMPETITIF :</span>
                  Kontrol biaya dan proses internal memungkinkan paket harga
                  bersaing tanpa mengorbankan kualitas.
                </p>
                <p>
                  <span className="font-semibold">KOMUNIKASI MUDAH :</span>
                  Tim customer support responsif via WhatsApp,Email, dan meeting
                  daring untuk memastikan spesifikasi jelas sebelum produksi.
                </p>
              </div>
            </div>
          </div>
          <div className="text-white flex gap-4 md:gap-24  lg:gap-52 justify-center mt-6 mb-4">
            <Link href={"/"} className="p-4 bg-primary rounded-lg shadow-lg">
              WhatsApp Admin 1
            </Link>
            <Link href={"/"} className="p-4 bg-primary rounded-lg shadow-lg">
              WhatsApp Admin 2
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
