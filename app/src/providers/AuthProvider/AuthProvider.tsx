import {
  type SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
  type Context
} from 'react'

export interface AuthContextStructure {
  token?: string | null
  setToken?: (newToken: SetStateAction<string | null>) => void
}

export const AuthContext: Context<AuthContextStructure> = createContext({})

interface AuthProviderProps {
  children: React.ReactElement | boolean | null | undefined | string | number
}

const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'))

  // Function to set the authentication token
  const setToken = (newToken: SetStateAction<string | null>): void => {
    setToken_(newToken)
  }

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  )

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
