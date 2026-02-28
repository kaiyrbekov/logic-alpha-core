import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";

const stages = [
  { num: "01", tag: "СИНХРОНИЗАЦИЯ", description: "Мы разберем устройство финансовой системы, ответим на вопрос о долголетии профессии и научимся «читать» графики без индикаторного шума." },
  { num: "02", tag: "ПРОЕКТИРОВАНИЕ", description: "Создание твоего личного торгового алгоритма на основе Smart Money, где каждое действие прописано в жесткий протокол." },
  { num: "03", tag: "AI_VALIDATION", description: "Твой ключевой фильтр — прогон стратегии через AI-бэктестер для получения 100% уверенности в статистике перед выходом на реальный рынок." },
  { num: "04", tag: "КОРРЕКЦИЯ", description: "Переход к практике под присмотром менторов, исправление ошибок исполнения и работа с психологией дисциплины." },
  { num: "05", tag: "ГАРАНТИЯ", description: "Если результат не достигнут, активируются личные созвоны с ментором для детального разбора твоей торговли до полной стабилизации профита.", highlighted: true },
  { num: "06", tag: "КАПИТАЛИЗАЦИЯ", description: "Подготовка к аттестации и получение в управление депозита от $50,000 в ведущих проп-компаниях." },
];

const StageCard = ({ stage, index, isActive }: { stage: typeof stages[0]; index: number; isActive: boolean }) => {
  const { ref, style } = useScrollReveal3D(index * 80);

  return (
    <div ref={ref} style={style}>
      <div className={`relative pl-16 md:pl-20 transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"}`}>
        <div
          className={`absolute left-[18px] md:left-[26px] top-7 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
            isActive
              ? stage.highlighted ? "border-primary bg-primary/30 pulse-cyan-strong" : "border-primary/60 bg-primary/10"
              : "border-border bg-background"
          }`}
          style={isActive && stage.highlighted ? { boxShadow: "0 0 20px hsl(183 100% 50% / 0.8)" } : undefined}
        />

        <div className={`glass rounded-sm p-7 transition-all duration-300 card-hover-glow ${stage.highlighted ? "stage-guarantee-glow" : ""}`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm cyan-text tracking-wider font-semibold">STAGE_{stage.num}</span>
              <span className="font-mono text-sm text-muted-foreground">/</span>
              <h3 className="font-sans text-base md:text-lg font-semibold text-foreground">{stage.tag}</h3>
            </div>
            {stage.highlighted && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/5 pulse-cyan-strong shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[11px] tracking-wider cyan-text font-medium">IMPORTANT</span>
              </div>
            )}
          </div>
          <p className="font-body text-base leading-relaxed text-muted-foreground">{stage.description}</p>
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
    <section className="relative py-40 px-6" ref={containerRef}>
      <SectionHeader tag="PHASE_INTEGRATION" title="ДОРОЖНАЯ КАРТА ОБУЧЕНИЯ" />
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border">
          <div className="absolute left-0 top-0 w-full laser-line transition-all duration-100" style={{ height: `${scrollProgress * 100}%` }} />
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary transition-all duration-100" style={{ top: `${scrollProgress * 100}%`, boxShadow: "0 0 12px hsl(183 100% 50% / 0.8)", opacity: scrollProgress > 0.02 ? 1 : 0 }} />
        </div>
        <div className="space-y-7">
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
