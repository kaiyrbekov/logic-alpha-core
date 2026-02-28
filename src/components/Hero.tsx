import { useState } from "react";
import IntakeFormModal from "@/components/IntakeFormModal";

interface HeroProps {
  onOpenForm: (tier?: string) => void;
}

const Hero = ({ onOpenForm }: HeroProps) => {
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
        <p className="font-mono text-sm md:text-base tracking-[0.4em] text-muted-foreground mt-8 mb-16">
          SYSTEM OVER INTUITION<span className="cyan-text">.</span>
        </p>

        {/* CTA */}
        <button
          onClick={() => onOpenForm()}
          className="group relative font-mono text-sm tracking-[0.2em] px-10 py-4 border border-border bg-transparent text-foreground transition-all duration-300 cta-glow hover:border-primary/40 hover:text-primary"
        >
          <span className="relative z-10">[ ПОДАТЬ ЗАЯВКУ ]</span>
        </button>

        {/* Bottom stats */}
        <div className="mt-24 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { num: "13", label: "МОДУЛЕЙ" },
            { num: "AI", label: "BACKTEST" },
            { num: "24/7", label: "МЕНТОРИНГ" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl font-bold cyan-text mb-1">{stat.num}</div>
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
