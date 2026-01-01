import { useState, forwardRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Plus, Mic, Headphones } from "lucide-react"

type ChatInputProps = {
  value: string
  onChange: (v: string) => void
}

const MODELS = ["Tensai (My models)", "GPT", "Gemini", "DeepSeek", "Grok"]

function ModelSelect() {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState("Tensai (My models)")

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="
          flex items-center gap-1.5
          rounded-full
          bg-secondary
          px-3 py-1.5

          text-xs
          font-semibold       
          text-foreground

          hover:bg-accent
          whitespace-nowrap
        "
      >
        <span>{model}</span>

        {/* CHEVRON */}
        <ChevronDown
          className={`
            h-3.5 w-3.5         
            text-foreground
            pointer-events-none
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
          strokeWidth={2.5}   
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 bottom-full mb-2
            w-44 rounded-xl
            border border-border
            bg-popover
            p-1 shadow-xl
            z-50
          "
        >
          {MODELS.map(m => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setModel(m)
                setOpen(false)
              }}
              className="
                w-full rounded-lg
                px-3 py-1.5
                text-left text-xs
                font-medium        
                text-foreground
                hover:bg-accent
                truncate
              "
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const ChatInput = forwardRef<
  HTMLTextAreaElement,
  ChatInputProps
>(function ChatInput({ value, onChange }, ref) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-lg">
      <Textarea
        ref={ref}
        value={value}
        rows={1}
        placeholder="Ask anything..."
        onChange={e => {
          onChange(e.target.value)
          e.target.style.height = "auto"
          e.target.style.height =
            Math.min(e.target.scrollHeight, 160) + "px"
        }}
        className="
          gpt-scrollbar
          max-h-[160px]
          resize-none
          overflow-y-auto

          bg-transparent
          border-none
          px-4 pt-4 pb-3

          text-sm text-foreground
          placeholder:text-muted-foreground
          leading-relaxed

          whitespace-pre-wrap
          break-words

          outline-none
          ring-0
          focus:outline-none
          focus:ring-0
          focus-visible:ring-0
        "
      />

      <div className="flex items-center justify-between border-t border-border px-3 py-2 gap-2">
        <ModelSelect />

        {/* ACTION ICONS */}
        <div className="flex items-center gap-1 shrink-0">
          {[Plus, Mic, Headphones].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="
                flex h-7 w-7 items-center justify-center
                rounded-full
                hover:bg-accent
              "
            >
              <Icon className="h-4 w-4 text-foreground pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})
