import React, { Suspense, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const Reviews = React.lazy(() => import("@/components/Reviews"));
const Services = React.lazy(() => import("@/components/Services"));
const About = React.lazy(() => import("@/components/About"));
const FAQ = React.lazy(() => import("@/components/FAQ"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));
const WhatsAppButton = React.lazy(() => import("@/components/WhatsAppButton"));

function LazyOnView({
  children,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{show ? children : null}</div>;
}

function WhatsAppDeferred() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof window.setTimeout> | undefined;

    if ("requestIdleCallback" in window) {
      const idleId = (window as any).requestIdleCallback(() => setShow(true), {
        timeout: 3000,
      });

      return () => {
        (window as any).cancelIdleCallback?.(idleId);
      };
    }

    // fallback
    timeoutId = setTimeout(() => setShow(true), 2000);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <WhatsAppButton />
    </Suspense>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />

      <main>
        <Hero />

        <LazyOnView>
          <Suspense fallback={null}>
            <Services />
          </Suspense>
        </LazyOnView>

        <LazyOnView>
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </LazyOnView>

        <LazyOnView>
          <Suspense fallback={null}>
            <Reviews />
          </Suspense>
        </LazyOnView>

        <LazyOnView>
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
        </LazyOnView>

        <LazyOnView>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </LazyOnView>

        <LazyOnView>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </LazyOnView>

        {/* Carrega depois, fora da cadeia crítica */}
        <WhatsAppDeferred />
      </main>
    </div>
  );
};

export default Index;
