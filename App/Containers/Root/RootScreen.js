import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import HomeScreen from '../HomeScreen/HomeScreen'
import { connect } from 'react-redux'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    HomeScreen: HomeScreen
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'HomeScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none'
  }
)

const App = createAppContainer(AppNav)

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    // this.props.startup()
  }

  render() {
    return (
      <View style={styles.container}>
        <App
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
