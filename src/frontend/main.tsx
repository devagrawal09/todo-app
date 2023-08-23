import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { Page } from './Page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// @ts-expect-error
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <ClerkProvider publishableKey={publishableKey}>
        <Page />
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
