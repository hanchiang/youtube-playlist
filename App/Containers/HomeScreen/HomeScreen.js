import React from 'react'
import { Text, View } from 'react-native'
import styles from './HomeScreenStyle'

import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'

class HomeScreen extends React.Component {
  componentDidMount() {
    // this.props.authorize()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text>YOUTUBE PLAYLIST API</Text>
          <Text>{JSON.stringify(this.props.authState, undefined, 2)}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState
})

const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch(AuthActions.authorize())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
