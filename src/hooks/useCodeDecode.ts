import { useState, useCallback, useRef } from "react";

const CHARS = "!@#$%^&*<>{}[]|/\\~?=+_01";

export const useCodeDecode = (original: string, duration = 500) => {
  const [display, setDisplay] = useState(original);
  const running = useRef(false);

  const trigger = useCallback(() => {
    if (running.current) return;
    running.current = true;

    let iteration = 0;
    const maxIterations = 8;
    const interval = duration / maxIterations;

    const step = () => {
      if (iteration >= maxIterations) {
        setDisplay(original);
        running.current = false;
        return;
      }
      const ratio = iteration / maxIterations;
      const chars = original
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          return i / original.length < ratio
            ? c
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(chars);
      iteration++;
      setTimeout(step, interval);
    };

    step();
  }, [original, duration]);

  return { display, trigger };
};
