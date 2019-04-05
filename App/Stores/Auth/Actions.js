import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  authorize: null,
  authorizeSuccess: ['result'],
  authorizeFailure: ['errorMessage'],
  refreshAccessToken: ['refreshToken'],
  refreshAccessTokenSuccess: ['auth'],
  refreshAccessTokenFailure: ['errorMessage']
})

export const AuthTypes = Types
export default Creators
