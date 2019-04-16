import React from 'react'
import { Image, View, ImageBackground } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './ListScreenStyle'

import { connect } from 'react-redux'

class ListScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>List screen</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
