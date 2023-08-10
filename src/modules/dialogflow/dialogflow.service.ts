import { SessionsClient, protos } from '@google-cloud/dialogflow'
import { settings } from '@config/settings'

const sessionClient = new SessionsClient({
  client_email: settings.GOOGLE.GOOGLE_CLIENT_EMAIL,
  private_key: settings.GOOGLE.GOOGLE_PRIVATE_KEY
})

export async function sendDataToDialogFlow (msg: string, session: string, params: any) {
  const textToDialogFlow = msg
  try {
    const sessionPath = sessionClient.projectAgentSessionPath(
      settings.GOOGLE.GOOGLE_PROJECT_ID,
      session
    )
    const request: protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textToDialogFlow,
          languageCode: settings.GOOGLE.DF_LANGUAGE_CODE
        }
      },
      queryParams: {
        payload: {
          fields: params
        }
      }
    }

    const responses = await sessionClient.detectIntent(request)
    const result = responses[0].queryResult

    if (result == null) {
      console.log('result es null')
      return
    }

    console.log(responses)

    console.log('INTENT EMPAREJADO: ', result.intent!.displayName)

    const defaultResponses: any[] = []
    if (result.action !== 'input.unknown') {
      result.fulfillmentMessages!.forEach((element: any) => {
        defaultResponses.push(element)
      })
    }
    if (defaultResponses.length === 0) {
      result.fulfillmentMessages!.forEach((element: any) => {
        if (element.platform === 'PLATFORM_UNSPECIFIED') {
          defaultResponses.push(element)
        }
      })
    }
    result.fulfillmentMessages = defaultResponses
    console.log(JSON.stringify(result, null, ' '))
    return result
  } catch (error) {
    console.log('Error en sendDataToDialogFlow: ', error)
  }
}
