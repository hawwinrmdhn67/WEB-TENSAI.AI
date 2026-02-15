// components/chat/icon-btn.tsx

import React from "react"

type IconBtnProps = {
  children: React.ReactNode
  onClick?: () => void
}

export function IconBtn({ children, onClick }: IconBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex h-8 w-8 items-center justify-center
        rounded-full
        transition-none
        text-zinc-600 hover:text-zinc-900
        dark:text-zinc-400 dark:hover:text-zinc-200
      "
    >
      {children}
    </button>
  )
}
