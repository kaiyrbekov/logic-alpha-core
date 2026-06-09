import { useRef, useEffect, useState } from "react";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useGlitchFlicker } from "@/hooks/useGlitchFlicker";

interface Lesson {
  code: string;
  text: string;
}

interface ModuleCardProps {
  num: string;
  title: string;
  goal: string;
  lessons: Lesson[];
  highlighted?: boolean;
  isActive?: boolean;
  index?: number;
  isOpen: boolean;
  onToggle: () => void;
}

const ModuleCard = ({
  num,
  title,
  goal,
  lessons,
  highlighted,
  isActive,
  index = 0,
  isOpen,
  onToggle,
}: ModuleCardProps) => {
  const { ref, style } = useScrollReveal3D(index * 60);
  const { display: flickerNum, trigger } = useGlitchFlicker(num);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, lessons.length]);

  return (
    <div
      ref={ref}
      style={style}
      className={`relative pl-16 md:pl-20 transition-all duration-500 ${
        isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
      }`}
    >
      {/* Node dot on the timeline */}
      <div
        className={`absolute left-[18px] md:left-[26px] top-7 w-3 h-3 rounded-full border-2 transition-all duration-500 ${
          isActive
            ? highlighted
              ? "border-primary bg-primary/30 pulse-cyan-strong"
              : "border-primary/60 bg-primary/10"
            : "border-border bg-background"
        }`}
        style={
          isActive && highlighted
            ? { boxShadow: "0 0 20px hsl(183 100% 50% / 0.8)" }
            : undefined
        }
      />

      <div
        className={`glass rounded-sm transition-all duration-300 ${
          highlighted ? "module-highlighted-strong" : ""
        } ${isOpen ? "border-primary/40" : ""}`}
      >
        {/* Header — clickable */}
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span
              className="font-mono text-sm cyan-text tracking-wider cursor-default select-none font-semibold shrink-0"
              onMouseEnter={trigger}
            >
              {flickerNum}
            </span>
            <span className="font-mono text-sm text-muted-foreground shrink-0">/</span>
            <h3 className="font-sans text-base md:text-lg font-semibold text-foreground truncate">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {highlighted && (
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-sm border border-primary/30 bg-primary/5 pulse-cyan-strong">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[10px] tracking-wider cyan-text font-medium">
                  VERIFIED BY AI
                </span>
              </div>
            )}
            {/* Toggle indicator */}
            <span
              className={`font-mono text-xs cyan-text border border-primary/40 rounded-sm w-7 h-7 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 ${
                isOpen ? "rotate-45 bg-primary/10" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </div>
        </button>

        {/* Collapsible body */}
        <div
          style={{ maxHeight: `${maxHeight}px` }}
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        >
          <div ref={contentRef} className="px-5 md:px-6 pb-6">
            <div className="pt-1 pb-4 border-t border-border/60">
              <p className="font-body text-sm leading-relaxed text-muted-foreground mt-4 mb-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary/70 mr-2 uppercase">
                  Цель —
                </span>
                {goal}
              </p>

              <ul className="space-y-2.5">
                {lessons.map((lesson) => (
                  <li
                    key={lesson.code}
                    className="flex gap-3 items-baseline group/lesson"
                  >
                    <span className="font-mono text-[11px] cyan-text/80 tracking-wider shrink-0 w-10 transition-colors group-hover/lesson:text-primary">
                      {lesson.code}
                    </span>
                    <span className="font-body text-sm leading-relaxed text-foreground/85">
                      {lesson.text}
                    </span>
                  </li>
                ))}
              </ul>

              {highlighted && (
                <div className="mt-5 pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-px bg-primary/40" />
                    <span className="font-mono text-[11px] tracking-wider text-primary/60">
                      AI-POWERED MODULE
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
