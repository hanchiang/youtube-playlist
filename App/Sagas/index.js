import { takeLatest, all } from 'redux-saga/effects'
import { AuthTypes } from '../Stores/Auth/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { authorize, refreshAccessToken } from './AuthSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AuthTypes.AUTHORIZE, authorize),
    takeLatest(AuthTypes.REFRESH_ACCESS_TOKEN, refreshAccessToken)
  ])
}
