type SidebarItemProps = {
  icon: any
  label: string
  expanded: boolean
  active?: boolean
  mobile?: boolean
  onSelect?: () => void
}

export function SidebarItem({
  icon: Icon,
  label,
  expanded,
  active,
  mobile,
  onSelect,
}: SidebarItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        group relative
        flex items-center
        h-10 w-full cursor-pointer
        rounded-full

        ${
          expanded
            ? active
              ? "bg-accent text-foreground"
              : "text-foreground hover:bg-accent/60"
            : "text-foreground"
        }
      `}
    >
      {/* ICON */}
      <div
        className={`
          flex h-10 w-10 shrink-0 items-center justify-center rounded-full
          ${!expanded && "hover:bg-accent/40"}
        `}
      >
        <Icon
          className="
            h-4 w-4
            text-foreground
            pointer-events-none
          "
        />
      </div>

      {/* TEXT */}
      <div
        className={`
          ml-2 overflow-hidden
          transition-all duration-300
          ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
        `}
      >
        <span className="text-sm font-medium whitespace-nowrap">
          {label}
        </span>
      </div>

      {/* TOOLTIP */}
      {!expanded && !mobile && (
        <div
          className="
            pointer-events-none
            absolute left-full ml-3
            top-1/2 -translate-y-1/2
            whitespace-nowrap
            rounded-md
            bg-popover px-2.5 py-1.5
            text-xs font-medium text-popover-foreground
            opacity-0 scale-95
            shadow-md
            transition-all duration-150 delay-75
            group-hover:opacity-100
            group-hover:scale-100
          "
        >
          {label}
        </div>
      )}
    </div>
  )
}
