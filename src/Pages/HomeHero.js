import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./home.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SearchForm from "../Components/Form/SearchForm";
const HomeHero = () => {
  const data = [
    {
      id: "1",
      img: "https://i.ibb.co/ByVD5TP/elegant-smartphone-composition.jpg",
    },
    {
      id: "2",
      img: "https://i.ibb.co/yPJ3dhb/samsung.jpg",
    },
    {
      id: "3",
      img: "https://i.ibb.co/qBLM6Hc/still-life-books-versus-technology.jpg",
    },
  ];

  return (
    <>
      <div className="flex flex-row mx-auto w-[70%] my-5 gap-5">
      <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }} 
          modules={[Autoplay, Pagination]}
          className="mySwiper w-[70%] rounded-xl"
        >
          {data.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                style={{ width: "100%", height: "560px", objectFit: "cover", borderRadius: "10px" }}
                src={img.img}
                alt=""
              ></img>
            </SwiperSlide>
          ))}
        </Swiper>
      <div className="w-[30%] flex flex-col">
         <img className="h-[280px] rounded-xl" src="https://img.freepik.com/premium-psd/mobile-phone-ads-super-sale-discount-offer-instagram-post-design_534178-188.jpg" alt=""></img>
         <img className="h-[280px] rounded-xl" src="https://media.tracfone.com/wps/wcm/connect/3fc27647-72c3-4d94-a58d-6c938f648196/sm-Samsung-A14PriceDrop-HP-Mobile-Marquee-420x499-ENG.png?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE-3fc27647-72c3-4d94-a58d-6c938f648196-o.8yIUD" alt=""></img>
      </div>
      </div>
    </>
  );
};

export default HomeHero;
