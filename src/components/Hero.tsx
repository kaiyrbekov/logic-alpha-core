import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useMagneticButton } from "@/hooks/useMagneticButton";

interface HeroProps {
  onOpenForm: (tier?: string) => void;
}

const TARGET_DATE = new Date("2026-03-10T00:00:00");

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, TARGET_DATE.getTime() - now.getTime());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
      });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
};

const pad = (n: number) => String(n).padStart(2, "0");

const Hero = ({ onOpenForm }: HeroProps) => {
  const { d, h, m } = useCountdown();
  const magnetic = useMagneticButton(0.3);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-14">
          <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />
          <span className="font-mono text-sm tracking-[0.3em] text-muted-foreground uppercase">
            System Active / v2.0
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="glitch-hover text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter leading-[0.9] mb-8"
          data-text="EQUITY / СИСТЕМНЫЙ ТРЕЙДИНГ"
        >
          <span className="text-foreground">EQUITY</span>
          <span className="cyan-text mx-3">/</span>
          <br />
          <span className="text-foreground">СИСТЕМНЫЙ</span>
          <br />
          <span className="text-foreground">ТРЕЙДИНГ</span>
        </h1>

        {/* Subheadline */}
        <p className="font-mono text-base md:text-lg tracking-[0.4em] text-muted-foreground mt-10 mb-12">
          SYSTEM OVER INTUITION<span className="cyan-text">.</span>
        </p>

        {/* CTA */}
        <button
          ref={magnetic.ref}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          onClick={() => onOpenForm()}
          className="group relative font-mono text-base tracking-[0.2em] px-12 py-5 border border-border bg-transparent text-foreground transition-all duration-300 cta-glow hover:border-primary/40 hover:text-primary"
          style={{ transition: "transform 0.2s ease-out, border-color 0.3s, color 0.3s, box-shadow 0.3s" }}
        >
          <span className="relative z-10">[ ПОДАТЬ ЗАЯВКУ ]</span>
        </button>

        {/* Timer */}
        <div className="mt-12">
          <div className="font-sans text-base md:text-lg tracking-[0.15em] font-extrabold text-foreground mb-4">
            СТАРТ МАРТОВСКОГО ПОТОКА <span className="cyan-text">ЧЕРЕЗ</span>
          </div>
          <div className="font-mono text-3xl md:text-5xl font-bold tracking-wider cyan-glow-text flex items-center justify-center gap-1 md:gap-2">
            <span className="glitch-number" style={{ "--glitch-delay": "0.3s" } as React.CSSProperties}>{pad(d)}</span>
            <span className="text-muted-foreground/40 text-xl md:text-3xl font-normal">ДНЕЙ</span>
            <span className="text-primary/30 mx-1">:</span>
            <span className="glitch-number" style={{ "--glitch-delay": "1.1s" } as React.CSSProperties}>{pad(h)}</span>
            <span className="text-muted-foreground/40 text-xl md:text-3xl font-normal">ЧАСОВ</span>
            <span className="text-primary/30 mx-1">:</span>
            <span className="glitch-number" style={{ "--glitch-delay": "2.4s" } as React.CSSProperties}>{pad(m)}</span>
            <span className="text-muted-foreground/40 text-xl md:text-3xl font-normal">МИНУТ</span>
          </div>
          <div className="max-w-xs mx-auto mt-5">
            <Progress value={100} className="h-[2px] bg-muted/30 pulse-progress" />
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-3 gap-10 max-w-lg mx-auto">
          {[
            { num: "13", label: "МОДУЛЕЙ" },
            { num: "AI", label: "BACKTEST" },
            { num: "24/7", label: "МЕНТОРИНГ" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono text-3xl font-bold cyan-text mb-2 glitch-number"
                style={{ "--glitch-delay": `${i * 1.7 + 0.5}s` } as React.CSSProperties}
              >
                {stat.num}
              </div>
              <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
