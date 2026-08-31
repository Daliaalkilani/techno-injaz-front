import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Tv,
  Film,
  ListVideo,
  Clock,
  Sparkles,
  Maximize2,
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
  Radio,
  Share2,
  SlidersHorizontal,
  FolderGit2,
} from "lucide-react";
import {
  PageHeader,
  Container,
  Section,
  Badge,
  Button,
} from "../components/ui/primitives";
import { ModernFilterTabs, type FilterTabItem } from "../components/ui/ModernFilterTabs";
import { VideoModal } from "../components/content/VideoModal";
import { EmptyState } from "../components/ui/states";
import { videos } from "../data/videos";
import { categories, categoryName } from "../data/categories";
import type { Video } from "../data/types";
import { toArabicDigits } from "../lib/utils";
import { useSeo } from "../lib/seo";

type ViewMode = "theater" | "timeline" | "grid";

// Technical telemetry data mapped to videos for rich lab context
const videoSpecs: Record<
  string,
  {
    controller: string;
    protocol: string;
    fps: string;
    sensors: string;
    status: string;
  }
> = {
  v1: {
    controller: "ROS 2 + LiDAR + STM32",
    protocol: "SLAM Navigation",
    fps: "60 FPS Telemetry",
    sensors: "2D LiDAR + IMU 9-DOF",
    status: "ناجح مخبرياً بنسبة 99%",
  },
  v2: {
    controller: "Arduino Mega + Servo Shields",
    protocol: "Inverse Kinematics (IK)",
    fps: "Realtime Servo Sync",
    sensors: "Optical Encoders",
    status: "معايرة محاور 6-DOF",
  },
  v3: {
    controller: "Python + MediaPipe + OpenCV",
    protocol: "Real-time Neural Inference",
    fps: "45 FPS Processing",
    sensors: "HD RGB Camera",
    status: "دقة تصنيف 96.8%",
  },
  v4: {
    controller: "ESP32-S3 + MPU6050",
    protocol: "ESP-NOW Low Latency (4ms)",
    fps: "120Hz IMU Loop",
    sensors: "Gesture Accelerometer",
    status: "استقرار طيران فوري",
  },
  v5: {
    controller: "ESP8266 + Next.js Cloud",
    protocol: "MQTT over TLS",
    fps: "Live Telemetry Stream",
    sensors: "Soil Moisture + DHT22",
    status: "اتصال سحابي دائم",
  },
  v6: {
    controller: "ATmega328P + PID Control",
    protocol: "Analog Sensor Array (8-ch)",
    fps: "1kHz Control Loop",
    sensors: "Infrared Optical Array",
    status: "سرعة استجابة فائقة",
  },
  v7: {
    controller: "Mobile App + TensorFlow Lite",
    protocol: "Edge AI On-device",
    fps: "Instant Classification",
    sensors: "Mobile Camera Sensor",
    status: "فحص 30+ مرض نباتي",
  },
  v8: {
    controller: "ESP32 + Home Assistant API",
    protocol: "WebSockets + Zigbee",
    fps: "Zero Latency Switch",
    sensors: "PIR + Relay Modules",
    status: "أتمتة ذكية متكاملة",
  },
};

export default function Videos() {
  useSeo(
    "فيديوهات وتجارب التشغيل | تكنو إنجاز",
    "استوديو العرض الهندسي وتجارب التشغيل الواقعية لمشاريع الروبوتيك، الذكاء الاصطناعي، والأنظمة المدمجة.",
  );

  const [cat, setCat] = useState("");
  const [activeVideo, setActiveVideo] = useState<Video>(videos[0]);
  const [modalVideo, setModalVideo] = useState<Video | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("theater");
  const [copied, setCopied] = useState(false);

  const videoFilterTabs: FilterTabItem[] = useMemo(() => {
    const tabs: FilterTabItem[] = [
      { id: "all", label: "جميع التجارب", count: videos.length },
    ];
    categories.forEach((c) => {
      const count = videos.filter((v) => v.category === c.slug).length;
      if (count > 0) {
        tabs.push({ id: c.slug, label: c.name, count });
      }
    });
    return tabs;
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => !cat || cat === "all" || v.category === cat);
  }, [cat]);

  // Keep active video updated when filter changes if needed
  const currentActive =
    filteredVideos.find((v) => v.id === activeVideo?.id) ||
    filteredVideos[0] ||
    videos[0];

  const specs = videoSpecs[currentActive?.id || "v1"] || {
    controller: "Microcontroller Board",
    protocol: "Standard I/O",
    fps: "60 FPS",
    sensors: "Multi-Sensor Pack",
    status: "تم الاختبار بنجاح",
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHeader
        title="استوديو وتجارب التشغيل الهندسية"
        description="توثيق مرئي ومخبري لمشاريع الروبوتيك والأنظمة المدمجة أثناء الاختبار الميداني والتشغيل الفعلي."
      />

      <Section className="py-10 sm:py-14">
        <Container>
          {/* ---- Controls & Switcher Toolbar ---- */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Sliding Filter Tabs */}
            <ModernFilterTabs
              tabs={videoFilterTabs}
              activeId={cat || "all"}
              onChange={(id) => setCat(id === "all" ? "" : id)}
              size="md"
              className="max-w-full"
            />

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 rounded-2xl border border-border/80 bg-card p-1 self-start lg:self-auto shadow-xs shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("theater")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "theater"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="نمط الاستوديو والشاشة الكبيرة"
              >
                <Tv className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">الاستوديو</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "timeline"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="سجل الاختبارات الميدانية"
              >
                <Activity className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">سجل الاختبارات</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="معرض الفيديوهات"
              >
                <Film className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">المعرض</span>
              </button>
            </div>
          </div>

          {/* ---- View Mode 1: Cinema Studio Master Lounge ---- */}
          {viewMode === "theater" && currentActive && (
            <div className="grid gap-8 lg:grid-cols-[1.55fr_0.95fr] items-start">
              {/* Left: Cinema Player Screen & Telemetry */}
              <div className="space-y-5">
                {/* Main Screen Container */}
                <div className="group relative overflow-hidden rounded-[28px] border border-border/90 bg-slate-950 shadow-2xl">
                  {/* YouTube Iframe Player */}
                  <div className="relative aspect-video w-full">
                    <iframe
                      key={currentActive.id}
                      src={`https://www.youtube-nocookie.com/embed/${currentActive.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                      title={currentActive.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>

                  {/* Header Bar Over Player */}
                  <div className="flex items-center justify-between border-t border-white/10 bg-slate-900/90 px-5 py-3 text-xs text-white backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono font-bold text-emerald-400">
                        STREAM READY
                      </span>
                      <span className="text-white/40">|</span>
                      <span className="font-mono text-white/80">
                        {currentActive.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalVideo(currentActive)}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-white/20"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>تكبير الشاشة</span>
                      </button>
                      <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-white/20"
                      >
                        <Share2 className="h-3 w-3" />
                        <span>{copied ? "تم النسخ!" : "مشاركة"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Info and Engineering Telemetry */}
                <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                        {categoryName(currentActive.category)}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        سنة التنفيذ: {toArabicDigits(currentActive.year)}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{specs.status}</span>
                    </div>
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold text-foreground sm:text-2xl">
                    {currentActive.title}
                  </h2>

                  {/* Telemetry Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-border/70 pt-5">
                    <div className="rounded-2xl border border-border/70 bg-secondary/40 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <Cpu className="h-3.5 w-3.5 text-primary" />
                        <span>المتحكم والمعالجة</span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-bold text-foreground">
                        {specs.controller}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-secondary/40 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        <span>البروتوكول / الخوارزمية</span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-bold text-foreground">
                        {specs.protocol}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-secondary/40 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <Activity className="h-3.5 w-3.5 text-cyan-500" />
                        <span>معدل المعالجة</span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-bold text-foreground">
                        {specs.fps}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-secondary/40 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <Radio className="h-3.5 w-3.5 text-emerald-500" />
                        <span>الحساسات والمشغلات</span>
                      </div>
                      <div className="mt-1 font-mono text-xs font-bold text-foreground">
                        {specs.sensors}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Playlist Queue */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListVideo className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold text-foreground">
                      قائمة التشغيل والتجارب ({toArabicDigits(filteredVideos.length)})
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    انقر للتبديل الفوري
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                  {filteredVideos.map((vid, idx) => {
                    const isSelected = vid.id === currentActive.id;
                    return (
                      <button
                        key={vid.id}
                        onClick={() => setActiveVideo(vid)}
                        className={`group w-full flex items-center gap-3.5 rounded-2xl border p-3 text-right transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary/40"
                            : "border-border/80 bg-card hover:border-primary/40 hover:bg-secondary/40"
                        }`}
                      >
                        {/* Index or Equalizer */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold">
                          {isSelected ? (
                            <span className="flex items-center gap-0.5 text-primary">
                              <span className="h-3 w-1 bg-primary animate-pulse" />
                              <span className="h-4 w-1 bg-primary animate-pulse delay-75" />
                              <span className="h-2 w-1 bg-primary animate-pulse delay-150" />
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              {toArabicDigits(idx + 1)}
                            </span>
                          )}
                        </div>

                        {/* Thumbnail */}
                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/90 text-white">
                              <Play className="h-3 w-3 fill-current translate-x-0.5" />
                            </span>
                          </div>
                          <span className="absolute bottom-1 left-1 rounded bg-black/80 px-1 py-0.2 font-mono text-[9px] text-white">
                            {vid.duration}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <span className="font-mono text-[10px] font-semibold text-primary">
                            {categoryName(vid.category)}
                          </span>
                          <h4
                            className={`truncate text-xs font-bold transition-colors ${
                              isSelected
                                ? "text-primary font-extrabold"
                                : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {vid.title}
                          </h4>
                          <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
                            {toArabicDigits(vid.year)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---- View Mode 2: Field Test Telemetry Log ---- */}
          {viewMode === "timeline" && (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-foreground">
                  سجل الاختبارات والتشغيل الميداني
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  بيانات القياس ومواصفات كل تجربة مخبرية موثقة بالفيديو
                </p>
              </div>

              <div className="space-y-4">
                {filteredVideos.map((vid, idx) => {
                  const spec = videoSpecs[vid.id] || {
                    controller: "Standard Board",
                    protocol: "Direct Link",
                    fps: "60 FPS",
                    sensors: "Sensor pack",
                    status: "معايرة مكتملة",
                  };

                  return (
                    <div
                      key={vid.id}
                      className="group flex flex-col gap-5 rounded-3xl border border-border/80 bg-card p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
                    >
                      {/* Left: Media + Title */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl bg-muted">
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <button
                            onClick={() => setModalVideo(vid)}
                            className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/50"
                            aria-label={`تشغيل فيديو ${vid.title}`}
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                              <Play className="h-4 w-4 fill-current translate-x-0.5" />
                            </span>
                          </button>
                          <span className="absolute bottom-1.5 left-1.5 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
                            {vid.duration}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                              {categoryName(vid.category)}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {toArabicDigits(vid.year)}
                            </span>
                          </div>
                          <h4 className="mt-1.5 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            {vid.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{spec.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Technical specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs border-t border-border/60 pt-3 lg:border-t-0 lg:pt-0">
                        <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5">
                          <span className="text-[10px] text-muted-foreground block">
                            المتحكم:
                          </span>
                          <span className="font-bold text-foreground text-[11px]">
                            {spec.controller}
                          </span>
                        </div>
                        <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5">
                          <span className="text-[10px] text-muted-foreground block">
                            البروتوكول:
                          </span>
                          <span className="font-bold text-foreground text-[11px]">
                            {spec.protocol}
                          </span>
                        </div>
                        <div className="rounded-xl border border-border/70 bg-secondary/30 p-2.5 col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-muted-foreground block">
                            الحساسات:
                          </span>
                          <span className="font-bold text-foreground text-[11px]">
                            {spec.sensors}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setActiveVideo(vid);
                            setViewMode("theater");
                          }}
                          className="w-full lg:w-auto"
                        >
                          <Tv className="h-3.5 w-3.5" />
                          <span>عرض بالاستوديو</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---- View Mode 3: Interactive Visual Flow Grid ---- */}
          {viewMode === "grid" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVideos.map((vid) => (
                <div
                  key={vid.id}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    <button
                      onClick={() => setModalVideo(vid)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40"
                      aria-label={`تشغيل ${vid.title}`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/95 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-5 w-5 fill-current translate-x-0.5" />
                      </span>
                    </button>

                    <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-black/80 px-2 py-0.5 font-mono text-[11px] font-bold text-white backdrop-blur-xs">
                      {vid.duration}
                    </span>

                    <span className="absolute top-2.5 right-2.5 rounded-lg bg-slate-900/80 px-2.5 py-1 font-mono text-[10px] font-bold text-primary backdrop-blur-xs border border-white/10">
                      {categoryName(vid.category)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {vid.title}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                        سنة التنفيذ: {toArabicDigits(vid.year)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                      <button
                        onClick={() => {
                          setActiveVideo(vid);
                          setViewMode("theater");
                        }}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <Tv className="h-3.5 w-3.5" />
                        <span>فتح بالاستوديو</span>
                      </button>
                      <button
                        onClick={() => setModalVideo(vid)}
                        className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                      >
                        معاينة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && (
            <EmptyState
              title="لا توجد فيديوهات"
              message="لا توجد فيديوهات مطابقة للفلتر المحدد."
            />
          )}
        </Container>
      </Section>

      {/* Pop-up Video Modal */}
      <VideoModal
        open={!!modalVideo}
        onClose={() => setModalVideo(null)}
        youtubeId={modalVideo?.youtubeId ?? null}
        title={modalVideo?.title}
      />
    </>
  );
}
