import { AppRegistry } from 'react-native'
import App from 'App/App'

if (__DEV__) {
  import('./App/Config/Reactotron').then(() => console.tron.log('Reactotron Configured'))
}

AppRegistry.registerComponent('youtubeapi', () => App)
