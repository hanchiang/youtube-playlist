import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { AuthTypes } from '../Stores/Auth/Actions'
import { fetchUser } from './ExampleSaga'
import { startup } from './StartupSaga'
import { authorize } from './AuthSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(AuthTypes.AUTHORIZE, authorize)
  ])
}
