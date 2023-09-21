'use client'

import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled
} from '@mui/material'
import type React from 'react'
import { useState } from 'react'
import { usePostProductsMutation } from '../../store/vendingApi'

interface CreateDialogProps {
  open: boolean
  handleClose: () => void
}

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  box-shadow: 24px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`

const CreateProductDialog = ({
  open,
  handleClose
}: CreateDialogProps): React.ReactElement => {
  const [productName, setProductName] = useState<string>('')
  const [amountAvailable, setAmountAvailable] = useState<number>(0)
  const [cost, setCost] = useState<number>(0)
  const [createProduct] = usePostProductsMutation()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Add a new product
        </Typography>
        <TextField
          id="filled-Text"
          label="Name"
          variant="filled"
          data-cy="product-name"
          onChange={e => {
            setProductName(e.target.value)
          }}
        />
        <TextField
          id="filled-Amount"
          label="Amount"
          variant="filled"
          data-cy="product-amount"
          onChange={e => {
            setAmountAvailable(parseInt(e.target.value))
          }}
        />
        <TextField
          id="filled-Cost"
          label="Cost"
          variant="filled"
          data-cy="product-cost"
          onChange={e => {
            setCost(parseInt(e.target.value))
          }}
        />
        <Button
          data-cy="product-submit"
          onClick={() => {
            createProduct({ product: { productName, amountAvailable, cost } })
              .then(() => {
                console.log('success')
              })
              .catch(() => {
                console.error('error')
              })
          }}
        >
          Submit
        </Button>
      </StyledBox>
    </Modal>
  )
}

export default CreateProductDialog
