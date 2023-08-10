import { Prisma } from '@prisma/client'

export type Sender = Prisma.SenderGetPayload<{
  include: {
    Messages: true
  }
}>
