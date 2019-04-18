import { create } from 'apisauce'
import { authorize, refresh } from 'react-native-app-auth'
import Reactotron from 'reactotron-react-native'

import { Config } from '../Config'

const config = {
  issuer: Config.GOOGLE_AUTH_URL,
  clientId: Config.CLIENT_ID,
  redirectUrl: Config.REDIRECT_URL,
  scopes: Config.SCOPES
}

/**
 * Auth functions from react-native-app-auth
 */

function auth() {
  return authorize(config)
}

/**
 * Returns accessToken, accessTokenExpirationDate, additionalParameters, idToken, refreshToken(sometimes null), tokenType
 * @param {string} refreshToken
 */
function refreshAccessToken(refreshToken) {
  return refresh(config, { refreshToken })
}

/**
 * Google oauth endpoints
 */

const api = create({
  baseURL: 'https://oauth2.googleapis.com'
})

api.addMonitor(Reactotron.apisauce)

const validateIdToken = idToken => api.get(`/tokeninfo?id_token=${idToken}`)

export const authService = {
  auth, refreshAccessToken, validateIdToken
}
