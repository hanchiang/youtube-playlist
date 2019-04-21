import { createReducer } from 'reduxsauce'
import { YoutubeTypes } from './Actions'
import { AuthTypes } from 'App/Stores/Auth/Actions'

const INITIAL_STATE = {
  playlists: [],
  totalResults: 0,
  resultsPerPage: 0,
  currentPage: 0,
  totalPages: 0,
  prevPageToken: null,
  nextPageToken: null,
  isFetching: false,
  errorMessage: null
}

export const fetchPlaylists = (state) => ({
  ...state,
  isFetching: true
})

export const fetchPlaylistsSuccess = (state, { result, currentPage }) => ({
  playlists: result.items,
  totalResults: result.pageInfo.totalResults,
  resultsPerPage: result.pageInfo.resultsPerPage,
  currentPage: currentPage || 1,
  totalPages: Math.ceil(result.pageInfo.totalResults / result.pageInfo.resultsPerPage),
  prevPageToken: result.prevPageToken,
  nextPageToken: result.nextPageToken,
  isFetching: false,
  errorMessage: null
})

export const fetchPlaylistsFailure = (state, { errorMessage }) => ({
  playlists: [],
  isFetching: false,
  errorMessage
})

const logout = () => INITIAL_STATE

export default createReducer(INITIAL_STATE, {
  [YoutubeTypes.FETCH_PLAYLISTS]: fetchPlaylists,
  [YoutubeTypes.FETCH_PLAYLISTS_SUCCESS]: fetchPlaylistsSuccess,
  [YoutubeTypes.FETCH_PLAYLISTS_FAILURE]: fetchPlaylistsFailure,
  [AuthTypes.LOGOUT]: logout
})
