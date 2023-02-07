import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  env: {
    GOOGLE_CLOUD_API_URL: process.env.GOOGLE_CLOUD_API_URL,
    GOOGLE_CLOUD_API_KEY: process.env.GOOGLE_CLOUD_API_KEY,
  },
}

export { config }
