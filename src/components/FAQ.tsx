import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SlideUp } from "@/animations";

const faqs = [
  {
    question: "Quanto tempo dura a vitrificação de pintura?",
    answer:
      "A durabilidade pode variar conforme o produto aplicado, a rotina de uso do veículo e os cuidados de manutenção. Em geral, a vitrificação oferece proteção prolongada e ajuda a manter o brilho e a facilidade na limpeza por muito mais tempo.",
  },
  {
    question: "Qual a diferença entre polimento técnico e vitrificação?",
    answer:
      "O polimento técnico corrige imperfeições como microrriscos, marcas leves e perda de brilho da pintura. Já a vitrificação é uma etapa de proteção, aplicada após a correção, criando uma camada que ajuda a preservar o acabamento e facilitar a conservação.",
  },
  {
    question: "PPF protege contra quais tipos de danos?",
    answer:
      "O PPF é uma película transparente de proteção que ajuda a preservar a pintura contra riscos leves, impactos de pequenas pedras, sujeiras do uso diário, marcas superficiais e desgaste natural, mantendo o visual do veículo por mais tempo.",
  },
  {
    question: "A higienização interna remove odores e manchas?",
    answer:
      "Sim. A higienização interna é feita para limpar profundamente bancos, carpetes, forros, painel e demais superfícies, ajudando a remover sujeiras, manchas e odores, além de proporcionar mais conforto e sensação de cuidado no interior do veículo.",
  },
  {
    question: "Com que frequência devo fazer estética automotiva no meu carro?",
    answer:
      "Isso depende do uso do veículo, da exposição ao sol, chuva e sujeira, além do padrão de cuidado desejado. Lavagens técnicas e manutenções periódicas ajudam a preservar os resultados, enquanto serviços como polimento, vitrificação e higienização podem ser programados conforme a necessidade.",
  },
  {
    question: "O polimento remove todos os riscos da pintura?",
    answer:
      "O polimento técnico melhora significativamente o aspecto da pintura e pode remover ou suavizar microrriscos, marcas leves e opacidade. Porém, riscos mais profundos dependem de avaliação técnica, pois nem sempre é possível eliminá-los completamente sem comprometer o verniz.",
  },
  {
    question: "Depois da vitrificação ou do PPF, quais cuidados devo ter?",
    answer:
      "Após a aplicação, é importante seguir as orientações de manutenção, evitando produtos agressivos, lavagens inadequadas e métodos abrasivos. Com os cuidados corretos, o acabamento permanece mais bonito, protegido e com melhor desempenho por mais tempo.",
  },
  {
    question: "Vocês atendem veículos premium e esportivos?",
    answer:
      "Sim. Trabalhamos com estética automotiva voltada para veículos que exigem alto padrão de acabamento, proteção e atenção aos detalhes, sempre com processos cuidadosos, produtos de qualidade e foco em resultado premium.",
  },
];

// Animação do accordion
const container: Variants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const FAQ = () => {
  return (
    <section id="dicas" className="bg-(--background) pb-20">
      <div className="container mx-auto overflow-hidden px-6 md:px-8">
        <div className="mb-12 text-center">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="mb-4 text-4xl text-(--primary) font-bold md:text-5xl"
          >
            Dúvidas sobre estética automotiva
          </motion.h2>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="mx-auto max-w-2xl text-lg text-(--muted-foreground)"
          >
            Tire suas principais dúvidas sobre proteção, acabamento e cuidados
            premium para o seu veículo.
          </motion.p>
        </div>

        <div className="mx-auto">
          <Accordion type="single" collapsible>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={item}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="rounded-2xl border border-white/10 bg-(--card) px-5"
                  >
                    <AccordionTrigger className="group cursor-pointer text-white text-left hover:no-underline [&>svg]:hidden">
                      <div className="flex w-full items-center justify-between gap-6">
                        <span className="pr-2 text-base text-white hover:text-(--primary)">
                          {faq.question}
                        </span>

                        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25">
                          <span className="absolute h-0.5 w-4 rounded-full bg-white transition-all duration-300" />
                          <span className="absolute h-4 w-0.5 rounded-full bg-white transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:scale-y-0" />
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="text-(--muted-foreground) leading-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </motion.div>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
