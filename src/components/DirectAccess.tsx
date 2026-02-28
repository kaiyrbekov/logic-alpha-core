import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import { useCardTilt } from "@/hooks/useCardTilt";

const channels = [
  {
    id: "TG",
    label: "TELEGRAM",
    handle: "@equity_trading",
    url: "https://t.me/equity_trading",
    description: "Канал с аналитикой и обновлениями системы.",
  },
  {
    id: "WA",
    label: "WHATSAPP",
    handle: "+7 (XXX) XXX-XX-XX",
    url: "https://wa.me/7XXXXXXXXXX",
    description: "Прямая связь для консультации по тарифам.",
  },
];

const ChannelCard = ({ channel, index }: { channel: typeof channels[0]; index: number }) => {
  const { ref: revealRef, style: revealStyle } = useScrollReveal3D(index * 100);
  const tilt = useCardTilt();

  return (
    <div ref={revealRef} style={revealStyle}>
      <a
        href={channel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className="glass rounded-sm p-9 h-full transition-all duration-300 group cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary pulse-cyan" />
            <span className="font-mono text-sm tracking-[0.2em] text-muted-foreground">{channel.label}</span>
          </div>
          <div className="font-mono text-2xl md:text-3xl font-bold cyan-text mb-4 group-hover:text-primary transition-colors">
            {channel.handle}
          </div>
          <p className="font-body text-base text-muted-foreground">{channel.description}</p>
          <div className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground/50 group-hover:text-primary/60 transition-colors">
            [ ОТКРЫТЬ ]
          </div>
        </div>
      </a>
    </div>
  );
};

const DirectAccess = () => {
  return (
    <section className="relative py-40 px-6">
      <SectionHeader tag="DIRECT_ACCESS" title="ПРЯМАЯ СВЯЗЬ" />
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
        {channels.map((channel, i) => (
          <ChannelCard key={channel.id} channel={channel} index={i} />
        ))}
      </div>
    </section>
  );
};

export default DirectAccess;
