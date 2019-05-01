import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPlaylistItems: ['playlistId', 'fetchPageNumber', 'pageToken'],
  fetchPlaylistItemsSuccess: ['playlistId', 'result', 'currentPage'],
  fetchPlaylistItemsFailure: ['playlistId', 'errorMessage']
})

export const PlaylistItemsTypes = Types
export default Creators
