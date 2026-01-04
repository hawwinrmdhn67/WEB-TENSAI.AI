export type ChatInputProps = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onAttach?: (file: File) => void
  disabled?: boolean
}
