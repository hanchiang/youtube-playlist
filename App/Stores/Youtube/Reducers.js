import { createReducer } from 'reduxsauce'
import { YoutubeTypes } from './Actions'
import { AuthTypes } from 'App/Stores/Auth/Actions'

// If `DISPLAY_PER_PAGE` is greater than the number of playlists after the first fetch, then
// the pagination logic will need some tweaking in order display the correct playlists

export const INITIAL_STATE = {
  playlists: [],
  totalResults: 0,
  resultsPerPage: 0,
  currentPage: 0,
  totalPages: 0,
  prevPageToken: null,
  nextPageToken: null,
  isFetching: false,
  errorMessage: null,
  DISPLAY_PER_PAGE: 30
}

export const fetchPlaylists = (state) => ({
  ...state,
  isFetching: true
})

export const fetchPlaylistsSuccess = (state, { result, currentPage }) => ({
  ...state,
  playlists: [...state.playlists, ...result.items],
  totalResults: result.pageInfo.totalResults,
  resultsPerPage: result.pageInfo.resultsPerPage,
  currentPage: currentPage || 1,
  totalPages: Math.ceil(result.pageInfo.totalResults / state.DISPLAY_PER_PAGE),
  prevPageToken: result.prevPageToken,
  nextPageToken: result.nextPageToken,
  isFetching: false,
  errorMessage: null
})

export const fetchPlaylistsFailure = (state, { errorMessage }) => ({
  ...state,
  playlists: [],
  isFetching: false,
  errorMessage
})

export const getPlaylistsPage = (state, { pageNumber }) => ({
  ...state,
  currentPage: pageNumber
})

const logout = () => INITIAL_STATE

export default createReducer(INITIAL_STATE, {
  [YoutubeTypes.FETCH_PLAYLISTS]: fetchPlaylists,
  [YoutubeTypes.FETCH_PLAYLISTS_SUCCESS]: fetchPlaylistsSuccess,
  [YoutubeTypes.FETCH_PLAYLISTS_FAILURE]: fetchPlaylistsFailure,
  [YoutubeTypes.GET_PLAYLISTS_PAGE]: getPlaylistsPage,
  [AuthTypes.LOGOUT]: logout
})
