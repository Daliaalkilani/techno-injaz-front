import { Bot, Brain, Radio, Cpu, Code, Smartphone, Network, Eye, type LucideIcon } from 'lucide-react'

const map: Record<string, LucideIcon> = {
  bot: Bot,
  brain: Brain,
  radio: Radio,
  cpu: Cpu,
  code: Code,
  smartphone: Smartphone,
  network: Network,
  eye: Eye,
}

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Cpu
  return <Icon className={className} aria-hidden />
}
