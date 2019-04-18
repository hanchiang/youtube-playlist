import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPlaylists: null,
  fetchPlaylistsSuccess: ['playlists'],
  fetchPlaylistsFailure: ['errorMessage']
})

export const YoutubeTypes = Types
export default Creators
