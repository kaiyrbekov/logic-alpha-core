import { useEffect, useRef } from "react";

const CHARS = "0123456789ABCDEF$.:/%#&@!*><=~^";
const COLUMNS = 40;
const FONT_SIZE = 11;

const ImmersiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    // Data columns state
    const drops: number[] = [];
    const speeds: number[] = [];

    // NAS100 chart points
    const chartPoints: number[] = [];
    const CHART_POINTS = 120;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const colCount = Math.ceil(w / (w / COLUMNS));
      while (drops.length < colCount) {
        drops.push(Math.random() * h / FONT_SIZE);
        speeds.push(0.3 + Math.random() * 0.7);
      }
      // Generate chart
      chartPoints.length = 0;
      let val = 0.5;
      for (let i = 0; i < CHART_POINTS; i++) {
        val += (Math.random() - 0.48) * 0.06;
        val = Math.max(0.2, Math.min(0.8, val));
        chartPoints.push(val);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let tick = 0;
    const draw = () => {
      tick++;
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, w, h);

      // Draw NAS100 chart line (faint)
      if (chartPoints.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = "hsla(183, 100%, 50%, 0.04)";
        ctx.lineWidth = 1.5;
        const segW = w / (CHART_POINTS - 1);
        const offset = (tick * 0.2) % segW;
        for (let i = 0; i < CHART_POINTS; i++) {
          const x = i * segW - offset;
          const y = h * 0.3 + chartPoints[i] * h * 0.4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glow under chart
        ctx.beginPath();
        ctx.strokeStyle = "hsla(183, 100%, 50%, 0.015)";
        ctx.lineWidth = 8;
        for (let i = 0; i < CHART_POINTS; i++) {
          const x = i * segW - offset;
          const y = h * 0.3 + chartPoints[i] * h * 0.4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw data stream columns
      const colWidth = w / COLUMNS;
      ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`;

      for (let i = 0; i < COLUMNS; i++) {
        if (Math.random() > 0.92) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const x = i * colWidth;
          const y = drops[i] * FONT_SIZE;

          // Primary dim char
          ctx.fillStyle = `hsla(183, 100%, 50%, ${0.03 + Math.random() * 0.06})`;
          ctx.fillText(char, x, y);

          // Occasional brighter flash
          if (Math.random() > 0.97) {
            ctx.fillStyle = `hsla(183, 100%, 50%, ${0.15 + Math.random() * 0.1})`;
            ctx.fillText(char, x, y);
          }

          drops[i] += speeds[i];
          if (drops[i] * FONT_SIZE > h && Math.random() > 0.98) {
            drops[i] = 0;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ImmersiveBackground;
