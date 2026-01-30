import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

const CarouselPromo = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/promos");
        const data = await res.json();

        // pastikan data berupa array
        if (Array.isArray(data)) {
          const activeItems = data.filter((item) => item.isActive);
          setItems(activeItems);
        } else {
          // kalau bukan array (misalnya error response)
          console.warn("Data bukan array:", data);
          setItems([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setItems([]);
      }
    };

    fetchData();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto mb-12 border-b-2 flex items-center overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="rounded-md overflow-hidden"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <figure className="p-2 bg-background w-full mb-10 ">
              <Image
                src={`/api${item.imageUrl}`}
                alt={`Slide ${index + 1}`}
                width={100}
                height={100}
                unoptimized
                className="w-full h-120 object-contain"
              />
            </figure>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <h3 className="text-lg font-semibold text-center">
                {item.title}
              </h3>
              <p className="text-center">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselPromo;
