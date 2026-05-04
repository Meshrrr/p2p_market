import { createRoot } from 'react-dom/client'
import './scss/normalize.scss'
import './scss/index.scss'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, 
            retry: 3,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider >
)
