// components/chat/markdown/text-block.tsx

import type { JSX } from "react"
import { MarkdownTable } from "./markdown-table"
import { renderInline } from "./inline-render"

export function TextBlock({ text }: { text: string }) {
  const lines = text.split("\n")
  const elements: JSX.Element[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (/^\s*\|.+\|\s*$/.test(line)) {
      const tableLines = []
      while (i < lines.length && /^\s*\|.+\|\s*$/.test(lines[i])) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(
        <MarkdownTable key={`table-${i}`} rows={tableLines} />
      )
      continue
    }

    const clean = line.replace(/^#{1,6}\s*/, "").trim()

    if (!clean) {
      elements.push(<div key={i} className="h-2" />)
      i++
      continue
    }

    if (clean === "---") {
      elements.push(
        <div key={i} className="my-1 h-px w-full bg-border" />
      )
      i++
      continue
    }

    if (/^\d+\.\s*/.test(clean)) {
      const [num, rest] = clean.split(/\.\s*/)
      elements.push(
        <div key={i} className="flex gap-2">
          <span>{num}.</span>
          <span>{renderInline(rest)}</span>
        </div>
      )
      i++
      continue
    }

    if (/^[-•*]\s+/.test(clean)) {
      elements.push(
        <div key={i} className="flex gap-2 pl-3">
          <span>•</span>
          <span>{renderInline(clean.replace(/^[-•*]\s*/, ""))}</span>
        </div>
      )
      i++
      continue
    }

    elements.push(<div key={i}>{renderInline(line)}</div>)
    i++
  }

  return <>{elements}</>
}
