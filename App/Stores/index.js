import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import exampleReducer from './Example/Reducers'
import authReducer from './Auth/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: exampleReducer,
    authState: authReducer
  })

  return configureStore(rootReducer, rootSaga)
}
