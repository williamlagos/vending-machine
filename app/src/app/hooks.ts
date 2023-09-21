import { useContext } from 'react'
import { AuthContext, type AuthContextStructure } from '../providers'

export const useAuth = (): AuthContextStructure => {
  return useContext(AuthContext)
}
