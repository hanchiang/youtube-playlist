export function getVisiblePlaylists(state) {
  const { currentPage, playlists, DISPLAY_PER_PAGE } = state.youtubeState

  const playlistStartPos = (currentPage - 1) * DISPLAY_PER_PAGE
  const playlistEndPos = Math.min(playlistStartPos + DISPLAY_PER_PAGE, playlists.length)

  console.log(currentPage)

  return playlists.slice(playlistStartPos, playlistEndPos)
}
