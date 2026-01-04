// components/chat/model-select.tsx

import { memo, useState } from "react"
import { ChevronDown } from "lucide-react"

const MODELS = [
  "Tensai (My models)",
  "GPT",
  "Gemini",
  "DeepSeek",
  "Grok",
]

export const ModelSelect = memo(function ModelSelect() {
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
          {MODELS.map(item => (
            <button
              key={item}
              onClick={() => {
                setModel(item)
                setOpen(false)
              }}
              className="
                w-full rounded-lg px-3 py-1.5
                text-left text-xs truncate
                text-zinc-900 hover:bg-zinc-100
                dark:text-zinc-200 dark:hover:bg-white/10
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
