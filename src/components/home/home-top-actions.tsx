import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Settings,
  Sun,
  Moon,
  Monitor,
  Languages,
  Menu,
} from "lucide-react"

type HomeTopActionsProps = {
  onMenuClick?: () => void
  sidebarOpen?: boolean
}

export function HomeTopActions({
  onMenuClick,
  sidebarOpen,
}: HomeTopActionsProps) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [language, setLanguage] = useState<"id" | "en">("id")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else if (theme === "light") root.classList.remove("dark")
    else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", isDark)
    }
  }, [theme])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 max-w-full">
      <div
        ref={ref}
        className="relative flex items-center gap-2 max-w-full whitespace-nowrap"
      >
        {/* ☰ HAMBURGER*/}
        {onMenuClick && !sidebarOpen && (
          <button
            onClick={onMenuClick}
            className="
              fixed top-4 left-4 z-50
              md:hidden

              flex h-9 w-9 items-center justify-center

              bg-transparent
              rounded-none

              hover:bg-transparent
              active:bg-transparent
              focus:bg-transparent

              focus:outline-none
              [-webkit-tap-highlight-color:transparent]
            "
          >
            <Menu className="h-5 w-5 text-foreground pointer-events-none" />
          </button>
        )}

        {/* SETTINGS */}
        <button
          onClick={() => setOpen(v => !v)}
          className="
            hidden md:flex
            h-9 w-9 items-center justify-center
            rounded-full
            hover:bg-accent
            shrink-0
          "
        >
          <Settings className="h-4 w-4 text-foreground pointer-events-none" />
        </button>

        {/* POPUP */}
        {open && (
          <div
            className="
              hidden md:block
              absolute right-0 top-full mt-2
              w-60 max-w-[calc(100vw-2rem)]
              rounded-xl
              border border-border
              bg-popover
              shadow-xl
              p-3
              z-50
            "
          >
            {/* LANGUAGE */}
            <div className="mb-4">
              <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
                Language
              </p>

              <div className="flex gap-1">
                {[
                  { id: "id", label: "ID" },
                  { id: "en", label: "EN" },
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLanguage(l.id as "id" | "en")}
                    className={`
                      flex flex-1 items-center justify-center gap-1
                      rounded-lg px-2 py-2
                      text-xs font-semibold
                      ${
                        language === l.id
                          ? "bg-accent text-foreground shadow-sm"
                          : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
                      }
                    `}
                  >
                    <Languages className="h-3.5 w-3.5 pointer-events-none" />
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* THEME */}
            <div>
              <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
                Theme
              </p>

              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "light", label: "Light", icon: Sun },
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "system", label: "System", icon: Monitor },
                ].map(t => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() =>
                        setTheme(t.id as "light" | "dark" | "system")
                      }
                      className={`
                        flex flex-col items-center gap-1
                        rounded-lg px-2 py-2
                        text-[11px] font-semibold
                        ${
                          theme === t.id
                            ? "bg-accent text-foreground shadow-sm"
                            : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
                        }
                      `}
                    >
                      <Icon className="h-4 w-4 pointer-events-none" />
                      <span className="truncate">{t.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* AUTH */}
        <div
          className={`
            flex items-center gap-2
            ${sidebarOpen ? "hidden md:flex" : "flex"}
          `}
        >
          {/* SIGN IN */}
          <Button
            variant="ghost"
            className="
              rounded-full
              px-3
              text-sm
              text-foreground
              hover:bg-accent
              shrink-0
            "
          >
            Sign in
          </Button>

          {/* SIGN UP */}
          <Button
            className="
              rounded-full
              px-4
              text-sm
              bg-foreground
              text-background
              hover:bg-foreground/90
              shrink-0
              transition-none
            "
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  )
}
