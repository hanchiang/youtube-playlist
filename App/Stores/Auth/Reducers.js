import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

const INITIAL_STATE = {
  accessTokenExpirationDate: null,
  refreshToken: null,
  idToken: null,
  scopes: [],
  accessToken: null,
  isLoading: false,
  errorMessage: null
}

export const authorizeLoading = (state) => ({
  ...state,
  isLoading: true
})

export const authorizeSuccess = (state, { result }) => ({
  accessTokenExpirationDate: result.accessTokenExpirationDate,
  refreshToken: result.refreshToken,
  idToken: result.isToken,
  scopes: result.scopes,
  accessToken: result.accessToken,
  isLoading: false,
  errorMessage: null
})

export const authorizeFailure = (state, { errorMessage }) => ({
  auth: null,
  isLoading: false,
  errorMessage: errorMessage,
  accessTokenExpirationDate: null,
  refreshToken: null,
  idToken: null,
  scopes: [],
  accessToken: null
})

export default createReducer(INITIAL_STATE, {
  [AuthTypes.AUTHORIZE_LOADING]: authorizeLoading,
  [AuthTypes.AUTHORIZE_SUCCESS]: authorizeSuccess,
  [AuthTypes.AUTHORIZE_FAILURE]: authorizeFailure
})
