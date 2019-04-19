import { put, call, select } from 'redux-saga/effects'

import AuthActions from '../Stores/Auth/Actions'
import UserActions from '../Stores/User/Actions'
import { authService } from '../Services/AuthService'
import NavigationService from 'App/Services/NavigationService'
import { Config } from '../Config'

const getAccessToken = state => state.authState.auth.accessToken

/**
 * Authenticate user, verify id token and save tokens and user info
 */
export function* authorize() {
  try {
    const tokens = yield call(authService.auth)

    // verify id token
    const result = yield call(authService.validateIdToken, tokens.idToken)

    if (result.ok) {
      const decodedIdToken = result.data

      if (decodedIdToken.aud === Config.CLIENT_ID) {
        // Save user info in user reducer
        yield put(UserActions.setUser({
          id: decodedIdToken.sub,
          email: decodedIdToken.email,
          emailVerified: decodedIdToken.email_verified === 'true',
          name: decodedIdToken.name,
          givenName: decodedIdToken.given_name,
          familyName: decodedIdToken.family_name,
          picture: decodedIdToken.picture,
          locale: decodedIdToken.locale
        }))

        yield put(AuthActions.authorizeSuccess(tokens))
      } else {
        yield put(AuthActions.authorizeFailure('aud claim in id token does not matchh app\'s client id'))
      }
    } else {
      yield put(AuthActions.authorizeFailure(result.data))
    }
  } catch (error) {
    yield put(
      AuthActions.authorizeFailure(error.message || error.code)
    )
  }
}

/**
 * Refresh tokens and verify id token
 * https://developers.google.com/identity/sign-in/android/backend-auth#calling-the-tokeninfo-endpoint
 */
export function* refreshAccessToken(action) {
  try {
    // refresh tokens
    const refreshed = yield call(authService.refreshAccessToken, action.refreshToken)
    // verify id token
    const result = yield call(authService.validateIdToken, refreshed.idToken)

    if (result.ok) {
      const decodedIdToken = result.data

      if (decodedIdToken.aud === Config.CLIENT_ID) {
        yield put(AuthActions.refreshAccessTokenSuccess(refreshed))
      } else {
        yield put(AuthActions.refreshAccessTokenFailure('aud claim in id token does not match app\'s client id'))
      }
    } else {
      yield put(AuthActions.refreshAccessTokenFailure(result.data))
    }
  } catch (error) {
    yield put(AuthActions.refreshAccessTokenFailure(error.message || error.code))
  }
}

export function* logout(action) {
  try {
    const accessToken = yield select(getAccessToken)
    const result = yield call(authService.revokeToken, accessToken)
  } catch (error) {
    console.log(error)
  } finally {
    NavigationService.navigateAndReset('LoginScreen')
  }
}
