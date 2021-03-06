import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { Text, Button } from 'react-native-elements'
import dateFns from 'date-fns'

import { getVisiblePlaylists } from 'App/Stores/Playlist/Selectors'
import ListItem from 'App/Components/ListItem/ListItem'
import PlaylistActions from 'App/Stores/Playlist/Actions'
import PlaylistItemsAction from 'App/Stores/PlaylistItems/Actions'
import { Config } from 'App/Config'
import styles from './PlaylistScreenStyle'

import { connect } from 'react-redux'

// TODO: Use reselect
// TODO: loaing overlay https://github.com/joinspontaneous/react-native-loading-spinner-overlay
class PlaylistScreen extends React.Component {
  static propTypes = {
    fetchPlaylists: PropTypes.func.isRequired,
    getPlaylistsPage: PropTypes.func.isRequired,
    playlists: PropTypes.array.isRequired,
    totalResults: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    prevPageToken: PropTypes.string,
    nextPageToken: PropTypes.string,
    name: PropTypes.string.isRequired,
    numFetchedPlaylists: PropTypes.number.isRequired,
    fetchPlaylistItems: PropTypes.func.isRequired
  }

  static defaultProps = {
    prevPageToken: null,
    nextPageToken: null
  }

  static navigationOptions = {
    title: 'Playlists'
  }

  componentDidMount() {
    this.props.fetchPlaylists()
  }

  shouldFetchPlaylists = (fetchPageNumber) => {
    const playlistStartPos = (fetchPageNumber - 1) * Config.DISPLAY_PER_PAGE
    return playlistStartPos >= this.props.numFetchedPlaylists
  }

  fetchPrevPage = () => {
    if (this.props.prevPageToken && this.shouldFetchPlaylists(this.props.currentPage - 1)) {
      this.props.fetchPlaylists(this.props.currentPage - 1, this.props.prevPageToken)
    } else {
      this.props.getPlaylistsPage(this.props.currentPage - 1)
    }
  }

  fetchNextPage = () => {
    if (this.props.nextPageToken && this.shouldFetchPlaylists(this.props.currentPage + 1)) {
      this.props.fetchPlaylists(this.props.currentPage + 1, this.props.nextPageToken)
    } else {
      this.props.getPlaylistsPage(this.props.currentPage + 1)
    }
  }

  goToPlaylist = (playlistId) => {
    this.props.fetchPlaylistItems(playlistId)
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.playlists.length > 0 && (
            <Text style={styles.centerText}>Hi {this.props.name}! You have {this.props.totalResults} playlists</Text>
          )
        }

        <FlatList
          data={this.props.playlists}
          renderItem={({ item: playlist }) => (
            <ListItem
              title={playlist.snippet.localized.title}
              subtitle={playlist.snippet.localized.description}
              rightTitle={dateFns.format(playlist.snippet.publishedAt, 'DD MMM YYYY')}
              rightSubtitle={playlist.status.privacyStatus}
              leftAvatar={{
                source: { uri: playlist.snippet.thumbnails.high.url }
              }}
              badge={{
                value: playlist.contentDetails.itemCount > 99 ? `${playlist.contentDetails.itemCount}+` : playlist.contentDetails.itemCount
              }}
              onPress={() => this.goToPlaylist(playlist.id)}
            />
          )}
          keyExtractor={item => item.id}
        />

        <View style={styles.pagination}>
          <Button
            title="Prev"
            onPress={this.fetchPrevPage}
            buttonStyle={styles.paginationButton}
            disabled={this.props.currentPage === 1 || this.props.isFetching}
          />
          {
            this.props.playlists.length > 0 && (
              <Text style={styles.centerText}>Page {this.props.currentPage} out of {this.props.totalPages}</Text>
            )
          }
          <Button
            title="Next"
            onPress={this.fetchNextPage}
            buttonStyle={styles.paginationButton}
            disabled={this.props.currentPage === this.props.totalPages || this.props.isFetching}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.userState.user.name,
  numFetchedPlaylists: state.playlistState.playlists.length,
  playlists: getVisiblePlaylists(state),
  totalResults: state.playlistState.totalResults,
  currentPage: state.playlistState.currentPage,
  totalPages: state.playlistState.totalPages,
  isFetching: state.playlistState.isFetching,
  prevPageToken: state.playlistState.prevPageToken,
  nextPageToken: state.playlistState.nextPageToken
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: (fetchPageNumber = 1, pageToken = null) =>
    dispatch(PlaylistActions.fetchPlaylists(fetchPageNumber, pageToken)),
  getPlaylistsPage: pageNumber => dispatch(PlaylistActions.getPlaylistsPage(pageNumber)),
  fetchPlaylistItems: (playlistId, fetchPageNumber = 1, pageToken = null) =>
    dispatch(PlaylistItemsAction.fetchPlaylistItems(playlistId, fetchPageNumber, pageToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen)
