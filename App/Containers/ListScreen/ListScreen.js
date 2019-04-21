import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { Text, Button } from 'react-native-elements'
import dateFns from 'date-fns'

import { getVisiblePlaylists } from 'App/Stores/Youtube/Selectors'
import ListItem from 'App/Components/ListItem/ListItem'
import YoutubeActions from 'App/Stores/Youtube/Actions'
import { INITIAL_STATE } from 'App/Stores/Youtube/Reducers'
import styles from './ListScreenStyle'

import { connect } from 'react-redux'

class ListScreen extends React.Component {
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
    numFetchedPlaylists: PropTypes.number.isRequired
  }

  static defaultProps = {
    prevPageToken: null,
    nextPageToken: null
  }

  componentDidMount() {
    this.props.fetchPlaylists()
  }

  shouldFetchPlaylists = (fetchPageNumber) => {
    const playlistStartPos = (fetchPageNumber - 1) * INITIAL_STATE.DISPLAY_PER_PAGE
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
  numFetchedPlaylists: state.youtubeState.playlists.length,
  playlists: getVisiblePlaylists(state),
  totalResults: state.youtubeState.totalResults,
  currentPage: state.youtubeState.currentPage,
  totalPages: state.youtubeState.totalPages,
  isFetching: state.youtubeState.isFetching,
  prevPageToken: state.youtubeState.prevPageToken,
  nextPageToken: state.youtubeState.nextPageToken
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: (fetchPageNumber = 1, pageToken = null) => dispatch(YoutubeActions.fetchPlaylists(fetchPageNumber, pageToken)),
  getPlaylistsPage: pageNumber => dispatch(YoutubeActions.getPlaylistsPage(pageNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
