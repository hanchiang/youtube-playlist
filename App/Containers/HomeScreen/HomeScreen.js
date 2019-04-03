import React from 'react'
import { Image, View, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './HomeScreenStyle'
import { Images, Fonts } from '../../Theme'

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'

class HomeScreen extends React.Component {
  onClickGoogle = () => {
    this.props.authorize()
  }

  render() {
    return (
      <ImageBackground
        source={Images.homescreenBG}
        style={styles.bg}
        resizeMode="cover"
        blurRadius={5}
      >
        <View style={styles.container}>
          <Image
            source={Images.splashLogo}
            style={styles.logo}
          />

          <Button
            title="Sign in with Google"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            icon={
              <Icon
                name="google"
                size={Fonts.icon.medium}
                color="white"
                style={styles.googleIcon}
              />
            }
            onPress={this.onClickGoogle}
            loading={this.props.isLoading}
            loadingStyle={styles.loadingStyle}
          />
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState,
  isLoading: state.authState.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(AuthActions.authorize())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
