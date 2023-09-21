import { Typography, TextField, Button, Stack } from '@mui/material'
import { useState } from 'react'

import { usePostAuthMutation } from '../../store/vendingApi'
import { useAuth } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'

const Entrance = (): React.ReactElement => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [authenticate] = usePostAuthMutation()
  const { setToken } = useAuth()
  const navigate = useNavigate()

  return (
    <Stack
      spacing={2}
      sx={{ padding: 2 }}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        Login
      </Typography>
      <TextField
        error={error}
        id="filled-Name"
        label="Username"
        variant="filled"
        data-cy="login-username"
        helperText={errorMessage}
        onChange={e => {
          setUsername(e.target.value)
        }}
      />
      <TextField
        error={error}
        id="filled-Password"
        label="Password"
        variant="filled"
        type="password"
        data-cy="login-password"
        helperText={errorMessage}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <Button
        data-cy="product-submit"
        onClick={() => {
          authenticate({ auth: { username, password } })
            .then(result => {
              setToken(result.data.token ?? null)
              navigate('/')
            })
            .catch(() => {
              setError(true)
              setErrorMessage('Username or password invalid')
            })
        }}
      >
        Submit
      </Button>
    </Stack>
  )
}

export default Entrance
