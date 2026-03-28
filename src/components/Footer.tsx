import { Facebook, Instagram } from "lucide-react";
import logoImage from "@/assets/Logo_Detailer.png";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";

const Footer = () => {
  return (
    <footer className="bg-(--background) py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <motion.div
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="space-y-6"
          >
            <div className="mb-4">
              <a href="#home" className="cursor-pointer">
                <img
                  src={logoImage}
                  alt="Logo - Detailer Estética Automotiva"
                  width="150"
                  height="85"
                  className="w-[110px] h-auto"
                  fetchPriority="high"
                />
              </a>
            </div>

            <p className="text-(--foreground)">
              Cuidando do seu veículo com excelência e dedicação.
            </p>
          </motion.div>

          <motion.div
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="space-y-6"
          >
            <h2 className="mb-4 text-xl text-(--foreground) font-bold md:flex justify-center">
              Links Rápidos
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href="#home"
                className="text-(--foreground)/70 hover:text-(--foreground) transition-colors duration-400 md:flex justify-center"
              >
                Início
              </a>
              <a
                href="#service"
                className="text-(--foreground)/70 hover:text-(--foreground) transition-colors duration-400 md:flex justify-center"
              >
                Serviços
              </a>
              <a
                href="#about"
                className="text-(--foreground)/70 hover:text-(--foreground) transition-colors duration-400 md:flex justify-center"
              >
                Sobre
              </a>
              <a
                href="#contact"
                className="text-(--foreground)/70 hover:text-(--foreground) transition-colors duration-400 md:flex justify-center"
              >
                Contato
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView={"animate"}
            className="space-y-6"
          >
            <h2 className="mb-4 text-xl text-(--foreground) font-bold md:text-center">
              Horário de atendimento
            </h2>
            <div className="flex flex-col gap-2">
              <span className="text-(--foreground)/70 md:text-center">
                Segunda - Sexta: 8:00h às 18:00h
              </span>
              <span className="text-(--foreground)/70 md:text-center">
                Sábado: 8:00h às 12:00h
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={SlideUp(0.8)}
            initial="initial"
            whileInView={"animate"}
            className="space-y-6"
          >
            <h2 className="mb-4 text-xl font-bold text-(--foreground) md:flex justify-end">
              Redes Sociais
            </h2>
            <div className="flex gap-4 flex-column md:justify-end">
              <a
                href="https://www.facebook.com/profile.php?id=61574149924202"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Acessar página do Facebook"
                className="w-10 h-10 bg-(--sub-card) text-(--foreground) hover:text-(--primary) rounded-lg flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/detailer.esteticaautomotiva/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Acessar página do Instagram"
                className="w-10 h-10 bg-(--sub-card) text-(--foreground) hover:text-(--primary) rounded-lg flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border pt-8 text-center text-xs text-white/70 ">
          <p>
            &copy; {new Date().getFullYear()} Detailer Estética Automotiva. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
