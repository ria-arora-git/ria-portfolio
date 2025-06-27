
"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

export default function CarouselMotionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);


  useAnimationFrame((_, delta) => {
    if (!paused) {
      x.set(x.get() - delta * 0.05);
      const containerWidth = containerRef.current?.scrollWidth || 0;
      if (Math.abs(x.get()) >= containerWidth / 2) x.set(0);
    }
  });


  const scrollBy = (offset: number) => {
    setPaused(true);
    x.set(x.get() + offset);
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0a0f29] text-white px-3 py-2 z-10 rounded-r hover:bg-cyan-700 transition"
        onClick={() => scrollBy(150)}
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0a0f29] text-white px-3 py-2 z-10 rounded-l hover:bg-cyan-700 transition"
        onClick={() => scrollBy(-150)}
      >
        →
      </button>

      {/* Carousel Content */}
      <motion.div
        className="flex gap-6 w-max"
        style={{ x }}
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {children}
      </motion.div>
    </div>
  );
}
