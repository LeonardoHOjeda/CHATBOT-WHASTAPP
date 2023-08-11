/* eslint-disable @typescript-eslint/no-extraneous-class */
import fs from 'fs'
import { settings } from '@config/settings'
import { sendDataToDialogFlow } from '@modules/dialogflow/dialogflow.service'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { createSender } from '@modules/senders/sender.service'

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
      if (contact.isGroup || message.isStatus) return
      const userName = contact.pushname
      console.log('Message 1: ', contact)
      // console.log('Message: ', message)

      const payload: any = await sendDataToDialogFlow(message.body, message.from, {})
      // console.log('Payload: ', payload)

      const responses = payload.fulfillmentMessages
      // console.log('Responses: ', responses)
      const data = {
        name: userName,
        telephone: contact.number,
        budget: 0
      }
      await createSender(data)

      if (message.from === '5214111267600@c.us') {
        for (const response of responses) {
          const originalMessage: string = response.text.text[0]
          const messageToSend = await originalMessage.replace('{nombre}', userName)
          await this.client.sendMessage(message.from, messageToSend)
        }
      }
    })

    void this.client.initialize()
  }
}

export function initSession () {
  const files = fs.readdirSync('wwebjs_auth')
  files.forEach((file) => {
    const number = file.split('-')[1]
    SessionService.startClient(number)
  })
}

export default SessionService
