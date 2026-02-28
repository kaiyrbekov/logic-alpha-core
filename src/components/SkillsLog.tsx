import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";

const skills = [
  { id: "SKILL_01", title: "Чтение контекста", description: "Определение рыночного приоритета и фазы тренда на любом таймфрейме без субъективных интерпретаций." },
  { id: "SKILL_02", title: "Управление ликвидностью", description: "Точная идентификация зон манипуляций и захвата стоп-ордеров крупным капиталом." },
  { id: "SKILL_03", title: "Построение алгоритма", description: "Создание персонального торгового регламента с четкими правилами входа, выхода и риск-менеджмента." },
  { id: "SKILL_04", title: "AI-верификация стратегий", description: "Автоматический бектест на исторических данных. Объективная статистика вместо иллюзий." },
  { id: "SKILL_05", title: "Контроль психологии", description: "Протоколы блокировки деструктивных паттернов поведения. Торговля без эмоционального износа." },
  { id: "SKILL_06", title: "Prop-фондирование", description: "Пошаговая методология прохождения аттестации и получение капитала от $50,000 в управление." },
];

const SkillCard = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const { ref: revealRef, style: revealStyle } = useScrollReveal3D(index * 60);
  const tilt = useCardTilt();

  return (
    <div ref={revealRef} style={revealStyle}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="glass rounded-sm p-7 h-full transition-all duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs cyan-text tracking-wider font-semibold">[{skill.id}]</span>
        </div>
        <h3 className="font-sans text-lg font-bold text-foreground mb-3">{skill.title}</h3>
        <p className="font-body text-base leading-relaxed text-muted-foreground">{skill.description}</p>
      </div>
    </div>
  );
};

const SkillsLog = () => {
  return (
    <section className="relative py-40 px-6">
      <SectionHeader tag="SKILLS_LOG" title="ЧЕМУ ВЫ НАУЧИТЕСЬ" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
};

export default SkillsLog;
