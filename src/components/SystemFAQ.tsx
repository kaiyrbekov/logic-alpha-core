import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Какой компьютер нужен для обучения?",
    a: "Любой современный ПК или ноутбук с доступом в интернет. Для работы с терминалом рекомендуется два монитора, но это не обязательно на старте.",
  },
  {
    q: "Сколько времени нужно уделять в день?",
    a: "Минимум 2-3 часа в день на изучение материала и практику. Торговые сессии London и New York занимают 3-4 часа. Программа рассчитана на совмещение с основной работой.",
  },
  {
    q: "Подойдет ли новичку без опыта?",
    a: "Да. Программа построена с нуля — от базовой терминологии до продвинутых стратегий. AI-Backtest позволяет верифицировать навыки объективно, без субъективных оценок.",
  },
  {
    q: "Что такое Prop-фондирование?",
    a: "Prop-компании предоставляют капитал от $10,000 до $200,000 в управление трейдерам, прошедшим аттестацию. Вы торгуете на их деньгах и получаете до 90% прибыли.",
  },
  {
    q: "Как работает гарантия результата?",
    a: "Если после прохождения программы ваша стратегия не достигла целевых показателей — активируется протокол индивидуального сопровождения. Личные созвоны с ментором до полной стабилизации торговли.",
  },
  {
    q: "Какие рынки покрывает программа?",
    a: "Фокус на NAS100 (NASDAQ). Методология также применима к Forex, другим индексам и криптовалютам. Ядро системы универсально.",
  },
];

const SystemFAQ = () => {
  const { ref, style } = useScrollReveal3D(0);

  return (
    <section className="relative py-40 px-6">
      <SectionHeader tag="SYSTEM_FAQ" title="ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ" />
      <div ref={ref} style={style} className="max-w-4xl mx-auto">
        <div className="glass rounded-sm p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-border/50">
                <AccordionTrigger className="font-sans text-base md:text-lg font-semibold text-foreground hover:no-underline hover:text-primary px-4 py-5 [&>svg]:text-primary">
                  <span className="flex items-center gap-3 text-left">
                    <span className="font-mono text-xs cyan-text tracking-wider shrink-0">[{String(i + 1).padStart(2, "0")}]</span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <p className="font-body text-base leading-relaxed text-muted-foreground pl-10">
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SystemFAQ;
