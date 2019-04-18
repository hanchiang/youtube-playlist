import { createReducer } from 'reduxsauce'

import { UserTypes } from './Actions'
import { AuthTypes } from 'App/Stores/Auth/Actions'

const INITIAL_STATE = {
  user: null
}

const setUser = (state, { user }) => ({
  user
})

const logout = () => INITIAL_STATE

export default createReducer(INITIAL_STATE, {
  [UserTypes.SET_USER]: setUser,
  [AuthTypes.LOGOUT]: logout
})
