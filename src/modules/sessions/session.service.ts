/* eslint-disable @typescript-eslint/no-extraneous-class */
import fs from 'fs'
import { settings } from '@config/settings'
import { sendDataToDialogFlow } from '@modules/dialogflow/dialogflow.service'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { createSender, getSenderByPhone } from '@modules/senders/sender.service'
import { createConversation, getConversationByClientId } from '@modules/conversations/conversation.service'
import { createMessage } from '@modules/messages/message.service'
import { Socket } from '../../socket'

class SessionService {
  private static client: Client

  static startClient (numero: string) {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: `${numero}`,
        dataPath: 'wwebjs_auth'
      }),
      puppeteer: {
        // executablePath: '/usr/bin/google-chrome-stable',
        // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        executablePath: settings.CHROME_PATH,
        headless: settings.ENV !== 'local',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-accelerated-2d-canvas']
      },
      qrMaxRetries: 5
    })

    this.client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr)
    })

    this.client.on('ready', () => {
      console.log('Client is ready!')
    })

    this.client.on('message', async (message) => {
      const contact = await message.getContact()
      const myNumber = message.to.split('@')[0]
      if (contact.isGroup || message.isStatus) return
      const userName = contact.pushname
      console.log('getContact(): ', contact)
      console.log('Message: ', message)

      // DialogFlow
      const payload: any = await sendDataToDialogFlow(message.body, message.from, {})
      const responses = payload.fulfillmentMessages

      const data = {
        phone: contact.number,
        adminPhone: myNumber,
        isFromMe: message.fromMe,
        name: userName,
        message: message.body,
        budget: 0
      }

      await startConversation(data)

      Socket.io.emit(`message-${'5214111181431'}`, data)

      if (message.from === '5214111267600@c.us') {
        for (const response of responses) {
          const originalMessage: string = response.text.text[0]
          const messageToSend = await originalMessage.replace('{nombre}', userName)
          await this.client.sendMessage(message.from, messageToSend)
        }
      }
    })

    this.client.on('message_create', async (message) => {
      if (!message.fromMe) return

      const contact = await message.getContact()
      const myNumber = message.to.split('@')[0]

      const data = {
        phone: myNumber,
        adminPhone: contact.number,
        isFromMe: true,
        name: 'Admin',
        message: message.body,
        budget: 0
      }

      await startConversation(data)

      console.log('Message: ', message)
      console.log('getContact(): ', contact)
    })

    void this.client.initialize()
  }
}

async function startConversation (data: any) {
  // Recibimos el to del mensaje
  const admin = await getSenderByPhone(data.adminPhone)
  console.log('admin: ', admin)
  let sender = await getSenderByPhone(data.phone)

  // Agregamos el numero de telefono a la BD si no existe
  if (sender == null) {
    sender = await createSender({ name: data.name, phone: data.phone, budget: data.budget })
  }
  console.log('sender: ', sender)

  let conversation = await getConversationByClientId(sender.id)

  // Insertarmos una conversacion en la BD si no existe
  if (conversation == null) {
    conversation = await createConversation(sender.id, admin!.id)
  }
  // Insertamos el mensaje recibido en la BD
  await createMessage({ conversationId: conversation.id, isFromMe: data.isFromMe, message: data.message })
  //
}

export function initSession () {
  const files = fs.readdirSync('wwebjs_auth')
  files.forEach((file) => {
    const number = file.split('-')[1]
    SessionService.startClient(number)
  })
}

export default SessionService
