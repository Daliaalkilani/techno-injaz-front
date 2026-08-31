import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  ExternalLink,
  Send,
  Presentation,
  Globe,
  Rocket,
  ShieldCheck,
  GraduationCap,
  ArrowUpLeft,
  Check,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import { Eyebrow, Button } from "../ui/primitives";
import { Input, Textarea, Label } from "../ui/fields";

const recentWorks = [
  {
    id: "almasar",
    name: "Almasar",
    url: "https://Almasar.org",
    displayUrl: "Almasar.org",
    category: "منصة تعليمية ومؤسسية",
    description:
      "تطوير منصة وبوابة رقمية متكاملة لتقديم الخدمات التعليمية وإدارة المحتوى الأكاديمي بأعلى معايير الاستجابة والسرعة.",
    tag: "منصة ويب متكاملة",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "primo",
    name: "Primo Beauty Care",
    url: "https://beautycareprimo.com",
    displayUrl: "beautycareprimo.com",
    category: "متجر وتجارة إلكترونية",
    description:
      "متجر إلكتروني حديث ومنصة متطورة لمنتجات العناية والتجميل مع تجربة مستخدم سلسة وبوابات دفع وإدارة مخزون متقدمة.",
    tag: "E-Commerce Platform",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: "abdalgani",
    name: "Abdalgani Portfolio",
    url: "https://abdalgani.com",
    displayUrl: "abdalgani.com",
    category: "ملف أعمال ومنصة مهنية",
    description:
      "بوابة مهندس معماري تقني تستعرض الأنظمة الهندسية المدمجة، مشاريع الأتمتة، والحلول السحابية المخصصة للشركات والباحثين.",
    tag: "Engineering Portfolio",
    gradient: "from-amber-600 to-orange-600",
  },
];

export function TechnoInjazManifesto() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMsg("يرجى التأكد من ملء جميع الحقول المطلوبة بشكل صحيح.");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ firstName: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div className="space-y-16">
      {/* =========================================================================
          Hero Overview & Manifesto Banner
          ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-background to-secondary/30 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-25"
          aria-hidden
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>الشريك الهندسي والتكنولوجي</span>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
              فريق تكنو إنجاز: شريكك الهندسي والتقني المتكامل
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-medium">
              تصميم وتطوير النماذج الأولية للشركات الناشئة (MVPs)، أنظمة الأتمتة الصناعية، ومشاريع التخرج والبحث العلمي المتقدمة في مجالات الروبوتيك، الذكاء الاصطناعي، إنترنت الأشياء، والمنصات السحابية.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 hover:shadow-md"
            >
              <span>طلب استشارة فورية</span>
              <ArrowUpLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Quick Identity Pills */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-border/60 pt-6">
          <div className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-secondary/30 p-4">
            <Rocket className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="text-sm font-bold text-foreground">رواد الأعمال & MVPs</div>
              <div className="text-xs text-muted-foreground mt-0.5">تحويل الأفكار إلى منتجات جاهزة للاستثمار</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-secondary/30 p-4">
            <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="text-sm font-bold text-foreground">الطلاب والباحثون</div>
              <div className="text-xs text-muted-foreground mt-0.5">مشاريع تخرج وأبحاث متقدمة مع مرافقة شاملة</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-secondary/30 p-4">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="text-sm font-bold text-foreground">المؤسسات والشركات</div>
              <div className="text-xs text-muted-foreground mt-0.5">حلول أتمتة صناعية ومنصات سحابية مخصصة</div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Vision, Mission & Core Goals
          ========================================================================= */}
      <div>
        <div className="mb-8">
          <Eyebrow>المرتكزات الأساسية</Eyebrow>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            الرؤية، الرسالة، والأهداف
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            القيم والمبادئ التي توجه كل مشروع، استشارة، وتطوير داخل فريق تكنو إنجاز
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Vision */}
          <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs transition-all hover:border-primary/50">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">الرؤية</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                أن نصبح روادًا في مجال التكنولوجيا وقادة مبتكرين، نحوّل الحلم الشخصي إلى واقع احترافي ونقدم حلولًا تكنولوجية استثنائية.
              </p>
            </div>
            <div className="mt-6 border-t border-border/60 pt-4 text-xs font-semibold text-foreground">
              الريادة في تحويل الأفكار إلى واقع صناعي
            </div>
          </div>

          {/* Mission */}
          <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs transition-all hover:border-primary/50">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">الرسالة</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                نسعى لتطوير مشاريع وأنظمة هندسية مبتكرة وذات جودة عالية، ونعمل جنبًا إلى جنب مع عملائنا لتحويل رؤيتهم وأحلامهم التكنولوجية إلى حقيقة احترافية.
              </p>
            </div>
            <div className="mt-6 border-t border-border/60 pt-4 text-xs font-semibold text-foreground">
              شراكة تقنية وتطويرية مستمرة
            </div>
          </div>

          {/* Goals */}
          <div className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs transition-all hover:border-primary/50">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">الأهداف</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>تقديم حلول تكنولوجية مبتكرة ومتطورة لعملائنا.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>تحقيق أعلى مستويات الجودة والأداء في جميع مشاريعنا.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>تمكين المتعلمين ورواد الأعمال بأدوات التكنولوجيا المتقدمة.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t border-border/60 pt-4 text-xs font-semibold text-foreground">
              معايير أداء فائقة وضمان الجودة
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Recent Best Works
          ========================================================================= */}
      <div>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>الأنظمة والمنصات الحية</Eyebrow>
            <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
              نماذج من أعمال ومنصات تكنو إنجاز
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              نماذج من المنصات والمواقع العاملة التي صممها ونفذها فريق تكنو إنجاز
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <span>استعراض كافة المشاريع والأنظمة</span>
            <ArrowUpLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentWorks.map((work) => (
            <div
              key={work.id}
              className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs font-mono font-bold text-foreground">
                    {work.tag}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Globe className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold text-foreground">{work.name}</h3>
                <div className="font-mono text-xs font-semibold text-primary">{work.displayUrl}</div>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {work.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-xs font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <span>استعراض المنصة</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          Presentation Design Service - Harmonized with Site Colors
          ========================================================================= */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-xs">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <Presentation className="h-3.5 w-3.5" />
              <span>خدمات العروض التقديمية والتوثيق (+500 عرض منجز)</span>
            </div>

            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              صناعة العروض التقديمية الاحترافية والتقنية
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              نقدم خدمة متخصصة في تصميم وصناعة العروض التقديمية الاحترافية للشركات والجامعات ورواد الأعمال، لتحويل التقارير والأفكار المعقدة إلى عروض بصرية مقنعة ومؤثرة.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span><strong>تصاميم هندسية وتجارية متقنة:</strong> مراعاة الهوية البصرية والتركيز على وضوح البيانات والمخططات.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span><strong>خبرة موثقة (+500 مشروع):</strong> ثقة متبادلة مع الشركات، المؤسسات، ومناقشات مشاريع التخرج.</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                to={`/contact?subject=${encodeURIComponent("طلب تصميم عرض تقديمي احترافي")}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
              >
                <Presentation className="h-4 w-4" />
                <span>طلب تصميم عرض تقديمي</span>
                <ArrowUpLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-secondary/30 p-6 sm:p-8 space-y-4">
            <h3 className="text-sm font-bold text-foreground">مجالات العروض التقديمية التي نصممها:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "عروض الشركات والاستثمار (Pitch Decks)", desc: "لعرض الأفكار وجذب المستثمرين والشركاء" },
                { title: "عروض مشاريع التخرج والهندسة", desc: "شرح المخططات والأكواد والنتائج بدقة" },
                { title: "التقارير التجارية والدورية", desc: "إنفوجرافيك وتحليل بيانات ومؤشرات أداء" },
                { title: "العروض التسويقية والمؤتمرات", desc: "تصاميم ديناميكية تلفت انتباه الحضور" },
              ].map((pres, idx) => (
                <div key={idx} className="rounded-xl border border-border/60 bg-card p-3.5 shadow-2xs">
                  <div className="text-xs font-bold text-foreground">{pres.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{pres.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Design Your Website / Prototype (صمم موقعك ونظامك معنا)
          ========================================================================= */}
      <div id="quick-prototype-form" className="rounded-3xl border border-border/80 bg-gradient-to-b from-primary/5 via-card to-card p-6 sm:p-10 shadow-xs">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <Rocket className="h-3.5 w-3.5" />
              <span>طلب نموذج أولي واستشارة</span>
            </div>

            <h2 className="text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
              صمم موقعك ونظامك الهندسي معنا
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              تواصل معنا لتحديد متطلبات نظامك والحصول على خطة معمارية وتصور أولي لتنفيذ فكرتك باحترافية.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>تصميم متجاوب بالكامل مع مختلف الشاشات والأجهزة</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>لوحات تحكم سريعة وبنية برمجية معيارية آمنة</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span>استشارة هندسية لتطوير الفكرة وتفادي العقبات</span>
              </div>
            </div>
          </div>

          {/* Instant Form */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
            {status === "success" ? (
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  <CheckCheck className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  تم إرسال طلبك بنجاح!
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  سيقوم فريق تكنو إنجاز بالاطلاع على التفاصيل والتواصل معك عبر البريد الإلكتروني لمناقشة خطة التنفيذ.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2 text-xs font-bold text-foreground hover:bg-border transition-colors"
                >
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <Label htmlFor="req-name">الاسم الكريم</Label>
                  <Input
                    id="req-name"
                    placeholder="مثال: م. أحمد عبد الغني"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="req-email">البريد الإلكتروني</Label>
                  <Input
                    id="req-email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="req-msg">توصيف النظام أو المشروع</Label>
                  <Textarea
                    id="req-msg"
                    rows={3}
                    placeholder="اكتب فكرة الموقع أو المشروع، الميزات المطلوبة، والهدف التجاري أو الأكاديمي..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold"
                  >
                    {status === "submitting" ? (
                      <span>جاري الإرسال...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>إرسال الطلب والتفاصيل</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
