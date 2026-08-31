import { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  ExternalLink,
  ArrowUpLeft,
  Share2,
  Check,
  Sparkles,
  Layers,
  Globe,
  Calendar,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { LiveProject, Project } from "../../data/types";
import { liveProjectTypeLabels, projectTypeLabels } from "../../data/types";
import { toArabicDigits } from "../../lib/utils";

interface QuickPreviewProps {
  item: LiveProject | Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectQuickPreviewModal({
  item,
  isOpen,
  onClose,
}: QuickPreviewProps) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const isLiveProject = "live" in item;
  const liveUrl = isLiveProject ? item.url : undefined;
  const title = "name" in item ? item.name : item.title;
  const desc =
    "shortDescription" in item ? item.shortDescription : item.description;
  const fullDesc = "description" in item ? item.description : "";
  const image = "coverImage" in item ? item.coverImage : item.image;
  const isLive = isLiveProject ? item.live : false;

  const getTypeLabel = () => {
    if ("live" in item) {
      return liveProjectTypeLabels[item.type] || item.type;
    }
    return projectTypeLabels[item.type] || item.type;
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, text: desc, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            aria-hidden
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border/80 bg-muted/40 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-3 w-3">
                  {isLive ? (
                    <>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </>
                  ) : (
                    <span className="h-3 w-3 rounded-full bg-primary/80" />
                  )}
                </div>
                <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {isLive ? "معاينة حية وتفاعلية" : "معاينة هندسية سريعة"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  title="مشاركة"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="إغلاق"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Visual Column */}
                <div className="space-y-4">
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/80 bg-slate-950 shadow-inner">
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Floating badges on image */}
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between pointer-events-none">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          يعمل الآن أونلاين
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-900/80 px-3 py-1 font-mono text-xs font-medium text-white shadow-lg backdrop-blur">
                          {getTypeLabel()}
                        </span>
                      )}

                      {"year" in item && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 font-mono text-xs text-white shadow-lg backdrop-blur">
                          <Calendar className="h-3 w-3" />
                          {toArabicDigits(item.year)}
                        </span>
                      )}
                    </div>

                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-xl bg-primary/95 py-3 font-semibold text-primary-foreground shadow-xl backdrop-blur transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Globe className="h-4 w-4" />
                        <span>فتح المنصة الحية مباشرة</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {"technologies" in item && (
                    <div>
                      <span className="mb-2 block text-xs font-medium text-muted-foreground">
                        التقنيات المستخدمة
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs font-medium text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Column */}
                <div className="flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{getTypeLabel()}</span>
                    </div>

                    <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl text-foreground">
                      {title}
                    </h2>

                    <p className="mt-4 leading-relaxed text-muted-foreground text-sm sm:text-base">
                      {fullDesc || desc}
                    </p>

                    {"problem" in item && item.problem && (
                      <div className="mt-5 rounded-xl border border-border/80 bg-secondary/40 p-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                          <Layers className="h-4 w-4 text-primary" />
                          <span>المشكلة والهدف:</span>
                        </div>
                        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.problem}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-border/80">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {liveUrl ? (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>انقر للمشاهدة الحية</span>
                        </a>
                      ) : (
                        <Link
                          to={`/projects/${item.slug}`}
                          onClick={onClose}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5"
                        >
                          <ArrowUpLeft className="h-4 w-4" />
                          <span>تفاصيل المشروع كاملة</span>
                        </Link>
                      )}

                      <Link
                        to={`/projects/${item.slug}`}
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/60"
                      >
                        <Eye className="h-4 w-4 text-primary" />
                        <span>عرض الصفحة المخصصة</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
