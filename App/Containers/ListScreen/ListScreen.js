import React from 'react'
import PropTypes from 'prop-types'
import { Image, View, ImageBackground } from 'react-native'
import { Button, Text, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import YoutubeActions from 'App/Stores/Youtube/Actions'
import styles from './ListScreenStyle'

import { connect } from 'react-redux'

class ListScreen extends React.Component {
  static propTypes = {
    fetchPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.fetchPlaylists()
  }

  render() {
    return (
      <View>
        <Text>List screen</Text>

        {
          this.props.playlists.length > 0 && this.props.playlists.map(playlist => (
            <Text key={playlist.id}>{playlist.snippet.title} {playlist.status.privacyStatus}</Text>
          ))
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  playlists: state.youtubeState.playlists
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: () => dispatch(YoutubeActions.fetchPlaylists())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
