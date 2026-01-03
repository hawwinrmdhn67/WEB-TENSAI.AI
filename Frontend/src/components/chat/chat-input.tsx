import {
  useState,
  useRef,
  forwardRef,
  memo,
  useEffect,
} from "react"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Plus, Mic, Headphones, Send } from "lucide-react"

/* ================= TYPES ================= */

type ChatInputProps = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onAttach?: (file: File) => void
  disabled?: boolean
}

const MODELS = [
  "Tensai (My models)",
  "GPT",
  "Gemini",
  "DeepSeek",
  "Grok",
]

/* ================= MODEL SELECT ================= */

const ModelSelect = memo(function ModelSelect() {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(MODELS[0])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="
          flex items-center gap-1.5
          rounded-full px-3 py-1.5
          text-xs font-semibold
          transition-transform
          bg-zinc-200 text-zinc-900 hover:bg-zinc-300
          dark:bg-[#262626] dark:text-zinc-100 dark:hover:bg-[#2d2d2d]
        "
      >
        {model}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute bottom-full left-0 mb-2 w-44
            rounded-xl p-1 z-50
            shadow-md
            bg-white border border-zinc-200
            dark:bg-[#262626] dark:border-white/10
          "
        >
          {MODELS.map(m => (
            <button
              key={m}
              onClick={() => {
                setModel(m)
                setOpen(false)
              }}
              className="
                w-full rounded-lg px-3 py-1.5
                text-left text-xs truncate
                transition-none
                text-zinc-900 hover:bg-zinc-100
                dark:text-zinc-200 dark:hover:bg-white/10
              "
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

/* ================= CHAT INPUT ================= */

export const ChatInput = forwardRef<
  HTMLTextAreaElement,
  ChatInputProps
>(function ChatInput(
  { value, onChange, onSend, onAttach, disabled },
  ref
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  /* 🔥 FIX: RESET HEIGHT SAAT PESAN TERKIRIM */
  useEffect(() => {
    if (!textareaRef.current) return

    if (value === "") {
      textareaRef.current.style.height = "0px"
    }
  }, [value])

  return (
    <div
      className="
        rounded-2xl border
        shadow-md
        bg-white border-zinc-200
        dark:bg-[#1f1f1f] dark:border-white/10
      "
    >
      {/* FILE INPUT */}
      <input
        ref={fileRef}
        type="file"
        hidden
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file && onAttach) onAttach(file)
          e.target.value = ""
        }}
      />

      {/* TEXTAREA */}
      <Textarea
        ref={el => {
          textareaRef.current = el
          if (typeof ref === "function") ref(el)
          else if (ref) ref.current = el
        }}
        value={value}
        rows={1}
        disabled={disabled}
        placeholder="Ask anything..."
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            if (!value.trim()) return
            e.preventDefault()
            if (!disabled) onSend()
          }
        }}
        onChange={e => {
          const el = e.target
          onChange(el.value)
          el.style.height = "0px"
          el.style.height =
            Math.min(el.scrollHeight, 160) + "px"
        }}
        className="
        gpt-scrollbar
        max-h-[160px]
        resize-none
        overflow-y-auto

        bg-transparent
        border-none

        px-4 pt-4 pb-3
        text-sm
        text-foreground
        placeholder:text-muted-foreground/70
        leading-relaxed

        whitespace-pre-wrap
        break-words
        [overflow-wrap:anywhere]

        outline-none
        ring-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0

        hover:bg-transparent
        hover:ring-0
        hover:outline-none

        focus:bg-transparent
        active:bg-transparent

        disabled:opacity-60
      "
      />

      {/* FOOTER */}
      <div
        className="
          flex items-center justify-between
          px-3 py-2 border-t
          border-zinc-300 dark:border-white/20
        "
      >
        <ModelSelect />

        <div className="flex items-center gap-1">
          <IconBtn onClick={() => fileRef.current?.click()}>
            <Plus className="h-4 w-4" />
          </IconBtn>
          <IconBtn>
            <Mic className="h-4 w-4" />
          </IconBtn>
          <IconBtn>
            <Headphones className="h-4 w-4" />
          </IconBtn>

          {value.trim() && (
            <button
              onClick={onSend}
              disabled={disabled}
              className="
                ml-1 flex h-8 w-8 items-center justify-center
                rounded-full transition-transform
                active:scale-95
                bg-zinc-900 text-white
                dark:bg-white dark:text-black
              "
            >
              <Send className="h-4 w-4 -translate-x-[1.5px] translate-y-[1px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

/* ================= ICON BUTTON ================= */

function IconBtn({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex h-8 w-8 items-center justify-center
        rounded-full
        transition-none
        text-zinc-600 hover:text-zinc-900
        dark:text-zinc-400 dark:hover:text-zinc-200
      "
    >
      {children}
    </button>
  )
}
