if (__DEV__) {
  import('./App/Config/Reactotron').then(() => console.tron.log('Reactotron Configured'))
}

import { AppRegistry } from 'react-native'
import App from 'App/App'

AppRegistry.registerComponent('youtubeapi', () => App)
