import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPlaylists: null,
  fetchPlaylistsSuccess: ['result'],
  fetchPlaylistsFailure: ['errorMessage']
})

export const YoutubeTypes = Types
export default Creators
