import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";

interface PricingSectionProps {
  onOpenForm: (tier: string) => void;
}

interface TierConfig {
  id: string;
  label: string;
  price: string;
  priceSuffix?: string;
  audience: string;
  features: string[];
  accent?: boolean;
  highlight?: boolean;
  badge?: string;
  cta: string;
}

const tiers: TierConfig[] = [
  {
    id: "community",
    label: "COMMUNITY",
    price: "$29",
    priceSuffix: "/month",
    audience: "Для тех, кто хочет быть в окружении трейдеров и получать рынок каждый день.",
    features: [
      "Daily Morning Calls",
      "Еженедельные стримы и обзоры рынка",
      "Закрытый чат трейдеров",
      "Обмен мнениями и сетапами",
      "Новости и Volatility Calendar",
    ],
    cta: "[ ВОЙТИ В COMMUNITY ]",
  },
  {
    id: "self-education",
    label: "SELF EDUCATION",
    price: "$79",
    audience: "Для тех, кто хочет пройти обучение самостоятельно.",
    features: [
      "Полный записанный курс в Discord",
      "Все 6 модулей системы",
      "Risk management и psychology",
      "Liquidity, сетапы и Smart Money",
      "Journal templates",
      "Lifetime access",
    ],
    cta: "[ ВЫБРАТЬ ]",
  },
  {
    id: "group",
    label: "GROUP PROGRAM",
    price: "$199",
    audience: "Для тех, кто хочет не просто знания, а сопровождение и практику.",
    features: [
      "Почти все материалы курса",
      "1 месяц COMMUNITY бесплатно",
      "Домашние задания + проверка",
      "Доступ к ментору: 1 час раз в 2 недели",
      "Групповые разборы и созвоны",
      "Практика на реальных рынках",
      "Лучшие ученики получают funded account $10k",
    ],
    accent: true,
    cta: "[ ВЫБРАТЬ ]",
  },
  {
    id: "mentorship-solo",
    label: "MENTORSHIP SOLO",
    price: "$990",
    audience: "Для тех, кто хочет дойти до результата максимально быстро.",
    features: [
      "Полное сопровождение 1-on-1 до payout > $1000",
      "Личная работа над дисциплиной",
      "Индивидуальный risk profile",
      "Trade reviews каждой сделки",
      "Прямой контакт с ментором",
      "Помощь с прохождением пропов",
    ],
    highlight: true,
    badge: "LIMITED: 5 SPOTS",
    cta: "[ ЗАБРОНИРОВАТЬ МЕСТО ]",
  },
  {
    id: "mentorship-duo",
    label: "MENTORSHIP DUO",
    price: "$1,290",
    audience: "Для двух друзей или партнёров.",
    features: [
      "Всё из SOLO, но для двух человек",
      "Сопровождение до общего результата > $1200",
      "Совместные сессии и разборы",
      "Парная работа над дисциплиной",
      "Прямой контакт с ментором для обоих",
    ],
    cta: "[ ЗАБРОНИРОВАТЬ ВДВОЁМ ]",
  },
];

const TierCard = ({
  tier,
  index,
  onOpenForm,
}: {
  tier: TierConfig;
  index: number;
  onOpenForm: (t: string) => void;
}) => {
  const { ref: revealRef, style: revealStyle } = useScrollReveal3D(index * 100);
  const tilt = useCardTilt();

  const cardClass = tier.highlight
    ? "glass rounded-sm p-7 flex flex-col transition-all duration-300 h-full relative border-2 border-primary/70 shadow-[0_0_50px_hsl(183_100%_50%/0.15),inset_0_0_30px_hsl(183_100%_50%/0.05)]"
    : tier.accent
    ? "glass rounded-sm p-7 flex flex-col transition-all duration-300 h-full relative module-highlighted"
    : "glass rounded-sm p-7 flex flex-col transition-all duration-300 h-full relative";

  return (
    <div ref={revealRef} style={revealStyle}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={cardClass}
        style={{ transformStyle: "preserve-3d" }}
      >
        {tier.badge && (
          <div className="absolute -top-3 right-5 px-3 py-1 bg-primary/10 border border-primary/50 rounded-sm">
            <span className="font-mono text-[10px] tracking-[0.2em] cyan-text font-bold pulse-cyan whitespace-nowrap">
              {tier.badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            {(tier.accent || tier.highlight) && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />
            )}
            <span
              className={`font-mono text-xs tracking-[0.2em] ${
                tier.highlight ? "cyan-text font-bold" : "text-muted-foreground"
              }`}
            >
              {tier.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <div
              className="font-sans text-3xl md:text-4xl font-bold cyan-text glitch-number"
              style={
                { "--glitch-delay": `${index * 1.2 + 0.3}s` } as React.CSSProperties
              }
            >
              {tier.price}
            </div>
            {tier.priceSuffix && (
              <span className="font-mono text-sm text-muted-foreground/60">
                {tier.priceSuffix}
              </span>
            )}
          </div>
        </div>

        {/* Audience */}
        <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed mb-5 min-h-[3.5rem]">
          {tier.audience}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="font-mono text-xs mt-0.5 shrink-0 cyan-text">[+]</span>
              <span className="font-mono text-xs text-muted-foreground leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onOpenForm(tier.label)}
          className={`w-full font-mono text-xs tracking-[0.15em] py-3.5 transition-all duration-300 ${
            tier.highlight
              ? "border-2 border-primary/60 bg-primary/5 text-primary hover:bg-primary/10 hover:shadow-[0_0_30px_hsl(183_100%_50%/0.2)]"
              : "border border-border bg-transparent text-foreground cta-glow hover:border-primary/40 hover:text-primary"
          }`}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
};

const PricingSection = ({ onOpenForm }: PricingSectionProps) => {
  return (
    <section className="relative py-40 px-6">
      <SectionHeader tag="УРОВНИ ДОСТУПА" title="ВЫБЕРИТЕ ТАРИФ" />
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {tiers.map((tier, i) => (
          <TierCard key={tier.id} tier={tier} index={i} onOpenForm={onOpenForm} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
