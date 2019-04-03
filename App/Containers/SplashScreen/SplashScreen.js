import React from 'react'
import { View, Image } from 'react-native'

import styles from './SplashScreenStyle'
import { Images } from '../../Theme'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {/* You will probably want to insert your logo here */}
          <Image source={Images.splashLogo} style={styles.logo} />
        </View>
      </View>
    )
  }
}
