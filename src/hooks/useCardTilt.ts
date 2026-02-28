import { useRef, useCallback } from "react";

export const useCardTilt = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 12;
    const rotateY = (x - 0.5) * 12;

    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    // Inner glow follows cursor
    el.style.boxShadow = `
      ${(x - 0.5) * 30}px ${(y - 0.5) * 30}px 60px hsl(183 100% 50% / 0.12),
      inset ${(x - 0.5) * 20}px ${(y - 0.5) * 20}px 40px hsl(183 100% 50% / 0.04)
    `;
    el.style.borderColor = "hsl(183 100% 50% / 0.3)";
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = "";
    el.style.borderColor = "";
  }, []);

  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
};
