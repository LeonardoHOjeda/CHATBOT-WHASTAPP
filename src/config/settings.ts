/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import dotenv from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'

let env: any = dotenv.config()
if (env.error) console.log(env.error)
env = dotenvParseVariables(env.parsed!)

export const settings = {
  ENV: env.ENV ?? 'develop',
  PORT: env.PORT ?? 3000,
  SECRET: env.SECRET ?? 'somesecrettoken',
  GOOGLE: {
    GOOGLE_CLIENT_EMAIL: env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: env.GOOGLE_PRIVATE_KEY,
    GOOGLE_PROJECT_ID: env.GOOGLE_PROJECT_ID,
    DF_LANGUAGE_CODE: env.DF_LANGUAGE_CODE
  },
  CHROME_PATH: env.CHROME_PATH,
  DB: {
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
    NAME: env.DB_NAME
  },
  MAILER: {
    HOST: env.MAIL_HOST,
    PORT: env.MAIL_PORT,
    USERNAME: env.MAIL_USERNAME,
    PASSWORD: env.MAIL_PASSWORD,
    FROM_ADDRESS: env.MAIL_FROM_ADDRESS,
    FROM_NAME: env.MAIL_FROM_NAME
  }
}
