import { useEffect, useRef, useState } from "react";
import ModuleCard from "./ModuleCard";
import SectionHeader from "./SectionHeader";

type Module = {
  num: string;
  title: string;
  goal: string;
  lessons: { code: string; text: string }[];
  highlighted?: boolean;
};

const modules: Module[] = [
  {
    num: "01",
    title: "Фундамент рынка и механика",
    goal: "Понимание, как устроен рынок, кто двигает цену и где совершаются сделки.",
    lessons: [
      { code: "1.1", text: "Что такое трейдинг. Механика рынка: сведение ордеров Buy/Sell, стакан, аск/бид." },
      { code: "1.2", text: "Участники рынка: розничные трейдеры, маркет-мейкеры, алгоритмы, ЦБ. Кто формирует тренд." },
      { code: "1.3", text: "Анатомия японской свечи. Как формируется бар (OHLC)." },
      { code: "1.4", text: "Таймфреймы. Концепция мультитаймфреймового анализа (от месяца до 1 минуты)." },
      { code: "1.5", text: "Ордера и управление позицией: Market, Limit, Stop. Stop Loss и Take Profit на практике." },
      { code: "1.6", text: "Инфраструктура: брокеры, спреды, комиссии, свопы. TradingView и MT4/MT5." },
      { code: "1.7", text: "Выбор рынка и стиля: Forex, Indices, Gold, Crypto. Скальпинг / Интрадей / Свинг. Приоритет интрадей." },
    ],
  },
  {
    num: "02",
    title: "Механика доставки цены (SMC & ICT)",
    goal: "Читать график без индикаторов и понимать движение цены от ликвидности к ликвидности.",
    lessons: [
      { code: "2.1", text: "Рыночная структура. Strong/Weak High/Low. CHoCH и BOS." },
      { code: "2.2", text: "Фрактальность рынка. Связь младших и старших ТФ." },
      { code: "2.3", text: "Dealing Range: Premium и Discount. Сетка Фибоначчи для зон покупок и продаж." },
      { code: "2.4", text: "Ликвидность — топливо рынка: BSL/SSL, TL, EQH/EQL, PDH/PDL, PWH/PWL." },
      { code: "2.5", text: "Зоны неэффективности: Fair Value Gap / Imbalance." },
      { code: "2.6", text: "Зоны интереса (POI): Order Block, Breaker Block, Mitigation Block." },
      { code: "2.7", text: "Volume Imbalance / Volume Confirmation. Перекрытие пустот объема." },
      { code: "2.8", text: "Order Flow. Как институциональный капитал доставляет цену в POI." },
      { code: "2.9", text: "Inducement. Как маркет-мейкер заманивает ранних трейдеров до истинного разворота." },
    ],
  },
  {
    num: "03",
    title: "Контекст, время и продвинутые сетапы",
    goal: "Соединить механику с фактором времени и определять приоритетное направление дня.",
    lessons: [
      { code: "3.1", text: "Интрадей-сессии: Азия, Лондон, Нью-Йорк. Killzones и их специфика." },
      { code: "3.2", text: "Алгоритм AMD: Accumulation — Manipulation — Distribution." },
      { code: "3.3", text: "Профили дня: трендовый, разворотный, консолидация. Шаблоны движения." },
      { code: "3.4", text: "Ловушки времени: Judas Swing, снятие пулов ликвидности сессий." },
      { code: "3.5", text: "SMT-дивергенция: NAS100/SPX500, EURUSD/DXY — поиск истинных разворотов." },
      { code: "3.6", text: "HTF Direction. Чек-лист от Daily к 15m: куда стремится цена." },
    ],
  },
  {
    num: "04",
    title: "Синхронизация ТФ и Модели входа",
    goal: "Идеальная позиция и ювелирный вход с минимальным стопом.",
    highlighted: true,
    lessons: [
      { code: "4.1", text: "Модели входа: что это и зачем они нужны." },
      { code: "4.2", text: "Модель входа №1." },
      { code: "4.3", text: "Модель входа №2." },
      { code: "4.4", text: "Модель входа №3." },
      { code: "4.5", text: "Анатомия идеальной позиции: распределение риска, Partial TP, перевод в безубыток (BE)." },
    ],
  },
  {
    num: "05",
    title: "Риск-менеджмент, бэктесты и психология",
    goal: "Превратить знания в системный бизнес и собрать математическое ожидание.",
    lessons: [
      { code: "5.1", text: "Риск-менеджмент как основа выживания. Фиксированный риск 1%, соотношение R:R." },
      { code: "5.2", text: "Статический vs Динамический подход. Жесткие правила против адаптации." },
      { code: "5.3", text: "Методология бэктестов. Симуляторы рынка, выборка 100+ сделок." },
      { code: "5.4", text: "Trading Journal: Winrate, Avg R:R, скриншоты HTF/LTF, психологическое состояние." },
      { code: "5.5", text: "Психология и ошибки: FOMO, овертрейдинг, тильт. Алгоритм выхода из просадки." },
    ],
  },
  {
    num: "06",
    title: "Проп-трейдинг: от отбора до выплат",
    goal: "Выйти на реальный капитал и удерживать финансирование.",
    lessons: [
      { code: "6.1", text: "Индустрия проп-фирм. Daily Drawdown, Overall Drawdown, Profit Target." },
      { code: "6.2", text: "Выбор проп-фирмы (Funding Pips и др.): комиссии, проскальзывания, выплаты." },
      { code: "6.3", text: "Стратегия прохождения Evaluation Stages без психологического давления." },
      { code: "6.4", text: "Жизнь после Funded-аккаунта. Стратегия «Безопасный первый дроп»." },
    ],
  },
];

const ModuleRoadmap = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [block09Active, setBlock09Active] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

        <div className="space-y-4">
          {modules.map((mod, i) => {
            const moduleProgress = (i + 1) / modules.length;
            const isActive = scrollProgress >= moduleProgress - 0.05;

            return (
              <div key={mod.num} ref={mod.highlighted ? block09Ref : undefined}>
                <ModuleCard
                  num={mod.num}
                  title={mod.title}
                  goal={mod.goal}
                  lessons={mod.lessons}
                  highlighted={mod.highlighted}
                  isActive={isActive}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
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
