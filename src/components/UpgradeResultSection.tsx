const results = [
  {
    icon: "⚙",
    title: "Оцифрованный мозг",
    description:
      "Твоя стратегия превращается в жесткий алгоритм, исключающий двоякую трактовку.",
  },
  {
    icon: "⚡",
    title: "Оптимизация времени",
    description:
      "ИИ забирает на себя 90% рутинной работы по сбору данных. Твоя задача — только исполнение.",
  },
  {
    icon: "◆",
    title: "Билет в Pro-лигу",
    description:
      "Навыки работы с ликвидностью на уровне западных хедж-фондов и прямой путь к крупному капиталу.",
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
            key={item.title}
            className="glass rounded-sm p-6 text-center transition-all duration-300 hover:border-primary/20"
          >
            <div className="font-mono text-2xl mb-4 cyan-text">{item.icon}</div>
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
