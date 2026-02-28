import { useState } from "react";
import { X } from "lucide-react";

interface IntakeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
}

const IntakeFormModal = ({ isOpen, onClose, selectedTier }: IntakeFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    telegram: "",
    instagram: "",
    tier: selectedTier || "GROUP SESSION",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just close the modal
    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    onClose();
  };

  const tiers = ["SELF-STUDY", "GROUP SESSION", "INDIVIDUAL"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass-strong rounded-sm w-full max-w-lg p-0 overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
              РЕГИСТРАЦИЯ КАНДИДАТА
            </span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Terminal prompt style */}
          <div className="font-mono text-xs text-muted-foreground mb-4">
            <span className="cyan-text">$</span> Заполните данные для регистрации_
          </div>

          {/* Name */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              ИМЯ
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-secondary/30 border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors rounded-sm placeholder:text-muted-foreground/40"
              placeholder="Введите имя..."
              required
            />
          </div>

          {/* Telegram */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              TELEGRAM / WHATSAPP
            </label>
            <input
              type="text"
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              className="w-full bg-secondary/30 border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors rounded-sm placeholder:text-muted-foreground/40"
              placeholder="@username"
              required
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              INSTAGRAM
            </label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full bg-secondary/30 border border-border px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors rounded-sm placeholder:text-muted-foreground/40"
              placeholder="@instagram"
            />
          </div>

          {/* Tier selection */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              ТАРИФ
            </label>
            <div className="grid grid-cols-3 gap-2">
              {tiers.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setFormData({ ...formData, tier })}
                  className={`font-mono text-[10px] tracking-wider py-2.5 border transition-all duration-200 rounded-sm ${
                    formData.tier === tier
                      ? "border-primary/40 cyan-text bg-primary/5"
                      : "border-border text-muted-foreground hover:border-muted-foreground/40"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full font-mono text-xs tracking-[0.2em] py-3.5 mt-4 border border-primary/30 bg-primary/5 text-primary transition-all duration-300 cta-glow hover:bg-primary/10 hover:border-primary/50 rounded-sm"
          >
            [ ОТПРАВИТЬ ДАННЫЕ ]
          </button>

          {/* Footer */}
          <div className="text-center pt-2">
            <span className="font-mono text-[10px] text-muted-foreground/40">
              encrypted connection • secure data transfer
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeFormModal;
