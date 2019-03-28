import { Platform } from 'react-native'
import { put, call } from 'redux-saga/effects'
import AuthActions from '../Stores/Auth/Actions'
import authService from '../Services/Auth'

export function* authorize() {
  yield put(AuthActions.authorizeLoading())

  try {
    const result = yield call(authService.auth)
    console.tron.log(result)
    yield put(AuthActions.authorizeSuccess(result))
  } catch (error) {
    console.log(error)
    console.tron.log(error)
    yield put(
      AuthActions.authorizeFailure(Platform.select({
        android: error.code,
        ios: error.userInfo.NSLocalizedDescription
      }))
    )
  }
}
