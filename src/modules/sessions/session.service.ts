/* eslint-disable @typescript-eslint/no-extraneous-class */
import { settings } from '@config/settings'
import { sendDataToDialogFlow } from '@modules/dialogflow/dialogflow.service'
import { Client, LocalAuth } from 'whatsapp-web.js'

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
      const payload: any = await sendDataToDialogFlow(message.body, message.from, {})
      console.log('Payload: ', payload)

      const responses = payload.fulfillmentMessages
      console.log('Responses: ', responses)

      if (message.from === '5214613371815@c.us') {
        for (const response of responses) {
          await this.client.sendMessage(message.from, response.text.text[0])
        }
      }
    })

    void this.client.initialize()
  }
}

export default SessionService
