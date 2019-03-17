import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

const INITIAL_STATE = {
  auth: null,
  authIsLoadingg: false,
  authErrorMessage: null
}

export const authorizeLoading = (state) => ({
  authIsLoadingg: true
})

export const authorizeSuccess = (state, { result }) => ({
  auth: result,
  authIsLoadingg: false,
  authErrorMessage: null
})

export const authorizeFailure = (state, { errorMessage }) => ({
  auth: null,
  authIsLoading: false,
  authErrorMesage: errorMessage
})

export default createReducer(INITIAL_STATE, {
  [AuthTypes.AUTHORIZE_LOADING]: authorizeLoading,
  [AuthTypes.AUTHORIZE_SUCCESS]: authorizeSuccess,
  [AuthTypes.AUTHORIZE_FAILURE]: authorizeFailure
})
