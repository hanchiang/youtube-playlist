import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPlaylists: ['fetchPageNumber'],
  fetchPlaylistsSuccess: ['result', 'currentPage'],
  fetchPlaylistsFailure: ['errorMessage']
})

export const YoutubeTypes = Types
export default Creators
