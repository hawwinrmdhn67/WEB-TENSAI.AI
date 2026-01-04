// components/chat/markdown/markdown-table.tsx

import { renderInline } from "./inline-render"

export function MarkdownTable({ rows }: { rows: string[] }) {
  const parsed = rows.map(r =>
    r.split("|").slice(1, -1).map(c => c.trim())
  )

  const [head, , ...body] = parsed

  return (
    <div className="overflow-x-auto my-2">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                className="
                  border px-3 py-2 text-left font-semibold
                  bg-zinc-100 dark:bg-zinc-800
                "
              >
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {body.map((row, i) => (
            <tr key={i} className="even:bg-zinc-50 dark:even:bg-white/5">
              {row.map((cell, j) => (
                <td key={j} className="border px-3 py-2 align-top">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
