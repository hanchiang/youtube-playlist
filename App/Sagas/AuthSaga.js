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
    console.tron.log(error)
    yield put(
      AuthActions.authorizeFailure(error.code)
    )
  }
}
