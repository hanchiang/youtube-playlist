import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

const INITIAL_STATE = {
  auth: null,
  isAuthenticating: false,
  errorMessage: null,
  isAuthenticated: false
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

export default createReducer(INITIAL_STATE, {
  [AuthTypes.AUTHORIZE]: authorize,
  [AuthTypes.AUTHORIZE_SUCCESS]: authorizeSuccess,
  [AuthTypes.AUTHORIZE_FAILURE]: authorizeFailure
})
