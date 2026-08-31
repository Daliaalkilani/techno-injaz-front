import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  ArrowUpLeft,
  Cpu,
  Bot,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { img, photos } from "../../data/images";
import { toArabicDigits } from "../../lib/utils";

interface HeroShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  image: string;
  statLabel: string;
  statValue: string;
  link: string;
  externalUrl?: string;
  icon: typeof Bot;
}

const HERO_ITEMS: HeroShowcaseItem[] = [
  {
    id: "robotics",
    title: "روبوت ملاحة ذاتية وتوصيل",
    subtitle: "نظام ملاحة SLAM وتجنب عوائق ذكي باستخدام ROS 2 وليدار بدقة عالية.",
    tag: "روبوتيك وذكاء اصطناعي",
    category: "مشروع تخرّج هندسي",
    image: img(photos.robotics[0], 700, 500),
    statLabel: "دقة الملاحة",
    statValue: "٩٩.٢٪",
    link: "/projects/autonomous-delivery-robot",
    icon: Bot,
  },
  {
    id: "arduino-lab",
    title: "Arduino Lab التفاعلي",
    subtitle: "محاكي دوائر إلكترونية وتوصيل حساسات مباشر مع تشغيل كود C++ في المتصفح.",
    tag: "محاكي مباشر",
    category: "منصة سحابية",
    image: img(photos.electronics[0], 700, 500),
    statLabel: "زمن المحاكاة",
    statValue: "لحظي 0ms",
    link: "/projects",
    externalUrl: "https://arduino-lab.pages.dev/",
    icon: Cpu,
  },
  {
    id: "securecity",
    title: "منصة SecureCity للسيبراني",
    subtitle: "محاكاة هجمات ودفاع سيبراني تفاعلية تعتمد على سيناريوهات واقعية ذكية.",
    tag: "أمن سيبراني",
    category: "منصة تعليمية",
    image: img(photos.ai[0], 700, 500),
    statLabel: "تحديات تفاعلية",
    statValue: "+٤٠ سيناريو",
    link: "/projects",
    externalUrl: "https://taima-alwani.pages.dev/",
    icon: ShieldCheck,
  },
  {
    id: "iot-irrigation",
    title: "نظام ري ذكي بإنترنت الأشياء",
    subtitle: "تحكم آلي بالصمامات وقراءات رطوبة وتدفق فورية متصلة سحابياً عبر بروتوكول MQTT.",
    tag: "إنترنت الأشياء",
    category: "نظام مدمج",
    image: img(photos.electronics[1], 700, 500),
    statLabel: "توفير المياه",
    statValue: "٣٥٪",
    link: "/projects/smart-irrigation-iot",
    icon: Zap,
  },
];

export function HeroInteractiveRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const active = HERO_ITEMS[activeIndex];

  // Calm auto-rotation every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative mx-auto w-full max-w-[540px]"
    >
      {/* Clean Segment Tabs */}
      <div className="mb-3 flex items-center justify-start gap-1 rounded-2xl border border-border/80 bg-card/70 p-1 backdrop-blur-sm">
        {HERO_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-colors ${
                isCurrent
                  ? "text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isCurrent && (
                <motion.div
                  layoutId="heroTabCleanActive"
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 truncate">
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{item.tag}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Clean Showcase Window */}
      <div className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card p-2.5 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col overflow-hidden rounded-[22px] bg-slate-950 text-white"
          >
            {/* Visual Frame */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={active.image}
                alt={active.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-400 backdrop-blur border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {active.category}
                </span>

                <span className="rounded-full bg-slate-900/80 px-3 py-1 font-mono text-[11px] text-slate-300 backdrop-blur border border-white/10">
                  {active.statLabel}: <strong className="text-white">{active.statValue}</strong>
                </span>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="p-5 space-y-3 bg-slate-950">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {active.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-300 line-clamp-2">
                  {active.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {active.externalUrl ? (
                  <a
                    href={active.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition-transform hover:scale-105"
                  >
                    <span>انقر للمشاهدة الحية</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    to={active.link}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition-transform hover:scale-105"
                  >
                    <span>استكشف تفاصيل المشروع</span>
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </Link>
                )}

                <div className="flex items-center gap-1">
                  {HERO_ITEMS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeIndex
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`الشريحة ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
