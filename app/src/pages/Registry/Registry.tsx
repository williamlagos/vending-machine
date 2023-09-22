import {
  Typography,
  TextField,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { usePostUsersMutation } from '../../store/vendingApi'
import { useAuth } from '../../app/hooks'

const Registry = (): React.ReactElement => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [createUser] = usePostUsersMutation()
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
      <ToggleButtonGroup
        color="primary"
        value={role}
        exclusive
        onChange={(_, value) => {
          setRole(value)
        }}
        aria-label="Platform"
      >
        <ToggleButton value="BUYER">Buyer</ToggleButton>
        <ToggleButton value="SELLER">Seller</ToggleButton>
      </ToggleButtonGroup>
      <Button
        data-cy="product-submit"
        onClick={() => {
          createUser({ user: { username, password, role } })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data: any) => {
              if (setToken !== undefined) setToken(data.token ?? null)
              navigate('/')
            })
            .catch(() => {
              setError(true)
              setErrorMessage('Username or password invalid')
            })
        }}
      >
        Register
      </Button>
    </Stack>
  )
}

export default Registry
