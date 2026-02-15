import { useState, useRef, useLayoutEffect } from "react"

import Sidebar from "@/components/layout/sidebar"
import Footer from "@/components/layout/footer"

import { ChatInput } from "@/components/chat/chat-input"
import { ActionPill } from "@/components/chat/action-pill"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { type SelectedModel } from "@/components/chat/model-select"

import { HomeTopActions } from "@/components/home/home-top-actions"

import { ChatMarkdown } from "@/components/chat/markdown/chat-markdown"
import { softenMarkdown } from "@/components/types/soften-markdown"

import {
  Search,
  FileText,
  PenLine,
  Code2,
  Copy,
  Share2,
  RotateCcw,
  Check,
} from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
  model: "llama-3.3-70b-versatile",
})

  const bottomRef = useRef<HTMLDivElement>(null)
  const shouldSmoothScroll = useRef(false)
  const lastPromptRef = useRef("")

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: shouldSmoothScroll.current ? "smooth" : "auto",
    })
    shouldSmoothScroll.current = false
  }, [messages, typing, streaming])

  const streamMessage = async (
    fullText: string,
    chunkSize = 28,
    delay = 32
  ) => {
    let index = 0
    let firstChunk = true

    while (index < fullText.length) {
      const chunk = fullText.slice(index, index + chunkSize)
      index += chunkSize

      if (firstChunk) {
        setTyping(false)
        firstChunk = false
      }

      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            (updated[updated.length - 1]?.content || "") + chunk,
        }
        return updated
      })

      await new Promise(r => setTimeout(r, delay))
    }
  }

  const handleSend = async (retryText?: string) => {
    const text = retryText ?? message
    if (!text.trim() || typing || streaming) return

    lastPromptRef.current = text
    shouldSmoothScroll.current = true

    setMessages(p => [...p, { role: "user", content: text }])
    setMessage("")
    setTyping(true)
    setStreaming(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          model: selectedModel.model,
        }),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()
      const reply =
        data?.reply?.trim() || "⚠️ Tidak ada balasan dari AI"

      setMessages(p => [...p, { role: "assistant", content: "" }])

      const isCode = reply.includes("```")

      await streamMessage(
        reply,
        isCode ? 48 : 28,
        isCode ? 12 : 32
      )
    } catch (err) {
      console.error(err)
      setMessages(p => [
        ...p,
        {
          role: "assistant",
          content: "❌ Gagal terhubung ke server",
        },
      ])
    } finally {
      setTyping(false)
      setStreaming(false)
    }
  }

  const isChat = messages.length > 0

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {sidebarExpanded && (
        <div
          onClick={() => setSidebarExpanded(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(v => !v)}
      />

      <HomeTopActions
        sidebarOpen={sidebarExpanded}
        onMenuClick={() => setSidebarExpanded(true)}
      />

      <div
        data-expanded={sidebarExpanded}
        className="flex min-h-screen flex-col md:pl-14 md:data-[expanded=true]:pl-72"
      >
        {!isChat ? (
          <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-8 text-5xl font-semibold">Tensai</h1>

            <div className="w-full max-w-2xl space-y-3">
              <ChatInput
                value={message}
                onChange={setMessage}
                onSend={handleSend}
                disabled={typing || streaming}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ActionPill label="Research" icon={Search} />
              <ActionPill label="Summarize" icon={FileText} />
              <ActionPill label="Write" icon={PenLine} />
              <ActionPill label="Code" icon={Code2} />
            </div>

            <Footer />
          </main>
        ) : (
          <>
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-2xl px-4 py-6 space-y-6">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {m.role === "user" ? (
                      <div className="mt-10 max-w-[80%] rounded-2xl bg-zinc-200 dark:bg-[#2a2a2a] px-4 py-2 text-sm whitespace-pre-wrap break-words">
                        {m.content}
                      </div>
                    ) : (
                      <div className="w-full space-y-1">
                        <ChatMarkdown content={softenMarkdown(m.content)} />

                        {!streaming && i === messages.length - 1 && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(m.content)
                                setCopiedIndex(i)
                                setTimeout(() => setCopiedIndex(null), 1500)
                              }}
                              className="rounded-md p-1.5 hover:bg-muted"
                            >
                              {copiedIndex === i ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                navigator.share?.({ text: m.content })
                              }
                              className="rounded-md p-1.5 hover:bg-muted"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() =>
                                handleSend(lastPromptRef.current)
                              }
                              className="rounded-md p-1.5 hover:bg-muted"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>
            </main>

            <div className="sticky bottom-0 z-20 bg-background">
              <div className="mx-auto w-full max-w-2xl px-4 pb-6 pt-2 space-y-3">
                <ChatInput
                  value={message}
                  onChange={setMessage}
                  onSend={handleSend}
                  disabled={typing || streaming}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
