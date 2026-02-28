import { useState, useEffect } from "react";

interface HeroProps {
  onOpenForm: (tier?: string) => void;
}

const TARGET_DATE = new Date("2026-03-10T00:00:00");

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, TARGET_DATE.getTime() - now.getTime());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
};

const pad = (n: number) => String(n).padStart(2, "0");

const Hero = ({ onOpenForm }: HeroProps) => {
  const { d, h, m, s } = useCountdown();

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

        {/* Timer */}
        <div className="mt-8 font-mono text-[11px] tracking-wider text-muted-foreground/60">
          <span className="text-muted-foreground/40">STATUS:</span>{" "}
          <span className="text-primary/70">ENROLLMENT_OPEN</span>{" "}
          <span className="text-muted-foreground/30">//</span>{" "}
          <span className="text-muted-foreground/40">START_DATE:</span>{" "}
          <span className="text-foreground/60">10_MARCH</span>{" "}
          <span className="text-muted-foreground/30">//</span>{" "}
          <span className="text-muted-foreground/40">TIME_LEFT:</span>{" "}
          <span className="cyan-text">
            <span className="ghost-number" style={{ "--ghost-delay": "0.3s" } as React.CSSProperties}>{pad(d)}</span>
            :
            <span className="ghost-number" style={{ "--ghost-delay": "1.1s" } as React.CSSProperties}>{pad(h)}</span>
            :
            <span className="ghost-number" style={{ "--ghost-delay": "2.4s" } as React.CSSProperties}>{pad(m)}</span>
            :
            <span className="ghost-number" style={{ "--ghost-delay": "0.7s" } as React.CSSProperties}>{pad(s)}</span>
          </span>
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { num: "13", label: "МОДУЛЕЙ" },
            { num: "AI", label: "BACKTEST" },
            { num: "24/7", label: "МЕНТОРИНГ" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono text-2xl font-bold cyan-text mb-1 ghost-number"
                style={{ "--ghost-delay": `${i * 1.7 + 0.5}s` } as React.CSSProperties}
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
