import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  CheckCircle2,
  Workflow,
  ArrowUpLeft,
  FileCode2,
  Wrench,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { toArabicDigits } from "../../lib/utils";

interface PipelineStep {
  id: number;
  phaseCode: string;
  title: string;
  shortDesc: string;
  duration: string;
  deliverables: string[];
  keyTools: string[];
  details: string;
  icon: typeof Compass;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 1,
    phaseCode: "PHASE_01 // ARCHITECTURE",
    title: "التحليل المعماري وتصميم المخطط الهندسي",
    shortDesc: "دراسة الجدوى التقنية، تحديد متحكمات المعالجة والمجسات، ورسم المخططات المعمارية (Block Diagrams).",
    duration: "٣ - ٥ أيام",
    deliverables: [
      "مخطط معمارية النظام (System Architecture Diagram)",
      "قائمة المكونات والتكاليف (BOM Optimization)",
      "تحديد بروتوكولات الاتصال (UART / SPI / I2C / MQTT)",
      "جدول المتطلبات الوظيفية والأمان",
    ],
    keyTools: ["EasyEDA", "KiCad", "Figma Engineering", "MathWorks"],
    details:
      "نبدأ بتفكيك فكرتك إلى منظومات فرعية واضحة، مع تدقيق استهلاك الطاقة وحسابات العزم والترددات المطلوبة لتفادي أي اختناقات مستقبلية.",
    icon: Compass,
  },
  {
    id: 2,
    phaseCode: "PHASE_02 // SIMULATION",
    title: "المحاكاة الرقمية والنمذجة الافتراضية (Digital Twin)",
    shortDesc: "محاكاة الإشارات الكهربائية، اختبار منطق الخوارزميات، وتجربة حركة الروبوت أو الدائرة افتراضياً.",
    duration: "٤ - ٧ أيام",
    deliverables: [
      "بيئة محاكاة تفاعلية (Gazebo / Wokwi / MATLAB)",
      "اختبار الاستجابة للظروف الحرجة والأعطال",
      "محاكاة استهلاك الطاقة وعمر البطاريات",
      "التحقق من صحة كود التحكم المسبق",
    ],
    keyTools: ["ROS 2 Gazebo", "Wokwi Simulator", "Proteus", "SPICE"],
    details:
      "تضمن مرحلة المحاكاة تصفير نسبة الخطأ قبل شراء أي قطعة مادية أو تصنيع ألواح PCB، مما يوفر الوقت والتكاليف بشكل هائل.",
    icon: Workflow,
  },
  {
    id: 3,
    phaseCode: "PHASE_03 // FABRICATION",
    title: "تصنيع الـ PCB والنمذجة الميكانيكية ثلاثية الأبعاد",
    shortDesc: "تجهيز ملفات Gerber، طباعة الدارات المطبوعة متعددة الطبقات، وتصميم الهياكل الحاضنة المقاومة للصدمات.",
    duration: "٧ - ١٠ أيام",
    deliverables: [
      "ألواح دارات مطبوعة مجمعة ومختبرة (Assembled PCB)",
      "هياكل ميكانيكية 3D ومجسمات صناعية",
      "ملفات تصنيع قياسية (Gerber & STL)",
      "اختبار قياسات الفولتية ونقاء الإشارة (Continuity & Noise)",
    ],
    keyTools: ["SolidWorks", "Fusion 360", "JLCPCB Stack", "SMD Soldering Station"],
    details:
      "نستخدم تقنيات الطباعة ثلاثية الأبعاد والتجميع السطحي (SMD) لإنتاج مجسم نهائي مدمج يبدو كمنتج تجاري مصنعي جاهز للسوق.",
    icon: Wrench,
  },
  {
    id: 4,
    phaseCode: "PHASE_04 // FIRMWARE & CLOUD",
    title: "برمجة النواة، الذكاء الاصطناعي، والمنصة السحابية",
    shortDesc: "كتابة البرمجيات المدمجة ذات الوقت الحقيقي (RTOS/C++) وبناء لوحات التحكم السحابية وتطبيقات المراقبة.",
    duration: "٧ - ١٤ يوماً",
    deliverables: [
      "كود برمجي معياري نظيف ومشروح بدقة (Clean C++/Python)",
      "لوحة تحكم وتحليلات سحابية متجاوبة (React + WebSocket)",
      "تطبيق واجهة مستخدم أو تطبيق هاتف مخصص",
      "تشفير الاتصالات وحماية التشفير عبر TLS",
    ],
    keyTools: ["FreeRTOS", "Embedded C++", "Python AI", "React / Node.js"],
    details:
      "برمجة منخفضة المستوى لتحقيق أقصى سرعة استجابة مع ربط سحابي مشفر يتيح مراقبة النظام والتحكم به من أي مكان في العالم.",
    icon: Terminal,
  },
  {
    id: 5,
    phaseCode: "PHASE_05 // LAUNCH & TRAINING",
    title: "التسليم الميداني، التدريب، والتوثيق الشامل",
    shortDesc: "تسليم النظام كاملاً مع جلسات تدريب تفاعلية وشرح تفصيلي للأكواد والمخططات وتوفير ضمان ودعم فني مستمر.",
    duration: "مستمر",
    deliverables: [
      "دليل تشغيل هندسي شامل (Engineering Manual)",
      "جلسات تدريب وشرح للكود والعتاد (1-on-1 Sessions)",
      "شهادة اختبار جودة وفحص مخبري معتمدة",
      "دعم فني وضمان أداء واستقرار النظام",
    ],
    keyTools: ["Documentation Suite", "Video Walkthroughs", "Support Portal"],
    details:
      "لا ينتهي دورنا بالتسليم؛ نحرص على تمكينك وفهمك لكل سطر برمجي ومكون هندسي لتكون واثقاً تماماً عند عرض مشروعك أو تشغيل نظامك.",
    icon: Rocket,
  },
];

export function InteractivePipelineFlow() {
  const [activeStepId, setActiveStepId] = useState(1);

  const activeStep = PIPELINE_STEPS.find((s) => s.id === activeStepId) || PIPELINE_STEPS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>منهجية العمل الهندسية (The 5-Stage Engineering Pipeline)</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
            مسار تنفيذ مشروعك: من الفكرة إلى النظام الجاهز
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            انقر على أي مرحلة في المسار لاستعراض المخرجات الهندسية، الأدوات، والجدول الزمني
          </p>
        </div>

        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
        >
          <span>تفاصيل معايير الجودة والضمان</span>
          <ArrowUpLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* Interactive Serpentine Step Track */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-border hidden md:block" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 relative z-10">
          {PIPELINE_STEPS.map((step) => {
            const isSelected = step.id === activeStepId;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`group relative flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 ${
                  isSelected
                    ? "border-primary bg-card ring-2 ring-primary/40 shadow-lg -translate-y-1.5"
                    : "border-border/80 bg-card/70 hover:border-primary/50 hover:bg-card"
                }`}
              >
                {/* Step Number Badge */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl font-mono text-sm font-black transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground scale-110 shadow-md"
                      : "bg-secondary text-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="mt-3 font-mono text-[10px] font-bold text-muted-foreground uppercase">
                  المرحلة {toArabicDigits(step.id)}
                </div>

                <div className="mt-1 text-xs font-bold text-foreground line-clamp-2 leading-snug">
                  {step.title.split(" ")[0]} {step.title.split(" ")[1]}
                </div>

                <div className="mt-2 text-[10px] font-mono text-primary font-bold">
                  {step.duration}
                </div>

                {isSelected && (
                  <div className="absolute -bottom-2.5 h-2 w-2 rotate-45 bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Inspection Box */}
      <div className="overflow-hidden rounded-3xl border border-border/90 bg-card p-6 sm:p-10 shadow-md">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Details & Deliverables */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 border border-primary/30 px-3 py-1 font-mono text-xs font-bold text-primary">
                {activeStep.phaseCode}
              </span>
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                المدة التقديرية: <strong className="text-foreground">{activeStep.duration}</strong>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              {activeStep.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {activeStep.details}
            </p>

            <div className="space-y-2.5 border-t border-border/60 pt-4">
              <div className="text-xs font-bold text-foreground">المخرجات والتسليمات الهندسية (Deliverables):</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStep.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/30 p-2.5 text-xs text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Interactive Diagnostic Card */}
          <div className="rounded-2xl border border-border/80 bg-secondary/30 p-6 space-y-6">
            <div>
              <div className="text-xs font-bold text-foreground">الأدوات وبيئات التطوير المستخدمة:</div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {activeStep.keyTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 font-mono text-xs font-semibold text-foreground shadow-2xs"
                  >
                    <FileCode2 className="h-3.5 w-3.5 text-primary" />
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>ضمان تكنو إنجاز لهذه المرحلة:</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                مراجعة هندسية دقيقة من قِبل مهندس مختص قبل الانتقال للمرحلة التالية، مع مشاركة المخططات والكود خطوة بخطوة.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to={`/contact?subject=${encodeURIComponent(`استفسار حول ${activeStep.title}`)}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
              >
                <span>طلب بدء مشروعك من هذه المرحلة</span>
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
