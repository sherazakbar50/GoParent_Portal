export class ChatMessageDto {
  _id: string
  text: string
  createdAt: Date
  user: ChatUserDto
  attachmentType: string
  attachmentUrl: string
  attachmentName: string
  send: boolean
}

export class ChatUserDto {
  _id: number
  name: string
  avatar: string
}
