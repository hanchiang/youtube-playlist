import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { Button, Text } from 'react-native-elements'

import AuthActions from 'App/Stores/Auth/Actions'
import YoutubeActions from 'App/Stores/Youtube/Actions'
import styles from './ListScreenStyle'

import { connect } from 'react-redux'

class ListScreen extends React.Component {
  static propTypes = {
    fetchPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchPlaylists()
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>List screen</Text>

        <FlatList
          data={this.props.playlists}
          renderItem={({ item: playlist }) => (
            <Text>{playlist.snippet.title} {playlist.status.privacyStatus}</Text>
          )}
          keyExtractor={item => item.id}
        />

        <Button
          title="Logout"
          onPress={this.logout}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  playlists: state.youtubeState.playlists
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: () => dispatch(YoutubeActions.fetchPlaylists()),
  logout: () => dispatch(AuthActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
