import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import MortgageCalculator from './components/MortgageCalculator'

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient} >
      <MortgageCalculator />
    </QueryClientProvider>
  )
}

export default App
