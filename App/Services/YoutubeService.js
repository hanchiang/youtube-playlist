import { create } from 'apisauce'
import Reactotron from 'reactotron-react-native'

import createStore from 'App/Stores'
import AuthActions from 'App/Stores/Auth/Actions'
import { authService } from './AuthService'
import { Config } from 'App/Config'

/**
 * Google oauth endpoints
 */

const api = create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

api.addMonitor(Reactotron.apisauce)

api.addRequestTransform(request => {
  const { store } = createStore
  const auth = store.getState().authState.auth
  const token = auth && auth.accessToken

  request.headers['Authorization'] = `Bearer ${token}`
})

api.axiosInstance.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    const { store } = createStore

    const refreshed = await authService.refreshAccessToken(store.getState().authState.auth.refreshToken)
    store.dispatch(AuthActions.refreshAccessTokenSuccess(refreshed))

    error.config.headers.Authorization = `Bearer ${refreshed.accessToken}`
    return api.axiosInstance.request(error.config)
  }

  return Promise.reject(error)
})

const getPlaylists = (data = {}) => {
  const {
    part = 'snippet,status,contentDetails',
    fields = 'kind,etag,nextPageToken,prevPageToken,pageInfo,items(id,etag,status,contentDetails),items/snippet(publishedAt,channelId,title,description,channelTitle,tags,localized,thumbnails(high,standard,maxres))',
    mine = true,
    maxResults = Config.MAX_RESULTS_TO_FETCH,
    pageToken = null
  } = data

  return api.get('/playlists', {
    part, fields, mine, maxResults, pageToken
  })
}

const getPlaylistItems = (data = {}) => {
  const {
    part = 'snippet,status,contentDetails',
    fields = 'kind,etag,nextPageToken,prevPageToken,pageInfo,items(kind,etag,id,contentDetails,status),items/snippet(publishedAt,title,description,thumbnails(standard,high,maxres),channelTitle)',
    maxResults = Config.MAX_RESULTS_TO_FETCH,
    pageToken = null,
    playlistId
  } = data

  return api.get('/playlistItems', {
    part, fields, maxResults, pageToken, playlistId
  })
}

export default {
  getPlaylists, getPlaylistItems
}
