import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import Footer from "@/components/layout/footer"
import { ChatInput } from "@/components/chat/chat-input"
import { ActionPill } from "@/components/chat/action-pill"
import { HomeTopActions } from "@/components/home/home-top-actions"
import { Search, FileText, PenLine, Code2 } from "lucide-react"

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {sidebarExpanded && (
        <div
          onClick={() => setSidebarExpanded(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(v => !v)}
      />

      {/* TOP BAR */}
      <HomeTopActions
        onMenuClick={() => setSidebarExpanded(true)}
        sidebarOpen={sidebarExpanded}
      />

      {/* CONTENT */}
      <div
        data-expanded={sidebarExpanded}
        className="
          flex min-h-screen flex-col
          md:pl-14
          md:data-[expanded=true]:pl-72
          transition-[padding] duration-200 ease-out
        "
      >
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          {/* TITLE */}
          <h1 className="mb-8 text-4xl md:text-5xl font-semibold tracking-tight">
            Tensai
          </h1>

          {/* CHAT INPUT */}
          <div className="w-full max-w-2xl">
            <ChatInput
              value={message}
              onChange={setMessage}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ActionPill label="Research" icon={Search} />
            <ActionPill label="Summarize" icon={FileText} />
            <ActionPill label="Write" icon={PenLine} />
            <ActionPill label="Code" icon={Code2} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
