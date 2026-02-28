import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";

interface PricingSectionProps {
  onOpenForm: (tier: string) => void;
}

const tiers = [
  {
    id: "self-study", label: "SELF-STUDY", price: "$299",
    features: ["Теоретическая база", "Самостоятельная проработка", "Разбор торгового журнала (1 раз)", "Без доступа к ИИ и ДЗ"],
    accent: false,
  },
  {
    id: "group", label: "GROUP SESSION", price: "$499",
    features: ["Все материалы + AI-Backtest", "Morning Calls", "Еженедельные конференции", "Community", "Проверка ДЗ менторами"],
    accent: true,
  },
  {
    id: "individual", label: "INDIVIDUAL", price: "$3,500",
    features: ["Личное сопровождение до результата", "Индивидуальный аудит психологии", "Прямой доступ к ментору 24/7", "Все функции GROUP"],
    accent: false,
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
        className={`glass rounded-sm p-9 flex flex-col transition-all duration-300 h-full ${tier.accent ? "module-highlighted" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-5">
            {tier.accent && <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />}
            <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground">{tier.label}</span>
          </div>
          <div
            className="font-mono text-4xl font-bold cyan-text glitch-number"
            style={{ "--glitch-delay": `${index * 1.5 + 0.3}s` } as React.CSSProperties}
          >
            {tier.price}
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
