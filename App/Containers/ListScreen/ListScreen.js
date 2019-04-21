import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { Text } from 'react-native-elements'
import dateFns from 'date-fns'

import ListItem from 'App/Components/ListItem/ListItem'
import YoutubeActions from 'App/Stores/Youtube/Actions'
import styles from './ListScreenStyle'

import { connect } from 'react-redux'

class ListScreen extends React.Component {
  static propTypes = {
    fetchPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.array.isRequired,
    totalResults: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.props.fetchPlaylists()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Displaying {this.props.playlists.length} out of {this.props.totalResults} results</Text>

        <FlatList
          data={this.props.playlists}
          renderItem={({ item: playlist }) => (
            <ListItem
              title={playlist.snippet.localized.title}
              subtitle={playlist.snippet.localized.description}
              rightTitle={dateFns.format(playlist.snippet.publishedAt, 'ddd DD MMM YYYY')}
              rightSubtitle={playlist.status.privacyStatus}
              leftAvatar={{
                source: { uri: playlist.snippet.thumbnails.high.url }
              }}
              badge={{
                value: playlist.contentDetails.itemCount > 99 ? `${playlist.contentDetails.itemCount}+` : playlist.contentDetails.itemCount
              }}
            />
          )}
          keyExtractor={item => item.id}
          
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  playlists: state.youtubeState.playlists,
  totalResults: state.youtubeState.totalResults
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: () => dispatch(YoutubeActions.fetchPlaylists())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
