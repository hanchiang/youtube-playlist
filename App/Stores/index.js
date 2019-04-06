import { combineReducers } from 'redux'

import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import authReducer from './Auth/Reducers'
import userReducer from './User/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    authState: authReducer,
    userState: userReducer
  })

  return configureStore(rootReducer, rootSaga)
}
