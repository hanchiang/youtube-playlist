import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setUser: ['user']
})

export const UserTypes = Types
export default Creators
