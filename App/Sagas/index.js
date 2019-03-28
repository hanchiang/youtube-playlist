import { takeLatest, all } from 'redux-saga/effects'
import { AuthTypes } from '../Stores/Auth/Actions'
import { authorize } from './AuthSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(AuthTypes.AUTHORIZE, authorize)
  ])
}
