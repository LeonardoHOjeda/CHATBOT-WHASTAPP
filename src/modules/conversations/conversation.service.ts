import { prisma } from '@db/client'

export async function getConversationByClientId (clientId: number) {
  const conversation = await prisma.conversation.findFirst({
    where: {
      clientId
    }
  })

  return conversation
}

export async function createConversation (clientId: number, adminId: number) {
  const conversation = await prisma.conversation.create({
    data: {
      clientId,
      adminId
    }
  })

  return conversation
}
