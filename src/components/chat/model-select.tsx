// components/chat/model-select.tsx

import { memo, useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export type SelectedModel = {
  model: string
}

type ModelOption = {
  label: string
  model: string
}

type Props = {
  value: SelectedModel
  onChange: (value: SelectedModel) => void
}

export const ModelSelect = memo(function ModelSelect({
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const [models, setModels] = useState<ModelOption[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Fetch models from backend
  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/models")
        const data = await res.json()
        setModels(data)
      } catch (err) {
        console.error("Failed to fetch models:", err)
      }
    }

    fetchModels()
  }, [])

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current =
    models.find(m => m.model === value?.model) ?? models[0]

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-[#262626] dark:text-zinc-100 dark:hover:bg-[#2d2d2d]"
      >
        {current?.label || "Loading..."}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && models.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 w-64 max-h-60 overflow-y-auto rounded-xl p-1 z-50 shadow-md bg-white border border-zinc-200 dark:bg-[#262626] dark:border-white/10">
          {models.map(item => (
            <button
              key={item.model}
              onClick={() => {
                onChange({ model: item.model })
                setOpen(false)
              }}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-xs truncate transition
                ${
                  current?.model === item.model
                    ? "bg-zinc-100 dark:bg-white/10"
                    : "hover:bg-zinc-100 dark:hover:bg-white/10"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
