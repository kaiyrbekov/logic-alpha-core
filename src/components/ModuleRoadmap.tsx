import { useEffect, useRef, useState } from "react";
import ModuleCard from "./ModuleCard";
import SectionHeader from "./SectionHeader";

const modules = [
  {
    num: "01",
    title: "Фундамент рынка и механика (База)",
    description:
      "Устройство рынка, кто двигает цену и где совершаются сделки. Механика Buy/Sell, стакан, аск/бид, участники, японские свечи, таймфреймы, ордера (Market/Limit/Stop, SL/TP), брокеры, спреды, TradingView и MT4/MT5. Выбор рынка (Forex, Indices, Gold, Crypto) и стиля торговли с приоритетом intraday.",
  },
  {
    num: "02",
    title: "Механика доставки цены (Smart Money & ICT)",
    description:
      "Чтение графика без индикаторов. Рыночная структура (Strong/Weak High/Low, BOS, CHoCH), фрактальность, Dealing Range (Premium/Discount), ликвидность (BSL/SSL, TL, EQH/EQL, PDH/PDL), FVG/IMB, POI: Order Block, Breaker, Mitigation, Volume Confirmation и Order Flow институционального капитала.",
  },
  {
    num: "03",
    title: "Контекст, Время и Продвинутые сетапы",
    description:
      "Time & Price: сессии Asia / London / New York и Killzones. Алгоритм AMD (Accumulation — Manipulation — Distribution), профили дня, Judas Swing, снятие пулов ликвидности сессий, SMT-дивергенция (NAS100/SPX500, EURUSD/DXY) и пошаговый чек-лист контекста от Daily к 15m.",
  },
  {
    num: "04",
    title: "Синхронизация ТФ и Модели входа",
    description:
      "Ювелирный вход с минимальным стопом. Концепция моделей входа, три рабочих модели исполнения, анатомия идеальной позиции: правильное распределение риска, частичная фиксация прибыли (Partial TP) и перевод в безубыток (BE).",
    highlighted: true,
  },
  {
    num: "05",
    title: "Риск-менеджмент, Бэктесты и Психология",
    description:
      "Математика трейдинга и фиксированный риск 1% на сделку, соотношение R:R, статический vs динамический подход, методология бэктестов на симуляторах с выборкой 100+ сделок, ведение Trading Journal (Winrate, Avg R:R, HTF/LTF скриншоты, состояние) и работа с FOMO, овертрейдингом, тильтом и просадкой.",
  },
  {
    num: "06",
    title: "Проп-трейдинг: от отбора до выплат",
    description:
      "Реальный капитал и удержание финансирования. Бизнес-модель проп-фирм, честный разбор правил (Daily Drawdown, Overall Drawdown, Profit Target), выбор фирмы (Funding Pips и др.), стратегия прохождения Evaluation Stages и жизнь после Funded-аккаунта со «Безопасным первым дропом».",
  },
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
    <section className="relative py-40 px-6" ref={containerRef}>
      <div
        className="fixed inset-0 bg-black/40 pointer-events-none z-[1] transition-opacity duration-700"
        style={{ opacity: block09Active ? 1 : 0 }}
      />

      <SectionHeader tag="ПРОГРАММА КУРСА" title="6 МОДУЛЕЙ СИСТЕМЫ" />

      <div className="relative max-w-4xl mx-auto z-[2]">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border">
          <div className="absolute left-0 top-0 w-full laser-line transition-all duration-100" style={{ height: `${scrollProgress * 100}%` }} />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary transition-all duration-100"
            style={{ top: `${scrollProgress * 100}%`, boxShadow: "0 0 12px hsl(183 100% 50% / 0.8)", opacity: scrollProgress > 0.02 ? 1 : 0 }}
          />
        </div>

        <div className="space-y-7">
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
