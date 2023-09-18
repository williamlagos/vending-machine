import 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('Test the main page', () => {
  test('Loads the main page', async () => {
    render(<App />)

    expect(screen.getByRole('heading')).toHaveTextContent('Vite')
  })
})
