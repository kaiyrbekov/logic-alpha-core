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
    <div className="max-w-4xl mx-auto mb-16">
      <div className="flex items-center gap-4 mb-4">
        <div className={`h-px flex-1 ${dividerClassName}`} />
        <span className={`font-mono text-xs tracking-[0.3em] ${tagClassName}`}>
          {tag}
        </span>
        <div className={`h-px flex-1 ${dividerClassName}`} />
      </div>
      <h2
        ref={ref as React.Ref<HTMLHeadingElement>}
        className="font-mono text-2xl md:text-3xl font-bold text-center tracking-tight text-foreground mt-6"
      >
        {displayed}
        {cursor && <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />}
      </h2>
    </div>
  );
};

export default SectionHeader;
