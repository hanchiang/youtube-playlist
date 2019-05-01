import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPlaylists: ['fetchPageNumber', 'pageToken'],
  fetchPlaylistsSuccess: ['result', 'currentPage'],
  fetchPlaylistsFailure: ['errorMessage'],
  getPlaylistsPage: ['pageNumber']
})

export const PlaylistTypes = Types
export default Creators
