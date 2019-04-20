import { StyleSheet } from 'react-native'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import { Metrics } from '../../Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    paddingVertical: Metrics.large,
    paddingHorizontal: Metrics.large,
    backgroundColor: 'white'
  }
})
