import type React from 'react'

import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Paper,
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
  const [activeRole, setActiveRole] = useState<'BUYER' | 'SELLER'>('BUYER')
  const [currentDeposit, setCurrentDeposit] = useState<Coins>()

  const navigate = useNavigate()

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
          .then(() => {
            console.log('success')
          })
          .catch(() => {
            console.error('error')
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
          console.log(data)
          setActiveRole(data.user.role)
          setCurrentDeposit(data.coins)
        })
        .catch(() => {
          console.error('error')
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
          <Typography>
            {currentDeposit?.hundred} {currentDeposit?.fifty}{' '}
            {currentDeposit?.twenty} {currentDeposit?.ten}{' '}
            {currentDeposit?.five}
          </Typography>
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
        handleClose={() => {
          setCreateProductOpened(false)
        }}
      />
      <DepositCoinsDialog
        open={depositCoinsOpened}
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
                            id: activeUserId,
                            buy: { amount: 1 }
                          })
                            .then(() => {
                              console.log(id)
                            })
                            .catch(() => {
                              console.error('error')
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
                              .then(() => {
                                console.log(id)
                              })
                              .catch(() => {
                                console.error('error')
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
      <Box sx={{ height: '92vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
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
      </Box>
    </>
  )
}

export default App
