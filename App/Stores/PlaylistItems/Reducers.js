import { createReducer } from 'reduxsauce'
import { PlaylistItemsTypes } from './Actions'
import { AuthTypes } from 'App/Stores/Auth/Actions'

import { Config } from 'App/Config'

// If `DISPLAY_PER_PAGE` is greater than the number of playlists after the first fetch, then
// the pagination logic will need some tweaking in order display the correct playlists

// play list items state is an object, whose key is the playlist id, and value with the following shape:
// playlistItems: [],
// totalResults: 0,
// resultsPerPage: 0,
// currentPage: 0,
// totalPages: 0,
// prevPageToken: null,
// nextPageToken: null,
// isFetching: false,
// errorMessage: null

export const INITIAL_STATE = {}

export const fetchPlaylistItems = (state) => ({
  ...state,
  isFetching: true
})

export const fetchPlaylistItemsSuccess = (state, { playlistId, result, currentPage }) => ({
  ...state,
  [playlistId]: {
    ...state[playlistId],
    playlistItems: state[playlistId]
      ? state[playlistId].playlistItems.concat(result.items)
      : result.items,
    totalResults: result.pageInfo.totalResults,
    resultsPerPage: result.pageInfo.resultsPerPage,
    currentPage: currentPage || 1,
    totalPages: Math.ceil(result.pageInfo.totalResults / Config.DISPLAY_PER_PAGE),
    prevPageToken: result.prevPageToken,
    nextPageToken: result.nextPageToken,
    isFetching: false,
    errorMessage: null
  }
})

export const fetchPlaylistItemsFailure = (state, { playlistId, errorMessage }) => ({
  ...state,
  [playlistId]: {
    ...state[playlistId],
    playlistItems: [],
    isFetching: false,
    errorMessage
  }
})

const logout = () => INITIAL_STATE

export default createReducer(INITIAL_STATE, {
  [PlaylistItemsTypes.FETCH_PLAYLIST_ITEMS]: fetchPlaylistItems,
  [PlaylistItemsTypes.FETCH_PLAYLIST_ITEMS_SUCCESS]: fetchPlaylistItemsSuccess,
  [PlaylistItemsTypes.FETCH_PLAYLIST_ITEMS_FAILURE]: fetchPlaylistItemsFailure,
  [AuthTypes.LOGOUT]: logout
})
