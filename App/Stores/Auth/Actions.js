import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  authorize: null,
  authorizeLoading: null,
  authorizeSuccess: ['result'],
  authorizeFailure: ['errorMessage']
})

export const AuthTypes = Types
export default Creators
