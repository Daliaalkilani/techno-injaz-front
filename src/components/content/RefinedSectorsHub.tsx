import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowUpLeft,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { img, photos } from "../../data/images";

interface AudienceSector {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  icon: typeof Rocket;
  image: string;
  features: string[];
  link: string;
  cta: string;
}

const SECTORS: AudienceSector[] = [
  {
    id: "startups",
    title: "رواد الأعمال والشركات الناشئة",
    badge: "MVP & Prototypes",
    tagline: "تحويل الابتكارات والأفكار الريادية إلى نماذج أولية عملية (Hardware & Software) جاهزة للإنتاج وعرض المستثمرين.",
    icon: Rocket,
    image: img(photos.electronics[0], 600, 400),
    features: [
      "تصميم وتجميع أجهزة مادية متكاملة مع تطبيقات تحكم",
      "دراسة التكاليف وقائمة المكونات (BOM Optimization)",
      "تصميم الهياكل والمجسمات الصناعية ثلاثية الأبعاد",
      "اتفاقيات سرية وحماية الملكية الفكرية (NDA)",
    ],
    link: "/contact?type=startup",
    cta: "ابدأ نموذجك الأولي (MVP)",
  },
  {
    id: "enterprises",
    title: "المؤسسات والشركات التجارية والصناعية",
    badge: "Automation & Cloud IIoT",
    tagline: "أنظمة أتمتة متقدمة، ربط صناعي للمعدات والآلات، ومنصات رقمية متخصصة لتحسين الأداء والكفاءة التشغيلية.",
    icon: Building2,
    image: img(photos.ai[0], 600, 400),
    features: [
      "أنظمة تحكم ومراقبة لحظية عن بعد (SCADA / IIoT)",
      "حلول الرؤية الحاسوبية وفحص الجودة بالذكاء الاصطناعي",
      "لوحات تحكم سحابية مخصصة وإدارة عمليات متقدمة",
      "ضمان تشغيلي ودعم فني وصيانة دورية مستمرة",
    ],
    link: "/contact?type=enterprise",
    cta: "طلب حل مخصص للمؤسسة",
  },
  {
    id: "academics",
    title: "المهندسون والباحثون ومشاريع التخرج",
    badge: "R&D & Engineering",
    tagline: "تنفيذ ومرافقة المشاريع الهندسية التخصصية والأبحاث التطبيقية مع تدريب معرفي وتوثيق كامل حتى يوم المناقشة.",
    icon: GraduationCap,
    image: img(photos.robotics[0], 600, 400),
    features: [
      "مشاريع روبوتيك متقدمة وملاحة ROS 2 و SLAM",
      "تصميم دارات PCB احترافية ومخططات معمارية معتمدة",
      "توثيق علمي وبحثي ودليل تشغيل هندسي شامل",
      "جلسات تدريب وشرح للكود والعتاد لتمكين الطالب",
    ],
    link: "/projects",
    cta: "استكشف مشاريع الهندسة",
  },
];

export function RefinedSectorsHub() {
  const [activeId, setActiveId] = useState("startups");
  const current = SECTORS.find((s) => s.id === activeId) || SECTORS[0];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>القطاعات والحلول الموجهة</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            خدمات مصممة لتلائم طبيعة أهدافك
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            اختر قطاعك للاطلاع على كيفية تخطيط وتنفيذ النظام الهندسي الملائم لاحتياجك
          </p>
        </div>
      </div>

      {/* Modern Seamless Layout: Top Horizontal Tab Selector + Structured Card */}
      <div className="space-y-6">
        {/* Responsive Segmented Control */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            const isSelected = sector.id === activeId;
            return (
              <button
                key={sector.id}
                onClick={() => setActiveId(sector.id)}
                className={`flex items-center gap-3.5 rounded-2xl border p-4 text-right transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-card ring-2 ring-primary/20 shadow-xs"
                    : "border-border/80 bg-card/60 hover:border-border hover:bg-card"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11px] font-semibold text-primary">
                    {sector.badge}
                  </div>
                  <div className="text-xs font-bold text-foreground sm:text-sm truncate">
                    {sector.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Showcase Body */}
        <div className="overflow-hidden rounded-3xl border border-border/90 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left: Features & Deliverables */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
                  <CurrentIcon className="h-4 w-4" />
                  <span>{current.badge}</span>
                </span>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {current.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {current.tagline}
                </p>
              </div>

              {/* Core Features Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {current.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-secondary/30 p-3 text-xs leading-normal text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60">
                <Link
                  to={current.link}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
                >
                  <span>{current.cta}</span>
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-5 text-xs sm:text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <span>استشارة تقنية</span>
                </Link>
              </div>
            </div>

            {/* Right: Clean Image Preview with subtle badge */}
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-muted">
              <img
                src={current.image}
                alt={current.title}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>تنفيذ هندسي موثوق وضمان أداء</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
