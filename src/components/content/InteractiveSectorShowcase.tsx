import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowUpLeft,
  Cpu,
  ShieldCheck,
  Zap,
  Bot,
  ExternalLink,
  Layers,
  Flame,
} from "lucide-react";
import { img, photos } from "../../data/images";
import { toArabicDigits } from "../../lib/utils";

const SECTORS_DATA = [
  {
    id: "startups",
    title: "رواد الأعمال والشركات الناشئة",
    badge: "MVP & Rapid Hardware/Software Prototypes",
    icon: Rocket,
    tagline: "من الفكرة على الورق إلى نموذج أولي جاهز لجذب الاستثمارات وعرض السوق",
    accentColor: "from-blue-600 to-cyan-500",
    image: img(photos.electronics[0], 700, 480),
    turnaround: "١٠ - ١٥ يوماً للنموذج الأولي",
    stat: { label: "جاهزية الاستثمار", value: "١٠٠٪" },
    highlights: [
      {
        title: "بناء نموذج MVP حقيقي متكامل",
        desc: "جهاز مادي مجمع ولوحة تحكم وتطبيق سحابي لتجربة المستخدم الحية أمام المستثمرين.",
      },
      {
        title: "دراسة جدوى هندسية وتكلفة الإنتاج (BOM)",
        desc: "تحديد أفضل المكونات الصالحة للإنتاج التجاري الكمي بأقل تكلفة ممكنة.",
      },
      {
        title: "تصميم الغلاف الصناعي 3D",
        desc: "مجسم هندسي مريح وعصري يحمل شعار شركتك الناشئة.",
      },
      {
        title: "حماية الملكية الفكرية وسرية الفكرة (NDA)",
        desc: "توقيع اتفاقيات عدم إفصاح رسمية تضمن حماية كاملة لابتكارك.",
      },
    ],
    ctaText: "ابدأ بناء نموذج شركتك الناشئة (MVP)",
    link: "/contact?type=startup",
  },
  {
    id: "enterprises",
    title: "المؤسسات والشركات الصناعية والتجارية",
    badge: "Industrial Automation & Cloud IIoT",
    icon: Building2,
    tagline: "أتمتة العمليات، المراقبة اللحظية عن بُعد، وتقليل الفاقد التشغيلي",
    accentColor: "from-emerald-600 to-teal-500",
    image: img(photos.ai[0], 700, 480),
    turnaround: "حلول معيارية قابلة للتوسع",
    stat: { label: "كفاءة التشغيل", value: "+٤٥٪" },
    highlights: [
      {
        title: "أنظمة تحكم ومراقبة صناعية عن بُعد (SCADA/IIoT)",
        desc: "ربط خطوط الإنتاج والآلات بقواعد بيانات سحابية وتنبيهات طوارئ فورية عبر Telegram/SMS.",
      },
      {
        title: "أنظمة الرؤية الحاسوبية وفحص الجودة بالـ AI",
        desc: "كاميرات ذكية تفحص عيوب المنتجات والباركودات بسرعة تصل لمئات القطع بالدقيقة.",
      },
      {
        title: "منصات ERP وربط مالي وإداري مخصص",
        desc: "تطوير لوحات تحكم تناسب تماماً سير العمل الداخلي دون قيود البرامج الجاهزة.",
      },
      {
        title: "عقود صيانة دورية وضمان أداء واستقرار",
        desc: "فريق فني متاح لدعم المنظومة وتحديثها بما يواكب متطلبات أعمالك.",
      },
    ],
    ctaText: "طلب دراسة أتمتة أو نظام مخصص للمؤسسة",
    link: "/contact?type=enterprise",
  },
  {
    id: "academics",
    title: "المهندسون والباحثون ومشاريع التخرج",
    badge: "Research & Development & Graduation Projects",
    icon: GraduationCap,
    tagline: "مشاريع تخرج هندسية نوعية تنافس في المعارض وتضمن أعلى الدرجات",
    accentColor: "from-amber-600 to-orange-500",
    image: img(photos.robotics[0], 700, 480),
    turnaround: "مرافقة وتدريب شامل حتى المناقشة",
    stat: { label: "معدل التقييم", value: "امتياز" },
    highlights: [
      {
        title: "مشاريع روبوتيك و ROS 2 و SLAM ذاتية القيادة",
        desc: "أنظمة ملاحية متطورة مع محاكاة في Gazebo وكود خوارزميات معياري حديث.",
      },
      {
        title: "تصميم دارات PCB احترافية ومخططات معمارية",
        desc: "دوائر مطبوعة بدقة عالية ومخططات معتمدة للمناقشة الأكاديمية.",
      },
      {
        title: "توثيق علمي وبحثي ودليل تشغيل كامل",
        desc: "مساعدة في كتابة الرسالة والتقرير الهندسي ورسم الجداول والمخططات التوضيحية.",
      },
      {
        title: "تدريب وشرح تفصيلي (1-on-1)",
        desc: "جلسات تدريبية تجعلك خبيراً بكل سطر برمجي ودائرة كهربائية لتجيب على كل أسئلة اللجنة بثقة.",
      },
    ],
    ctaText: "استكشف مشاريع التخرج والهندسة",
    link: "/projects",
  },
];

export function InteractiveSectorShowcase() {
  const [selectedId, setSelectedId] = useState("startups");

  const current = SECTORS_DATA.find((s) => s.id === selectedId) || SECTORS_DATA[0];
  const Icon = current.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>قطاعات عملائنا والحلول الهندسية الموجهة</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          خدمات مخصصة تخدم هدفك بأعلى معايير الدقة
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          اختر قطاعك لاستكشاف كيف نصمم ونطور المنظومة بما يلائم بيئة عملك أو متطلباتك الأكاديمية والاستثمارية
        </p>
      </div>

      {/* Asymmetric Interactive Selector Switch */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SECTORS_DATA.map((sector) => {
          const SIcon = sector.icon;
          const isSelected = sector.id === selectedId;

          return (
            <button
              key={sector.id}
              onClick={() => setSelectedId(sector.id)}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-right transition-all duration-300 ${
                isSelected
                  ? "border-primary bg-card ring-2 ring-primary/30 shadow-md scale-[1.02]"
                  : "border-border/80 bg-card/60 hover:bg-card hover:border-primary/40"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <SIcon className="h-6 w-6" />
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-primary">{sector.badge.split("&")[0]}</div>
                <div className="text-sm font-black text-foreground">{sector.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bento Interactive Spotlight Layout */}
      <div className="overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Visual Showcase with stats */}
          <div className="relative space-y-4">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-border/80 bg-secondary/50">
              <img
                src={current.image}
                alt={current.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between rounded-xl bg-background/90 p-3.5 backdrop-blur-md border border-border/70 shadow-lg">
                <div>
                  <div className="text-xs text-muted-foreground">{current.stat.label}</div>
                  <div className="font-mono text-lg font-black text-primary">{current.stat.value}</div>
                </div>
                <div className="text-left font-mono text-xs font-bold text-foreground">
                  {current.turnaround}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>جاهزية كاملة للتسليم والاختبار المخبري الميداني</span>
            </div>
          </div>

          {/* Highlights & Features Breakdown */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                <Icon className="h-3.5 w-3.5" />
                <span>{current.badge}</span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {current.tagline}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/60 bg-secondary/30 p-4 space-y-1.5 transition-colors hover:border-primary/40 hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{h.title}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3 border-t border-border/60">
              <Link
                to={current.link}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <span>{current.ctaText}</span>
                <ArrowUpLeft className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-5 text-xs sm:text-sm font-bold text-foreground transition-all hover:bg-border"
              >
                <span>حجز جلسة استشارية</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
