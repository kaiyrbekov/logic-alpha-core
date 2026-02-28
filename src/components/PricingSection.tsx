import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingSectionProps {
  onOpenForm: (tier: string) => void;
}

const EQUITY_CORE_DESCRIPTION =
  "EQUITY CORE — это проприетарный AI-алгоритм валидации. Он анализирует твой торговый сетап по 20+ параметрам ликвидности и математического ожидания, отсеивая эмоциональные входы и оставляя только высоковероятные сделки. Это твой цифровой предохранитель.";

const standardFeatures = [
  { code: "ACCESS", label: "Безлимитный доступ к 13 модулям системы" },
  { code: "ASSETS", label: "Библиотека торговых сетапов и чек-листов" },
  { code: "DIRECT_FEEDBACK", label: "Прямая связь с менторами в Discord" },
  { code: "SYSTEM_UPDATE", label: "Регулярные обновления контента под текущий рынок" },
  { code: "CORE_VALIDATION", label: "Доступ к ИИ-модулю EQUITY CORE для проверки стратегий", hasTooltip: true },
  { code: "LIVE_SESSIONS", label: "Участие в еженедельных стримах с разбором графиков" },
  { code: "CHALLENGE_SYNC", label: "Сопровождение при прохождении аттестации в Prop-фирмы" },
  { code: "FINAL_AUDIT", label: "Индивидуальный аудит торгового журнала и допуск к капиталу" },
];

const homeworkFeature = {
  code: "HOMEWORK",
  labels: {
    "self-study": "Индивидуальный разбор ДЗ",
    group: "Групповой разбор заданий кураторами",
    elite: "Личный аудит торгового журнала и каждой сделки автором",
  },
};

const eliteFeatures = [
  { code: "PARTNERSHIP", label: "Мы работаем в паре до тех пор, пока ты не выйдешь на стабильный доход. Мой опыт — твой актив." },
  { code: "24/7 SUPPORT", label: "Личный контакт со мной в Telegram. Разбор каждого твоего сетапа и входа в реальном времени." },
  { code: "CUSTOM_SYSTEM", label: "Адаптация стратегии под твой психологический профиль и рабочий график." },
  { code: "PROP_GUIDE", label: "Пошаговое сопровождение через аттестацию в Prop-фирмы для получения капитала в $50,000+." },
  { code: "LIFETIME", label: "Пожизненный доступ ко всем будущим модулям и закрытому комьюнити без подписок." },
];

interface TierConfig {
  id: string;
  label: string;
  oldPrice: string;
  price: string;
  activeCount: number;
  bonus: string;
  accent: boolean;
  limited: boolean;
  tagline?: string;
  isElite?: boolean;
}

const tiers: TierConfig[] = [
  {
    id: "self-study",
    label: "SELF-STUDY",
    oldPrice: "$299",
    price: "$199",
    activeCount: 4,
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
    id: "elite",
    label: "EQUITY ELITE",
    oldPrice: "$3,500",
    price: "$1,990",
    activeCount: 8,
    bonus: "LIFETIME ACCESS",
    accent: false,
    limited: true,
    tagline: "Персональный фокус. Бессрочный результат.",
    isElite: true,
  },
];

const FeatureItem = ({
  code,
  label,
  active,
  hasTooltip,
}: {
  code: string;
  label: string;
  active: boolean;
  hasTooltip?: boolean;
}) => {
  const content = (
    <li className="flex items-start gap-3">
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
        {hasTooltip && active ? (
          <span className="border-b border-dashed border-primary/40 cursor-help">
            {label}
          </span>
        ) : (
          label
        )}
      </span>
    </li>
  );

  if (hasTooltip && active) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs bg-card border-border text-muted-foreground font-mono text-xs p-4"
        >
          {EQUITY_CORE_DESCRIPTION}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

const StandardCard = ({
  tier,
  index,
  onOpenForm,
}: {
  tier: TierConfig;
  index: number;
  onOpenForm: (t: string) => void;
}) => {
  const { ref: revealRef, style: revealStyle } = useScrollReveal3D(index * 120);
  const tilt = useCardTilt();
  const hwActive = tier.id === "group";
  const hwLabel =
    tier.id === "group"
      ? homeworkFeature.labels.group
      : homeworkFeature.labels["self-study"];

  return (
    <div ref={revealRef} style={revealStyle}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`glass rounded-sm p-8 flex flex-col transition-all duration-300 h-full relative ${
          tier.accent ? "module-highlighted" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {tier.accent && (
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
          {standardFeatures.map((feature, i) => (
            <FeatureItem
              key={feature.code}
              code={feature.code}
              label={feature.label}
              active={i < tier.activeCount}
              hasTooltip={(feature as any).hasTooltip}
            />
          ))}
          {/* Homework/Audit */}
          <FeatureItem
            code="HOMEWORK"
            label={hwLabel}
            active={hwActive}
          />
        </ul>

        {/* Bonus */}
        <div className="mb-6 py-3 border-t border-border/50">
          <span className="font-mono text-xs tracking-[0.15em] text-muted-foreground">
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

const EliteCard = ({
  tier,
  index,
  onOpenForm,
}: {
  tier: TierConfig;
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
        className="glass rounded-sm p-8 flex flex-col transition-all duration-300 h-full relative border-2 border-primary/70 shadow-[0_0_50px_hsl(183_100%_50%/0.15),inset_0_0_30px_hsl(183_100%_50%/0.05)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Limited badge */}
        <div className="absolute -top-3 right-6 px-4 py-1 bg-primary/10 border border-primary/50 rounded-sm">
          <span className="font-mono text-[10px] tracking-[0.2em] cyan-text font-bold pulse-cyan">
            LIMITED: 5 SPOTS
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-cyan" />
            <span className="font-mono text-sm tracking-[0.2em] cyan-text font-bold">
              {tier.label}
            </span>
          </div>
          <p className="font-mono text-xs text-muted-foreground/60 tracking-wide mb-4">
            {tier.tagline}
          </p>
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

        {/* Elite features */}
        <ul className="space-y-4 flex-1 mb-6">
          {eliteFeatures.map((feature) => (
            <li key={feature.code} className="flex items-start gap-3">
              <span className="font-mono text-xs mt-0.5 shrink-0 cyan-text">
                [{feature.code}]
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                {feature.label}
              </span>
            </li>
          ))}
          {/* Personal Audit */}
          <li className="flex items-start gap-3">
            <span className="font-mono text-xs mt-0.5 shrink-0 cyan-text">[+]</span>
            <span className="font-mono text-sm text-muted-foreground">
              {homeworkFeature.labels.elite}
            </span>
          </li>
        </ul>

        {/* Bonus */}
        <div className="mb-6 py-3 border-t border-primary/20">
          <span className="font-mono text-xs tracking-[0.15em] cyan-text font-bold">
            {tier.bonus}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onOpenForm(tier.label)}
          className="w-full font-mono text-sm tracking-[0.15em] py-4 border-2 border-primary/60 bg-primary/5 text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_30px_hsl(183_100%_50%/0.2)]"
        >
          [ ЗАБРОНИРОВАТЬ МЕСТО ]
        </button>
      </div>
    </div>
  );
};

const PricingSection = ({ onOpenForm }: PricingSectionProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <section className="relative py-40 px-6">
        <SectionHeader tag="УРОВНИ ДОСТУПА" title="ВЫБЕРИТЕ ТАРИФ" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {tiers.map((tier, i) =>
            tier.isElite ? (
              <EliteCard key={tier.id} tier={tier} index={i} onOpenForm={onOpenForm} />
            ) : (
              <StandardCard key={tier.id} tier={tier} index={i} onOpenForm={onOpenForm} />
            )
          )}
        </div>
      </section>
    </TooltipProvider>
  );
};

export default PricingSection;
