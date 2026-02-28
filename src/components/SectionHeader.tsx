import { useTerminalReveal } from "@/hooks/useTerminalReveal";

interface SectionHeaderProps {
  tag: string;
  title: string;
  tagClassName?: string;
  dividerClassName?: string;
}

const SectionHeader = ({ tag, title, tagClassName = "text-muted-foreground", dividerClassName = "bg-border" }: SectionHeaderProps) => {
  const { ref, displayed, cursor } = useTerminalReveal(title, 50);

  return (
    <div className="max-w-5xl mx-auto mb-20">
      <div className="flex items-center gap-4 mb-6">
        <div className={`h-px flex-1 ${dividerClassName}`} />
        <span className={`font-mono text-sm tracking-[0.3em] ${tagClassName}`}>
          {tag}
        </span>
        <div className={`h-px flex-1 ${dividerClassName}`} />
      </div>
      <h2
        ref={ref as React.Ref<HTMLHeadingElement>}
        className="font-sans text-3xl md:text-4xl lg:text-[40px] font-bold text-center tracking-tight text-foreground mt-8"
      >
        {displayed}
        {cursor && <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />}
      </h2>
    </div>
  );
};

export default SectionHeader;
