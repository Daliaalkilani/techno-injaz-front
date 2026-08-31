import { Plus, Trash2 } from 'lucide-react'
import type { SocialAccount, SocialPlatform } from '../../data/users'
import { socialPlatformLabels } from '../../data/users'
import { Select, Input, Label } from '../ui/fields'
import { SocialIcon } from './SocialIcons'

const platforms = Object.keys(socialPlatformLabels) as SocialPlatform[]

/** Flexible list editor — add/remove any number of social accounts (spec §8). */
export function SocialAccountsEditor({
  value,
  onChange,
}: {
  value: SocialAccount[]
  onChange: (next: SocialAccount[]) => void
}) {
  const update = (i: number, patch: Partial<SocialAccount>) =>
    onChange(value.map((a, idx) => (idx === i ? { ...a, ...patch } : a)))
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, { platform: 'instagram', url: '' }])

  return (
    <div>
      <Label>حساباتك الاجتماعية</Label>
      <div className="space-y-3">
        {value.map((acc, i) => (
          <div key={i} className="flex items-end gap-2">
            <span className="mb-2.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-primary sm:flex">
              <SocialIcon platform={acc.platform} className="h-5 w-5" />
            </span>
            <div className="w-36 shrink-0">
              <Select
                aria-label="نوع الحساب"
                value={acc.platform}
                onChange={(e) => update(i, { platform: e.target.value as SocialPlatform })}
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {socialPlatformLabels[p]}
                  </option>
                ))}
              </Select>
            </div>
            <Input
              dir="ltr"
              aria-label="الرابط"
              value={acc.url}
              onChange={(e) => update(i, { url: e.target.value })}
              placeholder="https://..."
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="حذف الحساب"
              className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Plus className="h-4 w-4" />
        إضافة حساب آخر
      </button>
    </div>
  )
}
