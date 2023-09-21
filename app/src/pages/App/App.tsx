import type React from 'react'

import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Toolbar,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Add,
  AddShoppingCart,
  AttachMoney,
  CurrencyExchange
} from '@mui/icons-material'

import './App.css'
import {
  useGetProductsQuery,
  usePostProductsByIdBuyMutation,
  usePostUsersByIdResetMutation
} from '../../store/vendingApi'
import { CreateProductDialog, DepositCoinsDialog } from '../../components'
import { useAuth } from '../../app/hooks'

const App = (): React.ReactElement => {
  const { token } = useAuth()
  const { data: products } = useGetProductsQuery()
  const [resetCoins] = usePostUsersByIdResetMutation()
  const [buyProduct] = usePostProductsByIdBuyMutation()
  const [createProductOpened, setCreateProductOpened] = useState(false)
  const [depositCoinsOpened, setDepositCoinsOpened] = useState(false)
  const navigate = useNavigate()

  const actions = [
    {
      icon: <Add />,
      name: 'Create new Product',
      onClick: () => {
        setCreateProductOpened(true)
      }
    },
    {
      icon: <AttachMoney />,
      name: 'Deposit new Coins',
      onClick: () => {
        setDepositCoinsOpened(true)
      }
    },
    {
      icon: <CurrencyExchange />,
      name: 'Reset Coins',
      onClick: () => {
        // TODO: logic for retrieving the user id easily
        resetCoins({ id: '' })
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
    if (token === null) navigate('/entrance')
  })

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
        <Grid
          container
          spacing={2}
        >
          {products?.map(
            ({ id, productName, amountAvailable, cost }, index: number) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
              >
                <Typography>
                  {productName} {amountAvailable} {cost}
                  <IconButton
                    onClick={() => {
                      buyProduct({ id, amount: 1 })
                        .then(() => {
                          console.log(id)
                        })
                        .catch(() => {
                          console.error('error')
                        })
                    }}
                    color="secondary"
                    data-cy="tons-submit"
                  >
                    <AddShoppingCart />
                  </IconButton>
                </Typography>
              </Grid>
            )
          )}
        </Grid>
      </Box>
      <Box sx={{ height: '92vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map(action => (
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
