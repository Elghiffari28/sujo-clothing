import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

const CarouselPromo = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/promos");
      const data = await res.json();

      // filter hanya data aktif
      const activeItems = data.filter((item) => item.isActive);
      setItems(activeItems);
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
                src={item.imageUrl}
                alt={`Slide ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-120 object-contain"
              />
            </figure>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <h3 className="text-lg font-semibold text-center">
                {item.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselPromo;
