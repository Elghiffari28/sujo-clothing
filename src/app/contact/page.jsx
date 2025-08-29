import ContactPage from "@/components/ContactPage";
import React from "react";
import { FaEnvelope, FaMobile, FaPhone } from "react-icons/fa";

const page = () => {
  return (
    <div className="bg-white w-full p-12">
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        <div className="flex w-full justify-center flex-col items-center gap-6 px-0 lg:px-20 mb-8 md:mb-0">
          <h3 className="text-4xl font-bold">Kontak</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <p className="flex gap-2 items-center">
              <span className="text-green-500">
                <FaMobile size={24} />
              </span>
              082120764767
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-green-500">
                <FaPhone size={20} />
              </span>
              082120764767
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-green-500">
                <FaPhone size={20} />
              </span>
              082120764767
            </p>
            <p className="flex gap-2 items-center">
              <span className="text-green-500">
                <FaEnvelope size={20} />
              </span>
              sujocustomart@gmail.com
            </p>
          </div>
          <div>
            <p className="text-center">
              Depan SMK ISAS Jln. Leuwimunding - Palasah Desa Ciparay Kecamatan
              leuwimunding Kabupaten Majalengka Jawa Barat 45473
            </p>
          </div>
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Jam Buka</h1>
            <p>Senin - Sabtu</p>
            <p>Pukul 08.00 - 17.00 WIB</p>
          </div>
        </div>
        <div className="w-full">
          <ContactPage />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14342.585403754769!2d108.31897748715822!3d-6.737100999999976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f21f36f0e67ed%3A0xd075d99587e6f738!2sSablon%20DTF%20Murah%20I%20Pusat%20Kaos%20dan%20Jersey%20Custom!5e1!3m2!1sen!2sid!4v1755111051440!5m2!1sen!2sid"
          width="1200"
          height="400"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-40 md:h-80"
        ></iframe>
      </div>
    </div>
  );
};

export default page;
