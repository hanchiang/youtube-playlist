import { AppRegistry } from 'react-native'
import App from 'App/App'
import { name as appName } from './app.json'

if (__DEV__) {
  import('./App/Config/Reactotron').then(() => console.tron.log('Reactotron Configured'))
}

AppRegistry.registerComponent(appName, () => App)
