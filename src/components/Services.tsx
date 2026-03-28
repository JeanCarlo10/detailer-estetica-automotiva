import { Sparkles, Shield, SprayCan, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";

import PolimentoBg from "@/assets/Service01.jpg";
import HigienizacaoBg from "@/assets/Service04.png";
import PPFBg from "@/assets/Service02.jpg";
import VitrificacaoBg from "@/assets/Service03.jpg";

const whatsappNumber = "5545999168759";

const services = [
  {
    icon: Sparkles,
    title: "Polimento técnico",
    description:
      "Remove marcas leves, microrriscos e opacidade da pintura, devolvendo brilho e profundidade à cor do veículo.",
    image: PolimentoBg,
    imagePosition: "center 80%",
    whatsappMessage:
      "Olá, gostaria de mais informações sobre o serviço de Polimento Técnico.",
  },
  {
    icon: SprayCan,
    title: "Higienização interna",
    description:
      "Limpeza profunda da parte interna do veículo, removendo sujeiras, manchas e odores para mais conforto e conservação.",
    image: HigienizacaoBg,
    imagePosition: "center",
    whatsappMessage:
      "Olá, gostaria de mais informações sobre Higienização Interna.",
  },
  {
    icon: ShieldCheck,
    title: "PPF (Paint Protection Film)",
    description:
      "Película transparente de alta proteção que ajuda a preservar a pintura contra riscos leves, sujeira e desgaste diário.",
    image: PPFBg,
    imagePosition: "center 100%",
    whatsappMessage:
      "Olá, gostaria de receber mais informações sobre aplicação de PPF.",
  },
  {
    icon: Shield,
    title: "Vitrificação de pintura",
    description:
      "Aplica uma camada de proteção de alta durabilidade sobre a pintura, ajudando a conservar o brilho e facilitar a limpeza.",
    image: VitrificacaoBg,
    imagePosition: "center 75%",
    whatsappMessage:
      "Olá, gostaria de mais informações sobre Vitrificação de Pintura.",
  },
];

const Services = () => {
  return (
    <section id="service" className="py-20 bg-(--background)">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="mb-4 text-4xl font-bold text-(--gold) md:text-5xl"
          >
            Nossos Serviços
          </motion.h2>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            className="mx-auto max-w-2xl text-xl text-(--muted-foreground)"
          >
            Cuidado, proteção e acabamento premium para valorizar cada detalhe
            do seu veículo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              service.whatsappMessage,
            )}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <article className="group/card relative h-[460px] cursor-pointer overflow-hidden rounded-2xl md:h-[400px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out md:group-hover/card:scale-105"
                    style={{ objectPosition: service.imagePosition }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 transition-all duration-500 md:group-hover/card:bg-black/60" />

                  {/* Content before hover - desktop only */}
                  <div className="absolute inset-0 z-10 hidden items-center justify-center px-6 text-center transition-all duration-500 md:flex md:group-hover/card:scale-95 md:group-hover/card:opacity-0">
                    <div className="flex items-center gap-3 text-white">
                      <Icon className="h-12 w-12" />
                      <h3 className="text-3xl font-bold">{service.title}</h3>
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-7">
                    <div className="translate-y-0 opacity-100 transition-all duration-500 md:translate-y-6 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100">
                      <h3 className="text-3xl font-bold text-white">
                        {service.title}
                      </h3>

                      <div className="mt-5 h-0.5 w-full origin-left rounded-4xl bg-gradient-to-r from-(--gold) via-(--gold)/60 to-transparent transition-transform duration-700 md:w-full md:scale-x-0 md:group-hover/card:scale-x-100" />

                      <p className="mt-4 max-w-[95%] text-base leading-relaxed text-white/80 md:opacity-0 md:transition-all md:duration-500 md:delay-100 md:group-hover/card:opacity-100">
                        {service.description}
                      </p>

                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/btn relative mt-5 inline-flex h-11 items-center justify-center overflow-hidden bg-(--primary) px-5 font-semibold text-black transition-all duration-300 hover:brightness-105 [clip-path:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)]"
                      >
                        <span className="flex items-center gap-2 transition-all duration-300 group-hover/btn:-translate-y-full group-hover/btn:opacity-0">
                          <span>Agendar avaliação</span>
                        </span>

                        <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover/btn:translate-y-0 group-hover/btn:opacity-100">
                          <span>Agendar avaliação</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
