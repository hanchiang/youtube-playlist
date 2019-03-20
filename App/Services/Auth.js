import { authorize } from 'react-native-app-auth'
import { Config } from '../Config'

const config = {
  issuer: Config.GOOGLE_AUTH_URL,
  clientId: Config.CLIENT_ID,
  redirectUrl: Config.REDIRECT_URL,
  scopes: Config.SCOPES
}

function auth() {
  return authorize(config)
}

export default {
  auth
}
