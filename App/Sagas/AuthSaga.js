import { put, call } from 'redux-saga/effects'
import AuthActions from '../Stores/Auth/Actions'
import authService from '../Services/Auth'

export function* authorize() {
  try {
    const result = yield call(authService.auth)
    yield put(AuthActions.authorizeSuccess(result))
  } catch (error) {
    yield put(
      AuthActions.authorizeFailure(error.message || error.code)
    )
  }
}

export function* refreshAccessToken(action) {
  try {
    // TODO: verify id token
    const result = yield call(authService.refreshAccesstoken, action.refreshToken)
    yield put(AuthActions.refreshAccessTokenSuccess(result))
  } catch (error) {
    yield put(AuthActions.refreshAccessTokenFailure(error.message))
  }
}
