import type React from 'react'

import { useEffect, useState } from 'react'
import {
  Alert,
  AppBar,
  Box,
  IconButton,
  Paper,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Add,
  AddShoppingCart,
  AttachMoney,
  CurrencyExchange,
  Delete,
  Logout
} from '@mui/icons-material'
import { type SerializedError } from '@reduxjs/toolkit'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import './App.css'
import {
  type Coins,
  useDeleteProductsByIdMutation,
  useGetProductsQuery,
  usePostProductsByIdBuyMutation,
  usePostUsersByIdResetMutation,
  vendingApi
} from '../../store/vendingApi'
import { CreateProductDialog, DepositCoinsDialog } from '../../components'
import { useAuth } from '../../app/hooks'
import { extractPayload } from '../../app/utils'

const App = (): React.ReactElement => {
  const { token, setToken } = useAuth()

  const { data: products } = useGetProductsQuery()
  const [resetCoins] = usePostUsersByIdResetMutation()
  const [buyProduct] = usePostProductsByIdBuyMutation()
  const [deleteProduct] = useDeleteProductsByIdMutation()
  const [fetchActiveUser] = vendingApi.useLazyGetUsersByIdQuery()

  const [activeUserId, setActiveUserId] = useState<string>('')
  const [depositCoinsOpened, setDepositCoinsOpened] = useState(false)
  const [createProductOpened, setCreateProductOpened] = useState(false)
  const [errorMessageOpened, setErrorMessageOpened] = useState(false)
  const [successMessageOpened, setSuccessMessageOpened] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [activeRole, setActiveRole] = useState<'BUYER' | 'SELLER'>('BUYER')
  const [currentDeposit, setCurrentDeposit] = useState<Coins>()

  const navigate = useNavigate()

  const successMessageHandler = (
    data: { data: unknown } | { error: FetchBaseQueryError | SerializedError }
  ): void => {
    setSuccessMessageOpened(true)
    setSuccessMessage(JSON.stringify(data))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMessageHandler = (error: any): void => {
    setErrorMessageOpened(true)
    setErrorMessage(JSON.stringify(error))
  }

  const actions = [
    {
      icon: <Add />,
      name: 'Create new Product',
      role: 'SELLER',
      onClick: () => {
        setCreateProductOpened(true)
      }
    },
    {
      icon: <AttachMoney />,
      name: 'Deposit new Coins',
      role: 'BUYER',
      onClick: () => {
        setDepositCoinsOpened(true)
      }
    },
    {
      icon: <CurrencyExchange />,
      name: 'Reset Coins',
      role: 'BUYER',
      onClick: () => {
        resetCoins({ id: activeUserId })
          .then(data => {
            successMessageHandler(data)
          })
          .catch(error => {
            errorMessageHandler(error)
          })
      }
    }
  ]

  useEffect(() => {
    if (token === null) {
      navigate('/entrance')
    } else if (token !== undefined) {
      setActiveUserId(extractPayload(token).id)
      fetchActiveUser({ id: extractPayload(token).id })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(({ data }: any) => {
          setActiveRole(data.user.role)
          setCurrentDeposit(data.coins)
        })
        .catch(error => {
          errorMessageHandler(error)
        })
    }
  }, [token, navigate, fetchActiveUser])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Vending Machine
          </Typography>
          <Typography>{activeRole} &nbsp;</Typography>
          {activeRole === 'BUYER' && (
            <Typography>
              {currentDeposit?.hundred} {currentDeposit?.fifty}{' '}
              {currentDeposit?.twenty} {currentDeposit?.ten}{' '}
              {currentDeposit?.five}
            </Typography>
          )}
          <IconButton
            data-cy="exit"
            sx={{ color: 'white' }}
            onClick={() => {
              if (setToken !== undefined) {
                setToken(null)
                navigate('/entrance')
              }
            }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CreateProductDialog
        open={createProductOpened}
        handleSuccessMessage={successMessageHandler}
        handleErrorMessage={errorMessageHandler}
        handleClose={() => {
          setCreateProductOpened(false)
        }}
      />
      <DepositCoinsDialog
        open={depositCoinsOpened}
        handleSuccessMessage={successMessageHandler}
        handleErrorMessage={errorMessageHandler}
        handleClose={() => {
          setDepositCoinsOpened(false)
        }}
      />
      <Box sx={{ m: 2 }}>
        <Stack spacing={2}>
          {products?.map(
            ({ id, productName, amountAvailable, cost }, index: number) => (
              <Paper
                key={index}
                sx={{ padding: 1 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography>
                    {productName} {amountAvailable} {cost}{' '}
                  </Typography>
                  <Typography>
                    {activeRole === 'BUYER' ? (
                      <IconButton
                        onClick={() => {
                          buyProduct({
                            id: id ?? '',
                            buy: { amount: 1 }
                          })
                            .then(data => {
                              successMessageHandler(data)
                            })
                            .catch(error => {
                              errorMessageHandler(error)
                            })
                        }}
                        color="secondary"
                        data-cy="buy-product"
                      >
                        <AddShoppingCart />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          if (id !== undefined) {
                            deleteProduct({ id })
                              .then(data => {
                                successMessageHandler(data)
                              })
                              .catch(error => {
                                errorMessageHandler(error)
                              })
                          }
                        }}
                        sx={{ float: 'right' }}
                        color="secondary"
                        data-cy="delete-product"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Typography>
                </Box>
              </Paper>
            )
          )}
        </Stack>
      </Box>
      <Snackbar
        open={errorMessageOpened}
        autoHideDuration={6000}
        onClose={() => {
          setErrorMessageOpened(false)
        }}
      >
        <Alert
          onClose={() => {
            setErrorMessageOpened(false)
          }}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successMessageOpened}
        autoHideDuration={6000}
        onClose={() => {
          setSuccessMessageOpened(false)
        }}
      >
        <Alert
          onClose={() => {
            setSuccessMessageOpened(false)
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions
          .filter(action => activeRole === action.role)
          .map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
      </SpeedDial>
    </>
  )
}

export default App
