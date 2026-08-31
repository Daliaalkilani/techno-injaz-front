import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Workflow,
  Wrench,
  Terminal,
  Rocket,
  CheckCircle2,
  Sparkles,
  ArrowUpLeft,
  FileCode2,
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
    phaseCode: "المرحلة الأولى // التحليل",
    title: "التحليل المعماري وتصميم المخطط الهندسي",
    shortDesc: "دراسة الجدوى التقنية، تحديد المتحكمات والمجسات، ورسم المخططات المعمارية.",
    duration: "٣ - ٥ أيام",
    deliverables: [
      "مخطط معمارية النظام (System Architecture)",
      "قائمة المكونات وتكاليف الإنتاج (BOM)",
      "تحديد بروتوكولات الاتصال (UART / SPI / I2C)",
      "جدول المتطلبات الوظيفية ومعايير الأمان",
    ],
    keyTools: ["EasyEDA", "KiCad", "MathWorks"],
    details:
      "تفكيك فكرتك لمنظومات فرعية واضحة، مع تدقيق استهلاك الطاقة وحسابات العزم والترددات لتفادي أي اختناقات مستقبلية.",
    icon: Compass,
  },
  {
    id: 2,
    phaseCode: "المرحلة الثانية // المحاكاة",
    title: "المحاكاة الرقمية والنمذجة الافتراضية",
    shortDesc: "محاكاة الإشارات الكهربائية واختبار منطق الخوارزميات وتجربة النظام افتراضياً.",
    duration: "٤ - ٧ أيام",
    deliverables: [
      "بيئة محاكاة تفاعلية (Gazebo / Wokwi / MATLAB)",
      "اختبار الاستجابة للظروف الحرجة والأعطال",
      "محاكاة استهلاك الطاقة وعمر البطاريات",
      "التحقق من صحة كود التحكم المسبق",
    ],
    keyTools: ["ROS 2 Gazebo", "Wokwi", "Proteus"],
    details:
      "تضمن المحاكاة تصفير نسبة الخطأ قبل تصنيع ألواح PCB أو شراء القطع المادية، مما يوفر الوقت والتكاليف.",
    icon: Workflow,
  },
  {
    id: 3,
    phaseCode: "المرحلة الثالثة // التصنيع",
    title: "تصنيع ألواح الـ PCB والنمذجة ثلاثية الأبعاد",
    shortDesc: "تجهيز ملفات Gerber، طباعة الدارات المطبوعة، وتصميم الهياكل والمجسمات الصناعية.",
    duration: "٧ - ١٠ أيام",
    deliverables: [
      "ألواح دارات مطبوعة مجمعة ومختبرة (Assembled PCB)",
      "هياكل ميكانيكية ومجسمات 3D مطبوعة بدقة",
      "ملفات تصنيع قياسية (Gerber & STL)",
      "اختبار قياسات الفولتية ونقاء الإشارة",
    ],
    keyTools: ["SolidWorks", "Fusion 360", "JLCPCB Stack"],
    details:
      "استخدام التجميع السطحي (SMD) والطباعة ثلاثية الأبعاد لإنتاج مجسم مدمج يبدو كمنتج تجاري مصنعي جاهز.",
    icon: Wrench,
  },
  {
    id: 4,
    phaseCode: "المرحلة الرابعة // البرمجة والسحابة",
    title: "برمجة النواة المدمجة وتطوير المنصة السحابية",
    shortDesc: "كتابة البرمجيات المدمجة ذات الوقت الحقيقي وتطوير لوحات التحكم وتطبيقات المراقبة.",
    duration: "٧ - ١٤ يوماً",
    deliverables: [
      "كود برمجي معياري نظيف ومشروح بدقة (C++ / Python)",
      "لوحة تحكم وتحليلات سحابية متجاوبة",
      "تطبيق واجهة مستخدم مخصص للتحكم",
      "تشفير بروتوكولات الاتصال وحماية البيانات",
    ],
    keyTools: ["FreeRTOS", "Embedded C++", "React / Node.js"],
    details:
      "برمجة منخفضة المستوى لتحقيق أقصى سرعة استجابة مع ربط سحابي مشفر يتيح مراقبة النظام من أي مكان.",
    icon: Terminal,
  },
  {
    id: 5,
    phaseCode: "المرحلة الخامسة // التسليم والتدريب",
    title: "التسليم الميداني، التدريب، والتوثيق الشامل",
    shortDesc: "تسليم المنظومة كاملة مع جلسات تدريب تفاعلية وشرح تفصيلي للأكواد والمخططات وضمان أداء.",
    duration: "مستمر",
    deliverables: [
      "دليل تشغيل هندسي شامل (Engineering Manual)",
      "جلسات تدريب وشرح للكود والعتاد (1-on-1)",
      "شهادة اختبار جودة وفحص مخبري",
      "دعم فني وضمان أداء واستقرار النظام",
    ],
    keyTools: ["Documentation Suite", "Support Portal"],
    details:
      "لا ينتهي دورنا بالتسليم؛ نحرص على تمكينك وفهمك لكل سطر برمجي ومكون هندسي لتكون واثقاً تماماً عند تشغيل أو مناقشة نظامك.",
    icon: Rocket,
  },
];

export function RefinedPipelineFlow() {
  const [activeStepId, setActiveStepId] = useState(1);
  const activeStep =
    PIPELINE_STEPS.find((s) => s.id === activeStepId) || PIPELINE_STEPS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>منهجية العمل الهندسية</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            مسار تنفيذ مشروعك: من الفكرة إلى النظام الجاهز
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            خطوات واضحة ومدروسة تضمن جودة التصميم والبرمجة والتسليم في الموعد المحدد
          </p>
        </div>

        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline sm:text-sm"
        >
          <span>معايير الجودة والضمان</span>
          <ArrowUpLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* Horizontal Steps Navigation Bar */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {PIPELINE_STEPS.map((step) => {
          const isSelected = step.id === activeStepId;
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`flex flex-col items-center rounded-2xl border p-3.5 text-center transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-card ring-2 ring-primary/20 shadow-xs"
                  : "border-border/80 bg-card/60 hover:border-border hover:bg-card"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-2 font-mono text-[10px] font-bold text-muted-foreground">
                المرحلة {toArabicDigits(step.id)}
              </div>
              <div className="mt-0.5 text-xs font-bold text-foreground line-clamp-1">
                {step.title.split(" ")[0]} {step.title.split(" ")[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Details Panel */}
      <div className="rounded-3xl border border-border/90 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Deliverables and Description */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                {activeStep.phaseCode}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                المدة المقدرة: <strong className="text-foreground">{activeStep.duration}</strong>
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              {activeStep.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {activeStep.details}
            </p>

            <div className="space-y-2.5 border-t border-border/60 pt-4">
              <div className="text-xs font-bold text-foreground">المخرجات والتسليمات الهندسية:</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {activeStep.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/30 p-2.5 text-xs text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & CTA */}
          <div className="space-y-5 rounded-2xl border border-border/80 bg-secondary/30 p-6">
            <div>
              <div className="text-xs font-bold text-foreground">الأدوات وبيئات التطوير:</div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {activeStep.keyTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs font-medium text-foreground shadow-2xs"
                  >
                    <FileCode2 className="h-3.5 w-3.5 text-primary" />
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                مراجعة وتدقيق هندسي مستمر مع إمكانية تجربة النماذج الأولية خطوة بخطوة قبل الانتقال للمرحلة التالية.
              </p>
            </div>

            <Link
              to={`/contact?subject=${encodeURIComponent(`استفسار حول ${activeStep.title}`)}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
            >
              <span>بدء مشروعك من هذه المرحلة</span>
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
