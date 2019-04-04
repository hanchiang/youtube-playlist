import { StyleSheet } from 'react-native'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import { Metrics, Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%'
  },
  container: {
    ...ApplicationStyles.screen.container,
    paddingVertical: Metrics.medium,
    paddingHorizontal: Metrics.large,
    paddingTop: 2 * Metrics.huge,
    alignItems: 'center'
  },
  heading: {
    textAlign: 'center',
    marginBottom: Metrics.large,
    color: '#eee'
  },
  logo: {
    ...ApplicationStyles.image.logo,
    marginBottom: Metrics.huge
  },
  buttonStyle: {
    ...ApplicationStyles.button.default,
    backgroundColor: Colors.googleRed,
    width: 240
  },
  titleStyle: {
    flex: 4,
    fontSize: Fonts.size.input
  },
  googleIcon: {
    flex: 1
  },
  loadingStyle: {
    ...ApplicationStyles.button.loading
  }
})
