import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import logoImage from "@/assets/Logo_Detailer.png";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "INÍCIO", id: "home" },
  { label: "SERVIÇOS", id: "service" },
  { label: "SOBRE", id: "about" },
  { label: "CONTATO", id: "contact" },
];

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 90);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleActiveSection = () => {
      if (isMobileMenuOpen) return;

      const headerOffset = 120;

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      if (!sections.length) return;

      let currentSection = "home";
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - headerOffset);

        if (rect.top <= headerOffset && distance < smallestDistance) {
          smallestDistance = distance;
          currentSection = section.id;
        }
      });

      if (window.scrollY < 120) {
        currentSection = "home";
      }

      setActiveSection(currentSection);
    };

    handleActiveSection();
    window.addEventListener("scroll", handleActiveSection, { passive: true });
    window.addEventListener("resize", handleActiveSection);

    return () => {
      window.removeEventListener("scroll", handleActiveSection);
      window.removeEventListener("resize", handleActiveSection);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? "bg-(--blur) backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-20 items-center justify-between"
        >
          {/* Logo */}
          <a
            href="#home"
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <img
              src={logoImage}
              alt="Logo - Detailer"
              width={110}
              height={70}
              loading="eager"
              decoding="async"
              className="h-auto w-[clamp(44px,8vw,100px)]"
            />
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav
              className="flex items-center gap-14"
              aria-label="Menu principal"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group relative text-lg font-medium tracking-[0.18em] transition-colors duration-300 ${
                      isActive
                        ? "text-(--gold)"
                        : "text-(--secondary-foreground) hover:text-(--gold)"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-2 left-1/2 h-px -translate-x-1/2 bg-(--gold) transition-all duration-500 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              aria-label={
                isMobileMenuOpen
                  ? "Fechar menu de navegação"
                  : "Abrir menu de navegação"
              }
              className="cursor-pointer"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <div className="flex flex-col gap-1">
                <motion.div
                  className="h-0.5 w-6 bg-white"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="h-0.5 w-6 bg-white"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="h-0.5 w-6 bg-white"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          )}
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/80"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />

              <motion.nav
                aria-label="Menu móvel"
                className="fixed right-0 top-0 z-50 flex h-dvh w-[86%] max-w-[380px] flex-col bg-(--secondary) px-8 pb-8 pt-24 shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  aria-label="Fechar menu de navegação"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute right-5 top-5 cursor-pointer text-white"
                >
                  <X size={28} />
                </button>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex flex-col gap-10">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.id;

                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.id);
                          }}
                          className={`relative w-fit text-left text-3xl transition-colors duration-300 ${
                            isActive
                              ? "text-(--gold)"
                              : "text-white hover:text-(--gold)"
                          }`}
                        >
                          {item.label}
                          <span
                            className={`absolute -bottom-2 left-0 h-px bg-(--gold) transition-all duration-500 ${
                              isActive ? "w-full" : "w-0"
                            }`}
                          />
                        </a>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="group relative mt-10 w-full cursor-pointer overflow-hidden rounded-none border border-(--border-dark) bg-(--gold) px-6 py-6 text-lg font-bold text-black [clip-path:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)]"
                  >
                    <span className="block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                      Agendar
                    </span>
                    <span className="absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Agendar
                    </span>
                  </Button>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
