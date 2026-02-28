import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";

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
  const { ref, style } = useScrollReveal3D(index * 120);

  return (
    <div ref={ref} style={style}>
      <div
        className={`glass rounded-sm p-8 flex flex-col transition-all duration-300 card-hover-glow hover:border-primary/20 h-full ${
          tier.accent ? "module-highlighted" : ""
        }`}
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {tier.accent && <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />}
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{tier.label}</span>
          </div>
          <div
            className="font-mono text-3xl font-bold cyan-text glitch-number"
            style={{ "--glitch-delay": `${index * 1.5 + 0.3}s` } as React.CSSProperties}
          >
            {tier.price}
          </div>
        </div>
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 shrink-0" />
              <span className="font-body text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onOpenForm(tier.label)}
          className="w-full font-mono text-xs tracking-[0.15em] py-3 border border-border bg-transparent text-foreground transition-all duration-300 cta-glow hover:border-primary/40 hover:text-primary"
        >
          [ ВЫБРАТЬ ]
        </button>
      </div>
    </div>
  );
};

const PricingSection = ({ onOpenForm }: PricingSectionProps) => {
  return (
    <section className="relative py-32 px-6">
      <SectionHeader tag="УРОВНИ ДОСТУПА" title="ВЫБЕРИТЕ ТАРИФ" />
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.id} tier={tier} index={i} onOpenForm={onOpenForm} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
