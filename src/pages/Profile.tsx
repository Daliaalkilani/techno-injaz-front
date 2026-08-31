import { useEffect, useState, useMemo, type FormEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  BriefcaseBusiness,
  FileText,
  Sparkles,
  Pencil,
  Check,
  X,
  Share2,
  Award,
  ShieldCheck,
  Flame,
  Cpu,
  Layers,
  Send,
  Copy,
  CheckCheck,
  ExternalLink,
  Calendar,
  MapPin,
  BadgeCheck,
  Terminal,
  Activity,
  Code2,
  Compass,
} from "lucide-react";
import {
  Container,
  Section,
  Button,
  Eyebrow,
  Badge,
} from "../components/ui/primitives";
import { Input, Textarea, Label } from "../components/ui/fields";
import { SocialLinks } from "../components/content/SocialLinks";
import { SocialAccountsEditor } from "../components/content/SocialAccountsEditor";
import { ArticleCard } from "../components/content/ArticleCard";
import { ProjectCard } from "../components/content/ProjectCard";
import { userById } from "../data/users";
import type { SocialAccount, User } from "../data/users";
import { universities } from "../data/universities";
import { articlesByAuthor } from "../data/articles";
import { projects } from "../data/projects";
import type { Project } from "../data/types";
import { useAuth, statusLabels } from "../lib/auth";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

function universityName(slug?: string) {
  return universities.find((u) => u.slug === slug)?.name;
}

// Get associated and supervised projects for a given user
function getEngineerProjects(user: User): Project[] {
  const normName = user.name
    .replace(/^(د\.|م\.|المهندس|الدكتور|الأستاذ)\s*/, "")
    .trim();
  return projects.filter((p) => {
    const inSupervisors = p.supervisors?.some(
      (s) => s.includes(normName) || s.includes(user.name),
    );
    const inStudents = p.students?.some(
      (st) => st.includes(normName) || st.includes(user.name),
    );
    // Founder / Chief Engineer 'u-abdalgani'
    const isTechLead =
      user.id === "u-abdalgani" &&
      (p.supervisors?.some((s) => s.includes("تكنو إنجاز")) ||
        [
          "autonomous-delivery-robot",
          "smart-irrigation-iot",
          "ecommerce-platform",
          "gesture-controlled-drone",
        ].includes(p.slug));
    return inSupervisors || inStudents || isTechLead;
  });
}

// Specialized skill matrices based on discipline
const engineerSkillsMap: Record<
  string,
  { category: string; skills: string[] }[]
> = {
  "u-anas": [
    {
      category: "الروبوتيك والملاحة",
      skills: ["ROS 2 Humble", "LiDAR SLAM", "Nav2", "Gazebo Simulator", "DWA Planner"],
    },
    {
      category: "التحكم والبرمجة",
      skills: ["C++", "Python", "PID Control", "State Estimation", "Kalman Filter"],
    },
    {
      category: "الأجهزة والمحركات",
      skills: ["Motor Drivers", "Encoders", "Depth Cameras", "Embedded Linux"],
    },
  ],
  "u-samar": [
    {
      category: "الأنظمة المدمجة و IoT",
      skills: ["ESP32 / ESP-IDF", "MQTT Protocol", "FreeRTOS", "Low-Power Modes"],
    },
    {
      category: "تصميم الهاردوير والـ PCB",
      skills: ["Altium Designer", "Schematic Capture", "Sensor Integration", "SMD Soldering"],
    },
    {
      category: "السحابة والبيانات",
      skills: ["InfluxDB", "Node.js", "Grafana", "WebSockets", "Flutter BLE"],
    },
  ],
  "u-reem": [
    {
      category: "الذكاء الاصطناعي والتعلّم العميق",
      skills: ["PyTorch", "TensorFlow", "CNN Architectures", "Model Quantization"],
    },
    {
      category: "رؤية الحاسب والـ Edge AI",
      skills: ["OpenCV", "MediaPipe", "TensorFlow Lite", "Object Detection", "FaceNet"],
    },
    {
      category: "بيئة العمل واللغات",
      skills: ["Python", "Flask / FastAPI", "NumPy / Pandas", "Docker"],
    },
  ],
  "u-fadi": [
    {
      category: "الميكاترونيك والتحكم",
      skills: ["STM32F4 / HAL", "Inverse Kinematics", "Servo Control", "Solar Tracking"],
    },
    {
      category: "التصميم الميكانيكي والـ CAD",
      skills: ["Autodesk Fusion 360", "3D Printing & Prototyping", "FEA Analysis"],
    },
    {
      category: "البرمجيات الصناعية",
      skills: ["C / Embedded C", "STM32CubeIDE", "MATLAB / Simulink"],
    },
  ],
  "u-abdalgani": [
    {
      category: "معمارية الأنظمة والبرمجيات",
      skills: ["React & TypeScript", "Node.js & Express", "PostgreSQL", "Tailwind CSS"],
    },
    {
      category: "الأنظمة المدمجة والتكامل",
      skills: ["Embedded IoT", "AI Workflow Integration", "RESTful APIs", "Docker"],
    },
    {
      category: "إدارة المشاريع والـ MVP",
      skills: ["System Architecture", "Hardware-Software Co-Design", "Git & CI/CD"],
    },
  ],
};

type ActiveTab = "projects" | "articles" | "skills" | "about" | "credentials";

export default function Profile() {
  const { id = "" } = useParams();
  const { user: current, updateProfile } = useAuth();
  const [params, setParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("projects");

  // Resolve the profile: seed users first, else the signed-in user
  const profile: User | undefined =
    userById(id) ?? (current && current.id === id ? current : undefined);
  const isOwner = !!current && current.id === id;

  useSeo(
    profile
      ? `${profile.name} | الملف المهني الهندسي`
      : "ملف غير موجود | تكنو إنجاز",
    profile?.bio,
  );

  const [editing, setEditing] = useState(params.get("edit") === "1");
  useEffect(() => {
    if (params.get("edit") === "1") setEditing(true);
  }, [params]);

  const userProjects = useMemo(() => {
    if (!profile) return [];
    return getEngineerProjects(profile);
  }, [profile]);

  const published = useMemo(() => {
    if (!profile) return [];
    return articlesByAuthor(profile.id);
  }, [profile]);

  // Calculate dynamic impact score
  const impactScore = useMemo(() => {
    if (!profile) return 0;
    return profile.contributionCount * 12 + published.length * 18 + 45;
  }, [profile, published]);

  if (!profile) {
    return (
      <Section className="py-24">
        <Container className="max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border/80 bg-secondary/50">
            <X className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-foreground sm:text-3xl">
            الملف المهني غير موجود
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            قد يكون الرابط غير صحيح أو أن الحساب لم يعد متاحًا ضمن المنصة.
          </p>
          <div className="mt-8">
            <Link
              to="/contributors"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span>تصفّح لوحة الشرف والمهندسين</span>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const skillsData = engineerSkillsMap[profile.id] || [
    {
      category: "المجال التخصصي",
      skills: [profile.specialty, "التطوير الهندسي", "إدارة المشاريع", "الاختبار والمعايرة"],
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const closeEdit = () => {
    setEditing(false);
    if (params.get("edit")) {
      params.delete("edit");
      setParams(params, { replace: true });
    }
  };

  return (
    <>
      {/* =========================================================================
          Architectural Engineering Profile Header Banner
          ========================================================================= */}
      <div className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-card via-background to-secondary/30">
        {/* Engineering blueprint background overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-20"
          aria-hidden
        />

        {/* Ambient Top Band */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-primary to-cyan-500" />

        <Container className="relative py-10 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Left/Main: Avatar, Bio, Identity */}
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-right">
              {/* Avatar Container with Rank Ring */}
              <div className="relative shrink-0">
                <div className="relative h-32 w-32 sm:h-36 sm:w-36">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full rounded-2xl border-2 border-border/80 object-cover shadow-md ring-4 ring-primary/20"
                  />
                  {/* Verified Accreditation Badge */}
                  <div
                    className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-xl border border-border/80 bg-card text-primary shadow-md"
                    title="مهندس معتمد وموثق في تكنو إنجاز"
                  >
                    <BadgeCheck className="h-5 w-5 fill-primary text-card" />
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>متاح للاستشارة الهندسية</span>
                </div>
              </div>

              {/* Textual Identity & Credentials */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    {profile.name}
                  </h1>
                  <span className="inline-flex items-center rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                    {profile.specialty}
                  </span>
                </div>

                {/* Institutional & Academic Affiliation */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground sm:justify-start">
                  {profile.university && (
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                      <span>جامعة {universityName(profile.university)}</span>
                      {profile.graduationYear && (
                        <span className="font-mono text-muted-foreground">
                          ({toArabicDigits(profile.graduationYear)})
                        </span>
                      )}
                    </span>
                  )}
                  <span className="text-border hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>معتمد رسمياً في منصة تكنو إنجاز</span>
                  </span>
                </div>

                {/* Bio paragraph */}
                {profile.bio && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {profile.bio}
                  </p>
                )}

                {/* Social Networks & Contact Chips */}
                {profile.social.length > 0 && (
                  <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
                    <SocialLinks social={profile.social} />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Quick Action Controls & Telemetry Snippet */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end shrink-0">
              <Link
                to={`/contact?subject=${encodeURIComponent(
                  `استشارة هندسية مع ${profile.name}`,
                )}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>طلب استشارة أو مشروع</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border/80 bg-card px-4 text-xs font-bold text-foreground transition-all hover:bg-secondary hover:border-primary/50"
                  title="مشاركة رابط الملف المهني"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        تم نسخ الرابط!
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                      <span>مشاركة الملف</span>
                    </>
                  )}
                </button>

                {isOwner && !editing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(true)}
                    className="h-10 rounded-xl"
                  >
                    <Pencil className="h-4 w-4" />
                    <span>تعديل الملف</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* =========================================================================
              Telemetry Stats Bar (High contrast, modular metrics)
              ========================================================================= */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {/* Metric 1: Projects */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs font-bold">PROJECTS</span>
                <BriefcaseBusiness className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
                {toArabicDigits(profile.contributionCount)}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                أنظمة ومشاريع منفذة
              </div>
            </div>

            {/* Metric 2: Articles */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs font-bold">PUBLICATIONS</span>
                <FileText className="h-4 w-4 text-cyan-500" />
              </div>
              <div className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
                {toArabicDigits(published.length)}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                أوراق ومقالات علمية
              </div>
            </div>

            {/* Metric 3: Impact Score */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                <span className="font-mono text-xs font-bold">IMPACT SCORE</span>
                <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400 sm:text-3xl">
                {toArabicDigits(impactScore)}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                نقاط الأثر الهندسي التراكمي
              </div>
            </div>

            {/* Metric 4: Fellowship Rank */}
            <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-mono text-xs font-bold">RANK TIER</span>
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-lg font-black text-foreground sm:text-xl truncate">
                {profile.contributionCount >= 10
                  ? "Master Fellow"
                  : profile.contributionCount >= 6
                    ? "Lead Researcher"
                    : "Verified Member"}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                رتبة الاعتماد الهندسي
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Profile Edit Drawer/Modal */}
      {isOwner && editing && (
        <EditProfile user={profile} onSave={updateProfile} onClose={closeEdit} />
      )}

      {/* =========================================================================
          Multi-Tab Navigation Bar
          ========================================================================= */}
      <div className="sticky top-16 z-20 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {[
              {
                id: "projects",
                label: `الأنظمة والمشاريع (${toArabicDigits(userProjects.length)})`,
                icon: BriefcaseBusiness,
              },
              {
                id: "articles",
                label: `المقالات والأبحاث (${toArabicDigits(published.length)})`,
                icon: FileText,
              },
              {
                id: "skills",
                label: "المختبر والمكدس التقني",
                icon: Cpu,
              },
              {
                id: "about",
                label: "السيرة ومحاور البحث",
                icon: Compass,
              },
              {
                id: "credentials",
                label: "الأوسمة والاعتمادات",
                icon: Award,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* =========================================================================
          Tabbed Content Panes
          ========================================================================= */}
      <Section className="py-12 sm:py-16">
        <Container>
          {/* 1. Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">
                    الأنظمة والمشاريع المنفذة والمشرف عليها
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    المشاريع الهندسية والنماذج التطبيقية المعتمدة التي قادها أو أشرف عليها {profile.name}
                  </p>
                </div>
              </div>

              {userProjects.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userProjects.map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <BriefcaseBusiness className="mx-auto h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    لا توجد مشاريع منسوبة حالياً
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    المشاريع قيد الاختبار والمراجعة المخبرية ليتم نشرها على المنصة قريباً.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 2. Articles Tab */}
          {activeTab === "articles" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-foreground">
                  الأوراق والمقالات العلمية المنشورة
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  أبحاث وتحليلات معمارية وشروحات تخصصية بقلم {profile.name}
                </p>
              </div>

              {published.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {published.map((art) => (
                    <ArticleCard key={art.slug} article={art} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <FileText className="mx-auto h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    لم تنشر مقالات بعد
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    يجري العمل على إعداد أوراق تقنية وتوثيق التجارب المخبرية لنشرها قريباً.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. Skills & Tech Stack Tab */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-foreground">
                  المختبر والمكدس التقني
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  الأدوات، البروتوكولات، وبيئات التطوير التي يتقنها المهندس ويستخدمها في تنفيذ الأنظمة
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {skillsData.map((group, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs"
                  >
                    <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                      <Code2 className="h-5 w-5 text-primary" />
                      <h3 className="text-base font-bold text-foreground">
                        {group.category}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-xl border border-border/80 bg-secondary/50 px-3 py-1.5 font-mono text-xs font-bold text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Lab Disciplines Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">
                  القدرات الهندسية والمخبرية المعتمدة
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "تصميم الـ PCB وتصنيعه",
                      desc: "مخططات متعددة الطبقات واختبارات التحمل والإشارات السريعة.",
                    },
                    {
                      title: "التحكم اللحظي وتكامل الحساسات",
                      desc: "معايرة الحساسات وأنظمة التغذية الراجعة واستقرار الأجهزة.",
                    },
                    {
                      title: "ربط السحابة وإنترنت الأشياء",
                      desc: "بروتوكولات صناعية مشفرة وتخزين السلاسل الزمنية وتحليلها.",
                    },
                    {
                      title: "التوثيق وملفات التصنيع",
                      desc: "تقارير معيارية، ملفات Gerber، ومخططات الأسلاك والمحاكاة.",
                    },
                  ].map((cap, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-border/60 bg-secondary/30 p-4"
                    >
                      <h4 className="font-bold text-foreground text-sm">
                        {cap.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. About & Research Focus Tab */}
          {activeTab === "about" && (
            <div className="max-w-4xl space-y-8">
              <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
                <h3 className="text-xl font-bold text-foreground">
                  السيرة المهنية ومحاور البحث
                </h3>
                <p className="mt-4 text-base leading-loose text-muted-foreground">
                  {profile.bio ||
                    "مهندس وباحث متخصص في تصميم وتنفيذ الأنظمة الهندسية المتقدمة وربط الجانب الأكاديمي بالإنتاج الواقعي."}
                </p>
                <div className="mt-6 border-t border-border/60 pt-6">
                  <h4 className="text-sm font-bold text-foreground">
                    المجالات البحثية والاهتمامات التطبيقية:
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        تطوير وتصميم النماذج الأولية للشركات الناشئة والمبتكرين (MVPs).
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        الإشراف الهندسي على مشاريع التخرج المتقدمة ومراجعة كود البرمجة والـ PCB.
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        التحليل المعماري للمنظومات المدمجة، الروبوتات، وإنترنت الأشياء الصناعي.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Consultation Invitation */}
              <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:p-8">
                <h3 className="text-lg font-bold text-foreground">
                  هل ترغب بمناقشة فكرة مشروع أو استشارة هندسية؟
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  يمكنك التواصل مباشرة مع {profile.name} لتحديد متطلبات مشروعك، تدقيق المخططات، أو بناء نظامك التقني بأعلى معايير الجودة.
                </p>
                <div className="mt-5">
                  <Link
                    to={`/contact?subject=${encodeURIComponent(
                      `استشارة هندسية مع ${profile.name}`,
                    )}`}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    <span>إرسال طلب الاستشارة الآن</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 5. Credentials & Badges Tab */}
          {activeTab === "credentials" && (
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-foreground">
                  الأوسمة والاعتمادات الهندسية
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  شهادات الاعتماد الرقمية والإنجازات الموثقة ضمن مجتمع تكنو إنجاز
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "إشراف هندسي معتمد (Certified Supervisor)",
                    desc: "إشراف ومراجعة معمارية لأكثر من 5 مشاريع هندسية ناجحة نالت تقييم امتياز.",
                    icon: Award,
                    color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
                  },
                  {
                    title: "مراجعة الدوائر والمخططات (PCB Lead Reviewer)",
                    desc: "اعتماد واختبار المخططات الإلكترونية ومطابقتها لمعايير الأمان الصناعي.",
                    icon: Cpu,
                    color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
                  },
                  {
                    title: "نشر علمي محكّم (Technical Author)",
                    desc: "إعداد مقالات تخصصية وشروحات تطبيقية منشورة في منصة تكنو إنجاز.",
                    icon: FileText,
                    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
                  },
                  {
                    title: "توثيق واختبار مخبري (Lab Tested & Verified)",
                    desc: "تنفيذ اختبارات عملية حية ومعايرة للحساسات والمحركات على أرض الواقع.",
                    icon: ShieldCheck,
                    color: "text-primary bg-primary/10 border-primary/30",
                  },
                ].map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all hover:border-primary/50"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${badge.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-foreground">
                        {badge.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {badge.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function EditProfile({
  user,
  onSave,
  onClose,
}: {
  user: User;
  onSave: (patch: Partial<User>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [specialty, setSpecialty] = useState(user.specialty);
  const [bio, setBio] = useState(user.bio);
  const [social, setSocial] = useState<SocialAccount[]>(user.social);

  const save = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || user.name,
      specialty: specialty.trim(),
      bio: bio.trim(),
      social: social.filter((s) => s.url.trim()),
    });
    onClose();
  };

  return (
    <div className="border-b border-border/80 bg-secondary/30 py-10">
      <Container className="max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              تعديل بيانات الملف المهني
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={save}
          className="mt-6 space-y-5 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs"
        >
          <div>
            <Label htmlFor="p-name">الاسم واللقب المهني</Label>
            <Input
              id="p-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="p-spec">الاختصاص والمجال</Label>
            <Input
              id="p-spec"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="مثال: هندسة التحكم والروبوتيك"
            />
          </div>
          <div>
            <Label htmlFor="p-bio">النبذة المهنية والاهتمامات البحثية</Label>
            <Textarea
              id="p-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>
          <div className="border-t border-border/60 pt-5">
            <Label>الحسابات وروابط التواصل</Label>
            <div className="mt-2">
              <SocialAccountsEditor value={social} onChange={setSocial} />
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <Button type="submit">
              <Check className="h-4 w-4" />
              <span>حفظ التغييرات</span>
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              <span>إلغاء</span>
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

