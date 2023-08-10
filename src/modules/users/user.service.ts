import { HTTPError } from '@middlewares/error_handler'
import { Sender } from '@prisma/client'
import { prisma } from 'db/client'

export async function getAllSenders () {
  const senders = await prisma.sender.findMany()

  return senders
}

export async function getSenderById (id: number) {
  const sender = await prisma.sender.findUnique({
    where: {
      id
    }
  })

  if (sender == null) {
    throw new HTTPError(404, 'Sender not found')
  }

  return sender
}

export async function createSender (data: Sender) {
  const sender = await prisma.sender.create({
    data: {
      ...data
    }
  })

  return sender
}

export async function updateSender (id: number, data: Sender) {
  const sender = await prisma.sender.update({
    where: {
      id
    },
    data: {
      ...data
    }
  })

  return sender
}

// Elimina de manera logica el sender
export async function deleteSender (id: number) {
  const sender = await prisma.sender.update({
    where: {
      id
    },
    data: {
      deleted: true
    }
  })

  return sender
}
