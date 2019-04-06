import { put, call } from 'redux-saga/effects'
import AuthActions from '../Stores/Auth/Actions'
import authService from '../Services/Auth'
import { Config } from '../Config'

/**
 * Authenticate user, verify id token and save tokens and user info
 */
export function* authorize() {
  try {
    const result = yield call(authService.auth)
    const { data: decodedIdToken } = yield call(authService.validateIdToken, result.idToken)

    if (decodedIdToken.aud === Config.CLIENT_ID) {
      yield put(AuthActions.authorizeSuccess(result))
      // Save user info in user reducer
    } else {
      yield put(AuthActions.authorizeFailure('aud claim in id token does not matchh app\'s client id'))
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
    const refreshed = yield call(authService.refreshAccesstoken, action.refreshToken)
    const { data: decodedIdToken } = yield call(authService.validateIdToken, refreshed.idToken)

    if (decodedIdToken.aud === Config.CLIENT_ID) {
      yield put(AuthActions.refreshAccessTokenSuccess(refreshed))
    } else {
      yield put(AuthActions.refreshAccessTokenFailure('aud claim in id token does not match app\'s client id'))
    }
  } catch (error) {
    yield put(AuthActions.refreshAccessTokenFailure(error.message))
  }
}
