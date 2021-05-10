import { ChatMessageType } from './enums'

interface ChatMessage {
  isHost: boolean
  type: ChatMessageType
  userName: string
  content: string
  amount?: number
}
