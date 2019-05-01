import React from 'react'
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Icon, Text } from 'react-native-elements'

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import LoginScreen from 'App/Containers/LoginScreen/LoginScreen'
import PlaylistScreen from 'App/Containers/PlaylistScreen/PlaylistScreen'

import Drawer from 'App/Components/Drawer/Drawer'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */

const MainStack = createStackNavigator(
  {
    PlaylistScreen: {
      screen: PlaylistScreen
    }
  },
  {
    initialRouteName: 'PlaylistScreen',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <Icon
        type="font-awesome"
        name="bars"
        color="#000"
        onPress={() => navigation.toggleDrawer()}
        size={30}
      />,
      headerLeftContainerStyle: {
        paddingHorizontal: 15
      }
    })
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    MainStack
  },
  {
    drawerBackgroundColor: 'black',
    contentOptions: {
      activeTintColor: '#999'
    },
    contentComponent: Drawer,
    initialRouteName: 'MainStack'
  }
)

const AppNavigator = createStackNavigator(
  {
    SplashScreen,
    LoginScreen,
    Main: DrawerNavigator
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)
