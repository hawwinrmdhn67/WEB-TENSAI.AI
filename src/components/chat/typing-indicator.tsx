export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="
          max-w-fit
          rounded-2xl
          bg-muted
          px-3 py-2
          text-xs
          text-muted-foreground
          shadow-sm
        "
      >
        <span className="font-medium text-foreground/80">
          Tensai
        </span>
        <span className="ml-1 text-muted-foreground">
          is typing
        </span>

        <span className="ml-1 inline-flex gap-0.5">
          <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground" />
        </span>
      </div>
    </div>
  )
}
