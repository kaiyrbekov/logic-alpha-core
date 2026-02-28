import { useEffect, useRef, useState } from "react";
import ModuleCard from "./ModuleCard";
import SectionHeader from "./SectionHeader";

const modules = [
  { num: "01", title: "Профессиональная перспектива", description: "Деконструкция трейдинга как индустрии. Разбор механизмов извлечения прибыли, структуры рыночных участников и математических моделей долгосрочной выживаемости капитала." },
  { num: "02", title: "Архитектура стратегии: Психотипы", description: "Классификация стилей торговли: Intraday, Swing, Scalping. Технический анализ соответствия торгового регламента психофизиологическому профилю и временному ресурсу трейдера." },
  { num: "03", title: "Анализ контекста", description: "Методология определения рыночного приоритета (Order Flow Context). Алгоритм выявления трендовой составляющей на различных классах активов: Forex, Indices, Crypto." },
  { num: "04", title: "Механика ликвидности", description: "Изучение алгоритмов движения цены через зоны концентрации стоп-ордеров. Технический разбор зон манипуляций и захвата ликвидности крупным капиталом." },
  { num: "05", title: "POI (Point of Interest)", description: "Протокол идентификации зон интереса старшего таймфрейма. Фильтрация рыночного шума и определение ювелирных координат для ожидания ценовой реакции." },
  { num: "06", title: "Модели исполнения (Execution)", description: "Технические регламенты открытия позиций. Валидация торговых сетапов через подтверждающие факторы и формации на младших временных интервалах." },
  { num: "07", title: "Order Flow (Поток ордеров)", description: "Анализ институционального давления и динамики доставки цены. Инструментарий оценки силы и затухания рыночного движения в режиме реального времени." },
  { num: "08", title: "Тайминг сессий", description: "Специфика алгоритмической активности в периоды London, New York и Asia. Влияние временных окон на волатильность, точность сигналов и отработку моделей." },
  { num: "09", title: "Верификация: AI-Backtest", description: "Системный аудит стратегий с применением ИИ-инструментов. Автоматизированный сбор статистики и верификация торговых гипотез на исторических данных за секунды.", highlighted: true },
  { num: "10", title: "Риск-менеджмент и Психология", description: "Математические модели защиты капитала и управления рисками. Протоколы контроля эмоциональных состояний и алгоритмы блокировки деструктивного поведения." },
  { num: "11", title: "Advanced Trading", description: "Синтез мультифакторных моделей анализа. Работа со сложными рыночными корреляциями, фундаментальными факторами и нестандартными структурами." },
  { num: "12", title: "Глобальная методология", description: "Анализ систем ведущих мировых трейдеров. Синтез проверенных методик в индивидуальный торговый регламент и создание жесткого плана действий." },
  { num: "13", title: "Управление капиталом", description: "Методология интеграции в индустрию доверительного управления. Пошаговый протокол прохождения аттестации в Prop-компании и работа с фондированными счетами." },
];

const ModuleRoadmap = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [block09Active, setBlock09Active] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const block09Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (totalHeight + windowHeight * 0.5)));
      setScrollProgress(progress);

      // Block 09 detection
      if (block09Ref.current) {
        const r09 = block09Ref.current.getBoundingClientRect();
        const inView = r09.top < windowHeight * 0.7 && r09.bottom > windowHeight * 0.3;
        setBlock09Active(inView);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-6" ref={containerRef}>
      {/* Block 09 background darkening overlay */}
      <div
        className="fixed inset-0 bg-black/40 pointer-events-none z-[1] transition-opacity duration-700"
        style={{ opacity: block09Active ? 1 : 0 }}
      />

      <SectionHeader tag="ПРОГРАММА КУРСА" title="13 МОДУЛЕЙ СИСТЕМЫ" />

      <div className="relative max-w-3xl mx-auto z-[2]">
        {/* Laser line track */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border">
          <div
            className="absolute left-0 top-0 w-full laser-line transition-all duration-100"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary transition-all duration-100"
            style={{
              top: `${scrollProgress * 100}%`,
              boxShadow: "0 0 12px hsl(183 100% 50% / 0.8)",
              opacity: scrollProgress > 0.02 ? 1 : 0,
            }}
          />
        </div>

        {/* Module cards */}
        <div className="space-y-6">
          {modules.map((mod, i) => {
            const moduleProgress = (i + 1) / modules.length;
            const isActive = scrollProgress >= moduleProgress - 0.05;

            return (
              <div key={mod.num} ref={mod.highlighted ? block09Ref : undefined}>
                <ModuleCard
                  num={mod.num}
                  title={mod.title}
                  description={mod.description}
                  highlighted={mod.highlighted}
                  isActive={isActive}
                  index={i}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModuleRoadmap;
