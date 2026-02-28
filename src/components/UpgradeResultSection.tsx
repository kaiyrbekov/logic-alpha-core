const results = [
  {
    tag: "[01]",
    title: "ОЦИФРОВАННЫЙ МОЗГ",
    description:
      "Стратегия конвертируется в детерминированный алгоритм. Исключена двоякая трактовка. Каждый вход — результат протокола, а не субъективной оценки.",
  },
  {
    tag: "[02]",
    title: "ОПТИМИЗАЦИЯ ВРЕМЕНИ",
    description:
      "ИИ-модуль берет на себя 90% рутинного сбора и обработки данных. Оператору остается только валидация сигнала и исполнение.",
  },
  {
    tag: "[03]",
    title: "БИЛЕТ В PRO-ЛИГУ",
    description:
      "Навыки анализа ликвидности на уровне западных институциональных фондов. Прямой маршрут к управлению внешним капиталом от $10K до $200K.",
  },
];

const UpgradeResultSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="font-mono text-xs tracking-[0.3em] text-primary/60">
            UPGRADE_RESULT
          </span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-center tracking-tight text-foreground mt-6">
          ВАШ ТЕХНОЛОГИЧЕСКИЙ СТЕК
        </h2>
      </div>

      <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4">
        {results.map((item) => (
          <div
            key={item.tag}
            className="glass rounded-sm p-6 transition-all duration-300 hover:border-primary/20"
          >
            <div className="font-mono text-xs tracking-wider text-primary/50 mb-4">
              {item.tag}
            </div>
            <h3 className="font-mono text-sm font-semibold text-foreground mb-3">
              {item.title}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpgradeResultSection;
