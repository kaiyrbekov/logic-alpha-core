import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";

interface PricingSectionProps {
  onOpenForm: (tier: string) => void;
}

const allFeatures = [
  { code: "ACCESS", label: "Безлимитный доступ к 13 модулям системы" },
  { code: "ASSETS", label: "Библиотека торговых сетапов и чек-листов" },
  { code: "DIRECT_FEEDBACK", label: "Прямая связь с менторами в Discord" },
  { code: "SYSTEM_UPDATE", label: "Регулярные обновления контента под текущий рынок" },
  { code: "CORE_VALIDATION", label: "Доступ к ИИ-модулю EQUITY CORE для проверки стратегий" },
  { code: "LIVE_SESSIONS", label: "Участие в еженедельных стримах с разбором графиков" },
  { code: "CHALLENGE_SYNC", label: "Сопровождение при прохождении аттестации в Prop-фирмы" },
  { code: "FINAL_AUDIT", label: "Индивидуальный аудит торгового журнала и допуск к капиталу" },
];

const tiers = [
  {
    id: "self-study",
    label: "SELF-STUDY",
    oldPrice: "$299",
    price: "$199",
    activeCount: 2,
    bonus: "+ 30 дней в комьюнити",
    accent: false,
    limited: false,
  },
  {
    id: "group",
    label: "GROUP",
    oldPrice: "$499",
    price: "$299",
    activeCount: 5,
    bonus: "+ 60 дней в комьюнити",
    accent: true,
    limited: false,
  },
  {
    id: "individual",
    label: "EQUITY PRO",
    oldPrice: "$3,500",
    price: "$1,990",
    activeCount: 8,
    bonus: "LIFETIME ACCESS",
    accent: false,
    limited: true,
  },
];

const PricingCard = ({
  tier,
  index,
  onOpenForm,
}: {
  tier: (typeof tiers)[0];
  index: number;
  onOpenForm: (t: string) => void;
}) => {
  const { ref: revealRef, style: revealStyle } = useScrollReveal3D(index * 120);
  const tilt = useCardTilt();

  return (
    <div ref={revealRef} style={revealStyle}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`glass rounded-sm p-8 flex flex-col transition-all duration-300 h-full relative ${
          tier.accent ? "module-highlighted" : ""
        } ${
          tier.limited
            ? "ring-1 ring-primary/60 shadow-[0_0_40px_hsl(183_100%_50%/0.2)]"
            : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {tier.limited && (
          <div className="absolute -top-3 right-6 px-4 py-1 bg-primary/10 border border-primary/50 rounded-sm">
            <span className="font-mono text-[10px] tracking-[0.2em] cyan-text font-bold pulse-cyan">
              LIMITED: 5 SPOTS
            </span>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {(tier.accent || tier.limited) && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />
            )}
            <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground">
              {tier.label}
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-lg text-muted-foreground/50 line-through decoration-destructive/60">
              {tier.oldPrice}
            </span>
            <div
              className="font-sans text-4xl md:text-5xl font-bold cyan-text glitch-number"
              style={
                { "--glitch-delay": `${index * 1.5 + 0.3}s` } as React.CSSProperties
              }
            >
              {tier.price}
            </div>
          </div>
        </div>

        {/* Feature matrix */}
        <ul className="space-y-3 flex-1 mb-6">
          {allFeatures.map((feature, i) => {
            const active = i < tier.activeCount;
            return (
              <li key={feature.code} className="flex items-start gap-3">
                <span
                  className={`font-mono text-xs mt-0.5 shrink-0 ${
                    active ? "cyan-text" : "text-muted-foreground/30"
                  }`}
                >
                  {active ? "[+]" : "[‒]"}
                </span>
                <span
                  className={`font-mono text-sm ${
                    active
                      ? "text-muted-foreground"
                      : "text-muted-foreground/25 line-through decoration-muted-foreground/20"
                  }`}
                >
                  {feature.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Bonus */}
        <div className="mb-6 py-3 border-t border-border/50">
          <span
            className={`font-mono text-xs tracking-[0.15em] ${
              tier.limited ? "cyan-text font-bold" : "text-muted-foreground"
            }`}
          >
            {tier.bonus}
          </span>
        </div>

        {/* CTA */}
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
