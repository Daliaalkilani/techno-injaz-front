import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpLeft,
  Bot,
  Cpu,
  ShieldCheck,
  Zap,
  FolderGit2,
  BookOpen,
  Video as VideoIcon,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Layers,
  Award,
  Terminal,
  Building2,
  Rocket,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  Flame,
  Radio,
} from "lucide-react";
import {
  Container,
  Section,
  LinkButton,
  Button,
} from "../components/ui/primitives";
import { StatCard } from "../components/content/StatCard";
import { HeroInteractiveRotator } from "../components/content/HeroInteractiveRotator";
import { RefinedProjectShowcase } from "../components/content/RefinedProjectShowcase";
import { RefinedSectorsHub } from "../components/content/RefinedSectorsHub";
import { RefinedPipelineFlow } from "../components/content/RefinedPipelineFlow";
import { stats, officeInfo } from "../data/stats";
import { useSeo } from "../lib/seo";

export default function Home() {
  useSeo(
    "تكنو إنجاز | حلول هندسية، نماذج أعمال مبتكرة، وأنظمة تقنية متقدمة",
    "مكتب تكنو إنجاز الهندسي: تصميم وتنفيذ النماذج الأولية للشركات الناشئة (MVPs)، الأنظمة الصناعية وحلول الأتمتة، ومشاريع التخرج والبحث العلمي المتقدمة.",
  );

  return (
    <>
      {/* ---- Hero Section ---- */}
      <section className="relative overflow-hidden border-b border-border/80 bg-blueprint">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,184,207,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.14),_transparent_36%)]"
          aria-hidden
        />
        <Container className="relative grid min-w-0 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>مكتب تكنو إنجاز الهندسي للحلول التقنية</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.18] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
              نحوّل فكرتك وابتكارك إلى{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                حل هندسي ونظام حقيقي
              </span>{" "}
              يعمل بكفاءة
            </h1>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              شريكك الهندسي المتكامل لتصميم وتطوير النماذج الأولية للشركات الناشئة (MVPs)،
              حلول الأتمتة والأنظمة المؤسسية، ومشاريع التخرج والبحث العلمي المتقدمة في مجالات
              الروبوتيك، الذكاء الاصطناعي، إنترنت الأشياء، والمنصات السحابية.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <LinkButton
                to="/projects"
                size="lg"
                className="shadow-[0_10px_24px_rgba(14,116,144,0.25)] transition-transform hover:-translate-y-0.5"
              >
                استكشف معرض الأنظمة والمشاريع
                <ArrowUpLeft className="h-5 w-5" />
              </LinkButton>
              <LinkButton
                to="/contact"
                variant="outline"
                size="lg"
                className="transition-colors hover:bg-secondary"
              >
                طلب استشارة هندسية
              </LinkButton>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                "نماذج أولية صناعية و MVP",
                "أنظمة أتمتة وإنترنت الأشياء",
                "حلول للشركات ورواد الأعمال",
                "مشاريع تخرج وبحث علمي",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <HeroInteractiveRotator />
          </div>
        </Container>
      </section>

      {/* ---- Statistics Summary ---- */}
      <Section className="py-10 sm:py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- 1. Refined Projects Showcase (معرض المشاريع والأنظمة المنجزة) ---- */}
      <Section className="py-12 sm:py-16">
        <Container>
          <RefinedProjectShowcase />
        </Container>
      </Section>

      {/* ---- 2. Refined Target Audiences & Sectors (قطاعات عملائنا والحلول المخصصة) ---- */}
      <Section className="border-t border-border/70 bg-secondary/15 py-16 sm:py-20">
        <Container>
          <RefinedSectorsHub />
        </Container>
      </Section>

      {/* ---- 3. Refined 5-Stage Engineering Pipeline (مسار تنفيذ مشروعك الهندسي) ---- */}
      <Section className="border-t border-border/70 py-16 sm:py-20">
        <Container>
          <RefinedPipelineFlow />
        </Container>
      </Section>

      {/* ---- Direct Call to Action ---- */}
      <Section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[30px] border border-border bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 shadow-xl">
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(to left, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                جاهز للبدء في تنفيذ مشروعك أو نظامك التقني؟
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/90 sm:text-base">
                تواصل مع مهندسينا لمناقشة المتطلبات الفنية، تحليل التكاليف والجدول الزمني، والبدء في بناء النموذج الأولي أو النظام المطلوب.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-background px-6 text-sm font-bold text-foreground shadow-md transition-transform hover:-translate-y-0.5"
                >
                  تواصل معنا الآن
                </Link>
                <a
                  href={`https://wa.me/${officeInfo.phoneIntl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary-foreground/40 px-6 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>محادثة واتساب سريعة</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}


