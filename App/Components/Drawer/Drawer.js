import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'

import AuthActions from 'App/Stores/Auth/Actions'
import styles from './Style'

export class Drawer extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h3>Menu</Text>

        <Button
          title="Logout"
          onPress={this.logout}
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(AuthActions.logout())
})

export default connect(null, mapDispatchToProps)(Drawer)
