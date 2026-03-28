import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Studio01 from "@/assets/About01.png";
import Studio02 from "@/assets/About02.jpg";
import Studio03 from "@/assets/About03.jpg";
import Studio04 from "@/assets/About04.jpg";
import Studio05 from "@/assets/About05.jpg";
import Studio06 from "@/assets/About06.jpg";

const images = [
  { backgroundImage: Studio02 },
  { backgroundImage: Studio01 },
  { backgroundImage: Studio03 },
  { backgroundImage: Studio04 },
  { backgroundImage: Studio05 },
  { backgroundImage: Studio06 },
];

const AboutCarousel = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        autoplay={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {images.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[200px] md:!w-[340px] lg:!w-[420px]"
          >
            <img
              src={item.backgroundImage}
              alt={`Studio ${index + 1}`}
              className="h-[380px] md:h-[450px] w-full rounded-2xl object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutCarousel;
