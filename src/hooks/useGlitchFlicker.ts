import { useState, useCallback, useRef } from "react";

const GLITCH_CHARS = "!@#$%^&*<>{}[]|/\\~?=+_";

export const useGlitchFlicker = (original: string, duration = 400) => {
  const [display, setDisplay] = useState(original);
  const timeoutRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    if (timeoutRef.current) return;

    let iterations = 0;
    const maxIterations = 6;
    const interval = duration / maxIterations;

    const glitch = () => {
      if (iterations >= maxIterations) {
        setDisplay(original);
        timeoutRef.current = null;
        return;
      }
      const chars = original
        .split("")
        .map((c) =>
          Math.random() > 0.4
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : c
        )
        .join("");
      setDisplay(chars);
      iterations++;
      timeoutRef.current = window.setTimeout(glitch, interval);
    };

    glitch();
  }, [original, duration]);

  return { display, trigger };
};
