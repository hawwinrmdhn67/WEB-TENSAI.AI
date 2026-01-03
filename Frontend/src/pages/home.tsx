import { useState, useRef, useLayoutEffect } from "react"
import Sidebar from "@/components/layout/sidebar"
import Footer from "@/components/layout/footer"
import { ChatInput } from "@/components/chat/chat-input"
import { ActionPill } from "@/components/chat/action-pill"
import { HomeTopActions } from "@/components/home/home-top-actions"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { Search, FileText, PenLine, Code2 } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const shouldSmoothScroll = useRef(false)

  /* ===== SCROLL (ANTI LAG) ===== */
  useLayoutEffect(() => {
    if (!bottomRef.current) return

    bottomRef.current.scrollIntoView({
      behavior: shouldSmoothScroll.current ? "smooth" : "auto",
    })

    shouldSmoothScroll.current = false
  }, [messages, typing])

  /* ===== SEND ===== */
  const handleSend = () => {
    if (!message.trim()) return

    shouldSmoothScroll.current = true

    setMessages(p => [...p, { role: "user", content: message }])
    setMessage("")
    setTyping(true)

    setTimeout(() => {
      shouldSmoothScroll.current = true

      setMessages(p => [
        ...p,
        { role: "assistant", content: "Ini jawaban dari Tensai AI 🤖" },
      ])
      setTyping(false)
    }, 1200)
  }

  const isChat = messages.length > 0

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* OVERLAY MOBILE */}
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
        onMenuClick={() => setSidebarExpanded(true)}
        sidebarOpen={sidebarExpanded}
      />

      {/* ===== MAIN LAYOUT ===== */}
      <div
        data-expanded={sidebarExpanded}
        className="
          flex min-h-screen flex-col
          md:pl-14 md:data-[expanded=true]:pl-72
          transition-none md:transition-[padding] md:duration-200
        "
      >
        {!isChat ? (
          /* ===== LANDING ===== */
          <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-8 text-5xl font-semibold">Tensai</h1>

            <div className="w-full max-w-2xl">
              <ChatInput
                value={message}
                onChange={setMessage}
                onSend={handleSend}
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
          /* ===== CHAT ===== */
          <>
            {/* CHAT SCROLL */}
            <main className="flex-1 overflow-y-auto overscroll-contain">
              <div className="mx-auto w-full max-w-2xl px-4 py-6 space-y-6">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "user" ? (
                    <div
                      className="
                        mt-15
                        max-w-[80%]
                        rounded-2xl

                        /* 🌞 LIGHT MODE — sama kaya bubble 'Light' */
                        bg-zinc-200
                        text-zinc-900
                        border border-zinc-300
                        shadow-sm

                        /* 🌙 DARK MODE */
                        dark:bg-[#2a2a2a]
                        dark:text-zinc-100
                        dark:border-white/10
                        dark:shadow-none

                        px-4 py-2
                        text-sm

                        whitespace-pre-wrap
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >
                      {m.content}
                    </div>
                  ) : (
                    <div
                      className="
                        max-w-[80%]
                        text-sm
                        leading-7
                        text-foreground/90

                        whitespace-pre-wrap
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >
                      {m.content}
                    </div>
                  )}

                  </div>
                ))}

                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>
            </main>

            {/* INPUT — STICKY */}
            <div className="sticky bottom-0 z-20 bg-background">
              <div className="mx-auto w-full max-w-2xl px-4 pb-6 pt-2">
                <ChatInput
                  value={message}
                  onChange={setMessage}
                  onSend={handleSend}
                  disabled={typing}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
