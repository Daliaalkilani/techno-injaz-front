import { ArrowUpLeft, ShieldCheck, Target, CheckCircle2, Award, Sparkles, Workflow } from "lucide-react";
import { Container, Section, PageHeader, LinkButton } from "../components/ui/primitives";
import { CategoryCard } from "../components/content/CategoryCard";
import { TechnoInjazManifesto } from "../components/content/TechnoInjazManifesto";
import { categories } from "../data/categories";
import { stats } from "../data/stats";
import { StatCard } from "../components/content/StatCard";
import { img, photos } from "../data/images";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

const process = [
  { n: "01", title: "فهم الفكرة وتحديد النطاق", desc: "دراسة الفكرة وتحديد أهداف المشروع ومتطلباته بدقة هندسية." },
  { n: "02", title: "تحليل المتطلبات والمكونات", desc: "اختيار الحساسات، المتحكمات الدقيقة، وخوارزميات العمل المناسبة." },
  { n: "03", title: "التصميم والمحاكاة", desc: "بناء المخططات الإلكترونية ومحاكاة الأداء قبل التجميع الفعلي." },
  { n: "04", title: "التطوير والبرمجة", desc: "كتابة الأكواد وتطوير الواجهات والاتصال السحابي مرحلة بمرحلة." },
  { n: "05", title: "الاختبار والمعايرة", desc: "فحص الأداء المخبري ومعالجة الحالات الحدية واستقرار النظام." },
  { n: "06", title: "التوثيق والتقرير الهندسي", desc: "إعداد ملفات التقرير والمخططات التوضيحية وجداول التجارب." },
  { n: "07", title: "التسليم والتدريب", desc: "شرح كامل للنظام وتدريب الطالب على مناقشة كل تفصيلة." },
];

export default function About() {
  useSeo(
    "من نحن | مكتب تكنو إنجاز الهندسي",
    "تعرّف على مكتب تكنو إنجاز الهندسي ومنهجيته المعتمدة في تصميم وتطوير النماذج الأولية للشركات الناشئة، الأنظمة الصناعية، ومشاريع التخرج والبحث العلمي المتقدمة.",
  );

  return (
    <>
      <PageHeader
        title="نبني الجسر بين الفكرة الهندسية والتنفيذ الواقعي المكتمل"
        description="تكنو إنجاز مكتب وشريك هندسي متكامل لتصميم وتطوير النماذج الأولية للشركات الناشئة (MVPs)، الأنظمة الصناعية وحلول الأتمتة، ومشاريع التخرج والبحث العلمي المتقدمة."
      />

      {/* Comprehensive Techno Injaz Manifesto & Showcase */}
      <Section className="py-12 sm:py-16">
        <Container>
          <TechnoInjazManifesto />
        </Container>
      </Section>

      {/* Intro + visual overview */}
      <Section className="py-16 bg-secondary/25 border-y border-border/70">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                خبرة هندسية تطبيقية في خدمة الابتكار والأعمال
              </h2>
              <p className="leading-loose text-muted-foreground text-base sm:text-lg">
                نجمع بين الأساس الأكاديمي الرصين والخبرة العملية في بناء الأنظمة المدمجة، الروبوتات، إنترنت الأشياء، والذكاء الاصطناعي لمساعدة رواد الأعمال والشركات والمهندسين على تقديم حلول ومنتجات متكاملة تقنياً وعالية الموثوقية.
              </p>
              <p className="leading-loose text-muted-foreground text-base">
                نرافق كل مشروع من مرحلة الفكرة والنمذجة وتخطيط المكونات حتى تسليم النموذج النهائي، الدوائر المطبوعة، والأكواد البرمجية مع توثيق شامل ومرافقة تقنية مستمرة.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src={img(photos.lab[0], 500, 620)}
                alt="مختبر العمل والتجميع"
                className="rounded-2xl border border-border object-cover shadow-sm transition-transform hover:scale-[1.02]"
              />
              <img
                src={img(photos.robotics[2], 500, 620)}
                alt="اختبار مشروع روبوتيك"
                className="mt-8 rounded-2xl border border-border object-cover shadow-sm transition-transform hover:scale-[1.02]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Goals & Scope */}
      <Section className="bg-secondary/25 py-16 border-y border-border/70">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">الرؤية والهدف الهندسي</h3>
            <p className="mt-3 text-base leading-loose text-muted-foreground">
              أن نكون الشريك والمرجع الهندسي الأول في تحويل الأفكار إلى منتجات وأنظمة حقيقية بجودة صناعية ومعايير عالمية، مع التركيز على نقل المعرفة الحقيقية وتقديم حلول مستدامة تلبي متطلبات السوق والبحث العلمي.
            </p>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">نطاق الخدمات والحلول</h3>
            <ul className="mt-4 space-y-3 text-sm sm:text-base text-muted-foreground">
              {[
                "بناء النماذج الأولية للشركات الناشئة ورواد الأعمال (MVPs)",
                "حلول الأتمتة والأنظمة الصناعية وإنترنت الأشياء (IIoT)",
                "تصميم وتنفيذ مشاريع التخرج والأبحاث الهندسية المتقدمة",
                "الروبوتيك، الملاحة الذاتية SLAM، وخوارزميات الذكاء الاصطناعي",
                "تطبيقات الويب والمنصات السحابية ولوحات التحكم التفاعلية",
                "التوثيق والتقارير الهندسية وملفات التصنيع المعيارية",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="py-14">
        <Container>
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Workflow */}
      <Section className="bg-secondary/25 border-y border-border/70 py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              منهجية العمل والتحول التقني
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              خطوات هندسية مدروسة تضمن دقة التنفيذ، جاهزية الأجهزة، والتسليم بالموعد
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "فهم الفكرة وتحديد النطاق", desc: "دراسة الفكرة وتحديد أهداف النظام والمتطلبات الفنية بدقة هندسية." },
              { n: "02", title: "تحليل المتطلبات والمكونات", desc: "اختيار الحساسات، المتحكمات الدقيقة، والمكونات الموثوقة اقتصادياً وعملياً." },
              { n: "03", title: "التصميم والمحاكاة والـ PCB", desc: "بناء المخططات الإلكترونية وتصميم الدوائر المطبوعة والمحاكاة قبل التجميع." },
              { n: "04", title: "التطوير والبرمجة المتكاملة", desc: "كتابة الأكواد وتطوير الواجهات والاتصال السحابي وقواعد البيانات مرحلة بمرحلة." },
              { n: "05", title: "الاختبار والمعايرة المخبرية", desc: "فحص الأداء المخبري والميداني ومعالجة الحالات الحدية واستقرار النظام." },
              { n: "06", title: "التوثيق وملفات التصنيع", desc: "إعداد ملفات التقرير، مخططات الدوائر، ملفات Gerber، وأدلة التشغيل." },
              { n: "07", title: "التسليم والتدريب والدعم", desc: "شرح كامل للنظام وتدريب العميل أو الفريق على تشغيل كل تفصيلة بثقة." },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="font-mono text-2xl font-extrabold text-primary">
                  {toArabicDigits(step.n)}
                </div>
                <h3 className="mt-3 text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Domains */}
      <Section className="py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              المجالات والتخصصات الهندسية
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              تصفح التخصصات المختلفة والأنظمة المنجزة ضمنها
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <LinkButton to="/contact" size="lg">
              ابدأ مشروعك أو نظامك معنا
              <ArrowUpLeft className="h-5 w-5" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
