const painPoints = [
  {
    code: "ERR_001",
    title: "ГРИНД ВРУЧНУЮ",
    description:
      "Ты тратишь по 5–8 часов в день на ручной сбор статистики, перебирая графики годами, но всё равно сомневаешься в цифрах.",
  },
  {
    code: "ERR_002",
    title: "ИЛЛЮЗИЯ СИСТЕМЫ",
    description:
      "У тебя есть набор инструментов, но нет четкого алгоритма. Ты входишь в сделку по интуиции, а потом ищешь логику в стоп-лоссе.",
  },
  {
    code: "ERR_003",
    title: "ЭМОЦИОНАЛЬНЫЙ ИЗНОС",
    description:
      'Ты устал от рыночного хаоса и «качелей» — один случайный профит, а затем серия сливов.',
  },
  {
    code: "ERR_004",
    title: "ТУПИК В КАПИТАЛЕ",
    description:
      "Ты ограничен собственным депозитом и боишься масштабироваться. Мы даем технологию и дорожную карту для получения в управление от $10,000 до $200,000 в Prop-индустрии.",
  },
];

const SystemCrashSection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-destructive/30" />
          <span className="font-mono text-xs tracking-[0.3em] text-destructive/80">
            SYSTEM_CRASH
          </span>
          <div className="h-px flex-1 bg-destructive/30" />
        </div>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-center tracking-tight text-foreground mt-6">
          ДЛЯ КОГО ЭТОТ ПРОЕКТ
        </h2>
      </div>

      <div className="max-w-3xl mx-auto grid gap-4">
        {painPoints.map((point, i) => (
          <div
            key={point.code}
            className="glass rounded-sm p-6 border-l-2 border-l-destructive/40 transition-all duration-300 hover:border-l-destructive/80 group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Error code */}
              <div className="shrink-0 font-mono text-[10px] tracking-wider text-destructive/60 mt-1">
                [{point.code}]
              </div>

              <div>
                <h3 className="font-mono text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 group-hover:bg-destructive transition-colors" />
                  {point.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemCrashSection;
