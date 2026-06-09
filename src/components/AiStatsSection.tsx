import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";

const stats = [
  {
    value: "8 000",
    label: "сотрудников уволила Meta в 2026, прямо назвав причиной ИИ",
  },
  {
    value: "\u2248 900 000",
    label: "технических специалистов потеряли работу с 2020 года",
  },
  {
    value: "40%",
    label: "штата сократил Block (Джек Дорси) \u2014 причина: ИИ",
  },
  {
    value: "92 млн",
    label: "рабочих мест исчезнет к 2030 году (прогноз WEF)",
  },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const { ref, style } = useScrollReveal3D(index * 100);

  return (
    <div
      ref={ref}
      style={style}
      className="glass rounded-sm p-8 border-l-2 border-l-destructive/40 transition-all duration-300 hover:border-l-destructive/80 group card-hover-glow text-center"
    >
      <div className="font-mono text-4xl md:text-5xl font-bold text-destructive mb-4 tracking-tight">
        {stat.value}
      </div>
      <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
};

const AiStatsSection = () => {
  return (
    <section className="relative py-40 px-6">
      <SectionHeader
        tag="AI_LABOR_MARKET"
        title="ИИ УЖЕ МЕНЯЕТ РЫНОК ТРУДА"
        tagClassName="text-destructive/80"
        dividerClassName="bg-destructive/30"
      />
      <p className="text-center text-muted-foreground font-body text-lg md:text-xl -mt-12 mb-16">
        Это не прогноз. Это происходит прямо сейчас.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {stats.map((stat, i) => (
          <StatCard key={stat.value} stat={stat} index={i} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <p className="font-sans text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-relaxed mb-4">
          ИИ забирает тех, кто <span className="cyan-text">ВЫПОЛНЯЕТ</span> задачи.{" "}
          Не тех, кто <span className="cyan-text">УПРАВЛЯЕТ</span> капиталом.
        </p>
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground/50">
          Источники: CNN, CNBC, Reuters, World Economic Forum, 2026.
        </p>
      </div>
    </section>
  );
};

export default AiStatsSection;
