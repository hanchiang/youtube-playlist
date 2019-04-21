import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { Text, Button } from 'react-native-elements'
import dateFns from 'date-fns'

import ListItem from 'App/Components/ListItem/ListItem'
import YoutubeActions from 'App/Stores/Youtube/Actions'
import styles from './ListScreenStyle'

import { connect } from 'react-redux'

class ListScreen extends React.Component {
  static propTypes = {
    fetchPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.array.isRequired,
    totalResults: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.fetchPlaylists()
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.playlists.length > 0 && (
            <Text style={styles.centerText}>Displaying {this.props.playlists.length} out of {this.props.totalResults} results</Text>
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
            onPress={() => alert('prev page')}
            disabled={this.props.currentPage === 1 || this.props.isFetching}
          />
          {
            this.props.playlists.length > 0 && (
              <Text style={styles.centerText}>Page {this.props.currentPage} out of {this.props.totalPages}</Text>
            )
          }
          <Button
            title="Next"
            onPress={() => alert('next page')}
            disabled={this.props.currentPage === this.props.totalPages || this.props.isFetching}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  playlists: state.youtubeState.playlists,
  totalResults: state.youtubeState.totalResults,
  currentPage: state.youtubeState.currentPage,
  totalPages: state.youtubeState.totalPages,
  isFetching: state.youtubeState.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: () => dispatch(YoutubeActions.fetchPlaylists())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)
