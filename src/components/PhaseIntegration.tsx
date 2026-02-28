import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";

const stages = [
  { num: "01", tag: "СИНХРОНИЗАЦИЯ", description: "Деконструкция рыночной логики и настройка терминала под NAS100." },
  { num: "02", tag: "ПРОЕКТИРОВАНИЕ", description: "Создание индивидуального торгового алгоритма без участия эмоций." },
  { num: "03", tag: "AI_VALIDATION", description: "Жесткая проверка стратегии через ИИ-бектест. Допуск к следующему этапу только при подтвержденной статистике." },
  { num: "04", tag: "КОРРЕКЦИЯ", description: "Живая торговля и работа с менторами в режиме реального времени." },
  { num: "05", tag: "ГАРАНТИЯ РЕЗУЛЬТАТА", description: "Если по итогам обучения цель не достигнута — активируется протокол индивидуального сопровождения. Личные созвоны с ментором до полной стабилизации твоей торговли.", highlighted: true },
  { num: "06", tag: "КАПИТАЛИЗАЦИЯ", description: "Выход на Prop-фондирование и получение капитала от $50,000." },
];

const StageCard = ({ stage, index, isActive }: { stage: typeof stages[0]; index: number; isActive: boolean }) => {
  const { ref, style } = useScrollReveal3D(index * 80);

  return (
    <div ref={ref} style={style}>
      <div
        className={`relative pl-16 md:pl-20 transition-all duration-500 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
        }`}
      >
        <div
          className={`absolute left-[18px] md:left-[26px] top-6 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
            isActive
              ? stage.highlighted
                ? "border-primary bg-primary/30 pulse-cyan-strong"
                : "border-primary/60 bg-primary/10"
              : "border-border bg-background"
          }`}
          style={isActive && stage.highlighted ? { boxShadow: "0 0 20px hsl(183 100% 50% / 0.8)" } : undefined}
        />

        <div className={`glass rounded-sm p-6 transition-all duration-300 card-hover-glow ${stage.highlighted ? "stage-guarantee-glow" : ""}`}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs cyan-text tracking-wider">STAGE_{stage.num}</span>
              <span className="font-mono text-xs text-muted-foreground">/</span>
              <h3 className="font-mono text-sm md:text-base font-medium text-foreground">{stage.tag}</h3>
            </div>
            {stage.highlighted && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 pulse-cyan-strong shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[10px] tracking-wider cyan-text">IMPORTANT</span>
              </div>
            )}
          </div>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
        </div>
      </div>
    </div>
  );
};

const PhaseIntegration = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (totalHeight + windowHeight * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-6" ref={containerRef}>
      <SectionHeader tag="PHASE_INTEGRATION" title="ДОРОЖНАЯ КАРТА ОБУЧЕНИЯ" />
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border">
          <div className="absolute left-0 top-0 w-full laser-line transition-all duration-100" style={{ height: `${scrollProgress * 100}%` }} />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary transition-all duration-100"
            style={{ top: `${scrollProgress * 100}%`, boxShadow: "0 0 12px hsl(183 100% 50% / 0.8)", opacity: scrollProgress > 0.02 ? 1 : 0 }}
          />
        </div>
        <div className="space-y-6">
          {stages.map((stage, i) => {
            const stageProgress = (i + 1) / stages.length;
            const isActive = scrollProgress >= stageProgress - 0.08;
            return <StageCard key={stage.num} stage={stage} index={i} isActive={isActive} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default PhaseIntegration;
