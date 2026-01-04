import type { LucideIcon } from "lucide-react"

type Props = {
  label: string
  icon: LucideIcon
  onClick?: () => void
}

export function ActionPill({ label, icon: Icon, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2
        rounded-full
        border border-border
        bg-secondary
        px-4 py-2
        text-[13px] font-medium
        text-foreground

        hover:bg-accent
        active:scale-[0.97]

        max-w-full
        whitespace-nowrap
      "
    >
      {/* ICON */}
      <Icon
        className="
          h-4 w-4
          shrink-0
          text-foreground
          pointer-events-none
        "
      />
      <span className="truncate">{label}</span>
    </button>
  )
}
