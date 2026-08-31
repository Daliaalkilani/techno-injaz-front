import { motion } from "motion/react";
import { Activity, Sparkles, Cpu, Globe, CheckCircle2, Zap } from "lucide-react";

export function LiveTicker() {
  const items = [
    { icon: Globe, label: "منصة SecureCity", status: "نشطة أونلاين", tag: "AI Cyber" },
    { icon: Cpu, label: "Arduino Lab التفاعلي", status: "محاكي مباشر جاهز", tag: "Hardware" },
    { icon: Activity, label: "حِساب ERP المحاسبي", status: "نظام سحابي متصل", tag: "Business" },
    { icon: Zap, label: "مشروع الروبوت الذاتي ROS 2", status: "جاهز للملاحة", tag: "Robotics" },
    { icon: Sparkles, label: "نظام ري IoT ذكي", status: "تكامل MQTT فوري", tag: "Smart IoT" },
    { icon: CheckCircle2, label: "+130 مشروع تخرج وتقني منفّذ", status: "موثّق هندسياً", tag: "Engineering" },
  ];

  return (
    <div className="relative overflow-hidden border-y border-border/80 bg-card/60 backdrop-blur-md py-3">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />

      <div className="flex select-none">
        <motion.div
          animate={{ x: ["0%", "50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex shrink-0 items-center gap-8 whitespace-nowrap px-4"
        >
          {[...items, ...items, ...items].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-secondary/50 px-4 py-1.5 text-xs text-foreground transition-all hover:border-primary/40"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold">{item.label}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{item.status}</span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                  {item.tag}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
