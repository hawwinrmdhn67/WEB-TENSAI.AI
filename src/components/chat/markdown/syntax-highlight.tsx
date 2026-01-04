// components/chat/markdown/syntax-highlight.tsx

export function highlightCode(code: string) {
  const KEYWORDS =
    /\b(function|return|const|let|var|if|else|for|while|import|from|export|type)\b/

  return code.split("\n").map((line, i) => {
    const parts = line.split(
      /(\/\/.*|"[^"]*"|'[^']*'|\b\d+\b|\b(function|return|const|let|var|if|else|for|while|import|from|export|type)\b)/
    )

    return (
      <div key={i} className="whitespace-pre">
        {parts.map((token, j) => {
          if (!token) return null

          if (token.startsWith("//"))
            return <span key={j} className="text-green-500">{token}</span>

          if (/^['"]/.test(token))
            return <span key={j} className="text-amber-500">{token}</span>

          if (/^\d+$/.test(token))
            return <span key={j} className="text-sky-500">{token}</span>

          if (KEYWORDS.test(token))
            return <span key={j} className="text-purple-500">{token}</span>

          return <span key={j}>{token}</span>
        })}
      </div>
    )
  })
}
