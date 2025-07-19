'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClientContext } from './queryclient'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientContext>
        {children}
      </QueryClientContext>
    </SessionProvider>
  )
}