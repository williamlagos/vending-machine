import type React from 'react'

import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Send } from '@mui/icons-material'

import './App.css'
import { useGetProductsQuery } from '../../store/vendingApi'
import { CreateProductDialog } from '../../components'
import { useAuth } from '../../app/hooks'

const App = (): React.ReactElement => {
  const { token } = useAuth()
  const { data: products } = useGetProductsQuery()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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
          <IconButton
            onClick={() => {
              setOpen(true)
            }}
            color="secondary"
            data-cy="tons-submit"
          >
            <Send />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CreateProductDialog
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
      />
      <Box sx={{ m: 2 }}>
        <Grid
          container
          spacing={2}
        >
          {products?.map(
            ({ productName, amountAvailable, cost }, index: number) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
              >
                <Typography>
                  {productName} {amountAvailable} {cost}
                </Typography>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </>
  )
}

export default App
