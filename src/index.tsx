import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App/App'
import { store, persistor } from './store/store'
import { disableReactDevTools } from './disableReactDevTools'
import { PersistGate } from 'redux-persist/integration/react'
import '@/assets/css/index.css'
import Loading from './components/Loading/Loading'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
  // eslint-disable-next-line no-console
  console.log = () => {}
}
serviceWorker.unregister()
