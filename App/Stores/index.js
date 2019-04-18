import { combineReducers } from 'redux'

import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import authReducer from './Auth/Reducers'
import userReducer from './User/Reducers'
import youtubeReducer from './Youtube/Reducers'

const rootReducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
  youtubeState: youtubeReducer
})

const { store, persistor } = configureStore(rootReducer, rootSaga)

export default { store, persistor }
