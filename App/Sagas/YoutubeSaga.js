import { put, call } from 'redux-saga/effects'

import YoutubeActions from 'App/Stores/Youtube/Actions'
import youtubeService from 'App/Services/YoutubeService'
import apiErrorTransform from 'App/utils/apiErrorTransform'

export function* fetchPlaylistsSaga(action) {
  const result = yield call(youtubeService.getPlaylists, { pageToken: action.pageToken })

  if (result.ok) {
    yield put(YoutubeActions.fetchPlaylistsSuccess(result.data, action.fetchPageNumber))
  } else {
    yield put(YoutubeActions.fetchPlaylistsFailure(apiErrorTransform(result)))
  }
}
