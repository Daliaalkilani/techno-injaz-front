import { Play } from "lucide-react";
import type { Video } from "../../data/types";
import { categoryName } from "../../data/categories";
import { toArabicDigits } from "../../lib/utils";

export function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (v: Video) => void;
}) {
  return (
    <button
      onClick={() => onPlay(video)}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card text-right transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden bg-muted w-full">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/40">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/95 text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="h-5 w-5 fill-current translate-x-0.5" />
          </span>
        </div>

        <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-black/80 px-2 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-xs">
          {toArabicDigits(video.duration)}
        </span>

        <span className="absolute top-2.5 right-2.5 rounded-lg bg-slate-900/80 px-2.5 py-1 font-mono text-[10px] font-bold text-primary backdrop-blur-xs border border-white/10">
          {categoryName(video.category)}
        </span>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 w-full">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {video.title}
        </h3>
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-mono text-muted-foreground">
          <span>سنة {toArabicDigits(video.year)}</span>
          <span className="font-bold text-primary">تشغيل العرض</span>
        </div>
      </div>
    </button>
  );
}
