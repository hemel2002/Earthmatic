interface StatCardProps {
  label: string
  value: string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-3xl font-semibold tabular-nums text-[var(--stat-value-color)] sm:text-4xl">
        {value}
      </span>
      <span className="text-sm text-[var(--data-label-color)]">{label}</span>
    </div>
  )
}
