import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, ImageBackground } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './HomeScreenStyle'
import { Images, Fonts } from '../../Theme'

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'

class HomeScreen extends React.Component {
  static propTypes = {
    authorize: PropTypes.func.isRequired,
    refreshAccessToken: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    refreshToken: PropTypes.string
  }

  static defaultProps = {
    refreshToken: null,
    errorMessage: null
  }

  onClickGoogle = () => {
    this.props.authorize()
  }

  refreshAccessToken = () => {
    this.props.refreshAccessToken(this.props.refreshToken)
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
          <Text h2 style={styles.heading}>Youtube playlist manager</Text>
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

          <Button
            title="refresh access token"
            onPress={this.refreshAccessToken}
          />
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => ({
  refreshToken: state.authState.auth && state.authState.auth.refreshToken,
  isLoading: state.authState.isLoading,
  isAuthenticated: state.authState.isAuthenticated,
  errorMessage: state.authState.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(AuthActions.authorize()),
  refreshAccessToken: refreshToken => dispatch(AuthActions.refreshAccessToken(refreshToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
