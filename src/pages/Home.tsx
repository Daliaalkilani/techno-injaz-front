import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpLeft, Play, Sparkles } from "lucide-react";
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
import { ProjectCard } from "../components/content/ProjectCard";
import { ArticleCard } from "../components/content/ArticleCard";
import { VideoCard } from "../components/content/VideoCard";
import { VideoModal } from "../components/content/VideoModal";
import { NewsletterSection } from "../components/content/Newsletter";
import { categories } from "../data/categories";
import { featuredProjects, projectBySlug } from "../data/projects";
import { articles } from "../data/articles";
import { videos } from "../data/videos";
import { stats, officeInfo } from "../data/stats";
import type { Video } from "../data/types";
import { img, photos } from "../data/images";
import { useSeo } from "../lib/seo";
import { toArabicDigits } from "../lib/utils";

export default function Home() {
  useSeo(
    "مكتب هندسي لمشاريع التخرّج التقنية",
    "تكنو إنجاز — بورتفوليو رقمي لمشاريع التخرّج والمشاريع التقنية في الروبوتيك والذكاء الاصطناعي وإنترنت الأشياء.",
  );
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const robotics = projectBySlug("autonomous-delivery-robot");
  const featured = featuredProjects().slice(0, 6);

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden border-b border-border bg-blueprint">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,184,207,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.14),_transparent_32%)]"
          aria-hidden
        />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
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
              المدمجة وإنترنت الأشياء.
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
              {["تصميم هندسي", "برمجة ذكية", "تنفيذ فعلي"].map((item) => (
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
            <div className="relative mx-auto max-w-[520px]">
              <div className="surface-panel animate-glow rounded-[32px] p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-[26px] border border-border bg-muted">
                    <img
                      src={img(photos.robotics[0], 600, 780)}
                      alt="روبوت هندسي"
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-8 flex flex-col gap-4">
                    <div className="overflow-hidden rounded-[22px] border border-border bg-muted animate-float-slow">
                      <img
                        src={img(photos.electronics[0], 600, 400)}
                        alt="لوحة إلكترونية"
                        loading="eager"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden rounded-[22px] border border-border bg-muted animate-float-delay">
                      <img
                        src={img(photos.ai[1], 600, 400)}
                        alt="ذكاء اصطناعي"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-5 top-8 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-sm animate-float-slow">
                <div className="font-mono text-lg font-bold text-primary">
                  +{toArabicDigits(130)}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  مشروع منفّذ
                </div>
              </div>
              <div className="absolute -bottom-4 right-4 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 shadow-xl backdrop-blur-sm animate-float-delay">
                <div className="text-[11px] text-primary">حلول متكاملة</div>
                <div className="mt-1 font-mono text-lg font-bold text-foreground">
                  AI · IoT · Robotics
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Statistics ---- */}
      <Section className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 rounded-2xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Services / domains ---- */}
      <Section className="pt-4">
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

      {/* ---- Featured projects ---- */}
      <Section className="bg-secondary/30">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>أعمالنا</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                مشاريع مختارة
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                نماذج من المشاريع التي صمّمناها ونفّذناها بمعايير هندسية دقيقة.
              </p>
            </div>
            <LinkButton to="/projects" variant="outline">
              استعرض جميع المشاريع
              <ArrowUpLeft className="h-4 w-4" />
            </LinkButton>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Robotics feature ---- */}
      {robotics && (
        <Section>
          <Container>
            <div className="grid items-center gap-10 overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2">
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
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
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
      <Section className="bg-secondary/30">
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
      <Section>
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
          <div className="relative overflow-hidden rounded-2xl border border-border bg-primary px-8 py-14 text-center text-primary-foreground sm:px-14">
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
                  className="inline-flex h-12 items-center justify-center rounded-md bg-background px-7 text-base font-medium text-foreground transition-transform hover:-translate-y-0.5"
                >
                  تحدّث معنا
                </Link>
                <a
                  href={`https://wa.me/${officeInfo.phoneIntl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-primary-foreground/40 px-7 text-base font-medium transition-colors hover:bg-primary-foreground/10"
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
