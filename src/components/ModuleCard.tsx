import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useGlitchFlicker } from "@/hooks/useGlitchFlicker";

interface ModuleCardProps {
  num: string;
  title: string;
  description: string;
  highlighted?: boolean;
  isActive?: boolean;
  index?: number;
}

const ModuleCard = ({ num, title, description, highlighted, isActive, index = 0 }: ModuleCardProps) => {
  const { ref, style } = useScrollReveal3D(index * 60);
  const { display: flickerNum, trigger } = useGlitchFlicker(num);

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
        className={`glass rounded-sm p-7 transition-all duration-300 card-hover-glow ${
          highlighted ? "module-highlighted-strong" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-sm cyan-text tracking-wider cursor-default select-none font-semibold"
              onMouseEnter={trigger}
            >
              {flickerNum}
            </span>
            <span className="font-mono text-sm text-muted-foreground">/</span>
            <h3 className="font-sans text-base md:text-lg font-semibold text-foreground">{title}</h3>
          </div>

          {highlighted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/5 pulse-cyan-strong shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[11px] tracking-wider cyan-text font-medium">VERIFIED BY AI</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-base leading-relaxed text-muted-foreground">{description}</p>

        {/* Bottom border accent for highlighted */}
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
  );
};

export default ModuleCard;
