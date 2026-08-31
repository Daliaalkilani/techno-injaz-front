import { Play } from 'lucide-react'
import type { Video } from '../../data/types'
import { categoryName } from '../../data/categories'
import { toArabicDigits } from '../../lib/utils'

export function VideoCard({ video, onPlay }: { video: Video; onPlay: (v: Video) => void }) {
  return (
    <button
      onClick={() => onPlay(video)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-right transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5 fill-current" />
          </span>
        </div>
        <span className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 font-mono text-xs text-white">
          {toArabicDigits(video.duration)}
        </span>
      </div>
      <div className="p-4">
        <span className="font-mono text-xs text-primary">{categoryName(video.category)}</span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
          {video.title}
        </h3>
      </div>
    </button>
  )
}
