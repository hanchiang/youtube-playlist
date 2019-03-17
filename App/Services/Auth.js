import { authorize } from 'react-native-app-auth'
import { Config } from '../Config'

const config = {
  issuer: Config.GOOGLE_AUTH_URL,
  clientId: Config.ANDROID_CLIENT_ID,
  redirectUrl: Config.redirectUrl,
  scopes: Config.scopes
}

function auth() {
  return authorize(config)
}

export default {
  auth
}
