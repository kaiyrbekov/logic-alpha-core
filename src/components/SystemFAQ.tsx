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
    q: "Как работает AI-бэктестер?",
    a: "Вы задаете параметры своей стратегии в виде технического промпта (мы обучаем архитектуре промптов с нуля). Система за минуты проводит глубокий аудит и выдает полную статистику валидности вашей модели на исторических данных.",
  },
  {
    q: "Какую методологию анализа вы используете?",
    a: null, // rendered with JSX below
  },
  {
    q: "Какие рынки покрывает программа?",
    a: "Методология универсальна. Мы обучаем профессиональной работе с ликвидностью на всех ключевых рынках: Индексы (NAS100, SPX500), Forex и Криптовалюты.",
  },
  {
    q: "Почему стоит выбрать именно EQUITY?",
    a: "Это единственная экосистема, объединившая классический Smart Money с мощностью AI-бэктестинга. Мы предлагаем индивидуальный инженерный подход и техническую гарантию результата.",
  },
  {
    q: "Сколько времени нужно уделять в день?",
    a: "Для теории достаточно 1.5–2 часа. Торговая активность привязана к конкретным временным окнам (Лондонская и Нью-Йоркская сессии).",
  },
  {
    q: "Когда я смогу заработать первые деньги?",
    a: "Программа длится 60 дней. Наша цель — ваш выход на аттестацию в Prop-фирму сразу после завершения курса для получения капитала в управление.",
  },
  {
    q: "Как работает гарантия результата?",
    a: "Если после выполнения всех этапов у вас нет стабильной статистики, активируется протокол индивидуального сопровождения: личные созвоны с ментором до полной стабилизации вашей торговли.",
  },
  {
    q: "Подойдет ли обучение новичку без опыта?",
    a: "Да. Мы даем фундаментальную базу с нуля, но без рыночного шума. Вы сразу учитесь методам, которыми пользуются институциональные игроки.",
  },
  {
    q: "Что такое проп-фондирование?",
    a: "Это возможность получить в управление капитал инвестиционных компаний (Prop-firms). После теста вы торгуете на их средства и забираете до 80-90% чистой прибыли.",
  },
];

const SmcAnswer = () => (
  <span>
    В основе системы лежит <span className="font-bold cyan-text">Smart Money Concepts</span> (SMC). Мы обучаем понимать истинные причины движения цены через логику доставки ликвидности и действия крупных банков. В сочетании с нашим <span className="font-bold cyan-text">AI-бэктестером</span> это превращает трейдинг из интуитивной игры в четкий инженерный процесс.
  </span>
);

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
                <AccordionTrigger className="font-sans text-lg md:text-2xl font-extrabold text-foreground hover:no-underline hover:text-primary px-4 py-5 [&>svg]:text-primary glitch-hover">
                  <span className="flex items-center gap-3 text-left">
                    <span className="font-mono text-xs cyan-text tracking-wider shrink-0">[{String(i + 1).padStart(2, "0")}]</span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <p className="font-mono text-base leading-relaxed text-muted-foreground pl-10">
                    {faq.a === null ? <SmcAnswer /> : faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Footer */}
        <div className="mt-24 text-center">
          <h3 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-8">
            ОСТАЛИСЬ ВОПРОСЫ? СВЯЖИТЕСЬ СО МНОЙ НАПРЯМУЮ.
          </h3>
          <a
            href="https://t.me/dustFxx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm tracking-[0.2em] px-10 py-4 border border-primary text-primary hover:bg-primary/10 transition-all duration-300 cta-glow"
          >
            [ НАПИСАТЬ В TELEGRAM ]
          </a>
        </div>
      </div>
    </section>
  );
};

export default SystemFAQ;
