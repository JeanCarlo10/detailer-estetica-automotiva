import { MapPin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { IMaskInput } from "react-imask";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";

const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome obrigatório!" })
    .max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido!" })
    .max(255, { message: "E-mail deve ter menos de 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Telefone obrigatório!" })
    .max(20, { message: "Telefone deve ter menos de 20 caracteres" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Mensagem obrigatória!" })
    .max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const WHATSAPP_NUMBER = "5545998054299";
const WHATSAPP_TEXT = "Olá! Gostaria de agendar um atendimento.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT,
)}`;

const Contact = () => {
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    const serviceTextMap: Record<string, string> = {
      higienizacao: "Higienização interna",
      polimento: "Polimento técnico",
      ppf: "PPF (Paint Protection Film)",
      vitrificacao: "Vitrificação de pintura",
      outro: "Outro",
    };

    const serviceText =
      serviceTextMap[data.service] || "Serviço não especificado";

    let message;
    if (data.service === "outro") {
      message = `Olá!\n\nNome: ${data.name}\nE-mail: ${data.email}\nTelefone: ${data.phone}\nServiço: ${serviceText}\nMensagem: ${data.message}`;
    } else {
      message = `Olá! Gostaria de solicitar um orçamento:\n\nNome: ${data.name}\nE-mail: ${data.email}\nTelefone: ${data.phone}\nServiço: ${serviceText}\nMensagem: ${data.message}`;
    }

    const encodedMessage = encodeURIComponent(message);

    const WHATSAPP_CONTACT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(WHATSAPP_CONTACT, "_blank", "noopener,noreferrer");

    toast.success(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    );

    form.reset({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="pt-10 pb-20 bg-(--background)">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-4xl text-(--primary) md:text-5xl font-bold mb-4"
          >
            Agende seu atendimento
          </motion.h2>
          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="text-lg text-(--muted-foreground) max-w-2xl mx-auto"
          >
            Estamos prontos para oferecer cuidado premium, proteção e acabamento
            impecável ao seu veículo.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-6 bg-(--card) border border-white/10"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-(--foreground) text-3xl font-semibold">
                Solicitar Orçamento
              </h1>
              <span className="text-(--foreground)/60 text-sm mb-8">
                Preencha o formulário e entraremos em contato
              </span>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold text-(--foreground)">
                        Nome <span className="text-(--ring)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          className="h-10 w-full rounded-md border border-(--border-dark) bg-black px-3 py-2 text-white shadow-none placeholder:italic placeholder:text-white/40 focus:border-(--primary) focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage className="text-(--ring)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold text-(--foreground)">
                        E-mail <span className="text-(--ring)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu@email.com"
                          className="h-10 w-full rounded-md border border-(--border-dark) bg-black px-3 py-2 text-white shadow-none placeholder:italic placeholder:text-white/40 focus:border-(--primary) focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage className="text-(--ring)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold text-(--foreground)">
                        Telefone <span className="text-(--ring)">*</span>
                      </FormLabel>
                      <FormControl>
                        <IMaskInput
                          {...field}
                          mask="(00) 00000-0000"
                          placeholder="(99) 99999-9999"
                          className="h-10 w-full rounded-md border border-(--border-dark) bg-black px-3 py-2 text-white shadow-none placeholder:italic placeholder:text-white/40 focus:border-(--primary) focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage className="text-(--ring)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold text-(--foreground)">
                        Serviço <span className="text-(--ring)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="service"
                          render={({ field: controllerField }) => (
                            <Select
                              {...controllerField}
                              defaultValue={field.value}
                              onValueChange={controllerField.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10 w-full rounded-md border border-(--border-dark) bg-black px-3 py-2 text-white shadow-none data-[placeholder]:italic data-[placeholder]:text-white/40 focus:border-(--primary) focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                  <SelectValue placeholder="Selecione o serviço" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent className="border-(--card) bg-(--secondary)">
                                <SelectItem
                                  value="higienizacao"
                                  className="text-(--primary) hover:bg-(background) focus:bg-(--background)"
                                >
                                  Higienização interna
                                </SelectItem>
                                <SelectItem
                                  value="polimento"
                                  className="text-(--primary) hover:bg-(background) focus:bg-(--background)"
                                >
                                  Polimento técnico
                                </SelectItem>
                                <SelectItem
                                  value="ppf"
                                  className="text-(--primary) hover:bg-(background) focus:bg-(--background)"
                                >
                                  PPF
                                </SelectItem>
                                <SelectItem
                                  value="vitrificacao"
                                  className="text-(--primary) hover:bg-(background) focus:bg-(--background)"
                                >
                                  Vitrificação de pintura
                                </SelectItem>
                                <SelectItem
                                  value="outro"
                                  className="text-(--primary) hover:bg-(background) focus:bg-(--background)"
                                >
                                  Outro
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-(--ring)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold text-(--foreground)">
                        Mensagem <span className="text-(--ring)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Descreva o serviço desejado..."
                          className="min-h-[120px] w-full rounded-md border border-(--border-dark) bg-black px-3 py-2 text-white shadow-none placeholder:italic placeholder:text-white/40 focus:border-(--primary) focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage className="text-(--ring)" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-(--border-dark) bg-(--primary) px-6 py-6 text-lg font-bold text-black"
                >
                  <span className="block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                    Enviar solicitação
                  </span>
                  <span className="absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Enviar solicitação
                  </span>
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-8">
              <div className="rounded-2xl p-6 bg-(--card) border border-white/10 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row">
                  <div className="min-w-12 min-h-12 w-12 h-12 bg-(--sub-card) rounded-full flex items-center justify-center mr-4 mb-1">
                    <FaWhatsapp className="w-6 h-6 text-(--primary)" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white text-lg font-semibold">
                      WhatsApp
                    </span>

                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 text-base font-medium hover:underline"
                      aria-label="Abrir conversa no WhatsApp"
                    >
                      (45) 99805-4299
                    </a>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="min-w-12 min-h-12 w-12 h-12 bg-(--sub-card) rounded-full flex items-center justify-center mr-4 mb-1">
                    <Mail className="w-6 h-6 text-(--primary)" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-semibold">
                      E-mail
                    </span>
                    <a
                      className="text-white/70 sm:text-base md:text-sm lg:text-base"
                      href="mailto:detailer@gmail.com"
                    >
                      detailer@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="min-w-12 min-h-12 w-12 h-12 bg-(--sub-card) rounded-full flex items-center justify-center mr-4 mb-1">
                    <MapPin className="w-6 h-6 text-(--primary)" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-semibold">
                      Endereço
                    </span>
                    <span className="text-white/70 text-base flex-wrap">
                      Av. Silvio Américo Sasdelli, 3176 - Lancaster, Foz do
                      Iguaçu - PR
                    </span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl p-4 overflow-hidden bg-(--card) border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.330047496725!2d-54.55200329999999!3d-25.494037000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f6914065d647b1%3A0xfdd5740410ffacef!2sDetailer%20Est%C3%A9tica%20Automotiva!5e0!3m2!1spt-BR!2sbr!4v1774673238222!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="350"
                  style={{ borderRadius: 4 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de localização da empresa"
                  aria-label="Mapa mostrando a localização da empresa"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
