"use client";

import { useEffect, useRef } from "react";

/**
 * Тёплое свечение за курсором — золото бренда, размытое до пятна света.
 * Двигается с небольшим запаздыванием, чтобы не дёргалось. Только для мыши:
 * на тач-экранах и при prefers-reduced-motion не рисуется вовсе.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let targetX = -1000;
    let targetY = -1000;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let shown = false;

    const tick = () => {
      // Лёгкое запаздывание: пятно догоняет курсор, а не прилипает к нему
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!shown) {
        shown = true;
        x = targetX;
        y = targetY;
        el.classList.add("is-on");
        raf = requestAnimationFrame(tick);
      }
    };
    const leave = () => {
      shown = false;
      el.classList.remove("is-on");
      cancelAnimationFrame(raf);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="glow" aria-hidden="true" />;
}
