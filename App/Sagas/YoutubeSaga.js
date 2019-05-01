import { put, call } from 'redux-saga/effects'

import PlaylistActions from 'App/Stores/Playlist/Actions'
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
