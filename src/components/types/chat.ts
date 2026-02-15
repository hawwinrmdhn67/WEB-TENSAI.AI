import type { SelectedModel } from "@/components/chat/model-select"

export type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onAttach?: (file: File) => void
  disabled?: boolean

  selectedModel: SelectedModel
  onModelChange: (value: SelectedModel) => void
}
