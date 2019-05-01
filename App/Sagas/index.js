import { takeLatest, all } from 'redux-saga/effects'

import { AuthTypes } from '../Stores/Auth/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { PlaylistTypes } from 'App/Stores/Playlist/Actions'
import { PlaylistItemsTypes } from 'App/Stores/PlaylistItems/Actions'

import { authorize, refreshAccessToken, logout } from './AuthSaga'
import { startup } from './StartupSaga'
import { fetchPlaylistsSaga, fetchPlaylistItemsSaga } from './YoutubeSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AuthTypes.AUTHORIZE, authorize),
    takeLatest(AuthTypes.REFRESH_ACCESS_TOKEN, refreshAccessToken),
    takeLatest(PlaylistTypes.FETCH_PLAYLISTS, fetchPlaylistsSaga),
    takeLatest(PlaylistItemsTypes.FETCH_PLAYLIST_ITEMS, fetchPlaylistItemsSaga),
    takeLatest(AuthTypes.LOGOUT, logout)
  ])
}
