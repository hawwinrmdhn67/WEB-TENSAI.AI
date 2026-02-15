// components/chat/markdown/inline-render.tsx

export function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g)

  return parts.map((p, i) =>
    p.startsWith("`") && p.endsWith("`") ? (
      <code
        key={i}
        className="
          rounded bg-zinc-200 px-1 py-0.5 text-[13px]
          text-zinc-900
          dark:bg-[#2a2a2a] dark:text-zinc-100
        "
      >
        {p.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>
        {p.replace(/\*/g, "").replace(/\s{2,}/g, " ")}
      </span>
    )
  )
}
