import { createReducer } from 'reduxsauce'
import { YoutubeTypes } from './Actions'
import { AuthTypes } from 'App/Stores/Auth/Actions'

const INITIAL_STATE = {
  playlists: [],
  totalResults: 0,
  resultsPerPage: 0,
  totalPages: 0,
  prevPageToken: null,
  nextPageToken: null,

  isLoading: false,
  errorMessage: null
}

export const fetchPlaylists = (state) => ({
  ...state,
  isLoading: true
})

export const fetchPlaylistsSuccess = (state, { result }) => ({
  playlists: result.items,
  totalResult: result.pageInfo.totalResults,
  resultsPerPage: result.pageInfo.resultsPerPage,
  totalPages: Math.ceil(result.pageInfo.totalResults / result.pageInfo.resultsPerPage),
  prevPageToken: result.prevPageToken,
  nextPageToken: result.nextPageToken,
  isLoading: false,
  errorMessage: null
})

export const fetchPlaylistsFailure = (state, { errorMessage }) => ({
  playlists: [],
  isLoading: false,
  errorMessage
})

const logout = () => INITIAL_STATE

export default createReducer(INITIAL_STATE, {
  [YoutubeTypes.FETCH_PLAYLISTS]: fetchPlaylists,
  [YoutubeTypes.FETCH_PLAYLISTS_SUCCESS]: fetchPlaylistsSuccess,
  [YoutubeTypes.FETCH_PLAYLISTS_FAILURE]: fetchPlaylistsFailure,
  [AuthTypes.LOGOUT]: logout
})
