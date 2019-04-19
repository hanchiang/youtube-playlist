import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, ImageBackground } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './LoginScreenStyle'
import { Images, Fonts } from '../../Theme'
import NavigationService from '../../Services/NavigationService'

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'

class HomeScreen extends React.Component {
  static propTypes = {
    authorize: PropTypes.func.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    errorMessage: ''
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      NavigationService.navigateAndReset('ListScreen')
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticating && !this.props.isAuthenticating && this.props.isAuthenticated) {
      NavigationService.navigateAndReset('ListScreen')
    }
  }

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
            loading={this.props.isAuthenticating}
            loadingStyle={styles.loadingStyle}
            disabled={this.props.isAuthenticating}
            disabledStyle={styles.disabledStyle}
          />
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.authState.isAuthenticating,
  isAuthenticated: state.authState.isAuthenticated,
  errorMessage: state.authState.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(AuthActions.authorize())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
