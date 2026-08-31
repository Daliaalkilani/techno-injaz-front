import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpLeft,
  Bot,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  ExternalLink,
  Flame,
  Radio,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { projects } from "../../data/projects";
import { img, photos } from "../../data/images";
import { toArabicDigits } from "../../lib/utils";

interface StackCard {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  highlight: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  color: string;
  badgeColor: string;
  hardware: string[];
}

const DECK_ITEMS: StackCard[] = [
  {
    id: "robot-nav",
    slug: "autonomous-delivery-robot",
    title: "روبوت الملاحة والتوصيل الذاتي الذكي",
    category: "روبوتيك وذكاء اصطناعي",
    subtitle: "نظام ملاحة SLAM وتفادي عوائق لحظي مبني على معمارية ROS 2 وLiDAR بدقة مليمترية.",
    highlight: "معمارية ROS 2 + خوارزمية A* الملاحية",
    metrics: [
      { label: "دقة الملاحة", value: "٩٩.٢٪" },
      { label: "سرعة الاستجابة", value: "١٢ms" },
      { label: "حمولة النقل", value: "١٥ كغ" },
    ],
    tags: ["ROS 2 Humble", "LiDAR 360°", "Gazebo Sim", "SLAM Nav2"],
    image: img(photos.robotics[0], 800, 550),
    color: "from-blue-600/20 via-cyan-500/10 to-transparent",
    badgeColor: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10",
    hardware: ["Jetson Nano / Orin", "RPLiDAR A2M8", "Encoders 1000PPR", "Dual BLDC Motors"],
  },
  {
    id: "iot-irrigation",
    slug: "smart-irrigation-iot",
    title: "نظام الري الذكي الزراعي بإنترنت الأشياء",
    category: "إنترنت الأشياء والأنظمة المدمجة",
    subtitle: "منظومة تحكم هيدروليكية ذاتية بمجسات رطوبة التربة والأرصاد السحابية عبر بروتوكول MQTT المشفر.",
    highlight: "توفير مياه بنسبة ٤٠٪ مع تحكم صمامات لحظي",
    metrics: [
      { label: "توفير المياه", value: "٤٠٪" },
      { label: "معدل التحديث", value: "١ ثانية" },
      { label: "عمر البطارية", value: "٣ سنوات" },
    ],
    tags: ["ESP32-S3", "MQTT / TLS", "Solar Power", "Cloud Dashboard"],
    image: img(photos.electronics[1], 800, 550),
    color: "from-emerald-600/20 via-teal-500/10 to-transparent",
    badgeColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    hardware: ["ESP32-WROOM", "Capacitive Moisture Sensors", "Solenoid 12V Valves", "Solar MPPT 20W"],
  },
  {
    id: "smart-drone",
    slug: "gesture-controlled-drone",
    title: "طائرة درون بالتحكم بالإيماءات والذكاء الاصطناعي",
    category: "ميكاترونيك والأنظمة المدمجة",
    subtitle: "طائرة مسيرة رباعية المحركات تعمل بتتبع إيماءات اليد ثلاثية الأبعاد عبر خوارزميات MediaPipe والرؤية الحاسوبية.",
    highlight: "تحكم بدون لمس وتتبع مسار كهروميكانيكي دقيق",
    metrics: [
      { label: "معدل الإطارات", value: "٦٠ FPS" },
      { label: "زمن التأخير", value: "٨ms" },
      { label: "مدى الإشارة", value: "٥٠٠م" },
    ],
    tags: ["MediaPipe", "STM32F4", "IMU MPU6050", "PID Flight Controller"],
    image: img(photos.robotics[1], 800, 550),
    color: "from-amber-600/20 via-orange-500/10 to-transparent",
    badgeColor: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    hardware: ["STM32F405 Flight Controller", "BLDC 2205 Motors", "Optical Flow Sensor", "ESP-NOW Link"],
  },
  {
    id: "ecommerce-system",
    slug: "ecommerce-platform",
    title: "منصة سحابية متكاملة للتجارة والمخازن",
    category: "البرمجيات السحابية والأتمتة",
    subtitle: "منظومة ويب متطورة فائقة السرعة مع إدارة مستودعات وربط فوري لبوابات الدفع وتحليلات ذكاء الأعمال.",
    highlight: "بنية Microservices متقدمة مع لوحة تحكم فورية",
    metrics: [
      { label: "زمن التحميل", value: "٠.٤ ثانية" },
      { label: "الاستقرار", value: "٩٩.٩٩٪" },
      { label: "الطلبات المتزامنة", value: "+١٠k" },
    ],
    tags: ["React 19", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: img(photos.ai[0], 800, 550),
    color: "from-purple-600/20 via-pink-500/10 to-transparent",
    badgeColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    hardware: ["Cloud Server / Docker", "Edge CDN", "Redis Cache", "Webhook Engine"],
  },
];

export function StackedProjectDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"stacked" | "fan">("stacked");

  const total = DECK_ITEMS.length;

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const activeCard = DECK_ITEMS[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-background to-secondary/30 p-6 sm:p-10 lg:p-12 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>عرض البطاقات التفاعلية المتراكبة (Interactive 3D Deck)</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            استكشف أحدث نماذجنا وأنظمتنا التفاعلية
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            تفاعل مع البطاقات المتراكبة بالتبديل أو النقر للاطلاع على المخططات والمقاييس المباشرة
          </p>
        </div>

        {/* View Mode & Nav Buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center rounded-xl border border-border bg-secondary/50 p-1">
            <button
              onClick={() => setViewMode("stacked")}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                viewMode === "stacked"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              متراكب (Stack)
            </button>
            <button
              onClick={() => setViewMode("fan")}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                viewMode === "fan"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              مروحي ثلاثي الأبعاد (Fan)
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevCard}
              aria-label="البطاقة السابقة"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:bg-secondary hover:border-primary active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={nextCard}
              aria-label="البطاقة التالية"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:bg-secondary hover:border-primary active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Deck Stage */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center min-h-[480px]">
        {/* Left/Interactive 3D Stack Viewport */}
        <div className="relative flex items-center justify-center py-6">
          <div className="relative w-full max-w-[480px] h-[380px] sm:h-[420px]">
            <AnimatePresence initial={false}>
              {DECK_ITEMS.map((item, index) => {
                // Calculate position relative to current active index
                const offset = (index - currentIndex + total) % total;
                const isTop = offset === 0;

                // 3D positioning styling
                let transformStyle = {};
                let zIndex = total - offset;
                let opacity = 1 - offset * 0.22;
                let scale = 1 - offset * 0.06;

                if (viewMode === "stacked") {
                  // Layered Stack with isometric perspective offset
                  const translateY = offset * 18;
                  const translateX = offset * -14;
                  const rotateZ = offset * 2.5;

                  transformStyle = {
                    transform: `translate3d(${translateX}px, ${translateY}px, ${-offset * 40}px) rotate(${rotateZ}deg) scale(${scale})`,
                    zIndex,
                    opacity: offset > 3 ? 0 : opacity,
                  };
                } else {
                  // Fan-out mode like playing cards
                  const fanSpread = (offset - 1.5) * 12;
                  const translateX = (offset - 1.5) * 45;
                  const translateY = Math.abs(offset - 1.5) * 15;

                  transformStyle = {
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${fanSpread}deg) scale(${scale})`,
                    zIndex: isTop ? 10 : zIndex,
                    opacity: 1,
                  };
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    style={transformStyle}
                    onClick={() => setCurrentIndex(index)}
                    className={`absolute inset-0 cursor-pointer overflow-hidden rounded-3xl border border-border/90 bg-card p-5 sm:p-6 shadow-2xl transition-shadow duration-300 ${
                      isTop ? "ring-2 ring-primary/40 shadow-primary/15" : "hover:border-primary/50"
                    }`}
                  >
                    {/* Background glow banner */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.color} opacity-40`}
                    />

                    <div className="relative flex h-full flex-col justify-between">
                      {/* Top Bar inside card */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center rounded-xl border px-3 py-1 font-mono text-[11px] font-bold ${item.badgeColor}`}
                          >
                            {item.category}
                          </span>
                          <span className="font-mono text-xs font-bold text-muted-foreground">
                            #{toArabicDigits(index + 1)} / {toArabicDigits(total)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-lg font-black text-foreground sm:text-xl line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Card Image Snippet with Aspect */}
                      <div className="relative my-3 h-36 sm:h-44 w-full overflow-hidden rounded-2xl border border-border/80 bg-secondary/50">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-2 left-2 rounded-lg bg-background/85 px-2.5 py-1 text-[10px] font-mono font-bold text-foreground backdrop-blur-xs border border-border/60">
                          {item.highlight}
                        </div>
                      </div>

                      {/* Mini Tags Footer */}
                      <div className="flex items-center justify-between border-t border-border/60 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[10px] font-medium text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                          <span>تفاصيل</span>
                          <ArrowUpLeft className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right/Deep Inspection & Live Telemetry Inspector */}
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                LIVE HARDWARE TELEMETRY
              </span>
            </div>
            <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-xs font-bold text-foreground">
              {activeCard.category}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-black text-foreground sm:text-2xl">
              {activeCard.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {activeCard.subtitle}
            </p>
          </div>

          {/* Real-time Telemetry Metrics Grid */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {activeCard.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/70 bg-secondary/40 p-3 text-center"
              >
                <div className="font-mono text-lg sm:text-xl font-black text-foreground">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Hardware Components Stack */}
          <div className="mt-6 space-y-2 border-t border-border/60 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              <span>المكونات والعتاد المدمج (Hardware Components):</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {activeCard.hardware.map((hw, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 px-3 py-1.5 text-xs text-foreground font-mono"
                >
                  <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{hw}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
            <Link
              to={`/projects/${activeCard.slug}`}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 hover:shadow-md"
            >
              <span>استعراض التوثيق والمخططات كاملة</span>
              <ArrowUpLeft className="h-4 w-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-5 text-xs sm:text-sm font-bold text-foreground transition-all hover:bg-border"
            >
              <span>طلب نظام مماثل</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
