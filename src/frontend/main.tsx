import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Page } from './Page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'

// @ts-expect-error
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <QueryClientProvider client={qc}>
        <Page />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
)
