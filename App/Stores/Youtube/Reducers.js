import { createReducer } from 'reduxsauce'
import { YoutubeTypes } from './Actions'

const INITIAL_STATE = {
  playlists: [],
  isLoading: false,
  errorMessage: null
}

export const fetchPlaylists = (state) => ({
  ...state,
  isLoading: true
})

export const fetchPlaylistsSuccess = (state, { playlists }) => ({
  playlists,
  isLoading: false,
  errorMessage: null
})

export const fetchPlaylistsFailure = (state, { errorMessage }) => ({
  playlists: [],
  isLoading: false,
  errorMessage
})

export default createReducer(INITIAL_STATE, {
  [YoutubeTypes.FETCH_PLAYLISTS]: fetchPlaylists,
  [YoutubeTypes.FETCH_PLAYLISTS_SUCCESS]: fetchPlaylistsSuccess,
  [YoutubeTypes.FETCH_PLAYLISTS_FAILURE]: fetchPlaylistsFailure
})
