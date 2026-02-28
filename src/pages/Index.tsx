import { useState } from "react";
import Hero from "@/components/Hero";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import PricingSection from "@/components/PricingSection";
import IntakeFormModal from "@/components/IntakeFormModal";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | undefined>();

  const handleOpenForm = (tier?: string) => {
    setSelectedTier(tier);
    setFormOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid film-grain">
      <Hero onOpenForm={handleOpenForm} />
      <ModuleRoadmap />
      <PricingSection onOpenForm={handleOpenForm} />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            EQUITY<span className="cyan-text mx-1">/</span>TRADING SYSTEM
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/40">
            © 2026 ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>

      <IntakeFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  );
};

export default Index;
