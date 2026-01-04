import {
  Plus,
  Search,
  Image,
  Grid,
  Folder,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { SidebarItem } from "./sidebar-item"

const MENU = [
  { icon: Plus, label: "New chat" },
  { icon: Search, label: "Search" },
  { icon: Image, label: "Images" },
  { icon: Grid, label: "Apps" },
  { icon: Folder, label: "Projects" },
  { icon: MessageSquare, label: "Chats" },
]

export function SidebarDesktop({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
        hidden md:flex flex-col
        border-r border-border
        bg-background/80 backdrop-blur-xl

        transition-[width]
        duration-300
        ease-[cubic-bezier(0.4,0,0.2,1)]

        ${expanded ? "w-72" : "w-16"}
      `}
    >
      {/* HEADER */}
      <div className="h-14 flex items-center px-3">
        <div className="flex h-9 w-9 items-center justify-center">
          <img
            src="/logo-tensai.jpeg"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>

        <div
          className={`
            overflow-hidden
            transition-all duration-300
            ${expanded ? "ml-2 w-32 opacity-100" : "ml-0 w-0 opacity-0"}
          `}
        >
          <span className="text-sm font-medium text-foreground">
            Tensai
          </span>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 px-2 pt-2">
        {MENU.map(item => (
          <SidebarItem
            key={item.label}
            {...item}
            expanded={expanded}
          />
        ))}
      </nav>

      {/* TOGGLE */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={onToggle}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-background/80 backdrop-blur
            border border-border

            text-foreground
            hover:bg-accent

            active:scale-95
          "
        >
          {expanded ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  )
}
