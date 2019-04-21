import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPlaylists: ['fetchPageNumber', 'pageToken'],
  fetchPlaylistsSuccess: ['result', 'currentPage'],
  fetchPlaylistsFailure: ['errorMessage'],
  getPlaylistsPage: ['pageNumber']
})

export const YoutubeTypes = Types
export default Creators
