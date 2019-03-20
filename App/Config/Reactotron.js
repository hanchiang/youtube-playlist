import Reactotron, {
  openInEditor, asyncStorage, networking
} from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import apisaucePlugin from 'reactotron-apisauce'

Reactotron.clear()

// horrible, but useful hack.... oh come on, don't look at me like that... it's JavaScript :|
console.tron = Reactotron

const reactotron = Reactotron
  .configure({ name: 'React native youtube playlist' }) // controls connection & communication settings
  .use(openInEditor())
  .use(asyncStorage())
  .use(networking())
  .use(apisaucePlugin({
    ignoreContentTypes: /^(image)\/.*$/i
  }))
  .use(reactotronRedux())
  .use(sagaPlugin())
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

export default reactotron
