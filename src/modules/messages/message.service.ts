import { prisma } from '@db/client'
import { Message } from '@prisma/client'

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

export async function getAllMessages (): Promise<Message[]> {
  const messages = await prisma.message.findMany()
  console.log('Mensaje: ', messages)

  return messages
}

export async function getAllLatestMessages (): Promise<unknown> {
  const messages = await prisma.$queryRaw`
  SELECT DISTINCT ON (id_conversation) *
  FROM messages
  ORDER BY id_conversation, created_at DESC;
`

  return messages
}

export async function getAllMessagesByIdConversation (idConversation: number): Promise<unknown> {
  const messages = await prisma.message.findMany({
    where: {
      conversationId: idConversation
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return messages
}
