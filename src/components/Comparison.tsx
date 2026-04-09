import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AudiAntes from "@/assets/Audi_Antes.png";
import AudiDepois from "@/assets/Audi_Depois.png";
import CivicAntes from "@/assets/Civic_Antes.png";
import CivicDepois from "@/assets/Civic_Depois.png";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";

const comparisons = [
  {
    before: AudiAntes,
    after: AudiDepois,
    footerInfo: {
      title: "Proteção premium",
      description: "Vitrificação de pintura",
    },
  },
  {
    before: CivicAntes,
    after: CivicDepois,
    footerInfo: {
      title: "Recuperação",
      description: "Recuperação da lataria e pintura",
    },
  },
];

export default function ComparisonSection() {
  return (
    <section className="pt-10 pb-20 bg-(--background)">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-4xl text-(--primary) md:text-5xl font-bold mb-4"
          >
            Resultados que impressionam
          </motion.h2>
          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="text-lg text-(--muted-foreground) max-w-2xl mx-auto"
          >
            Antes e depois reais que mostram o padrão de acabamento, brilho e
            cuidado em cada detalhe.
          </motion.p>
        </div>

        <div className="w-full grid gap-6 md:grid-cols-2">
          {comparisons.map((item, index) => (
            <BeforeAfterSlider
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              initialPosition={50}
              aspectRatio="4 / 3"
              footerInfo={item.footerInfo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
