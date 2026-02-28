import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";

interface PricingSectionProps {
  onOpenForm: (tier: string) => void;
}

const tiers = [
  {
    id: "self-study", label: "SELF-STUDY", oldPrice: "$299", price: "$199",
    features: ["13 модулей обучения", "Доступ к базе знаний", "Бессрочный доступ к материалам", "Без домашних заданий", "Без доступа к ИИ"],
    accent: false, limited: false,
  },
  {
    id: "group", label: "GROUP", oldPrice: "$499", price: "$299",
    features: ["Все из «Self-Study»", "Закрытый Discord-комьюнити", "Еженедельные разборы рынка", "Поддержка кураторов", "Доступ к ИИ", "Ежедневные домашние задания"],
    accent: true, limited: false,
  },
  {
    id: "individual", label: "EQUITY PRO", oldPrice: "$3,500", price: "$1,990",
    features: ["Все из «Group»", "Личное менторство", "Stage 05 — Гарантия результата", "Индивидуальные созвоны", "Помощь с получением $50k+ в Prop-фирме"],
    accent: false, limited: true,
  },
];

const PricingCard = ({ tier, index, onOpenForm }: { tier: typeof tiers[0]; index: number; onOpenForm: (t: string) => void }) => {
  const { ref: revealRef, style: revealStyle } = useScrollReveal3D(index * 120);
  const tilt = useCardTilt();

  return (
    <div ref={revealRef} style={revealStyle}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`glass rounded-sm p-9 flex flex-col transition-all duration-300 h-full relative ${tier.accent ? "module-highlighted" : ""} ${tier.limited ? "ring-1 ring-primary/60 shadow-[0_0_30px_hsl(183_100%_50%/0.15)]" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {tier.limited && (
          <div className="absolute -top-3 right-6 px-4 py-1 bg-primary/10 border border-primary/50 rounded-sm">
            <span className="font-mono text-[10px] tracking-[0.2em] cyan-text font-bold pulse-cyan">LIMITED: 5 SPOTS</span>
          </div>
        )}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-5">
            {(tier.accent || tier.limited) && <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />}
            <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground">{tier.label}</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-lg text-muted-foreground/50 line-through decoration-destructive/60">{tier.oldPrice}</span>
            <div
              className="font-sans text-4xl md:text-5xl font-bold cyan-text glitch-number"
              style={{ "--glitch-delay": `${index * 1.5 + 0.3}s` } as React.CSSProperties}
            >
              {tier.price}
            </div>
          </div>
        </div>
        <ul className="space-y-4 flex-1 mb-9">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-primary/40 mt-2.5 shrink-0" />
              <span className="font-body text-base text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onOpenForm(tier.label)}
          className="w-full font-mono text-sm tracking-[0.15em] py-4 border border-border bg-transparent text-foreground transition-all duration-300 cta-glow hover:border-primary/40 hover:text-primary"
        >
          [ ВЫБРАТЬ ]
        </button>
      </div>
    </div>
  );
};

const PricingSection = ({ onOpenForm }: PricingSectionProps) => {
  return (
    <section className="relative py-40 px-6">
      <SectionHeader tag="УРОВНИ ДОСТУПА" title="ВЫБЕРИТЕ ТАРИФ" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.id} tier={tier} index={i} onOpenForm={onOpenForm} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
