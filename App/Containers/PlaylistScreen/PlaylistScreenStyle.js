import { StyleSheet } from 'react-native'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import { Metrics, Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    paddingVertical: Metrics.medium,
    paddingHorizontal: Metrics.large
  },
  pagination: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paginationButton: {
    paddingHorizontal: 20
  },
  centerText: {
    textAlign: 'center'
  }
})
