import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import Reactotron from '../Config/Reactotron'

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
    // 'auth',
  ],
  whitelist: [
    // 'authState' // only authState will be persisted
  ]
}

export default (rootReducer, rootSaga) => {
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

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
