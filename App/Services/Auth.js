import { authorize, refresh } from 'react-native-app-auth'
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

/**
 * Returns accessToken, accessTokenExpirationDate, additionalParameters, idToken, refreshToken(sometimes null), tokenType
 * @param {string} refreshToken
 */
async function refreshAccesstoken(refreshToken) {
  return refresh(config, { refreshToken })
}

export default {
  auth, refreshAccesstoken
}
