import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import Reactotron from '../Config/Reactotron'
import rootSaga from 'App/Sagas'
import authReducer from './Auth/Reducers'
import userReducer from './User/Reducers'
import youtubeReducer from './Youtube/Reducers'

const persistConfig = {
  key: 'root',
  storage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
    'authState'
  ],
  whitelist: [
    // only these will be persisted
    'authState', 'userState'
  ]
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth', 'isAuthenticated'],
  blacklist: ['isAuthenticating', 'isRefreshingToken', 'errorMessage']
}

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  authState: persistReducer(authPersistConfig, authReducer),
  userState: persistReducer(userPersistConfig, userReducer),
  youtubeState: youtubeReducer
})

const middleware = []
const enhancers = []

const sagaMonitor = Reactotron.createSagaMonitor()
// Connect the sagas to the redux store
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

middleware.push(sagaMiddleware)

enhancers.push(applyMiddleware(...middleware))
enhancers.push(Reactotron.createEnhancer())

// Redux persist
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(...enhancers))
const persistor = persistStore(store)

// persistor.purge()

// Kick off the root saga
sagaMiddleware.run(rootSaga)

export default { store, persistor }
