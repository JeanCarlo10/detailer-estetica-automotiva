import { motion } from "framer-motion";
import AboutCarousel from "@/components/AboutCarousel";

const About = () => {
  return (
    <section id="about" className="py-20 bg-(--background)">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-(--gold)">
              Sobre a Luxury Car
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Na Luxury Car, cada veículo recebe um cuidado minucioso, pensado
              para valorizar sua presença, preservar sua originalidade e elevar
              seu padrão estético.
            </p>
            <p className="text-lg text-white/90 mb-8">
              Unimos técnica, produtos de alta performance e atenção absoluta
              aos detalhes para entregar brilho, proteção e acabamento à altura
              de quem busca exclusividade em cada linha do automóvel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <AboutCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
