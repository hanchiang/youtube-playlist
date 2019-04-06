import { createReducer } from 'reduxsauce'
import { UserTypes } from './Actions'

// https://developers.google.com/identity/sign-in/android/backend-auth#calling-the-tokeninfo-endpoint
const INITIAL_STATE = {
  user: null
}

const setUser = (state, { user }) => ({
  user
})

export default createReducer(INITIAL_STATE, {
  [UserTypes.SET_USER]: setUser
})
