import type { Stat } from '../../data/stats'
import { useCountUp, useInView } from '../../lib/hooks'
import { toArabicDigits } from '../../lib/utils'

export function StatCard({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const value = useCountUp(stat.value, inView)
  return (
    <div ref={ref} className="flex flex-col items-center text-center sm:items-start sm:text-right">
      <div className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        <span className="text-primary">+</span>
        {toArabicDigits(value)}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
    </div>
  )
}
