// components/chat/markdown/code-bubble.tsx

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { highlightCode } from "./syntax-highlight"

export function CodeBubble({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const lines = code.split("\n")
  const isLong = lines.length > 12

  const visibleCode = expanded
    ? code
    : lines.slice(0, 12).join("\n")

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div
      className="
        relative rounded-2xl border shadow-sm
        bg-zinc-100 dark:bg-[#1e1e1e]
        border-zinc-300 dark:border-white/10
      "
    >
      <button
        onClick={handleCopy}
        className="
          absolute right-2 top-2 z-10
          flex items-center gap-1
          rounded-md px-2 py-1 text-xs
          bg-black/5 hover:bg-black/10
          dark:bg-white/10 dark:hover:bg-white/20
        "
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-green-500" />
            Copied
          </>
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </button>

      <pre
        className="
          mt-8 px-4 py-3
          font-mono text-sm
          whitespace-pre
          overflow-x-auto
        "
      >
        {highlightCode(visibleCode)}
      </pre>

      {isLong && (
        <div className="px-4 pb-3">
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-xs underline opacity-70"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  )
}
