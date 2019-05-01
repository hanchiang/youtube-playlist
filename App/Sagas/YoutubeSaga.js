import { put, call } from 'redux-saga/effects'

import PlaylistActions from 'App/Stores/Playlist/Actions'
import PlaylistItemsAction from 'App/Stores/PlaylistItems/Actions'
import youtubeService from 'App/Services/YoutubeService'
import apiErrorTransform from 'App/utils/apiErrorTransform'

export function* fetchPlaylistsSaga(action) {
  const result = yield call(youtubeService.getPlaylists, { pageToken: action.pageToken })

  if (result.ok) {
    yield put(PlaylistActions.fetchPlaylistsSuccess(result.data, action.fetchPageNumber))
  } else {
    yield put(PlaylistActions.fetchPlaylistsFailure(apiErrorTransform(result)))
  }
}

export function* fetchPlaylistItemsSaga(action) {
  const result = yield call(youtubeService.getPlaylistItems, { pageToken: action.pageToken, playlistId: action.playlistId })

  if (result.ok) {
    yield put(PlaylistItemsAction.fetchPlaylistItemsSuccess(action.playlistId, result.data, action.fetchPageNumber))
  } else {
    yield put(PlaylistItemsAction.fetchPlaylistItemsFailure(action.playlistId, apiErrorTransform(result)))
  }
}
