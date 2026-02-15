// components/chat/markdown/chat-markdown.tsx

import { CodeBubble } from "./code-bubble"
import { TextBlock } from "./text-block"
import type { ChatMarkdownProps } from "../../types/markdown"

export function ChatMarkdown({ content }: ChatMarkdownProps) {
  const blocks = content.split("```")

  return (
    <div className="space-y-1 text-sm leading-relaxed text-foreground/90">
      {blocks.map((block, i) =>
        i % 2 === 1 ? (
          <CodeBubble key={i} code={block.trim()} />
        ) : (
          <TextBlock key={i} text={block} />
        )
      )}
    </div>
  )
}
