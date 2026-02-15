import {
  useEffect,
  useRef,
  forwardRef,
} from "react"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Mic,
  Headphones,
  Send,
} from "lucide-react"

import type { ChatInputProps } from "../types/chat"
import { IconBtn } from "./icon-btn"
import { ModelSelect } from "./model-select"

export const ChatInput = forwardRef<
  HTMLTextAreaElement,
  ChatInputProps
>(function ChatInput(
  {
    value,
    onChange,
    onSend,
    onAttach,
    disabled,
    selectedModel,
    onModelChange,
  },
  ref
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value === "" && textareaRef.current) {
      textareaRef.current.style.height = "0px"
    }
  }, [value])

  return (
    <div className="rounded-2xl border shadow-md bg-white border-zinc-200 dark:bg-[#1f1f1f] dark:border-white/10">
      {/* FILE INPUT */}
      <input
        ref={fileRef}
        type="file"
        hidden
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file && onAttach) onAttach(file)
          e.target.value = ""
        }}
      />

      {/* TEXTAREA */}
      <Textarea
        ref={el => {
          textareaRef.current = el
          if (typeof ref === "function") ref(el)
          else if (ref) ref.current = el
        }}
        value={value}
        rows={1}
        disabled={disabled}
        placeholder="Ask anything..."
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            if (!value.trim()) return
            e.preventDefault()
            if (!disabled) onSend()
          }
        }}
        onChange={e => {
          const el = e.target
          onChange(el.value)
          el.style.height = "0px"
          el.style.height =
            Math.min(el.scrollHeight, 160) + "px"
        }}
          className="
          gpt-scrollbar
          max-h-[160px]
          resize-none
          overflow-y-auto
          bg-transparent
          border-none
          outline-none
          ring-0
          focus:outline-none
          focus:ring-0
          focus-visible:ring-0
          px-4 pt-5 pb-3
          text-sm
        "
      />

      {/* FOOTER */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-300 dark:border-white/20">
        <ModelSelect
          value={selectedModel}
          onChange={onModelChange}
        />

        <div className="flex items-center gap-1">
          <IconBtn onClick={() => fileRef.current?.click()}>
            <Plus className="h-4 w-4" />
          </IconBtn>
          <IconBtn>
            <Mic className="h-4 w-4" />
          </IconBtn>
          <IconBtn>
            <Headphones className="h-4 w-4" />
          </IconBtn>

          {value.trim() && (
            <button
              onClick={onSend}
              disabled={disabled}
              className="ml-1 flex h-8 w-8 items-center justify-center rounded-full active:scale-95 bg-zinc-900 text-white dark:bg-white dark:text-black"
            >
              <Send className="h-4 w-4 -translate-x-[1.5px] translate-y-[1px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
})
