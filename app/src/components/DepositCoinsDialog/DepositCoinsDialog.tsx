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
import { usePostUsersByIdDepositMutation } from '../../store/vendingApi'

interface DepositCoinsDialogProps {
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

const DepositCoinsDialog = ({
  open,
  handleClose
}: DepositCoinsDialogProps): React.ReactElement => {
  const [hundred, setHundred] = useState<number>(0)
  const [fifty, setFifty] = useState<number>(0)
  const [twenty, setTwenty] = useState<number>(0)
  const [ten, setTen] = useState<number>(0)
  const [five, setFive] = useState<number>(0)

  const [depositCoins] = usePostUsersByIdDepositMutation()

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
          Deposit coins
        </Typography>
        <TextField
          id="filled-Hundred"
          label="Hundred"
          variant="filled"
          data-cy="coins-hundred"
          onChange={e => {
            setHundred(parseInt(e.target.value))
          }}
        />
        <TextField
          id="filled-Fifty"
          label="Fifty"
          variant="filled"
          data-cy="coins-fifty"
          onChange={e => {
            setFifty(parseInt(e.target.value))
          }}
        />
        <TextField
          id="filled-Twenty"
          label="Twenty"
          variant="filled"
          data-cy="coins-twenty"
          onChange={e => {
            setTwenty(parseInt(e.target.value))
          }}
        />
        <TextField
          id="filled-Ten"
          label="Ten"
          variant="filled"
          data-cy="coins-ten"
          onChange={e => {
            setTen(parseInt(e.target.value))
          }}
        />
        <TextField
          id="filled-Five"
          label="Five"
          variant="filled"
          data-cy="coins-five"
          onChange={e => {
            setFive(parseInt(e.target.value))
          }}
        />
        <Button
          data-cy="product-submit"
          onClick={() => {
            // TODO: fetch user id easily
            depositCoins({
              id: '',
              coins: { hundred, fifty, twenty, ten, five }
            })
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

export default DepositCoinsDialog
