import type { SocialAccount } from '../../data/users'
import { socialPlatformLabels } from '../../data/users'
import { SocialIcon } from './SocialIcons'

export function SocialLinks({ social }: { social: SocialAccount[] }) {
  if (!social.length) return null
  return (
    <div className="flex flex-wrap gap-2.5">
      {social.map((s, i) => (
        <a
          key={`${s.platform}-${i}`}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={socialPlatformLabels[s.platform]}
          title={socialPlatformLabels[s.platform]}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <SocialIcon platform={s.platform} className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
