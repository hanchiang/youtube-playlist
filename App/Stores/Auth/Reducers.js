import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

const INITIAL_STATE = {
  auth: null,
  isAuthenticating: false,
  isAuthenticated: false,
  isRefreshingToken: false,
  errorMessage: ''
}

export const authorize = (state) => ({
  ...state,
  isAuthenticating: true
})

export const authorizeSuccess = (state, { auth }) => ({
  auth,
  isAuthenticating: false,
  errorMessage: '',
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
    errorMessage: ''
  }
}

const refreshAccessTokenFailure = (state, { errorMessage }) => ({
  ...state,
  isAuthenticated: false,
  isRefreshingToken: false,
  errorMessage
})

const logout = () => INITIAL_STATE

export default createReducer(INITIAL_STATE, {
  [AuthTypes.AUTHORIZE]: authorize,
  [AuthTypes.AUTHORIZE_SUCCESS]: authorizeSuccess,
  [AuthTypes.AUTHORIZE_FAILURE]: authorizeFailure,
  [AuthTypes.REFRESH_ACCESS_TOKEN]: refreshAccessToken,
  [AuthTypes.REFRESH_ACCESS_TOKEN_SUCCESS]: refreshAccessTokenSuccess,
  [AuthTypes.REFRESH_ACCESS_TOKEN_FAILURE]: refreshAccessTokenFailure,
  [AuthTypes.LOGOUT]: logout
})
