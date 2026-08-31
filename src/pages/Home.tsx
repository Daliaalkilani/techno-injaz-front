import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpLeft, Play, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  LinkButton,
  Button,
  Badge,
} from "../components/ui/primitives";
import { StatCard } from "../components/content/StatCard";
import { CategoryCard } from "../components/content/CategoryCard";
import { LiveProjectsShowcase } from "../components/content/LiveProjectsShowcase";
import { HeroInteractiveRotator } from "../components/content/HeroInteractiveRotator";
import { InteractiveProjectMatrix } from "../components/content/InteractiveProjectMatrix";
import { ArticleCard } from "../components/content/ArticleCard";
import { VideoCard } from "../components/content/VideoCard";
import { VideoModal } from "../components/content/VideoModal";
import { NewsletterSection } from "../components/content/Newsletter";
import { categories } from "../data/categories";
import { projects, featuredProjects, projectBySlug } from "../data/projects";
import { liveProjects } from "../data/liveProjects";
import { articles } from "../data/articles";
import { videos } from "../data/videos";
import { stats, officeInfo } from "../data/stats";
import type { Video } from "../data/types";
import { useSeo } from "../lib/seo";

export default function Home() {
  useSeo(
    "مكتب هندسي لمشاريع التخرّج التقنية",
    "تكنو إنجاز — منصة هندسية وبورتفوليو تفاعلي لمشاريع التخرّج والمشاريع التقنية في الروبوتيك والذكاء الاصطناعي وإنترنت الأشياء.",
  );
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const robotics = projectBySlug("autonomous-delivery-robot");

  return (
    <>
      {/* ---- Hero Section with Interactive 3D Rotator ---- */}
      <section className="relative overflow-hidden border-b border-border bg-blueprint">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,184,207,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.14),_transparent_32%)]"
          aria-hidden
        />
        <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
          <div className="animate-fade-up">
            <Eyebrow>Techno Enjaz · Engineering Portfolio</Eyebrow>
            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              نحوّل الأفكار الهندسية إلى{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                مشاريع تقنية
              </span>{" "}
              قابلة للتنفيذ
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              مكتب متخصّص في تصميم وتنفيذ مشاريع التخرّج والمشاريع التقنية
              للطلاب والشركات — من الروبوتيك والذكاء الاصطناعي إلى الأنظمة
              المدمجة وإنترنت الأشياء ومحاكاة الدوائر الإلكترونية.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                to="/projects"
                size="lg"
                className="shadow-[0_18px_32px_rgba(14,116,144,0.22)]"
              >
                استكشف مشاريعنا
                <ArrowUpLeft className="h-5 w-5" />
              </LinkButton>
              <LinkButton to="/contact" variant="outline" size="lg">
                تواصل معنا
              </LinkButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {["تصميم هندسي متقدم", "برمجة ومحاكاة ذكية", "تنفيذ واختبار حقيقي"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card/80 px-3 py-1.5 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <HeroInteractiveRotator />
          </div>
        </Container>
      </section>

      {/* ---- Statistics Section ---- */}
      <Section className="py-12 sm:py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- "مشاريع تعمل الآن" - Dynamic Auto-Flipping Interactive Showcase ---- */}
      <Section className="py-12 bg-secondary/25 border-y border-border/70">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <Eyebrow>الأنظمة الحية</Eyebrow>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                مشاريع تعمل الآن
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                استعرض المنصات والتطبيقات المنشورة على الإنترنت مع إمكانية الدخول المباشر والمعاينة السريعة.
              </p>
            </div>
            <LinkButton to="/projects" variant="outline">
              جميع المنصات الحية
              <ArrowUpLeft className="h-4 w-4" />
            </LinkButton>
          </div>

          {/* Interactive Sliding Showcase */}
          <LiveProjectsShowcase projects={liveProjects} />
        </Container>
      </Section>

      {/* ---- Technical Domains / Services ---- */}
      <Section className="py-16">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>ماذا ننفّذ؟</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                مجالاتنا التقنية
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              نغطّي طيفًا واسعًا من التخصّصات الهندسية والتقنية بخبرة عملية في
              كل مجال.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Featured Projects - Dynamic Bento Matrix ---- */}
      <Section className="bg-secondary/30 border-t border-border/70 py-16">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>أعمالنا</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                مشاريع مختارة
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                نماذج من المشاريع التي صمّمناها ونفّذناها بمعايير هندسية دقيقة مع إمكانية المعاينة السريعة.
              </p>
            </div>
          </div>

          {/* Dynamic Interactive Bento Matrix */}
          <InteractiveProjectMatrix projects={projects} />
        </Container>
      </Section>

      {/* ---- Robotics feature ---- */}
      {robotics && (
        <Section className="py-16">
          <Container>
            <div className="grid items-center gap-10 overflow-hidden rounded-[32px] border border-border/80 bg-card shadow-lg lg:grid-cols-2">
              <div className="relative min-h-[300px] lg:min-h-[440px]">
                <img
                  src={robotics.coverImage}
                  alt={robotics.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <button
                  onClick={() =>
                    setActiveVideo({
                      ...robotics.videos[0],
                      id: "r",
                      category: "robotics",
                      year: robotics.year,
                      thumbnail: robotics.coverImage,
                    } as Video)
                  }
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/45"
                  aria-label="شاهد الفيديو"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-110">
                    <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                  </span>
                </button>
              </div>
              <div className="p-8 sm:p-10">
                <Badge className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  الروبوتيك
                </Badge>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  من المختبر إلى الواقع
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {robotics.shortDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {robotics.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <LinkButton to={`/projects/${robotics.slug}`}>
                    شاهد المشروع
                    <ArrowUpLeft className="h-4 w-4" />
                  </LinkButton>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ---- Articles ---- */}
      <Section className="bg-secondary/30 py-16">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>المدوّنة</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                من مدوّنة تكنو إنجاز
              </h2>
            </div>
            <LinkButton to="/articles" variant="outline">
              جميع المقالات
              <ArrowUpLeft className="h-4 w-4" />
            </LinkButton>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.slice(0, 4).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Videos ---- */}
      <Section className="py-16">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>شاهد بنفسك</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                فيديوهات المشاريع
              </h2>
            </div>
            <LinkButton to="/videos" variant="outline">
              استكشف جميع الفيديوهات
              <ArrowUpLeft className="h-4 w-4" />
            </LinkButton>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {videos.slice(0, 4).map((v) => (
              <VideoCard key={v.id} video={v} onPlay={setActiveVideo} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Newsletter ---- */}
      <NewsletterSection />

      {/* ---- Final CTA ---- */}
      <Section className="pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-primary px-8 py-14 text-center text-primary-foreground sm:px-14 shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to left, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                لديك فكرة مشروع؟
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
                شاركنا فكرتك وسنساعدك في تحويلها إلى مشروع تقني واضح وقابل
                للتنفيذ.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-background px-7 text-base font-bold text-foreground transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  تحدّث معنا
                </Link>
                <a
                  href={`https://wa.me/${officeInfo.phoneIntl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-primary-foreground/40 px-7 text-base font-medium transition-colors hover:bg-primary-foreground/10"
                >
                  اطلب استشارة
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <VideoModal
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        youtubeId={activeVideo?.youtubeId ?? null}
        title={activeVideo?.title}
      />
    </>
  );
}
