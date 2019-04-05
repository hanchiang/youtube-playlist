import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

const INITIAL_STATE = {
  auth: null,
  isAuthenticating: false,
  errorMessage: null,
  isAuthenticated: false,
  isRefreshingToken: false
}

export const authorize = (state) => ({
  ...state,
  isAuthenticating: true
})

export const authorizeSuccess = (state, { result }) => ({
  auth: result,
  isAuthenticating: false,
  errorMessage: null,
  isAuthenticated: true
})

export const authorizeFailure = (state, { errorMessage }) => ({
  auth: null,
  isAuthenticating: false,
  errorMessage: errorMessage,
  isAuthenticated: false
})

const refreshAccessToken = (state) => ({
  ...state,
  isRefreshingToken: true
})

const refreshAccessTokenSuccess = (state, { auth }) => {
  // TODO: for idToken, name, picture, given_name, family_name, locale may be omitted for some reason.
  // probably need to refresh again
  const { refreshToken, ...rest } = auth
  return {
    ...state,
    auth: {
      ...rest,
      // refreshToken may be null
      refreshToken: refreshToken || state.auth.refreshToken
    },
    isAuthenticated: true,
    isRefreshingToken: false,
    errorMessage: null
  }
}

const refreshAccessTokenFailure = (state, { errorMessage }) => ({
  ...state,
  isAuthenticated: false,
  isRefreshingToken: false,
  errorMessage
})

export default createReducer(INITIAL_STATE, {
  [AuthTypes.AUTHORIZE]: authorize,
  [AuthTypes.AUTHORIZE_SUCCESS]: authorizeSuccess,
  [AuthTypes.AUTHORIZE_FAILURE]: authorizeFailure,
  [AuthTypes.REFRESH_ACCESS_TOKEN]: refreshAccessToken,
  [AuthTypes.REFRESH_ACCESS_TOKEN_SUCCESS]: refreshAccessTokenSuccess,
  [AuthTypes.REFRESH_ACCESS_TOKEN_FAILURE]: refreshAccessTokenFailure
})
