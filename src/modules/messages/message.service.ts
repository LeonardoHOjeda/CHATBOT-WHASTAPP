import { prisma } from '@db/client'

interface CreateMessageData {
  conversationId: number
  message: string
  isFromMe: boolean
}

export async function createMessage (data: CreateMessageData) {
  const conversationId = data.conversationId
  const isFromMe = data.isFromMe
  const message = await prisma.message.create({
    data: {
      conversationId,
      message: data.message,
      isFromMe
    }
  })

  return message
}
