import { useEffect, useRef } from "react";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import communityImage from "@/assets/community.jpg";

const CommunitySection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { ref: contentRef, style: contentStyle } = useScrollReveal3D(100);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const speed = 0.15;
      const offset = (window.innerHeight / 2 - rect.top) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-40 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch">
        {/* Left — Image with Parallax */}
        <div className="relative overflow-hidden rounded-sm lg:min-h-[700px] min-h-[400px]">
          <div
            ref={imgRef}
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${communityImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              willChange: "transform",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
        </div>

        {/* Right — Content */}
        <div ref={contentRef} style={contentStyle} className="flex flex-col justify-center lg:pl-16 pl-0 pt-12 lg:pt-0">
          <h2 className="font-sans text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-foreground mb-8">
            ОДИН В ПОЛЕ НЕ ВОИН.
          </h2>

          <p className="font-body text-base text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Мы создали это комьюнити, потому что верим: в трейдинге прогресс идёт быстрее, когда есть у кого спросить совета
            и с кем разобрать сложную ситуацию. Мы видим, как участники нашего круга растут, делятся качественными сделками
            и поддерживают друг друга, независимо от стартового уровня знаний.
          </p>

          <div className="space-y-6 mb-12">
            <div>
              <h4 className="font-mono text-sm tracking-[0.2em] text-foreground font-bold mb-2">
                ОБМЕН ЖИВЫМ ОПЫТОМ
              </h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg">
                Здесь опытные ребята делятся наработками с новичками, а вместе мы быстрее адаптируемся к изменениям рынка.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-sm tracking-[0.2em] text-foreground font-bold mb-2">
                СРЕДА ДЛЯ РОСТА
              </h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg">
                Наша цель — построить <span className="text-foreground font-semibold">адекватное сообщество</span>, основанное на <span className="text-foreground font-semibold">взаимопомощи и передаче опыта</span>.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-sm tracking-[0.2em] text-foreground font-bold mb-2">
                НИКАКОГО ШУМА
              </h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg">
                Только конструктив, разборы графиков и поддержка на пути к вашим целям. <span className="text-foreground font-semibold">Качество, а не шум</span> — наше главное отличие.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 mb-8">
            <p className="font-mono text-xs text-muted-foreground/60 tracking-[0.2em] mb-3">
              ОГРАНИЧЕННЫЙ ДОСТУП
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg mb-8">
              Количество мест строго ограничено. Мы сознательно не стремимся к массовости, чтобы сохранить глубину взаимодействия.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div
              className="font-sans text-4xl md:text-5xl font-bold text-foreground glitch-number"
              style={{ "--glitch-delay": "1.2s" } as React.CSSProperties}
            >
              $29<span className="text-lg text-muted-foreground font-normal ml-1">/мес</span>
            </div>
          </div>

          <a
            href="https://t.me/dustFxx"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-fit font-mono text-sm tracking-[0.15em] px-10 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            ПОДАТЬ ЗАЯВКУ
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
