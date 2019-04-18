import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  authorize: null,
  authorizeSuccess: ['auth'],
  authorizeFailure: ['errorMessage'],
  refreshAccessToken: ['refreshToken'],
  refreshAccessTokenSuccess: ['auth'],
  refreshAccessTokenFailure: ['errorMessage'],
  logout: null,
  logoutSuccess: null
})

export const AuthTypes = Types
export default Creators
