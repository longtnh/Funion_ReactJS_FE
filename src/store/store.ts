import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBlacklistFilter } from 'redux-persist-transform-filter'

const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV === 'development' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

const saveSubsetBlacklistFilter = createBlacklistFilter('app', ['notifications'])

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'streamManager'],
  transforms: [saveSubsetBlacklistFilter],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)
