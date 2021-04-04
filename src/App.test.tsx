import React from 'react'
import App from './App'
import { render, screen, fireEvent } from '@testing-library/react'

it('renders without crashing', () => {
    render(<App/>)
})

it('default value on load', () => {
    render(<App/>)
    expect(screen.getByText('No Rat')).toBeInTheDocument()
})

it('no info on load', () => {
    render(<App/>)
    expect(screen.queryByTestId('info')).toBeNull()
})
