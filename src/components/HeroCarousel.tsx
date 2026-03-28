import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import HeroVideo from "@/assets/Video_Hero03.mp4";

type Slide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  type?: "image" | "video";
  positionMobile?: string;
  positionDesktop?: string;
  textVariant?: "light" | "dark";
};

const slides: Slide[] = [
  {
    src: HeroVideo,
    alt: "Vídeo aplicando pelicula",
    type: "video",
    title: "",
    subtitle: "",
    textVariant: "light",
  },
  // {
  //   src: Hero02,
  //   alt: "Hero 02",
  //   type: "image",
  //   title: "AQUI VOCÊ PODE\nCONFIAR",
  //   subtitle:
  //     "Experiência, confiança e tecnologia para cuidar do seu veículo com a qualidade que você merece.",
  //   positionMobile: "25% 35%",
  //   positionDesktop: "50% 50%",
  //   buttonVariant: "red",
  //   textVariant: "light",
  // },
  // {
  //   src: Hero03,
  //   alt: "Hero 03",
  //   type: "image",
  //   title: "MÊCANICA\nEM GERAL",
  //   subtitle:
  //     "Diagnóstico preciso e atendimento de confiança. Cuidamos do seu veículo com tecnologia, experiência e atenção a cada detalhe.",
  //   positionMobile: "50% 35%",
  //   positionDesktop: "50% 50%",
  //   buttonVariant: "red",
  //   textVariant: "light",
  // },
];

const HeroCarousel = () => {
  return (
    <section className="w-full">
      <div className="relative w-full h-screen">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          slidesPerView={1}
          effect="fade"
          loop
          navigation
          observer={false}
          observeParents={false}
          watchSlidesProgress={false}
          resizeObserver
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {slides.map((item, i) => {
            const textClass =
              item.textVariant === "dark" ? "text-black" : "text-white";

            // const buttonClass =
            //   item.buttonVariant === "yellow"
            //     ? "bg-(--yellow) text-black hover:bg-yellow-400"
            //     : "bg-(--button-primary-medium) text-white hover:bg-red-800";

            return (
              <SwiperSlide key={i} className="w-full h-full">
                <div className="relative w-full h-full">
                  {/* <img
                    src={item.src}
                    alt={item.alt}
                    className="
                      w-full h-full object-cover
                      object-(--position-mobile)
                      sm:object-(--position-desktop)
                    "
                    style={
                      {
                        ["--position-mobile" as any]:
                          item.positionMobile ?? "50% 50%",
                        ["--position-desktop" as any]:
                          item.positionDesktop ?? "50% 50%",
                      } as React.CSSProperties
                    }
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority="high"
                  /> */}

                  {item.type === "video" ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={i === 0 ? "auto" : "metadata"}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover object-[var(--position-mobile)] sm:object-[var(--position-desktop)]"
                      style={
                        {
                          ["--position-mobile" as any]:
                            item.positionMobile ?? "50% 50%",
                          ["--position-desktop" as any]:
                            item.positionDesktop ?? "50% 50%",
                        } as React.CSSProperties
                      }
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority="high"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/50" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-8">
                      <div className="max-w-xl text-center md:text-left">
                        {/* TITLE */}
                        <h1
                          className={`font-extrabold text-3xl sm:text-4xl lg:text-6xl whitespace-pre-line ${textClass}`}
                        >
                          {item.title}
                        </h1>

                        {/* SUBTITLE */}
                        <p
                          className={`mt-8 text-sm sm:text-base lg:text-l font-semibold ${textClass}`}
                        >
                          {item.subtitle}
                        </p>

                        {/* <button
                          onClick={() => {
                            document
                              .getElementById("contact")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`mt-8 inline-flex items-center cursor-pointer rounded-lg transition px-6 py-3 font-semibold hover:scale-105 ${buttonClass}`}
                        >
                          Agendar Atendimento
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroCarousel;
