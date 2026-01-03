import {
  Plus,
  Search,
  Image,
  Grid,
  Folder,
  MessageSquare,
  ChevronLeft,
} from "lucide-react"
import { SidebarItem } from "./sidebar-item"

const MENU = [
  { icon: Plus, label: "New chat" },
  { icon: Search, label: "Search" },
  { icon: Image, label: "Images" },
  { icon: Grid, label: "Apps",  },
  { icon: Folder, label: "Projects" },
  { icon: MessageSquare, label: "Chats" },
]

export function SidebarMobile({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
        flex md:hidden flex-col
        w-72
        border-r border-border
        bg-background/80 backdrop-blur-xl
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* HEADER */}
      <div className="h-14 flex items-center px-3">
        <img
          src="/logo-tensai.jpeg"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="ml-2 text-sm font-medium">Tensai</span>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 px-2 pt-2">
        {MENU.map(item => (
          <SidebarItem
            key={item.label}
            {...item}
            expanded
            mobile
            onSelect={onClose}
          />
        ))}
      </nav>

      {/* CLOSE */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={onClose}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-background/80 backdrop-blur
            border border-border
            text-muted-foreground
            hover:bg-accent hover:text-foreground
            transition
            active:scale-95
          "
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
    </aside>
  )
}
