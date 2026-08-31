import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  TrendingUp,
  Users,
  Rocket,
  ArrowUpLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Bot,
  Activity,
  Award,
  Globe,
  Radio,
  ExternalLink,
} from "lucide-react";
import {
  Container,
  Section,
  Badge,
  LinkButton,
  Button,
} from "../components/ui/primitives";
import { stats } from "../data/stats";
import { liveProjects } from "../data/liveProjects";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

const REPORT_YEAR = 2025;

const quarters = [
  {
    q: "Q1",
    label: "الربع الأول",
    title: "إطلاق المنصات السحابية وأنظمة ERP المتطورة",
    highlight: "18 منصة حية مدمجة",
    desc: "تشغيل منصات ويب متكاملة وإدارة منشآت تجارية وصناعية مع تكامل قواعد البيانات الحية وAPI متقدم.",
    metrics: [
      { label: "منصات تم تدشينها", val: "8 أنظمة" },
      { label: "زمن استجابة السيرفر", val: "<45ms" },
      { label: "جاهزية التشغيل", val: "99.9%" },
    ],
    icon: Globe,
  },
  {
    q: "Q2",
    label: "الربع الثاني",
    title: "توسيع مختبر الروبوتيك والملاحة الذاتية SLAM",
    highlight: "روبوتات ملاحة ومعالجة صور",
    desc: "تصميم مركبات ذاتية القيادة بروتوكول ROS 2 مع خوارزميات تحديد المواقع ورسم الخرائط ثنائية وثلاثية الأبعاد.",
    metrics: [
      { label: "نماذج روبوتات مجمعة", val: "14 روبوت" },
      { label: "حساسات ليدار مدمجة", val: "2D & 3D" },
      { label: "دقة الملاحة الميدانية", val: "98.5%" },
    ],
    icon: Bot,
  },
  {
    q: "Q3",
    label: "الربع الثالث",
    title: "بنية إنترنت الأشياء والزراعة الذكية وشبكات ESP-NOW",
    highlight: "عقد استشعار لاسلكية",
    desc: "تصميم شبكات عقد استشعار منخفضة الاستهلاك للطاقة وإرسال تيليمترية مستمرة للوحات المراقبة السحابية.",
    metrics: [
      { label: "عقد استشعار IoT", val: "+45 عقدة" },
      { label: "بروتوكولات اتصال", val: "MQTT / TLS" },
      { label: "توفير استهلاك الطاقة", val: "40%" },
    ],
    icon: Zap,
  },
  {
    q: "Q4",
    label: "الربع الرابع",
    title: "التوثيق المعياري الشامل وتسليم الأنظمة والمشاريع",
    highlight: "نسبة نجاح واعتماد 99.4%",
    desc: "تسليم كافة المخططات المعيارية والتقارير الهندسية وملفات التصنيع، وتدريب العملاء والمهندسين على تشغيل ومناقشة كل تفصيلة بثقة.",
    metrics: [
      { label: "أنظمة ومشاريع منجزة", val: "+35 نظام" },
      { label: "تقييمات الجودة واللجان", val: "امتياز عالي" },
      { label: "مخططات PCB منجزة", val: "100%" },
    ],
    icon: Award,
  },
];

const domainsDistribution = [
  { name: "الروبوتيك والميكاترونيك", pct: 35, count: 42, color: "bg-cyan-500" },
  { name: "إنترنت الأشياء والأنظمة المدمجة", pct: 28, count: 34, color: "bg-teal-500" },
  { name: "الذكاء الاصطناعي ورؤية الحاسب", pct: 22, count: 26, color: "bg-amber-500" },
  { name: "البرمجيات السحابية والأمن", pct: 15, count: 18, color: "bg-blue-500" },
];

export default function AnnualReport() {
  useSeo(
    "التقرير السنوي ومؤشرات الإنجاز | تكنو إنجاز",
    "تقرير الأثر الهندسي السنوي: إحصائيات المشاريع الحية، تجارب الروبوتيك، ونسب إنجاز الأنظمة المدمجة للشركات ورواد الأعمال والباحثين.",
  );

  const [activeQuarter, setActiveQuarter] = useState(0);
  const liveCount = liveProjects.filter((p) => p.live).length;
  const currentQ = quarters[activeQuarter];
  const QIcon = currentQ.icon;

  return (
    <>
      {/* Cover / Hero Header */}
      <div className="relative overflow-hidden border-b border-border/80 bg-blueprint py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.15),_transparent_65%)]"
          aria-hidden
        />
        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold text-primary">
            <Trophy className="h-4 w-4" />
            <span>التقرير الهندسي السنوي المعتمد</span>
          </div>

          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            حصاد الإنجاز والأثر التقني{" "}
            <span className="font-mono text-primary">
              ({toArabicDigits(REPORT_YEAR)})
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            رصد رقمي شامل للأنظمة الهندسية المنفذة، نماذج الأعمال والمنصات السحابية الحية، ساعات الاختبار المخبري، ونسب اعتماد المشاريع.
          </p>
        </Container>
      </div>

      {/* ---- Interactive Milestone Journey (Quarter by Quarter) ---- */}
      <Section className="py-16">
        <Container>
          <div className="mb-10 text-center sm:text-right">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              المسار الزمني للإنجازات والابتكارات
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              اختر الربع السنوي لاستعراض أهم المحطات الهندسية ومؤشرات الأداء
            </p>
          </div>

          {/* Quarter Navigation Tabs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quarters.map((q, idx) => {
              const active = idx === activeQuarter;
              return (
                <button
                  key={q.q}
                  onClick={() => setActiveQuarter(idx)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-4 text-right transition-all duration-300 ${
                    active
                      ? "border-primary bg-card shadow-lg ring-2 ring-primary/30"
                      : "border-border/80 bg-secondary/30 hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`font-mono text-xs font-extrabold ${
                        active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {q.q}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {q.label}
                    </span>
                  </div>
                  <h3
                    className={`mt-2 line-clamp-1 text-xs font-bold sm:text-sm ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {q.highlight}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Quarter Spotlight Dashboard */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-border/80 bg-card p-7 sm:p-10 shadow-sm">
            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.9fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <QIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-primary">
                      {currentQ.label} — {toArabicDigits(REPORT_YEAR)}
                    </span>
                    <h3 className="text-xl font-extrabold text-foreground sm:text-2xl">
                      {currentQ.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-loose text-muted-foreground sm:text-base">
                  {currentQ.desc}
                </p>

                <div className="pt-2">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-transform hover:-translate-x-1"
                  >
                    <span>استكشاف المشاريع المنجزة في هذه المرحلة</span>
                    <ArrowUpLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {currentQ.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl border border-border/80 bg-secondary/40 p-4"
                  >
                    <span className="text-xs font-semibold text-muted-foreground">
                      {m.label}
                    </span>
                    <span className="font-mono text-base font-extrabold text-foreground">
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Interactive Telemetry & Impact Meters ---- */}
      <Section className="border-t border-border/70 bg-secondary/20 py-16">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              المؤشرات الهندسية بالأرقام
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              بيانات تراكمية تعكس الدقة والجودة في كل نظام قمنا بتسليمه
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Rocket className="h-5 w-5" />
              </div>
              <div className="mt-5">
                <div className="font-mono text-3xl font-extrabold text-foreground sm:text-4xl">
                  +١٢٠
                </div>
                <div className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                  مشروع هندسي مكتمل
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  تم تسليمها وتدريب الطلاب على كودها ومخططاتها
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Activity className="h-5 w-5" />
              </div>
              <div className="mt-5">
                <div className="font-mono text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 sm:text-4xl">
                  ١٠٠%
                </div>
                <div className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                  جاهزية واستقرار المنصات
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  استضافة سحابية وتوافر دائم للنطاقات الحية
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="mt-5">
                <div className="font-mono text-3xl font-extrabold text-foreground sm:text-4xl">
                  +١,٤٥٠
                </div>
                <div className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                  ساعة اختبار مخبري
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  فحص الدارات، قياس التيارات ومعالجة الأخطاء
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Award className="h-5 w-5" />
              </div>
              <div className="mt-5">
                <div className="font-mono text-3xl font-extrabold text-teal-600 dark:text-teal-400 sm:text-4xl">
                  ٩٩.٤%
                </div>
                <div className="mt-1 text-xs font-bold text-foreground sm:text-sm">
                  نسبة تميز لجان المناقشة
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  حصول مشاريع طلابنا على علامات امتياز وتكريم
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Discipline Distribution Breakdown ---- */}
      <Section className="py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs font-bold text-primary">
                <Layers className="h-3.5 w-3.5" />
                <span>توزع التخصصات الهندسية</span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                تنوع المجالات التقنية المنفذة
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                توازن مدروس بين الأجهزة الملموسة والبرمجيات الذكية بما يواكب متطلبات سوق العمل الهندسي ومجالات البحث الحديثة.
              </p>

              <div className="mt-6 flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>تنفيذ عتادي وبرمجي شامل</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>تجارب حية موثقة</span>
                </div>
              </div>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-4 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
              {domainsDistribution.map((d) => (
                <div key={d.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="text-foreground">{d.name}</span>
                    <span className="font-mono text-primary">
                      {toArabicDigits(d.pct)}% ({toArabicDigits(d.count)} مشروع)
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${d.color}`}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Live Platforms Fleet Wall ---- */}
      <Section className="border-t border-border/70 bg-secondary/30 py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-xs font-bold">
                  {toArabicDigits(liveCount)} منصات حية تعمل الآن
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                أسطول المنصات والأنظمة العاملة
              </h2>
            </div>
            <LinkButton to="/projects" variant="outline" size="sm">
              عرض كافة المشاريع
              <ArrowUpLeft className="h-4 w-4" />
            </LinkButton>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveProjects.map((lp) => (
              <a
                key={lp.slug}
                href={lp.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-primary/60 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Online & Healthy</span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {lp.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {lp.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[11px] text-muted-foreground">
                  <span className="truncate max-w-[160px]">{lp.url ? lp.url.replace(/^https?:\/\//, '') : 'منظومة سحابية'}</span>
                  <span className="font-bold text-primary shrink-0">زيارة المنصة</span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Forward CTA ---- */}
      <Section className="py-16">
        <Container>
          <div className="rounded-3xl border border-border bg-blueprint p-8 text-center sm:p-12 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              هل أنت مستعد لنبدأ مشروعك القادم؟
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
              انضم إلى مئات الطلاب والمهندسين الذين حققوا مشاريع تخرج وأنظمة عملية بأعلى معايير الدقة.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <LinkButton to="/contact">
                تواصل مع المهندسين الآن
                <ArrowUpLeft className="h-4 w-4" />
              </LinkButton>
              <LinkButton to="/projects" variant="outline">
                استعراض معرض المشاريع
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
