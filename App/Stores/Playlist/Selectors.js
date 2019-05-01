import { Config } from 'App/Config'

export function getVisiblePlaylists(state) {
  const { currentPage, playlists } = state.playlistState

  const playlistStartPos = (currentPage - 1) * Config.DISPLAY_PER_PAGE
  const playlistEndPos = Math.min(playlistStartPos + Config.DISPLAY_PER_PAGE, playlists.length)

  return playlists.slice(playlistStartPos, playlistEndPos)
}
