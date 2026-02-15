export function softenMarkdown(text: string) {
  return text
    .replace(/(^|\n|\r)\s*#{1,6}\s*/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\t/g, " ")
    .trim()
}