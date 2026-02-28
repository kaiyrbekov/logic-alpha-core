import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

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

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            System Active / v2.0
          </span>
        </div>

        {/* Main headline with glitch */}
        <h1
          className="glitch-hover text-5xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tighter leading-[0.9] mb-6"
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
        <p className="font-mono text-sm md:text-base tracking-[0.4em] text-muted-foreground mt-8 mb-10">
          SYSTEM OVER INTUITION<span className="cyan-text">.</span>
        </p>

        {/* CTA */}
        <button
          onClick={() => onOpenForm()}
          className="group relative font-mono text-sm tracking-[0.2em] px-10 py-4 border border-border bg-transparent text-foreground transition-all duration-300 cta-glow hover:border-primary/40 hover:text-primary"
        >
          <span className="relative z-10">[ ПОДАТЬ ЗАЯВКУ ]</span>
        </button>

        {/* Timer — prominent */}
        <div className="mt-10">
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/50 mb-3">
            СТАРТ МАРТОВСКОГО ПОТОКА ЧЕРЕЗ
          </div>
          <div className="font-mono text-2xl md:text-4xl font-bold tracking-wider cyan-glow-text flex items-center justify-center gap-1 md:gap-2">
            <span className="glitch-number" style={{ "--glitch-delay": "0.3s" } as React.CSSProperties}>{pad(d)}</span>
            <span className="text-muted-foreground/40 text-lg md:text-2xl font-normal">ДНЕЙ</span>
            <span className="text-primary/30 mx-1">:</span>
            <span className="glitch-number" style={{ "--glitch-delay": "1.1s" } as React.CSSProperties}>{pad(h)}</span>
            <span className="text-muted-foreground/40 text-lg md:text-2xl font-normal">ЧАСОВ</span>
            <span className="text-primary/30 mx-1">:</span>
            <span className="glitch-number" style={{ "--glitch-delay": "2.4s" } as React.CSSProperties}>{pad(m)}</span>
            <span className="text-muted-foreground/40 text-lg md:text-2xl font-normal">МИНУТ</span>
          </div>
          {/* Subtle pulsing progress bar */}
          <div className="max-w-xs mx-auto mt-4">
            <Progress value={100} className="h-[2px] bg-muted/30 pulse-progress" />
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { num: "13", label: "МОДУЛЕЙ" },
            { num: "AI", label: "BACKTEST" },
            { num: "24/7", label: "МЕНТОРИНГ" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono text-2xl font-bold cyan-text mb-1 glitch-number"
                style={{ "--glitch-delay": `${i * 1.7 + 0.5}s` } as React.CSSProperties}
              >
                {stat.num}
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
