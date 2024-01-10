"use client"
import { ReactNode } from "react"
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
  import { useState } from "react"
  interface QueryProviderProps  {
    children:ReactNode
  }
  export default function QueryProvider({children}:QueryProviderProps){
    const [queryClient] = useState(() => new QueryClient());
    return(
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    )
  }