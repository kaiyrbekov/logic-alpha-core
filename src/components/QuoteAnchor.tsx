import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";

interface QuoteAnchorProps {
  text: string;
}

const QuoteAnchor = ({ text }: QuoteAnchorProps) => {
  const { ref, style } = useScrollReveal3D(0);

  return (
    <section className="relative py-32 md:py-48 px-6 flex items-center justify-center overflow-hidden">
      <div ref={ref} style={style} className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="font-sans text-5xl md:text-7xl lg:text-[120px] font-black tracking-tighter leading-[0.85] text-foreground">
          {text.split(" ").map((word, i) => (
            <span key={i}>
              {i > 0 && " "}
              {word.endsWith(".") ? (
                <>
                  {word.slice(0, -1)}
                  <span className="cyan-text">.</span>
                </>
              ) : (
                word
              )}
            </span>
          ))}
        </h2>
      </div>
      {/* Decorative side lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-1/3 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
    </section>
  );
};

export default QuoteAnchor;
