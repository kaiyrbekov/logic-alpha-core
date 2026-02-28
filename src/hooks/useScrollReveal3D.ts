import { useEffect, useRef, useState } from "react";

export const useScrollReveal3D = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {
    transform: visible
      ? "perspective(800px) rotateX(0deg) translateY(0px)"
      : "perspective(800px) rotateX(8deg) translateY(30px)",
    opacity: visible ? 1 : 0,
    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    transformOrigin: "center bottom",
  };

  return { ref, style };
};
