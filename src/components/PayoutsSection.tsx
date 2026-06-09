import SectionHeader from "./SectionHeader";
import { useScrollReveal3D } from "@/hooks/useScrollReveal3D";
import payout1 from "@/assets/payout-1.asset.json";
import payout2 from "@/assets/payout-2.asset.json";
import payout3 from "@/assets/payout-3.asset.json";
import payout4 from "@/assets/payout-4.asset.json";

type Payout = {
  code: string;
  name: string;
  amount: string;
  firm: string;
  date: string;
  image: string;
};

const payouts: Payout[] = [
  {
    code: "PAYOUT_01",
    name: "Aknur Iskakova",
    amount: "$14 830.14",
    firm: "Crypto Fund Trader",
    date: "02.06.2026",
    image: payout1.url,
  },
  {
    code: "PAYOUT_02",
    name: "Sanzhar Asanov",
    amount: "$8 928.11",
    firm: "Blue Guardian",
    date: "05.09.2026",
    image: payout2.url,
  },
  {
    code: "PAYOUT_03",
    name: "Sanzhar Asanov",
    amount: "$14 230.00",
    firm: "Blue Guardian",
    date: "11.02.2026",
    image: payout3.url,
  },
  {
    code: "PAYOUT_04",
    name: "Alikhan Omarov",
    amount: "$23 450.00",
    firm: "The 5%ers",
    date: "2026",
    image: payout4.url,
  },
];

const PayoutCard = ({ payout, index }: { payout: Payout; index: number }) => {
  const { ref, style } = useScrollReveal3D(index * 90);

  return (
    <div
      ref={ref}
      style={style}
      className="glass rounded-sm overflow-hidden border-l-2 border-l-primary/40 transition-all duration-300 hover:border-l-primary/80 group card-hover-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={payout.image}
          alt={`Payout certificate — ${payout.name}, ${payout.amount}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 font-mono text-[10px] tracking-wider text-primary bg-background/70 backdrop-blur px-2 py-1 rounded-sm">
          [{payout.code}]
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-sans text-sm font-semibold text-foreground">
            {payout.name}
          </h3>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
            {payout.date}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xl font-bold cyan-text">
            {payout.amount}
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
            {payout.firm}
          </span>
        </div>
      </div>
    </div>
  );
};

const PayoutsSection = () => {
  return (
    <section className="relative py-40 px-6">
      <SectionHeader
        tag="PROOF OF WORK"
        title="РЕАЛЬНЫЕ ВЫПЛАТЫ УЧЕНИКОВ"
        tagClassName="text-primary/80"
        dividerClassName="bg-primary/30"
      />
      <p className="text-center text-muted-foreground font-body text-base md:text-lg -mt-12 mb-16 max-w-2xl mx-auto">
        Не обещания. Скриншоты сертификатов с реальных проп-фирм.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
        {payouts.map((p, i) => (
          <PayoutCard key={p.code} payout={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default PayoutsSection;
