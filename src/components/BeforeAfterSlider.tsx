import React, { useCallback, useEffect, useRef, useState } from "react";
import { SeparatorVertical } from "lucide-react";

type FooterInfo = {
  title: string;
  description?: string;
};

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  aspectRatio?: string;
  className?: string;
  footerInfo?: FooterInfo;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function BeforeAfterComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Carro antes do serviço",
  afterAlt = "Carro depois do serviço",
  beforeLabel = "Antes",
  afterLabel = "Depois",
  initialPosition = 50,
  aspectRatio = "16 / 10",
  className = "",
  footerInfo = {
    title: "",
    description: "",
  },
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(
    clamp(initialPosition, 0, 100),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const updateSliderPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = (x / rect.width) * 100;
    setSliderPosition(clamp(next, 0, 100));
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setIsHovered(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      updateSliderPosition(event.clientX);
    },
    [updateSliderPosition],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      updateSliderPosition(event.clientX);
    },
    [isDragging, updateSliderPosition],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const step = event.shiftKey ? 10 : 2;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSliderPosition((prev) => clamp(prev - step, 0, 100));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSliderPosition((prev) => clamp(prev + step, 0, 100));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setSliderPosition(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setSliderPosition(100);
      }
    },
    [],
  );

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("pointerup", stopDragging);

    return () => window.removeEventListener("pointerup", stopDragging);
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-(--card) border-2 border-white/10 shadow-sm ${className}`}
    >
      <div
        ref={containerRef}
        style={{ aspectRatio }}
        className={`group relative w-full overflow-hidden bg-neutral-900 select-none touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        // className="group relative w-full overflow-hidden bg-neutral-900"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => !isDragging && setIsHovered(false)}
        onPointerEnter={() => setIsHovered(true)}
      >
        {/* AFTER IMAGE */}
        <img
          src={afterImage}
          alt={afterAlt}
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* BEFORE IMAGE */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{
            width: `${sliderPosition}%`,
            transition: isDragging
              ? "none"
              : "width 350ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            draggable={false}
            className="absolute inset-0 h-full w-full max-w-none select-none object-cover"
          />
        </div>

        {/* OVERLAYS */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/20 to-transparent" />

        {/* LABELS */}
        <div className="pointer-events-none absolute left-3 top-3 z-20 sm:left-5 sm:top-5">
          <span className="rounded-2xl bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm sm:px-4 sm:text-sm">
            {beforeLabel}
          </span>
        </div>

        <div className="pointer-events-none absolute right-3 top-3 z-20 sm:right-5 sm:top-5">
          <span className="rounded-2xl bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm sm:px-4 sm:text-sm">
            {afterLabel}
          </span>
        </div>

        {/* CENTER DIVIDER */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20"
          style={{
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
            transition: isDragging
              ? "none"
              : "left 350ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="relative h-full w-px bg-white/90">
            <div className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md" />
          </div>
        </div>

        {/* DRAG HANDLE */}
        <button
          type="button"
          role="slider"
          tabIndex={0}
          aria-label="Comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          onKeyDown={handleKeyDown}
          className={`absolute top-1/2 z-30 -translate-y-1/2 outline-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            left: `${sliderPosition}%`,
            transform: "translate(-50%, -50%)",
            transition: isDragging
              ? "none"
              : "left 350ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition-all duration-300 sm:h-14 sm:w-14 ${
              isDragging || isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <span
              className={`flex items-center justify-center ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              <SeparatorVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </span>
        </button>
      </div>

      {/* FOOTER INFO */}
      <div className="space-y-2 px-5 py-5 sm:px-6 sm:py-6">
        {footerInfo.title && (
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            {footerInfo.title}
          </p>
        )}

        <h3 className="text-xl font-semibold tracking-tight text-white">
          {footerInfo.description}
        </h3>
      </div>
    </div>
  );
}
