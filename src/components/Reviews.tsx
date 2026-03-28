import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";
import GoogleLogo from "@/assets/google.svg";
import { Star } from "lucide-react";
import Img01 from "@/assets/homem01.jpg";
import Img02 from "@/assets/homem02.jpg";
import Img03 from "@/assets/homem03.jpg";
import Img04 from "@/assets/mulher01.jpg";
import Img05 from "@/assets/mulher02.jpg";
import Img06 from "@/assets/mulher03.jpg";
import Treinamento from "@/assets/Treinamento.png";

const whatsappNumber = "5545999168759";
const whatsappMessage =
  "Olá, tenho interesse no Treinamento PPF Luxury. Gostaria de receber mais informações.";

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

type StaticReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

const STATIC_REVIEWS: StaticReview[] = [
  {
    author_name: "Mariana S.",
    rating: 5,
    relative_time_description: "há 2 semanas",
    text: "Atendimento impecável! Meu carro voltou com um brilho incrível e acabamento perfeito. Dá para ver o cuidado em cada detalhe.",
    profile_photo_url: Img04,
  },
  {
    author_name: "Carlos Henrique",
    rating: 5,
    relative_time_description: "há 1 mês",
    text: "Serviço de altíssimo nível. Fiz vitrificação e o resultado ficou excelente, com muito brilho e proteção na pintura.",
    profile_photo_url: Img01,
  },
  {
    author_name: "Amanda P.",
    rating: 5,
    relative_time_description: "há 3 dias",
    text: "Levei meu carro para higienização interna e fiquei impressionada. Interior limpo, cheiro agradável e acabamento muito caprichado.",
    profile_photo_url: Img05,
  },
  {
    author_name: "João Vitor",
    rating: 4,
    relative_time_description: "há 2 meses",
    text: "Ambiente organizado, equipe atenciosa e serviço muito bem executado. Meu veículo ficou com aparência renovada.",
    profile_photo_url: Img02,
  },
  {
    author_name: "Patrícia L.",
    rating: 5,
    relative_time_description: "há 5 dias",
    text: "Agendamento fácil e atendimento excelente. Fiz polimento técnico e o carro voltou com brilho e profundidade na pintura.",
    profile_photo_url: Img06,
  },
  {
    author_name: "Rafael A.",
    rating: 5,
    relative_time_description: "há 1 semana",
    text: "Profissionais muito cuidadosos e detalhistas. Serviço premium, com resultado acima das expectativas.",
    profile_photo_url: Img03,
  },
];

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalf = decimal >= 0.25 && decimal < 0.75;
  const extraFull = decimal >= 0.75 ? 1 : 0;

  const filled = Math.min(5, fullStars + extraFull);
  const empty = 5 - filled - (hasHalf ? 1 : 0);

  const starClass = `text-[var(--gold)]`;
  const emptyClass = `text-neutral-300`;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: filled }).map((_, i) => (
        <Star
          key={`full-${i}`}
          style={{ width: size, height: size }}
          className={`fill-(--gold) ${starClass}`}
        />
      ))}

      {hasHalf && (
        <span
          className="relative inline-block"
          style={{ width: size, height: size }}
        >
          <Star style={{ width: size, height: size }} className={emptyClass} />
          <span className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              style={{ width: size, height: size }}
              className={`fill-(--gold) ${starClass}`}
            />
          </span>
        </span>
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          style={{ width: size, height: size }}
          className={emptyClass}
        />
      ))}
    </div>
  );
}

function clampText(text: string, maxChars = 180) {
  const t = (text || "").trim();
  if (t.length <= maxChars) return { short: t, needsMore: false };
  return { short: t.slice(0, maxChars).trimEnd() + "...", needsMore: true };
}

const ReviewsStaticPetshop = () => {
  const ratingAvg = useMemo(() => {
    const sum = STATIC_REVIEWS.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    return STATIC_REVIEWS.length ? sum / STATIC_REVIEWS.length : 0;
  }, []);

  const totalRatings = STATIC_REVIEWS.length;

  return (
    <section id="avaliacoes" className="py-20 bg-(--background)">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-4xl md:text-5xl font-bold mb-3 text-(--gold)"
          >
            Excelência reconhecida por nossos clientes
          </motion.h2>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="text-lg text-(--muted-foreground) max-w-2xl mx-auto"
          >
            Depoimentos de clientes que escolheram cuidado premium, proteção e
            acabamento de alto padrão.
          </motion.p>
        </div>

        {/* Header tipo Google */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-(--card) p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <img
                src={GoogleLogo}
                alt="Logo Google"
                width={98}
                height={32}
                className="h-8 w-auto"
                loading="lazy"
              />
              <span className="text-lg font-semibold text-white">
                Avaliações
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl font-bold text-white">
                {ratingAvg.toFixed(1)}
              </span>
              <Stars rating={ratingAvg} size={20} />
              <span className="text-sm text-white/70">({totalRatings})</span>
            </div>
          </div>

          <div className="md:ml-auto inline-flex items-center justify-center rounded-full bg-neutral-200 px-6 py-2 text-neutral-700 font-semibold">
            Avalie-nos no google
          </div>
        </div>

        {/* Slider */}
        <Swiper
          className="pagination-bullet-review bullet-review"
          modules={[Pagination, Autoplay]}
          grabCursor={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {STATIC_REVIEWS.map((r, idx) => {
            const { short } = clampText(r.text, 200);

            return (
              <SwiperSlide key={idx} className="pb-10">
                <div className="h-[300px] bg-(--card) rounded-2xl p-5 shadow-sm flex flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src={r.profile_photo_url || "/avatar-placeholder.png"}
                      alt={`Foto de ${r.author_name}`}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold text-(--foreground) truncate">
                        {r.author_name || "Cliente"}
                      </p>
                      <p className="text-xs text-(--muted-foreground)">
                        {r.relative_time_description || ""}
                      </p>
                    </div>
                  </div>

                  <Stars rating={r.rating ?? 0} />

                  <div className="mt-3 flex-1">
                    <p className="text-(--foreground) text-sm leading-relaxed">
                      {short}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <motion.a
          variants={SlideUp(0.3)}
          initial="initial"
          whileInView="animate"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="group mt-14 flex w-full items-center justify-center overflow-hidden rounded-[28px] border-2 border-(--gold)/40"
        >
          <img
            src={Treinamento}
            alt="Banner Treinamento PPF"
            className="max-h-[350px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </motion.a>
      </div>
    </section>
  );
};

export default ReviewsStaticPetshop;
